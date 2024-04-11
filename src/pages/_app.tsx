import { useEffect, useState } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import Head from "next/head";
import Cursor from "../components/cursor";


function App({ Component, pageProps }: AppProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(
        window.innerWidth < 740 ||
          (window.innerWidth < 760 && /Samsung/.test(navigator.userAgent))
      );
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Julian Soto | Portfolio</title>
        <link rel="icon" href="/newlogo.png" />
      </Head>
      {isMobile ? (
        <Component {...pageProps} />
      ) : (
        <>
          <Cursor color="#fff" />
          <Component {...pageProps} />
        </>
      )}
    </>
  );
}

export default appWithTranslation(App);
