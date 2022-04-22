import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/react";
import { CookiesProvider } from "react-cookie";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CookiesProvider>
      <NextUIProvider>
        <Component {...pageProps} />
      </NextUIProvider>
    </CookiesProvider>
  );
}

export default MyApp;
