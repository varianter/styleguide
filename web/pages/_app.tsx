import "@reach/slider/styles.css";
import { AppProps } from "next/app";
import React from "react";
import "styleguide/index.css";

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

// Remove old and outdated service workers.
// This should be removed at some point (when enough time has passed)
if (
  typeof window !== "undefined" &&
  typeof navigator !== "undefined" &&
  "serviceWorker" in navigator
) {
  window.addEventListener("load", async function () {
    const registrations = await navigator.serviceWorker.getRegistrations();
    if (!registrations || !registrations.length) return;
    for (let registration of registrations) {
      await registration.unregister();
    }
    window.location.reload();
  });
}
