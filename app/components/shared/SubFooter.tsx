import React from "react";

const SubFooter = () => {
	return (
		<div className="mb-xl flex px-xl gap-[30px]">
			<div className="w-1/2 mr-auto self-center">
				<h2 className="[ heading-2 ] mb-[32px]">
					<span className="block">bringing you the</span>
					<span>
						<span className="text-primary">best</span> audio gear
					</span>
				</h2>
				<p className="[ body-text ] opacity-50 w-[58%]">
					Located at the heart of New York City, Audiophile is the premier store
					for high end headphones, earphones, speakers, and audio accessories.
					We have a large showroom and luxury demonstration rooms available for
					you to browse and experience a wide range of our products. Stop by our
					store to meet some of the fantastic people who make Audiophile the
					best place to buy your portable audio equipment.
				</p>
			</div>
			<div className="w-[1/2] [ test-img ] h-[600px]"></div>
		</div>
	);
};

export default SubFooter;
