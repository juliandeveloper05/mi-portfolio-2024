import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Sixtyfour&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(I,L,T,i,c,k,s){if(I.iticks)return;I.iticks={host:c,settings:s,clientId:k,cdn:L,queue:[]};var h=T.head||T.documentElement;var e=T.createElement(i);var l=I.location;e.async=true;e.src=(L||c)+'/client/inject-v2.min.js';h.insertBefore(e,h.firstChild);I.iticks.call=function(a,b){I.iticks.queue.push([a,b]);};
    })(window,'https://cdn-v1.intelliticks.com/prod/common',document,'script','https://app.intelliticks.com','s2T7oTkLuabZ9qbBx_c',{});`,
          }}
        />
      </body>
    </Html>
  );
}
