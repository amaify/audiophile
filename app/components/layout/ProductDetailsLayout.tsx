import React from "react";
import { Meta } from "../shared/Meta";
import Navigation from "../shared/Navigation";
import Footer from "../shared/Footer";
import ProductThumbnails from "../shared/ProductThumbnails";
import SubFooter from "../shared/SubFooter";

interface Props {
	children: React.ReactNode;
	pageTitle: string;
	removeSubFooter: boolean;
}

const ProductDetailsLayout = ({
	children,
	pageTitle,
	removeSubFooter,
}: Props) => {
	return (
		<section>
			<Meta pageTitle={pageTitle} />

			<div className="bg-black h-[97px] px-xl relative z-50">
				<Navigation removeHero={true} />
			</div>

			<div className="px-xl mt-[79px] mb-lg">{children}</div>

			{!removeSubFooter && (
				<>
					<div className="mb-lg px-xl">
						<ProductThumbnails />
					</div>

					<SubFooter />
				</>
			)}
			<Footer />
		</section>
	);
};

export default ProductDetailsLayout;
