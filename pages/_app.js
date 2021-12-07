import { UserProvider } from "@auth0/nextjs-auth0";
import Layout from "components/Layout";
import "tailwindcss/tailwind.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Layout>
        <Head>
          <link rel="icon" href="/favicon.png" />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}

export default MyApp;
