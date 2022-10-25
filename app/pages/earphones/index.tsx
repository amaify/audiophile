import React from "react";
import ProductCategoryLayout from "../../components/layout/ProductCategoryLayout";
import ProductCategory from "../../components/shared/ProductCategory";
import YX1Earphone from "../../assets/product-yx1-earphones/desktop/image-product.jpg";
import allData from "../../data.json";

const Earphones = () => {
	const productData = allData.filter(
		(data) => data.productCategory === "earphones"
	);

	return (
		<ProductCategoryLayout layoutTitle="Earphones">
			<section className="w-full flex flex-col gap-[160px]">
				{productData.map((data) => {
					return (
						<ProductCategory
							key={data.slug}
							productSlug={data.slug}
							productDescription={data.productDescription}
							productImage={YX1Earphone}
							productTitle={data.productTitle}
						/>
					);
				})}
			</section>
		</ProductCategoryLayout>
	);
};

export default Earphones;
