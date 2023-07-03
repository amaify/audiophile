import React from "react";
import Head from "next/head";

interface Props {
  pageTitle: string;
}

const Meta = ({ pageTitle }: Props) => {
  return (
    <Head>
      <title>{pageTitle !== "" ? `Audiophile - ${pageTitle}` : "Audiophile"}</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};

export default Meta;
