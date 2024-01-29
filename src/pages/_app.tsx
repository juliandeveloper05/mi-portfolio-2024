import "../styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
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
      <Component {...pageProps} />
    </>
  );
}
