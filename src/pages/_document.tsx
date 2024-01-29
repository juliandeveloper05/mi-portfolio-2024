import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Añade el enlace a la fuente "GamerFont" de Google Fonts aquí */}
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
          rel="stylesheet"
        />
        {/* Sustituye "Press Start 2P" con el nombre de tu fuente de estilo "gamer" */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
