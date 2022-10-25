import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import ProductDetailsLayout from "../../components/layout/ProductDetailsLayout";
import MarkOneHeadphone from "../../assets/shared/desktop/image-xx99-mark-one-headphones.jpg";
import MarkTwoHeadphone from "../../assets/shared/desktop/image-xx99-mark-two-headphones.jpg";
import XX59Headphone from "../../assets/shared/desktop/image-xx59-headphones.jpg";
import AllData from "../../data.json";

//GALLARY IMAGES
import XX99MarkOneGallaryOne from "../../assets/product-xx99-mark-one-headphones/desktop/image-gallery-1.jpg";
import XX99MarkOneGallaryTwo from "../../assets/product-xx99-mark-one-headphones/desktop/image-gallery-2.jpg";
import XX99MarkOneGallaryThree from "../../assets/product-xx99-mark-one-headphones/desktop/image-gallery-3.jpg";

import XX99MarkTwoGallaryOne from "../../assets/product-xx99-mark-two-headphones/desktop/image-gallery-1.jpg";
import XX99MarkTwoGallaryTwo from "../../assets/product-xx99-mark-two-headphones/desktop/image-gallery-2.jpg";
import XX99MarkTwoGallaryThree from "../../assets/product-xx99-mark-two-headphones/desktop/image-gallery-3.jpg";

import XX59GallaryImageOne from "../../assets/product-xx59-headphones/desktop/image-gallery-1.jpg";
import XX59GallaryImageTwo from "../../assets/product-xx59-headphones/desktop/image-gallery-2.jpg";
import XX59GallaryImageThree from "../../assets/product-xx59-headphones/desktop/image-gallery-3.jpg";

const HeadphoneDetails = () => {
	const router = useRouter();
	const { slug } = router.query;

	const productDetails = AllData.find((data) => data.slug === slug);

	let productImage = MarkOneHeadphone;
	if (productDetails?.productTitle === "xx99 mark ii headphones")
		productImage = MarkTwoHeadphone;
	if (productDetails?.productTitle === "xx59 headphones")
		productImage = XX59Headphone;

	let imageGallary = [
		XX59GallaryImageOne,
		XX59GallaryImageTwo,
		XX59GallaryImageThree,
	];
	if (productDetails?.productTitle === "xx99 mark ii headphones")
		imageGallary = [
			XX99MarkTwoGallaryOne,
			XX99MarkTwoGallaryTwo,
			XX99MarkTwoGallaryThree,
		];

	if (productDetails?.productTitle === "xx99 mark i headphones")
		imageGallary = [
			XX99MarkOneGallaryOne,
			XX99MarkOneGallaryTwo,
			XX99MarkOneGallaryThree,
		];

	const formattedNumber = new Intl.NumberFormat("en-GB", {
		style: "currency",
		currency: "GBP",
	}).format(productDetails ? +productDetails.productPrice : 0);

	return (
		<ProductDetailsLayout pageTitle={productDetails?.productTitle ?? ""}>
			<div>
				<button
					className="[ body-text ] opacity-50 capitalize  hover:text-primary mb-[56px]"
					onClick={() => router.back()}
				>
					go back
				</button>

				<div className="flex gap-[125px] mb-lg">
					<div className="w-1/2">
						<Image
							src={productImage}
							alt={`${productDetails?.productTitle} Image`}
							className="rounded-lg"
						/>
					</div>

					<div className="w-[35%] self-center">
						<p className="[ overline-text ] text-primary mb-[16px]">
							new product
						</p>
						<h2 className="[ heading-2 ] mb-[32px]">
							{productDetails?.productTitle}
						</h2>
						<p className="[ body-text ] opacity-50 mb-[32px]">
							{productDetails?.productDescription}
						</p>
						<h6 className="[ heading-6 ] mb-[47px]">{formattedNumber}</h6>
						<div className="flex gap-[16px]">
							<div className="bg-darkGrey w-[120px] h-[53px] flex items-center justify-center px-[15px]">
								<p className="font-bold text-black text-[2em] opacity-25 leading-[18px] mr-auto hover:text-primary hover:opacity-100 hover:cursor-pointer">
									&#8722;
								</p>
								<p className="mr-auto text-[1.7em] font-bold leading-[18px] tracking-[1px]">
									1
								</p>
								<p className="font-bold text-black text-[2em] opacity-25 leading-[18px] hover:text-primary hover:opacity-100 hover:cursor-pointer">
									&#43;
								</p>
							</div>
							<button className="[ phile-btn phile-btn-1 ]">add to cart</button>
						</div>
					</div>
				</div>

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
							{productDetails?.productBoxContent.map((boxContent) => (
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

				<div className="flex gap-[30px] w-full">
					<div className="flex flex-col gap-[32px] w-[35%] relative">
						<Image
							src={imageGallary[0]}
							alt="Image Gallery"
							className="rounded-lg"
							objectFit="cover"
						/>

						<Image
							src={imageGallary[1]}
							alt="Image Gallery"
							className="rounded-lg"
							objectFit="cover"
						/>
					</div>

					<div className="w-[65%] relative">
						<Image
							src={imageGallary[2]}
							alt="Image Gallery"
							className="rounded-lg"
							layout="fill"
							objectFit="cover"
						/>
					</div>
				</div>
			</div>
		</ProductDetailsLayout>
	);
};

export default HeadphoneDetails;
