import puppeteer from "puppeteer";
import * as cheerio from "cheerio";
import { wait, transformKeys } from "./common";

const COMPANY_STOCKS_LIST_URL = `https://www.set.or.th/en/market/get-quote/stock/`;
const NEXT_PAGE_ELEMENT = `button[role="menuitem"][type="button"][aria-label="Go to next page"].page-link`;
const MAX_PAGE = 100;

let nextPageCounter = 0;
let containerCounter = 0;

export const scrapeCommonStocksListing = async () => {
  console.log("Starting...");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1300, height: 600 });

  // initial data
  let scrapedData = [];
  let pageCount = 0;
  // loading url
  await page.goto(COMPANY_STOCKS_LIST_URL, { waitUntil: "domcontentloaded" });

  // scrape web util no next button available
  while (true) {
    pageCount++;
    console.log(`Scraping page: ${pageCount}...`);
    // wait 3 seconds
    await wait(3000);
    // scrape data each page
    const data = await scrapPageContent(page);
    if (data) {
      // add data of [page] into scrapedData list
      scrapedData = [...scrapedData, ...data];
    }
    // change page
    const isNextPageAvailable = await nextPageAvailable(page);

    if (!isNextPageAvailable || pageCount >= MAX_PAGE) {
      console.log("Last page...Stop scraping");
      // exist loop
      break;
    }
    await page.click(NEXT_PAGE_ELEMENT);
  }
  // const scrapedData = await scrapPageContent(page);

  return scrapedData;
};

const nextPageAvailable = async (page) => {
  const html = await page.content();
  const $ = cheerio.load(html);

  const nextButtonElement = await $(NEXT_PAGE_ELEMENT);
  // case: cannot find next element button then retry 3 times
  if (nextButtonElement.length <= 0) {
    nextPageCounter++;
    console.log(
      `Cannot find the next button... Running retry number ${nextPageCounter}`
    );
    // retry 3 times to find table selector
    if (nextPageCounter < 3) {
      // wait 2 seconds
      await wait(1000);
      // run scrapPageContent again
      await nextPageAvailable(page);
    }
    // exceed retry times
    console.log("Unable to find next button of stocks table.");
    return false;
  }

  return true;
};

const scrapPageContent = async (page) => {
  const html = await page.content();
  const $ = cheerio.load(html);

  // find [<div class="table-responsive"></div>]
  // that does not have[style display: none]
  // and then get <table> that contain class "table-custom-field--cnc"
  const tableContainer = await $(
    `div.table-responsive:not([style*="display: none;"]) table.table-custom-field--cnc`
  );

  // case: cannot find stocks table then retry 3 times
  if (tableContainer.length <= 0) {
    containerCounter++;
    console.log(
      `Cannot find the table selector... Running retry number ${containerCounter}`
    );
    // retry 3 times to find table selector
    if (containerCounter < 3) {
      // wait 2 seconds
      await wait(2000);
      // run scrapPageContent again
      await scrapPageContent(page);
    }
    console.log("Unable to find table for scrapping data.");
    return;
  }

  const tableData = [];
  const tableHeaders = [];
  // get headers
  tableContainer.find("thead > tr").each((index, row) => {
    // header
    if (index === 0) {
      const ths = $(row).find("th");
      $(ths).each((headerIndex, headerElement) => {
        const headerText = $(headerElement).find("span:nth-child(1)");
        tableHeaders.push($(headerText).text());
      });
    }
  });
  // map header with table content
  tableContainer.find("tbody > tr").each((index, row) => {
    // initialize an empty object to store the row data
    const rowData = {};
    // table content
    const tds = $(row).find("td");
    const tableRow = {};
    $(tds).each((contentIndex, contentElement) => {
      if (contentIndex === 0) {
        const symbolLink = $(contentElement).find("a");
        tableRow[tableHeaders[contentIndex]] = $(symbolLink)
          .text()
          ?.replace(/\s+/g, "")
          ?.trim();
      } else {
        tableRow[tableHeaders[contentIndex]] = $(contentElement).text();
      }
    });
    tableData.push(tableRow);
  });
  console.log("----Finish data scrapping----");
  // filter row that not empty
  const filteredTableData = tableData.filter(
    (row) => Object.keys(row)?.length > 0
  );
  // change key format
  const transformTableData = transformKeys(filteredTableData);

  return transformTableData;
};
