import "@/styles/globals.scss";
import NProgress from "nprogress";
import type { AppProps } from "next/app";

import Head from "next/head";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from "@tanstack/react-query";

import { useRef } from "react";
import { Router } from "next/router";

import dayjs from "dayjs";
import "react-responsive-modal/styles.css";
import "nprogress/nprogress.css";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { NextPageWithLayout } from "../types/page";

dayjs.extend(advancedFormat);
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const { dehydratedState } = pageProps as { dehydratedState: unknown };
  const getLayout = Component.getLayout || (page => page);
  const queryClient = useRef(
    new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          useErrorBoundary: false,
          refetchOnWindowFocus: false,
        },
      },
    }),
  );

  return (
    <>
      <Head>
        <title>Radio School admin </title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            borderRadius: "10px",
            paddingInline: "1rem",
          },
          success: {
            style: {
              background: "#0BCE5A",
              color: "#fff",
            },
          },
          error: {
            style: {
              background: "#FF1B03",
              color: "#fff",
            },
          },
        }}
      />

      <QueryClientProvider client={queryClient.current}>
        <ReactQueryDevtools position="bottom-right" />

        <Hydrate state={dehydratedState}>
          {getLayout(<Component {...pageProps} />)}
        </Hydrate>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
