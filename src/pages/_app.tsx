import "../styles/globals.css";
import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import Head from "next/head";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* Comentando el estilo global del cursor */}
      {/* <style jsx global>{`
        body,
        button,
        a,
        input {
          cursor: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" height="32" width="32"><circle cx="16" cy="16" r="8" fill="%23007BFF"/></svg>'),
            auto !important;
        }
      `}</style> */}
      <Head>
        <link rel="icon" href="/newlogo.png" />{" "}
        {/* Agrega el enlace al ícono de tu logo */}
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default appWithTranslation(App);
