import '@/styles/globals.css'
import React from 'react'
import type { AppProps } from 'next/app'
import { QueryClientProvider, QueryClient, Hydrate } from "@tanstack/react-query";

export default function App({ Component, pageProps }: AppProps) {
  const [client] = React.useState(new QueryClient());
  return (
    <QueryClientProvider client={client}>
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  )
}
