import Head from "next/head";
import { useRouter } from "next/router";

const HeadMetadata = ({
  title = "Scrape SET",
  description = "",
  image = "",
  children,
}) => {
  const router = useRouter();

  const siteURL =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  const cleanPath =
    router.asPath !== "/" ? router.asPath.split("#")[0].split("?")[0] : "";

  const customTitle = title || `${title} | Scrape SET`;

  return (
    <Head>
      <title>{customTitle}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#3F13A6" />
      <meta name="description" content={description} key="desc" />
      <meta name="twitter:card" content="summary" key="tw-card" />
      <meta name="twitter:site" content="@VisaiAI" key="tw-site" />
      <meta name="twitter:title" content={customTitle} key="tw-title" />
      <meta
        name="twitter:description"
        content={description}
        key="tw-description"
      />
      {/* <meta name="twitter:image" content={customImage} key="tw-image" /> */}
      {router.pathname !== "/[...404]" && (
        <link rel="canonical" href={`${siteURL}${cleanPath}`} />
      )}
      <meta property="og:locale" content="en_US" key="og-locale" />
      <meta property="og:site_name" content="VISAI.ai" key="og-site_name" />
      <meta property="og:type" content="website" key="og-type" />
      <meta property="og:title" content={customTitle} key="og-title" />
      <meta
        property="og:description"
        content={description}
        key="og-description"
      />
      {/* <meta property="og:image" content={customImage} key="og-image" /> */}
      <meta
        property="og:url"
        content={`${siteURL}${router.asPath}`}
        key="og-url"
      />
      {children}
    </Head>
  );
};

export default HeadMetadata;
