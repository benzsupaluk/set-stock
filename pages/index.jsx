import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import apiRequest from "@/utils/service/apiRequest";
import { STOCK_COLUMN_NAME_KEY } from "@/constants";
import { formatDate, capitalizeSentence } from "@/utils/common";
import db from "@/db";

import SearchInput from "@/components/common/SearchInput";
import LoadingThreeDots from "@/components/loader/LoadingThreeDots";
import InputDropdown from "@/components/common/InputDropdown";

import RefreshIcon from "@/public/icons/refresh.svg";
import HeadMetadata from "@/components/HeadMetadata";
import clsx from "clsx";

// Homepage
export default function Home() {
  // search input
  const [searchInput, setSearchInput] = useState("");
  // data
  const [allStocks, setAllStocks] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [latestSetSession, setLatestSetSession] = useState(null);
  const [scrapedDateList, setScrapedDateList] = useState([]);
  const [selectedSetSession, setSelectedSetSession] = useState(null);
  // loading
  const [loadingAllStocks, setLoadingAllStocks] = useState(true);
  const [loadingAllSessions, setLoadingAllSessions] = useState(true);

  const fetchSetSessionsAndSave = async () => {
    setLoadingAllStocks(true);
    try {
      const { data } = await apiRequest.get(
        `/api/stocks/current-common-stocks`
      );
      setAllStocks(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingAllStocks(false);
    }
  };

  // Get the all session from DB
  const fetchAllSetSessions = async () => {
    setLoadingAllSessions(true);
    try {
      const data = await db.getAllStockSessions();
      if (data) {
        setSessions(data);
        const formatScrapedDateList = data.map((session) =>
          formatDate(session.scraped_at)
        );
        setScrapedDateList(formatScrapedDateList);
        if (data?.[0]) {
          setSelectedSetSession(data[0]);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingAllSessions(false);
    }
  };

  const fetchStocksBySessionID = async (sessionID) => {
    setLoadingAllStocks(true);
    try {
      const data = await db.getSetStockBySessionID(sessionID);
      if (data) {
        setAllStocks(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingAllStocks(false);
    }
  };

  useEffect(() => {
    fetchAllSetSessions();
  }, []);

  useEffect(() => {
    if (selectedSetSession?.id) {
      // fetchStocksBySessionID(selectedSetSession.id);
    }
  }, [selectedSetSession]);

  const handleSetSelectedSession = (selectedDate) => {
    const session = sessions.find(
      (s) => formatDate(s.scraped_at) === selectedDate
    );
    if (session) {
      setSelectedSetSession(session);
    }
  };

  const allStocksHeader = useMemo(() => {
    return Object.values(STOCK_COLUMN_NAME_KEY);
  }, [STOCK_COLUMN_NAME_KEY]);

  const filteredStocks = useMemo(() => {
    return searchInput
      ? allStocks.filter((stocks) => {
          const searchText = searchInput?.toLowerCase()?.trim();
          const symbol = stocks?.[STOCK_COLUMN_NAME_KEY.SYMBOL]
            ?.toLowerCase()
            ?.trim();
          const companyName = stocks?.[STOCK_COLUMN_NAME_KEY.COMPANY_NAME]
            ?.toLowerCase()
            ?.trim();
          return (
            symbol?.includes(searchText) || companyName?.includes(searchText)
          );
        })
      : allStocks;
  }, [allStocks, searchInput]);

  return (
    <>
      <HeadMetadata />
      <section
        className={`grow overflow-auto flex flex-col gap-6 items-center relative`}
      >
        <section className="flex flex-col w-full gap-4 px-8 pt-4">
          <div className="flex items-center gap-3 ml-auto">
            <span className="font-medium text-sm text-gray-500">
              Select scraped date:
            </span>
            {!loadingAllSessions ? (
              <InputDropdown
                items={scrapedDateList}
                selectedItem={
                  selectedSetSession
                    ? formatDate(selectedSetSession.scraped_at)
                    : null
                }
                handleSetSelectedItem={handleSetSelectedSession}
                position="bottom-right"
              />
            ) : (
              <div className="animate-pulse h-11 w-[176px] bg-gray-50 rounded-lg"></div>
            )}
          </div>
          {/* <button
          type="button"
          className="btn-secondary px-3.5 py-2 ml-auto text-sm font-semibold gap-1.5"
          onClick={() => {}}
        >
          <RefreshIcon className="w-4 h-4" />
          <span>Refresh</span>
        </button> */}
          <SearchInput
            searchInputText={searchInput}
            handleSetSearchInputText={(input) => setSearchInput(input)}
          />
        </section>
        {/* table */}
        <section className="flex flex-col grow w-full px-8 pb-8">
          {loadingAllStocks ? (
            <div className="grow flex justify-center items-start pt-16">
              <LoadingThreeDots />
            </div>
          ) : (
            <table className="w-full pb-8 table-auto">
              <thead className="sticky top-0 z-[200]">
                <tr className="bg-gray-50">
                  {allStocksHeader.map((header, index) => {
                    return (
                      <th
                        key={index}
                        className={clsx(
                          "text-gray-600 font-bold text-xs py-3 px-6 text-left",
                          header === STOCK_COLUMN_NAME_KEY.COMPANY_NAME
                            ? "w-[50%]"
                            : "w-[200px]"
                        )}
                      >
                        {capitalizeSentence(header.replaceAll("_", " "))}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {filteredStocks.map((stocks, index) => {
                  const symbol = stocks?.[STOCK_COLUMN_NAME_KEY.SYMBOL];
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
                          <td
                            key={`${header}-${index}`}
                            className={clsx(
                              "py-4 px-6 text-left text-sm",
                              index === 0 ? "font-semibold" : ""
                            )}
                          >
                            {symbol ? (
                              <Link href={`/stock/${symbol}`}>
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
    </>
  );
}
