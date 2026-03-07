import React from "react";
import { useEffect, useState } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { ThemeProvider } from "next-themes";
import Head from "next/head";
import dynamic from "next/dynamic";

const DynamicCursor = dynamic(() => import("../components/cursor"), {
  ssr: false,
});

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
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <Head>
        <title>Julian Soto | Portfolio</title>
        <link rel="icon" href="/newlogo.png" />
      </Head>
      {isMobile ? (
        <Component {...pageProps} />
      ) : (
        <>
          <DynamicCursor color="#fff" />
          <Component {...pageProps} />
        </>
      )}
    </ThemeProvider>
  );
}

export default appWithTranslation(App);
