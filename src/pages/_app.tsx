// _app.js o _app.tsx
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import Head from "next/head";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/newlogo.png" />
      </Head>

      <Component {...pageProps} />
    </>
  );
}

export default appWithTranslation(App);
