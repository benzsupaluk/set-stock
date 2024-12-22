import pool from "@/lib/pool";
import { scrapeCommonStocksListing } from "@/utils/scrapeData";
import { supabase } from "@/lib/supabase";
import { STOCK_COLUMN_NAME_KEY } from "@/constants";
import db from "@/db";

export default async function handler(req, res) {
  try {
    // get all the exited common stocks
    const commonStocksData = await db.getCommonStocks();
    const exitedCommonStockSymbolList = commonStocksData.map(
      (stock) => stock?.[STOCK_COLUMN_NAME_KEY.SYMBOL]
    );

    // scrape current common stocks
    const currentCommonStockList = await scrapeCommonStocksListing();
    const newCommonStocks = [];
    for (const stock of currentCommonStockList) {
      const symbol = stock?.[STOCK_COLUMN_NAME_KEY.SYMBOL] || "";
      const isNewCommonStock = !exitedCommonStockSymbolList.includes(symbol);
      if (symbol && isNewCommonStock) {
        let data = {};
        data[STOCK_COLUMN_NAME_KEY.SYMBOL] =
          stock?.[STOCK_COLUMN_NAME_KEY.SYMBOL] || "";
        data[STOCK_COLUMN_NAME_KEY.COMPANY_NAME] =
          stock?.[STOCK_COLUMN_NAME_KEY.COMPANY_NAME] || "";
        data[STOCK_COLUMN_NAME_KEY.MARKET] =
          stock?.[STOCK_COLUMN_NAME_KEY.MARKET] || "";
        data[STOCK_COLUMN_NAME_KEY.INDUSTRY_GROUP] =
          stock?.[STOCK_COLUMN_NAME_KEY.INDUSTRY_GROUP] || "";
        data[STOCK_COLUMN_NAME_KEY.SECTOR] =
          stock?.[STOCK_COLUMN_NAME_KEY.SECTOR] || "";
        newCommonStocks.push(data);
      }
    }

    // save the new common stock info list into db
    await db.saveCommonStocks(newCommonStocks);

    // return stock list data
    res.status(200).json({ detail: "Updated common stocks data" });
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ detail: "Internal server error" });
  }
}
