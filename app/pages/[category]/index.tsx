import React from "react";
import ProductCategoryLayout from "../../components/layout/ProductCategoryLayout";
import MarkOneHeadphone from "../../assets/shared/desktop/image-xx99-mark-one-headphones.jpg";
import MarkTwoHeadphone from "../../assets/shared/desktop/image-xx99-mark-two-headphones.jpg";
import XX59Headphone from "../../assets/shared/desktop/image-xx59-headphones.jpg";
import headphoneData from "../../data.json";
import ProductCategory from "../../components/shared/ProductCategory";

import { gql } from "@apollo/client";
import client from "../../helpers/apolloClient";

const Headphones = ({ data, slug }: any) => {
	const productData = headphoneData.filter(
		(headphone) => headphone.productCategory === "headphones"
	);

	return (
		<ProductCategoryLayout layoutTitle={slug}>
			<section className="w-full flex flex-col gap-[160px]">
				{productData.map((data) => {
					let productImage = MarkOneHeadphone;
					if (data.productTitle === "xx99 mark ii headphones")
						productImage = MarkTwoHeadphone;
					if (data.productTitle === "xx59 headphones")
						productImage = XX59Headphone;
					return (
						<ProductCategory
							key={data.slug}
							productSlug={data.slug}
							productDescription={data.productDescription}
							productImage={productImage}
							productTitle={data.productTitle}
						/>
					);
				})}
			</section>
		</ProductCategoryLayout>
	);
};

export default Headphones;

export async function getStaticPaths() {
	return {
		paths: [
			{ params: { category: "headphones" } },
			{ params: { category: "speakers" } },
			{ params: { category: "earphones" } },
		],
		fallback: false,
	};
}

export async function getStaticProps(context: any) {
	const { params } = context;
	const { category } = params;

	const { data } = await client.query({
		query: gql`
			query {
				products {
					id
					newProduct
					title
					slug
					cartTitle
					suggestionTitle
					gallery
				}
			}
		`,
	});

	return {
		props: {
			data: data.products,
			slug: category,
		},
	};
}
