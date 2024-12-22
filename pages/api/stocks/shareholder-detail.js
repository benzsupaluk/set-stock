import { scrapeShareholdersDetail } from "@/utils/scapeShareholders";

export default async function handler(request, response) {
  // const data = await scrapeShareholdersDetail();
  const { symbol } = request.query;
  if (!symbol) {
    response.status(400).json({ detail: "No symbol." });
    return;
  }
  console.log("symbol,", symbol);
  const data = await scrapeShareholdersDetail(symbol);
  console.log("data", data);
  response.status(200).json(data);
}
