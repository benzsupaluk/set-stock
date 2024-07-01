import { useMemo, useState } from "react";

import Image from "next/image";
import { useEffect } from "react";
import api from "@/api";

// Homepage
export default function Home() {
  const [allStocks, setAllStocks] = useState([
    {
      Symbol: "24CS",
      "Company Name": "Twenty-Four Con & Supply Public Company Limited",
      Market: "mai",
      "Industry Group": "PROPCON",
      Sector: "-",
      Factsheet: "",
    },
    {
      Symbol: "2S",
      "Company Name": "2S METAL PUBLIC COMPANY LIMITED",
      Market: "SET",
      "Industry Group": "INDUS",
      Sector: "STEEL",
      Factsheet: "",
    },
    {
      Symbol: "3BBIF",
      "Company Name": "3BB INTERNET INFRASTRUCTURE FUND",
      Market: "SET",
      "Industry Group": "TECH",
      Sector: "ICT",
      Factsheet: "",
    },
    {
      Symbol: "3K-BAT",
      "Company Name": "THAI ENERGY STORAGE TECHNOLOGY PUBLIC COMPANY LIMITED",
      Market: "SET",
      "Industry Group": "INDUS",
      Sector: "AUTO",
      Factsheet: "",
    },
    {
      Symbol: "A",
      "Company Name": "AREEYA PROPERTY PUBLIC COMPANY LIMITED",
      Market: "SET",
      "Industry Group": "PROPCON",
      Sector: "PROP",
      Factsheet: "",
    },
    {
      Symbol: "A5",
      "Company Name": "ASSET FIVE GROUP PUBLIC COMPANY LIMITED",
      Market: "mai",
      "Industry Group": "PROPCON",
      Sector: "-",
      Factsheet: "",
    },
    {
      Symbol: "AAI",
      "Company Name": "Asian Alliance International Public Company Limited",
      Market: "SET",
      "Industry Group": "AGRO",
      Sector: "FOOD",
      Factsheet: "",
    },
    {
      Symbol: "AAV",
      "Company Name": "ASIA AVIATION PUBLIC COMPANY LIMITED",
      Market: "SET",
      "Industry Group": "SERVICE",
      Sector: "TRANS",
      Factsheet: "",
    },
    {
      Symbol: "ABM",
      "Company Name": "ASIA BIOMASS PUBLIC COMPANY LIMITED",
      Market: "mai",
      "Industry Group": "RESOURC",
      Sector: "-",
      Factsheet: "",
    },
    {
      Symbol: "ACAP",
      "Company Name": "ASIA CAPITAL GROUP PUBLIC COMPANY LIMITED",
      Market: "mai",
      "Industry Group": "FINCIAL",
      Sector: "-",
      Factsheet: "",
    },
    {
      Symbol: "ACC",
      "Company Name": "ADVANCED CONNECTION CORPORATION PUBLIC COMPANY LIMITED",
      Market: "SET",
      "Industry Group": "RESOURC",
      Sector: "ENERG",
      Factsheet: "",
    },
    {
      Symbol: "ACE",
      "Company Name": "ABSOLUTE CLEAN ENERGY PUBLIC COMPANY LIMITED",
      Market: "SET",
      "Industry Group": "RESOURC",
      Sector: "ENERG",
      Factsheet: "",
    },
    {
      Symbol: "ACG",
      "Company Name": "AUTOCORP HOLDING PUBLIC COMPANY LIMITED",
      Market: "SET",
      "Industry Group": "INDUS",
      Sector: "AUTO",
      Factsheet: "",
    },
    {
      Symbol: "ADB",
      "Company Name": "APPLIED DB PUBLIC COMPANY LIMITED",
      Market: "mai",
      "Industry Group": "INDUS",
      Sector: "-",
      Factsheet: "",
    },
    {
      Symbol: "ADD",
      "Company Name": "ADDTECH HUB PUBLIC COMPANY LIMITED",
      Market: "mai",
      "Industry Group": "SERVICE",
      Sector: "-",
      Factsheet: "",
    },
    {
      Symbol: "ADVANC",
      "Company Name": "ADVANCED INFO SERVICE PUBLIC COMPANY LIMITED",
      Market: "SET",
      "Industry Group": "TECH",
      Sector: "ICT",
      Factsheet: "",
    },
    {
      Symbol: "ADVICE",
      "Company Name": "Advice IT Infinite Public Company Limited",
      Market: "SET",
      "Industry Group": "SERVICE",
      Sector: "COMM",
      Factsheet: "",
    },
    {
      Symbol: "AE",
      "Company Name": "ALL ENERGY & UTILITIES PUBLIC COMPANY LIMITED",
      Market: "SET",
      "Industry Group": "RESOURC",
      Sector: "ENERG",
      Factsheet: "",
    },
    {
      Symbol: "AEONTS",
      "Company Name": "AEON THANA SINSAP (THAILAND) PUBLIC COMPANY LIMITED",
      Market: "SET",
      "Industry Group": "FINCIAL",
      Sector: "FIN",
      Factsheet: "",
    },
    {
      Symbol: "AF",
      "Company Name": "AIRA FACTORING PUBLIC COMPANY LIMITED",
      Market: "mai",
      "Industry Group": "FINCIAL",
      Sector: "-",
      Factsheet: "",
    },
  ]);
  const fetchStockListing = async () => {
    // call scrapping API
    const { data } = await api.stocks.getAllCommonStocksList();
    console.log(data);
  };

  const allStocksHeader = useMemo(() => {
    return allStocks.length > 0 ? Object.keys(allStocks[0]) : [];
  }, [allStocks]);

  return (
    <section className={`grow flex-col items-center p-8 relative`}>
      <button
        type="button"
        className="btn-secondary px-3.5 py-2"
        onClick={fetchStockListing}
      >
        Refresh
      </button>
      {/* table */}
      <section>
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
            {allStocks.map((stocks, index) => {
              return (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-primary-50 cursor-pointer"
                >
                  {allStocksHeader.map((header, index) => {
                    return (
                      <td className="py-4 px-6 text-left text-sm text-gray-600">
                        {stocks?.[header] || ""}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </section>
  );
}
