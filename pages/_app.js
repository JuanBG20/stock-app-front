import "@/styles/globals.css";
import "@/styles/productList.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Stock App</title>
      </Head>
      <Component {...pageProps} />;
    </>
  );
}
