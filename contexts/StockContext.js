import React, { useState, createContext, useContext, useEffect } from "react";

const contextDefaultValues = {
  stockByScrapedDate: {},
  setStockByScrapedDate: () => {},
};

export const StockContext = createContext(contextDefaultValues);

export function useStockContext() {
  return useContext(StockContext);
}

export const StockProvider = ({ children }) => {
  const [stockByScrapedDate, setStockByScrapedDate] = useState({});

  const handleSetStockByScrapeData = (timestamp) => {};

  const value = {
    stockByScrapedDate,
    setStockByScrapedDate,
  };

  return (
    <StockContext.Provider value={value}>{children}</StockContext.Provider>
  );
};
