import React from "react";
import { useEffect, useState } from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { ThemeProvider } from "next-themes";
import Head from "next/head";
import dynamic from "next/dynamic";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";

const DynamicCursor = dynamic(() => import("../components/cursor"), {
  ssr: false,
});

function App({ Component, pageProps }: AppProps) {
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

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
      {!isMobile && <DynamicCursor color="#fff" />}
      <AnimatePresence mode="wait">
        <motion.div
          key={router.asPath}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
      <Analytics />
      <SpeedInsights />
    </ThemeProvider>
  );
}

export default appWithTranslation(App);
