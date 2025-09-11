import "@/styles/globals.css";
import type { AppProps } from "next/app";
import client from "@/graphql/apolloClient";
import { ApolloProvider } from "@apollo/client/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}