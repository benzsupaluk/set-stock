import apiRequest from "@/utils/service/apiRequest";

const stocks = {
  getAllCommonStocksList: async (options) => {
    return apiRequest.get(`/api/stocks/listing`);
  },
};

export default stocks;
