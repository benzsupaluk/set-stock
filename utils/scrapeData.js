import puppeteer from "puppeteer";
import * as cheerio from "cheerio";

const COMPANY_STOCKS_LIST_URL = `https://www.set.or.th/en/market/get-quote/stock/`;

export const scrapeStocksListing = async () => {
  console.log("Starting...");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1300, height: 600 });

  // initial data
  // const scrapedData = [];
  let pageCount = 0;
  // loading url
  await page.goto(COMPANY_STOCKS_LIST_URL, { waitUntil: "domcontentloaded" });

  // // scrape web util no next button available
  // while (true) {
  //   pageCount++;
  //   console.log(`Scraping page: ${pageCount}...`);
  //   // wait 3 seconds
  //   await wait(3000);
  //   // scrape data each page
  //   const data = await scrapPageContent(page);
  //   if (data) {
  //     // add data of {page} into scrapedData list
  //     scrapedData = [...scrapedData, data];
  //   }
  //   // change page
  //   const isNextPageAvailable = await nextPageAvailable(page);
  //   if (!isNextPageAvailable) {
  //     // exist loop
  //     break;
  //   }
  // }
  await wait(3000);
  const scrapedData = await scrapPageContent(page);

  return scrapedData;
};

const nextPageAvailable = async (page) => {
  const $ = cheerio.load(page.content());
  // const nextPageButton = await
  const nextButtonElement = await $(`li.page-link__next`);

  // case: cannot find next element button then retry 3 times
  let counter = 0;
  if (!nextButtonElement) {
    counter++;
    console.log(
      `Cannot find the next button... Running retry number ${counter}`
    );
    // retry 3 times to find table selector
    if (counter < 3) {
      // wait 2 seconds
      await wait(2000);
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
  const $ = cheerio.load(await page.content());

  // find [<div class="table-responsive"></div>]
  // that does not have[style display: none]
  // and then get <table> that contain class "table-custom-field--cnc"
  const tableContainer = await $(
    `div.table-responsive:not([style*="display: none;"]) table.table-custom-field--cnc`
  );

  // case: cannot find stocks table then retry 3 times
  let containerCounter = 0;
  if (!tableContainer) {
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

    // add the row data to the table data array
    tableData.push(rowData);
  });
  console.log("----Finish scrapping data----");
  // filter row that not empty
  const filteredTableData = tableData.filter(
    (row) => Object.keys(row)?.length > 0
  );
  return filteredTableData;
};

// waiting for (ms) millisecond
const wait = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
