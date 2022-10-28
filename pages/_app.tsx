import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { defaultTheme, Provider, SSRProvider } from "@adobe/react-spectrum";
import { ColorScheme } from "@react-types/provider";
import { useEffect, useRef, useState } from "react";
import { getSystemTheme } from "../utils/render/getSystemTheme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

console.log(`version: ${__version}`);

function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = useRef(new QueryClient());

  const [theme, setTheme] = useState<ColorScheme>();

  useEffect(() => {
    setTheme(getSystemTheme());

    const handleLocalStorageUpdate = () => {
      setTheme(getSystemTheme());
    };

    window.addEventListener("storage", handleLocalStorageUpdate);
    return () => window.removeEventListener("storage", handleLocalStorageUpdate);
  }, []);

  return (
    <QueryClientProvider client={queryClient.current}>
      <SSRProvider>
        <Provider theme={defaultTheme} locale="ru-RU" colorScheme={theme}>
          <Component {...pageProps} />
        </Provider>
      </SSRProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
