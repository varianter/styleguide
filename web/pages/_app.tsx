import { AppProps } from "next/app";
import "@reach/slider/styles.css";
import "@variant/styleguide/index.css";
import React from "react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <main id="root">
        <Component {...pageProps} />
      </main>
    </React.StrictMode>
  );
}

export default MyApp;
