import Head from "next/head";

const Meta = ({ pageTitle }: { pageTitle: string }) => {
  return (
    <Head>
      <title>{pageTitle !== "" ? `Audiophile - ${pageTitle}` : "Audiophile"}</title>
      <meta name="description" content="Your all in one stop to fufill your audio needs" />
      <link rel="icon" href="/favicon-32x32.png" />
    </Head>
  );
};

export default Meta;
