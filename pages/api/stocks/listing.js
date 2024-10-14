import pool from "@/lib/pool";
import { scrapeStocksListing } from "@/utils/scrapeData";
import { supabase } from "@/lib/supabase";
import { STOCK_COLUMN_NAME_KEY } from "@/constants";
import db from "@/db";

export default async function handler(req, res) {
  try {
    // create session into db
    const sessionData = await db.createSetSession();

    // scrape stock list data
    const stockList = await scrapeStocksListing();

    // prepare data for saving into db
    const stockListDataForSaving = [];
    for (const stock of stockList) {
      let data = {};
      data.session_id = sessionData.id;
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
      stockListDataForSaving.push(data);
    }

    // save scrape data with session_id into db
    await db.saveSetList(stockListDataForSaving);

    // return stock list data
    res.status(200).json(stockList);
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ detail: "Internal server error" });
  }
}
