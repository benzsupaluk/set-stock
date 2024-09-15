import apiRequest from "@/utils/service/apiRequest";

const stocks = {
  getAllCommonStocksList: async (options) => {
    return apiRequest.get(`/api/stocks/listing`);
  },
  getMajorShareholdersDetail: async (symbol, options) => {
    return apiRequest.get(`/api/stocks/shareholder-detail`, {
      params: { symbol },
    });
  },
};

export default stocks;
