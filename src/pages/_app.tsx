import { useEffect, useState } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import Head from "next/head";
import Cursor from "../components/cursor";
import dynamic from "next/dynamic";

const WaterWaveWrapper = dynamic(
  () => import("../components/water-wave-wrapper"),
  {
    ssr: false,
  }
);

function App({ Component, pageProps }: AppProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 740 || window.innerWidth < 760);
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
        <link rel="icon" href="/newlogo.png" />
      </Head>
      <Cursor color="#fff" />
      {isMobile ? (
        <Component {...pageProps} />
      ) : (
        <WaterWaveWrapper
          imageUrl=""
          dropRadius="3"
          perturbance="3"
          resolution="2048"
        >
          {() => <Component {...pageProps} />}
        </WaterWaveWrapper>
      )}
    </>
  );
}

export default appWithTranslation(App);
