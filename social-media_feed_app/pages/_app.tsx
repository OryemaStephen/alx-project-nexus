import "@/styles/globals.css";
import type { AppProps } from "next/app";
import client from "@/graphql/apolloClient";
import { ApolloProvider } from "@apollo/client/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
const Layout = dynamic(() => import("@/components/layout/Layout"), {
  loading: () => <div className="w-full min-h-screen flex justify-center items-center gap-4"> 
  <div className="flex items-center gap-2 text-black">
    <Loader2 className="animate-spin"/>Loading ...
  </div>
  </div>,
  ssr: false,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          theme="colored"
        />
      </Layout>
    </ApolloProvider>
  );
}