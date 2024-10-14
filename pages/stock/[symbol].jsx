import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const StockDetailPage = () => {
  const router = useRouter();
  const { symbol } = router.query;

  const [stocksDetail, setStocksDetail] = useState({});
  const [loadingState, setLoadingState] = useState(false);

  const fetchStockMajorShareholders = async () => {
    // // call scrapping API
    // try {
    //   const { data } = await api.stocks.getMajorShareholdersDetail(symbol);
    //   console.log("data", data);
    // } catch (error) {
    //   console.error(error);
    // } finally {
    // }
  };

  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    if (symbol) {
      // fetchStockMajorShareholders();
    }
  }, [router.isReady]);

  return (
    <div className="py-4 px-8 flex flex-col grow">
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-bold text-xl">{symbol}</h1>
        {/* <button
          type="button"
          className="btn-secondary px-3.5 py-2 text-sm font-semibold gap-1.5 shrink-0"
          onClick={fetchStockMajorShareholders}
        >
          Refresh
        </button> */}
      </div>
    </div>
  );
};

export default StockDetailPage;
