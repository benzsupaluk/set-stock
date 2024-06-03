"use client";

import Image from "next/image";

// Homepage
export default function Home() {
  // call scrapping API
  // const data = await getData();
  // console.log("data", data);

  // get scrapping data from api/route.js
  const getData = async () => {
    const response = await fetch("http://localhost:3000/api", {
      cache: "no-store",
    });
    if (!response.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
    }
    return response.json();
  };

  const handleScrapeData = async () => {
    const data = await getData();
    console.log(data);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* {data?.message} */}
      <button
        type="button"
        aria-label="scrape data"
        className="px-3.5 py-2 rounded-lg bg-primary-500 text-white font-semibold"
        onClick={handleScrapeData}
      >
        Scrape data
      </button>
    </main>
  );
}
