import Image from "next/image";
import { Inter } from "next/font/google";
import { useEffect } from "react";
import api from "@/api";

const inter = Inter({ subsets: ["latin"] });

// Homepage
export default function Home() {
  const fetchStockListing = async () => {
    // call scrapping API
    const { data } = await api.stocks.getAllCommonStocksList();
  };

  useEffect(() => {}, []);

  return (
    <main
      className={`flex min-h-screen flex-col items-center p-8 ${inter.className}`}
    ></main>
  );
}
