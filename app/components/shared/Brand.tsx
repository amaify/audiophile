import React from "react";
import Image from "next/image";
import Link from "next/link";
import BrandLogo from "../../assets/shared/desktop/logo.svg";

const Brand = () => {
	return (
		<div className="mr-auto hover: cursor-pointer">
			<Link href="/">
				<div>
					<Image
						src={BrandLogo}
						alt="Brand Logo of Audiophile"
						layout="fixed"
					/>
				</div>
			</Link>
		</div>
	);
};

export default Brand;
