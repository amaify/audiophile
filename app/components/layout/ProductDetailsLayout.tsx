import React from "react";
import { Meta } from "../shared/Meta";
import Navigation from "../shared/Navigation";
import Footer from "../shared/Footer";

interface Props {
	children: React.ReactNode;
}

const ProductDetailsLayout = ({ children }: Props) => {
	return (
		<div className="">
			<Meta pageTitle="XX99 MARK II HEADPONES" />
			<div className="bg-black h-[97px] px-[165px]">
				<Navigation detailsPage={true} />
			</div>
			{children}
			<Footer />
		</div>
	);
};

export default ProductDetailsLayout;
