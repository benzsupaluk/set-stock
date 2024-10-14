import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const StockDetailPage = () => {
  const router = useRouter();
  const { symbol } = router.query;

  const [stocksDetail, setStocksDetail] = useState({
    shareholders: {
      overviewAs:
        "Overview As of                   29 Aug 2024                   Rights Type : XD",
      freeFloat: "Free Float As of                   08 Mar 2024",
      totalShareholders: "3,482",
      minerShareholders: "2,8992,899.00",
      sharesScripless: "76.5476.54",
      sharesMinor: "49.75",
      table: {
        tableData: [
          {
            Rank: "1",
            Shareholders: "MR. SOMBAT LEESWADTRAKUL",
            "# Shares (Shares)": "136,452,654",
            "% Shares": "24.81",
          },
          {
            Rank: "2",
            Shareholders: "MR. SANGRUNG NITIPAVACHON",
            "# Shares (Shares)": "32,019,995",
            "% Shares": "5.82",
          },
          {
            Rank: "3",
            Shareholders: "MR. PREEDA WONGSATITPORN",
            "# Shares (Shares)": "24,636,881",
            "% Shares": "4.48",
          },
          {
            Rank: "4",
            Shareholders: "น.ส. บุญศรี ปัญญาเปี่ยมศักดิ์",
            "# Shares (Shares)": "16,959,004",
            "% Shares": "3.08",
          },
          {
            Rank: "5",
            Shareholders: "น.ส. อัมพร นิติภาวะชน",
            "# Shares (Shares)": "16,897,482",
            "% Shares": "3.07",
          },
          {
            Rank: "6",
            Shareholders: "น.ส. SIWAPORN NITIPAVACHON",
            "# Shares (Shares)": "16,769,636",
            "% Shares": "3.05",
          },
          {
            Rank: "7",
            Shareholders: "นาย สันต์ อมรเลิศวิมาน",
            "# Shares (Shares)": "16,647,856",
            "% Shares": "3.03",
          },
          {
            Rank: "8",
            Shareholders: "นาย วิเชียร ศรีมุนินทร์นิมิต",
            "# Shares (Shares)": "16,600,000",
            "% Shares": "3.02",
          },
          {
            Rank: "9",
            Shareholders: "นาง SUPORN NITIPHAWACHON",
            "# Shares (Shares)": "15,121,139",
            "% Shares": "2.75",
          },
          {
            Rank: "10",
            Shareholders: "นาย ธนทัต ชวาลดิฐ",
            "# Shares (Shares)": "14,479,151",
            "% Shares": "2.63",
          },
          {
            Rank: "11",
            Shareholders: "MISS SUPASSARA LEESAWADTRAKUL",
            "# Shares (Shares)": "12,222,222",
            "% Shares": "2.22",
          },
          {
            Rank: "12",
            Shareholders: "MR. VARUTH LEESWADTRAKUL",
            "# Shares (Shares)": "11,319,900",
            "% Shares": "2.06",
          },
          {
            Rank: "13",
            Shareholders: "นาย KAMJHON ARUNWILAIRAT",
            "# Shares (Shares)": "9,603,995",
            "% Shares": "1.75",
          },
          {
            Rank: "14",
            Shareholders: "น.ส. นิสาภ์ รุ่งรัตนาอุบล",
            "# Shares (Shares)": "8,868,450",
            "% Shares": "1.61",
          },
          {
            Rank: "15",
            Shareholders: "นาย สมบัติ ปัญญาเปี่ยมศักดิ์",
            "# Shares (Shares)": "8,239,000",
            "% Shares": "1.50",
          },
          {
            Rank: "16",
            Shareholders: "MR. CHALERMCHAI IAMSHERANGKUL",
            "# Shares (Shares)": "8,167,100",
            "% Shares": "1.48",
          },
          {
            Rank: "17",
            Shareholders: "นาย สวัสดิ์ พนาพงศ์วศิน",
            "# Shares (Shares)": "8,127,239",
            "% Shares": "1.48",
          },
          {
            Rank: "18",
            Shareholders: "MISS CHONLADA NITIPAWACHON",
            "# Shares (Shares)": "6,920,412",
            "% Shares": "1.26",
          },
          {
            Rank: "19",
            Shareholders: "MRS. SALEERA PANAPONGVASIN",
            "# Shares (Shares)": "6,855,527",
            "% Shares": "1.25",
          },
          {
            Rank: "20",
            Shareholders: "นาง ลออศรี เลิศพรเจริญ",
            "# Shares (Shares)": "6,650,000",
            "% Shares": "1.21",
          },
          {
            Rank: "21",
            Shareholders: "Thai NVDR Company Limited",
            "# Shares (Shares)": "6,088,517",
            "% Shares": "1.11",
          },
          {
            Rank: "22",
            Shareholders: "MR. PAIROJ PITISONGSWAT",
            "# Shares (Shares)": "5,921,288",
            "% Shares": "1.08",
          },
          {
            Rank: "23",
            Shareholders: "นาย วิชัย ปัญญาเปี่ยมศักดิ์",
            "# Shares (Shares)": "5,775,000",
            "% Shares": "1.05",
          },
          {
            Rank: "24",
            Shareholders: "นาย โสภณ พนาพงศ์วศิน",
            "# Shares (Shares)": "5,500,000",
            "% Shares": "1.00",
          },
          {
            Rank: "25",
            Shareholders: "นาย ประมวล พนาพงศ์วศิน",
            "# Shares (Shares)": "4,886,809",
            "% Shares": "0.89",
          },
          {
            Rank: "26",
            Shareholders: "นาย พลเดช อรุณวิไลรัตน์",
            "# Shares (Shares)": "4,130,000",
            "% Shares": "0.75",
          },
          {
            Rank: "27",
            Shareholders: "น.ส. หฤทัย ดีรุ่งโรจน์",
            "# Shares (Shares)": "4,105,449",
            "% Shares": "0.75",
          },
          {
            Rank: "28",
            Shareholders: "นาง THIDARAT ARUNWILAIRAT",
            "# Shares (Shares)": "3,903,602",
            "% Shares": "0.71",
          },
          {
            Rank: "29",
            Shareholders: "น.ส. BUNCHUAY PANYAPIAMSAK",
            "# Shares (Shares)": "3,690,500",
            "% Shares": "0.67",
          },
          {
            Rank: "30",
            Shareholders: "น.ส. ศุภิสรา ปิติทรงสวัสดิ์",
            "# Shares (Shares)": "3,689,400",
            "% Shares": "0.67",
          },
          {
            Rank: "31",
            Shareholders: "MISS INTIPORN PANAPONGWASIN",
            "# Shares (Shares)": "3,081,009",
            "% Shares": "0.56",
          },
          {
            Rank: "32",
            Shareholders: "บริษัท  KHUNCHALERMCHAI8 CO.,LTD.",
            "# Shares (Shares)": "3,060,500",
            "% Shares": "0.56",
          },
          {
            Rank: "33",
            Shareholders: "นาย สุเทพ ศิริพิทยาคุณกิจ",
            "# Shares (Shares)": "2,772,095",
            "% Shares": "0.50",
          },
          {
            Rank: "34",
            Shareholders: "บริษัท  CO.,LTD.",
            "# Shares (Shares)": "2,753,350",
            "% Shares": "0.50",
          },
          {
            Rank: "1",
            Shareholders: "DBS BANK LTD. FOR CLIENT AC SG1200257536",
            "# Shares (Shares)": "3,605,554",
            "% Shares": "0.66",
          },
          {
            Rank: "2",
            Shareholders: "THE BANK OF NEW YORK MELLON",
            "# Shares (Shares)": "804,440",
            "% Shares": "0.15",
          },
          {
            Rank: "3",
            Shareholders: "MR. ADRIAN PENNAL",
            "# Shares (Shares)": "270,000",
            "% Shares": "0.05",
          },
          {
            Rank: "4",
            Shareholders: "นาย สวัสดิ์ พนาพงศ์วศิน",
            "# Shares (Shares)": "219,130",
            "% Shares": "0.04",
          },
          {
            Rank: "5",
            Shareholders: "MR. TOMOKATSU FUNATSU",
            "# Shares (Shares)": "175,000",
            "% Shares": "0.03",
          },
          {
            Rank: "6",
            Shareholders: "UOB KAY HIAN (HONG KONG) LIMITED - Client Account",
            "# Shares (Shares)": "101,860",
            "% Shares": "0.02",
          },
          {
            Rank: "7",
            Shareholders: "MR. KAZUTOSHI HANAYA",
            "# Shares (Shares)": "90,200",
            "% Shares": "0.02",
          },
          {
            Rank: "8",
            Shareholders: "MRS. HSIAO-TING SUN",
            "# Shares (Shares)": "77,000",
            "% Shares": "0.01",
          },
          {
            Rank: "9",
            Shareholders: "STATE STREET BANK AND TRUST COMPANY",
            "# Shares (Shares)": "69,410",
            "% Shares": "0.01",
          },
          {
            Rank: "10",
            Shareholders: "EUROCLEAR NOMINEES LIMITED",
            "# Shares (Shares)": "69,300",
            "% Shares": "0.01",
          },
        ],
        tableHeaders: ["Rank", "Shareholders", "# Shares (Shares)", "% Shares"],
      },
    },
    nvdr: {
      date: "As of 29 Aug 2024",
      table: {
        tableData: [
          {
            Rank: "1",
            Shareholders: "MR. SOMBAT LEESWADTRAKUL",
            "# Shares (Shares)": "136,452,654",
            "% Shares": "24.81",
          },
          {
            Rank: "2",
            Shareholders: "MR. SANGRUNG NITIPAVACHON",
            "# Shares (Shares)": "32,019,995",
            "% Shares": "5.82",
          },
          {
            Rank: "3",
            Shareholders: "MR. PREEDA WONGSATITPORN",
            "# Shares (Shares)": "24,636,881",
            "% Shares": "4.48",
          },
          {
            Rank: "4",
            Shareholders: "น.ส. บุญศรี ปัญญาเปี่ยมศักดิ์",
            "# Shares (Shares)": "16,959,004",
            "% Shares": "3.08",
          },
          {
            Rank: "5",
            Shareholders: "น.ส. อัมพร นิติภาวะชน",
            "# Shares (Shares)": "16,897,482",
            "% Shares": "3.07",
          },
          {
            Rank: "6",
            Shareholders: "น.ส. SIWAPORN NITIPAVACHON",
            "# Shares (Shares)": "16,769,636",
            "% Shares": "3.05",
          },
          {
            Rank: "7",
            Shareholders: "นาย สันต์ อมรเลิศวิมาน",
            "# Shares (Shares)": "16,647,856",
            "% Shares": "3.03",
          },
          {
            Rank: "8",
            Shareholders: "นาย วิเชียร ศรีมุนินทร์นิมิต",
            "# Shares (Shares)": "16,600,000",
            "% Shares": "3.02",
          },
          {
            Rank: "9",
            Shareholders: "นาง SUPORN NITIPHAWACHON",
            "# Shares (Shares)": "15,121,139",
            "% Shares": "2.75",
          },
          {
            Rank: "10",
            Shareholders: "นาย ธนทัต ชวาลดิฐ",
            "# Shares (Shares)": "14,479,151",
            "% Shares": "2.63",
          },
          {
            Rank: "11",
            Shareholders: "MISS SUPASSARA LEESAWADTRAKUL",
            "# Shares (Shares)": "12,222,222",
            "% Shares": "2.22",
          },
          {
            Rank: "12",
            Shareholders: "MR. VARUTH LEESWADTRAKUL",
            "# Shares (Shares)": "11,319,900",
            "% Shares": "2.06",
          },
          {
            Rank: "13",
            Shareholders: "นาย KAMJHON ARUNWILAIRAT",
            "# Shares (Shares)": "9,603,995",
            "% Shares": "1.75",
          },
          {
            Rank: "14",
            Shareholders: "น.ส. นิสาภ์ รุ่งรัตนาอุบล",
            "# Shares (Shares)": "8,868,450",
            "% Shares": "1.61",
          },
          {
            Rank: "15",
            Shareholders: "นาย สมบัติ ปัญญาเปี่ยมศักดิ์",
            "# Shares (Shares)": "8,239,000",
            "% Shares": "1.50",
          },
          {
            Rank: "16",
            Shareholders: "MR. CHALERMCHAI IAMSHERANGKUL",
            "# Shares (Shares)": "8,167,100",
            "% Shares": "1.48",
          },
          {
            Rank: "17",
            Shareholders: "นาย สวัสดิ์ พนาพงศ์วศิน",
            "# Shares (Shares)": "8,127,239",
            "% Shares": "1.48",
          },
          {
            Rank: "18",
            Shareholders: "MISS CHONLADA NITIPAWACHON",
            "# Shares (Shares)": "6,920,412",
            "% Shares": "1.26",
          },
          {
            Rank: "19",
            Shareholders: "MRS. SALEERA PANAPONGVASIN",
            "# Shares (Shares)": "6,855,527",
            "% Shares": "1.25",
          },
          {
            Rank: "20",
            Shareholders: "นาง ลออศรี เลิศพรเจริญ",
            "# Shares (Shares)": "6,650,000",
            "% Shares": "1.21",
          },
          {
            Rank: "21",
            Shareholders: "Thai NVDR Company Limited",
            "# Shares (Shares)": "6,088,517",
            "% Shares": "1.11",
          },
          {
            Rank: "22",
            Shareholders: "MR. PAIROJ PITISONGSWAT",
            "# Shares (Shares)": "5,921,288",
            "% Shares": "1.08",
          },
          {
            Rank: "23",
            Shareholders: "นาย วิชัย ปัญญาเปี่ยมศักดิ์",
            "# Shares (Shares)": "5,775,000",
            "% Shares": "1.05",
          },
          {
            Rank: "24",
            Shareholders: "นาย โสภณ พนาพงศ์วศิน",
            "# Shares (Shares)": "5,500,000",
            "% Shares": "1.00",
          },
          {
            Rank: "25",
            Shareholders: "นาย ประมวล พนาพงศ์วศิน",
            "# Shares (Shares)": "4,886,809",
            "% Shares": "0.89",
          },
          {
            Rank: "26",
            Shareholders: "นาย พลเดช อรุณวิไลรัตน์",
            "# Shares (Shares)": "4,130,000",
            "% Shares": "0.75",
          },
          {
            Rank: "27",
            Shareholders: "น.ส. หฤทัย ดีรุ่งโรจน์",
            "# Shares (Shares)": "4,105,449",
            "% Shares": "0.75",
          },
          {
            Rank: "28",
            Shareholders: "นาง THIDARAT ARUNWILAIRAT",
            "# Shares (Shares)": "3,903,602",
            "% Shares": "0.71",
          },
          {
            Rank: "29",
            Shareholders: "น.ส. BUNCHUAY PANYAPIAMSAK",
            "# Shares (Shares)": "3,690,500",
            "% Shares": "0.67",
          },
          {
            Rank: "30",
            Shareholders: "น.ส. ศุภิสรา ปิติทรงสวัสดิ์",
            "# Shares (Shares)": "3,689,400",
            "% Shares": "0.67",
          },
          {
            Rank: "31",
            Shareholders: "MISS INTIPORN PANAPONGWASIN",
            "# Shares (Shares)": "3,081,009",
            "% Shares": "0.56",
          },
          {
            Rank: "32",
            Shareholders: "บริษัท  KHUNCHALERMCHAI8 CO.,LTD.",
            "# Shares (Shares)": "3,060,500",
            "% Shares": "0.56",
          },
          {
            Rank: "33",
            Shareholders: "นาย สุเทพ ศิริพิทยาคุณกิจ",
            "# Shares (Shares)": "2,772,095",
            "% Shares": "0.50",
          },
          {
            Rank: "34",
            Shareholders: "บริษัท  CO.,LTD.",
            "# Shares (Shares)": "2,753,350",
            "% Shares": "0.50",
          },
          {
            Rank: "1",
            Shareholders: "DBS BANK LTD. FOR CLIENT AC SG1200257536",
            "# Shares (Shares)": "3,605,554",
            "% Shares": "0.66",
          },
          {
            Rank: "2",
            Shareholders: "THE BANK OF NEW YORK MELLON",
            "# Shares (Shares)": "804,440",
            "% Shares": "0.15",
          },
          {
            Rank: "3",
            Shareholders: "MR. ADRIAN PENNAL",
            "# Shares (Shares)": "270,000",
            "% Shares": "0.05",
          },
          {
            Rank: "4",
            Shareholders: "นาย สวัสดิ์ พนาพงศ์วศิน",
            "# Shares (Shares)": "219,130",
            "% Shares": "0.04",
          },
          {
            Rank: "5",
            Shareholders: "MR. TOMOKATSU FUNATSU",
            "# Shares (Shares)": "175,000",
            "% Shares": "0.03",
          },
          {
            Rank: "6",
            Shareholders: "UOB KAY HIAN (HONG KONG) LIMITED - Client Account",
            "# Shares (Shares)": "101,860",
            "% Shares": "0.02",
          },
          {
            Rank: "7",
            Shareholders: "MR. KAZUTOSHI HANAYA",
            "# Shares (Shares)": "90,200",
            "% Shares": "0.02",
          },
          {
            Rank: "8",
            Shareholders: "MRS. HSIAO-TING SUN",
            "# Shares (Shares)": "77,000",
            "% Shares": "0.01",
          },
          {
            Rank: "9",
            Shareholders: "STATE STREET BANK AND TRUST COMPANY",
            "# Shares (Shares)": "69,410",
            "% Shares": "0.01",
          },
          {
            Rank: "10",
            Shareholders: "EUROCLEAR NOMINEES LIMITED",
            "# Shares (Shares)": "69,300",
            "% Shares": "0.01",
          },
        ],
        tableHeaders: ["Rank", "Shareholders", "# Shares (Shares)", "% Shares"],
      },
    },
  });
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
        <button
          type="button"
          className="btn-secondary px-3.5 py-2 text-sm font-semibold gap-1.5 shrink-0"
          onClick={fetchStockMajorShareholders}
        >
          Refresh
        </button>
      </div>
    </div>
  );
};

export default StockDetailPage;
