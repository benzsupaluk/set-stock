import { useEffect } from "react";

import "@/styles/globals.css";

import Layout from "@/components/Layout";
import { Provider } from "@/contexts";

export default function App({ Component, pageProps }) {
  return (
    <Provider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
