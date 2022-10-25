import React from "react";
import { Meta } from "../shared/Meta";
import Navigation from "../shared/Navigation";
import Footer from "../shared/Footer";
import ProductThumbnails from "../shared/ProductThumbnails";
import SubFooter from "../shared/SubFooter";

interface Props {
	children: React.ReactNode;
	pageTitle: string;
}

const ProductDetailsLayout = ({ children, pageTitle }: Props) => {
	return (
		<section>
			<Meta pageTitle={pageTitle} />

			<div className="bg-black h-[97px] px-xl">
				<Navigation detailsPage={true} />
			</div>

			<div className="px-xl mt-[79px] mb-lg">{children}</div>

			<section className="mb-lg px-xl">
				<ProductThumbnails />
			</section>

			<SubFooter />
			<Footer />
		</section>
	);
};

export default ProductDetailsLayout;
