import puppeteer from "puppeteer";
import * as cheerio from "cheerio";

const COMPANY_STOCKS_LIST_URL = `https://www.set.or.th/en/market/get-quote/stock/`;

const scrapeStocksListing = async () => {
  console.log("Starting...");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1300, height: 600 });

  await page.goto(COMPANY_STOCKS_LIST_URL, { waitUntil: "domcontentloaded" });
  await wait(3000);
  const scrapedData = await scrapPageContent(page);

  return scrapedData;
};

const scrapPageContent = async (page) => {
  let containerCounter = 0;
  const $ = cheerio.load(await page.content());
  const tableContainer = await $(
    `div.table-responsive:not([style*="display: none;"]) table.table-custom-field--cnc`
  );

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
    } else {
      console.log("Unable to find table for scrapping data.");
    }
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
  console.log("----Finish scrapping data");
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

export async function GET() {
  const data = await scrapeStocksListing();
  return Response.json({ data });
}
