import "../styles/globals.scss";
import { useState } from "react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient} contextSharing>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
