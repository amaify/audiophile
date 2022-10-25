import React from "react";
import Head from "next/head";

interface Props {
	pageTitle: string;
}

export const Meta = ({ pageTitle }: Props) => {
	return (
		<Head>
			<title>{`Audiophile - ${pageTitle}` ?? "Audiophile"}</title>
			<meta name="description" content="Generated by create next app" />
			<link rel="icon" href="/favicon.ico" />
		</Head>
	);
};
