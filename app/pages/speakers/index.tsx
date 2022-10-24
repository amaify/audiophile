import React from "react";
import ProductCategoryLayout from "../../components/layout/ProductCategoryLayout";
import ZX7Speaker from "../../assets/shared/desktop/image-zx7-speaker.jpg";
import ZX9Speaker from "../../assets/shared/desktop/image-zx9-speaker.jpg";
import speakerData from "../../data.json";
import ProductCategory from "../../components/shared/ProductCategory";

const Speakers = () => {
	const productData = speakerData.filter(
		(data) => data.productCategory === "speakers"
	);
	return (
		<ProductCategoryLayout
			layoutTitle="Speakers"
			pageTitle="Audiophile - Speakers"
		>
			<section className="w-full flex flex-col gap-[160px]">
				{productData.map((data) => {
					let productImage = ZX9Speaker;
					if (data.productTitle === "zx7 speaker") productImage = ZX7Speaker;

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

export default Speakers;
