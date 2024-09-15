import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import api from "@/api";

import SearchInput from "@/components/common/SearchInput";
import RefreshIcon from "@/public/icons/refresh.svg";
import clsx from "clsx";

// Homepage
export default function Home() {
  // search input
  const [searchInput, setSearchInput] = useState("");
  const [allStocks, setAllStocks] = useState([]);
  const [loadingAllStocks, setLoadingAllStocks] = useState(true);

  const fetchStockListing = async () => {
    setLoadingAllStocks(true);
    // call scrapping API
    try {
      const { data } = await api.stocks.getAllCommonStocksList();
      setAllStocks(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingAllStocks(false);
    }
  };

  useEffect(() => {
    fetchStockListing();
  }, []);

  const allStocksHeader = useMemo(() => {
    return allStocks.length > 0 ? Object.keys(allStocks[0]) : [];
  }, [allStocks]);

  const filteredStocks = useMemo(() => {
    return searchInput
      ? allStocks.filter((stocks) => {
          const searchText = searchInput?.toLowerCase()?.trim();
          const symbol = stocks?.["Symbol"]?.toLowerCase()?.trim();
          const companyName = stocks?.["Company Name"]?.toLowerCase()?.trim();
          return (
            symbol?.includes(searchText) || companyName?.includes(searchText)
          );
        })
      : allStocks;
  }, [allStocks, searchInput]);

  return (
    <section
      className={`grow overflow-hidden flex flex-col gap-6 items-center pt-4 relative`}
    >
      <section className="flex flex-col w-full gap-4 px-8">
        <button
          type="button"
          className="btn-secondary px-3.5 py-2 ml-auto text-sm font-semibold gap-1.5"
          onClick={fetchStockListing}
        >
          <RefreshIcon className="w-4 h-4" />
          <span>Refresh</span>
        </button>
        <SearchInput
          searchInputText={searchInput}
          handleSetSearchInputText={(input) => setSearchInput(input)}
        />
      </section>
      {/* table */}
      <section className="flex flex-col grow overflow-auto w-full px-8 pb-8">
        {loadingAllStocks ? (
          <div className="text-center">Loading...</div>
        ) : (
          <table className="w-full pb-8 table-auto">
            <thead className="sticky top-0 z-[200]">
              <tr className="bg-gray-50">
                {allStocksHeader.map((header, index) => {
                  return (
                    <th
                      key={index}
                      className="text-gray-600 font-bold text-xs py-3 px-6 text-left"
                    >
                      {header}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {filteredStocks.map((stocks, index) => {
                const symbol = stocks?.["Symbol"];
                return (
                  <tr
                    key={index}
                    className={clsx(
                      "border-b border-gray-200",
                      symbol
                        ? "hover:bg-primary-50 cursor-pointer group text-gray-600"
                        : "bg-gray-50 text-gray-400"
                    )}
                  >
                    {allStocksHeader.map((header, index) => {
                      return (
                        <td className="py-4 px-6 text-left text-sm">
                          {symbol ? (
                            <Link href={`/stock/${stocks?.["Symbol"]}`}>
                              {stocks?.[header] || ""}
                            </Link>
                          ) : (
                            <>{stocks?.[header] || ""}</>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </section>
    </section>
  );
}
