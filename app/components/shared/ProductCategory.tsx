import React from "react";
import Image, { StaticImageData } from "next/image";
import Button from "./Button";

interface Props {
	productImage: any;
	productTitle: string;
	productDescription: string;
	productSlug: string;
}

const ProductCategory = ({
	productImage,
	productTitle,
	productDescription,
	productSlug,
}: Props) => {
	return (
		<div className="flex gap-[175px] even:flex-row-reverse">
			<div className="w-[50%]">
				<Image src={productImage} alt={productTitle} className="rounded-lg" />
			</div>
			<div className="w-[35%] self-center">
				<p className="[ overline-text ] text-primary mb-[16px]">new product</p>
				<h2 className="[ heading-2 ] mb-[32px]">{productTitle}</h2>
				<p className="[ body-text ] opacity-50 mb-[40px]">
					{productDescription}
				</p>
				<Button
					btnText="see product"
					btnType={1}
					to={`/headphones/${productSlug}`}
				/>
			</div>
		</div>
	);
};

export default ProductCategory;
