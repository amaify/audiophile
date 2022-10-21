import React from "react";
import Navigation from "./shared/Navigation";
import { Meta } from "./shared/Meta";
import Button from "./shared/Button";

const Hero = () => {
	return (
		<div className="[ hero ] relative">
			<Meta pageTitle="Audiophile - Home" />
			<div className="px-[175px]">
				<Navigation detailsPage={false} />

				<div className="w-[398px] absolute top-[30%] left-[175px]">
					<p className="[ overline-text ] text-white opacity-50 mb-[24px]">
						new product
					</p>
					<h1 className="[ heading-1 ] text-white mb-[24px]">
						<span className="block">xx99 mark ii</span>
						<span>headphones</span>
					</h1>
					<p className="[ body-text ] text-white opacity-75 w-[90%] mb-[40px]">
						Experience natural, lifelike audio and exceptional build quality
						made for the passionate music enthusiast.
					</p>
					<Button btnText="see product" btnType={1} to="headphones/xx99" />
				</div>
			</div>
		</div>
	);
};

export default Hero;
