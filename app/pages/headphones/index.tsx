import React from "react";
import ProductCategoryLayout from "../../components/layout/ProductCategoryLayout";
import MarkOneHeadphone from "../../assets/shared/desktop/image-xx99-mark-one-headphones.jpg";
import MarkTwoHeadphone from "../../assets/shared/desktop/image-xx99-mark-two-headphones.jpg";
import XX59Headphone from "../../assets/shared/desktop/image-xx59-headphones.jpg";
import headphoneData from "../../data.json";
import ProductCategory from "../../components/shared/ProductCategory";

const Headphones = () => {
	const productData = headphoneData.filter(
		(headphone) => headphone.productCategory === "headphones"
	);

	return (
		<ProductCategoryLayout
			layoutTitle="Headphones"
			pageTitle="Audiophile - Headphones"
		>
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
