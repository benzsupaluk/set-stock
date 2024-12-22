import { STOCK_COLUMN_NAME_KEY } from "@/constants";
import { scrapeShareholdersDetail } from "@/utils/scapeShareholders";
import db from "@/db";

export default async function handler(request, response) {
  // get all common stocks
  const commonStocksData = await db.getCommonStocks();

  if (commonStocksData) {
    const symbolList = commonStocksData.map(
      (stock) => stock?.[STOCK_COLUMN_NAME_KEY.SYMBOL]
    );
    const sessionId = await db.createSetStockSession();

    for (const symbol of symbolList) {
      const data = await scrapeShareholdersDetail(symbol);
      console.log("data", data);
    }
  }
  console.log("data", data);
  response.status(200).json(data);
}
