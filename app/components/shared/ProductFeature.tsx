import React from "react";

interface Props {
	productDetails: any;
}

const productFeature = ({ productDetails }: Props) => {
	return (
		<div className="flex gap-[125px] mb-lg">
			<div className="w-[50.5%]">
				<h3 className="[ heading-3 ] mb-[32px]">features</h3>
				<p className="[ body-text ] text-black opacity-50">
					<span className="block mb-[16px]">
						{productDetails?.productFeatures["para-1"]}
					</span>
					<span>{productDetails?.productFeatures["para-2"]}</span>
				</p>
			</div>

			<div>
				<h3 className="[ heading-3 ] mb-[32px]">in the box</h3>
				<ul>
					{productDetails?.productBoxContent.map((boxContent: any) => (
						<li
							className="[ body-text ] mb-[8px] text-black"
							key={boxContent.content}
						>
							<span className="text-primary font-bold mr-[21px] opacity-100">
								{boxContent.quantity}
							</span>
							<span className="opacity-50 capitalize">
								{boxContent.content}
							</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default productFeature;
