import { scrapeStocksListing } from "@/utils/scrapeData";

export default async function handler(req, res) {
  const data = await scrapeStocksListing();
  res.status(200).json(data);
}
