import { scrapeShareholdersDetail } from "@/utils/scapeShareholders";

export default async function handler(request, response) {
  // const data = await scrapeShareholdersDetail();
  const { symbol } = request.query;
  console.log("symbol,", symbol);
  const data = await scrapeShareholdersDetail(symbol);
  response.status(200).json(data);
}
