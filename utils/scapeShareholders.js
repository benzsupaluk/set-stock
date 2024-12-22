import puppeteer from "puppeteer";
import * as cheerio from "cheerio";
import { wait } from "./common";

const NVDR_ELEMENT = `button[aria-controls="stock-quote-tabs-realty-major-pane-2"]`;

export const scrapeShareholdersDetail = async (symbol) => {
  console.log("Starting...");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1300, height: 600 });

  const shareholderUrl = `https://www.set.or.th/en/market/product/stock/quote/${symbol}/major-shareholders`;

  console.log("shareholderUrl", shareholderUrl);

  await page.goto(shareholderUrl, { waitUntil: "domcontentloaded" });
  await wait(3000);

  const scrapedData = await scrapeDetailContent(page);
  return scrapedData;
};

const scrapeDetailContent = async (page) => {
  const $ = cheerio.load(await page.content());

  const shareholderContainer = await $(`div.major-shareholder-info`).first();

  // case: cannot find shareholder then retry 3 times
  let containerCounter = 0;
  if (!shareholderContainer) {
    containerCounter++;
    console.log(
      `Cannot find the shareholder selector... Running retry number ${containerCounter}`
    );
    // retry 3 times to find shareholder selector
    if (containerCounter < 3) {
      // wait 2 seconds
      await wait(2000);
      // run scrapPageContent again
      await scrapPageContent(page);
    }
    console.log("Unable to find shareholder for scrapping data.");
    return;
  }

  const firstRow = shareholderContainer.find("div.row").first();
  const overviewAs = firstRow
    .find("div > span.d-none.d-md-block")
    .text()
    ?.trim()
    ?.replaceAll(/\n/g, " ")
    ?.replaceAll(/\t/g, " ");

  const freeFloat = firstRow
    .find("div.d-none.d-md-block > span")
    .text()
    ?.trim()
    ?.replaceAll(/\n/g, " ")
    ?.replaceAll(/\t/g, " ");

  const totalShareholders = $('label:contains("Total Shareholders")')
    .next()
    .text()
    ?.trim();

  const minerShareholders = $(
    'label:contains("Minor Shareholders (Free float)")'
  )
    .next()
    .text()
    ?.trim();

  const sharesScripless = $('label:contains("% Shares in Scripless Holding")')
    .next()
    .text()
    ?.trim();

  const sharesMinor = $('label:contains("% Shares in Minor Shareholders")')
    .next()
    .text()
    ?.trim();

  const shareholdersTableInfo = await scrapeTable($);

  // click NVDR Holders
  await page.click(NVDR_ELEMENT);
  const nvdrContainer = await $(`div#stock-quote-tabs-realty-major-pane-2`);
  const nvdrDate = nvdrContainer.find("span").first().text()?.trim();
  const nvdrTableInfo = await scrapeTable($);

  const splittedOverflowInfo = overviewAs?.trim()?.split("Rights Type : ");

  const overflowDate =
    splittedOverflowInfo?.[0]?.split("Overview As of")?.[1]?.trim() || "";

  const rightType = splittedOverflowInfo?.[splittedOverflowInfo.length - 1];

  const freeFloatDate =
    freeFloat?.trim()?.split("Free Float As of")?.[1]?.trim() || "";

  return {
    shareholders: {
      overviewDate: overflowDate,
      rightType: rightType,
      freeFloatDate: freeFloatDate,
      totalShareholders: totalShareholders,
      minerShareholders: minerShareholders,
      sharesScripless: sharesScripless,
      sharesMinor: sharesMinor,
      table: shareholdersTableInfo,
    },
    nvdr: {
      date: nvdrDate,
      table: nvdrTableInfo,
    },
  };
};

const scrapeTable = async ($) => {
  // find [<div class="table-responsive"></div>]
  // that does not have[style display: none]
  // and then get <table> that contain class "table-custom-field--cnc"
  let tableContainer = await $(
    `div.table-responsive:not([style*="display: none;"]) table.table-custom-field--cnc`
  );

  // case: cannot find stocks table then retry 3 times
  let tableContainerCounter = 0;
  if (!tableContainer) {
    tableContainerCounter++;
    console.log(
      `Cannot find the table selector... Running retry number ${containerCounter}`
    );
    // retry 3 times to find table selector
    if (tableContainerCounter < 3) {
      // wait 2 seconds
      await wait(2000);
      // run scrapPageContent again
      tableContainer = await $(
        `div.table-responsive:not([style*="display: none;"]) table.table-custom-field--cnc`
      );
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
        const header = $(headerElement).text()?.trim();
        tableHeaders.push(header);
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
      const content = $(contentElement).text()?.trim();
      tableRow[tableHeaders[contentIndex]] = content;
    });
    tableData.push(tableRow);
  });
  return { tableData: tableData, tableHeaders: tableHeaders };
};
