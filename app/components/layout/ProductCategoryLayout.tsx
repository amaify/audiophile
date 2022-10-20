import React from "react";
import { Meta } from "../shared/Meta";
import Navigation from "../shared/Navigation";
import Footer from "../shared/Footer";

interface Props {
	children: React.ReactNode;
	pageTitle: string;
	layoutTitle: string;
}

const ProductCategoryLayout = ({ children, pageTitle, layoutTitle }: Props) => {
	return (
		<div>
			<Meta pageTitle={pageTitle} />
			<div className="bg-black h-[336px] px-[175px] relative">
				<Navigation detailsPage={false} />
				<div className="absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2">
					<h2 className="[ heading-2 ] text-white">{layoutTitle}</h2>
				</div>
			</div>
			{children}
			<Footer />
		</div>
	);
};

export default ProductCategoryLayout;
