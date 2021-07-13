import Head from "next/head";

import Layout from "../components/layout/layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Your application title</title>
        <meta name="description" content="Your application description" />
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
        />{" "}
        {/*Added to pages to ensure responsiveness and scales correctly*/}
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
