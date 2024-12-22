import pool from "@/lib/pool";
import { scrapeCommonStocksListing } from "@/utils/scrapeData";
import db from "@/db";

export default async function handler(req, res) {
  try {
    // get all the exited common stocks
    const commonStocksData = await db.getCommonStocks();

    // return stock list data
    res.status(200).json({ data: commonStocksData });
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ detail: "Internal server error" });
  }
}
