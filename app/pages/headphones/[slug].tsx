import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { addToCart, selectValue } from "../../store/reducers/addItemToCart";
import { useSelector, useDispatch } from "react-redux";
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
import Button from "../../components/shared/Button";
import AddToCart from "../../components/shared/Cart/IncOrDecCartItems";
import ProductFeature from "../../components/shared/ProductFeature";
import { formatPrice } from "../../components/shared/utils";
import { RootState } from "../../store/store";

const HeadphoneDetails = () => {
	const router = useRouter();
	const { slug } = router.query;
	const dispatch = useDispatch();
	const cartState = useSelector(selectValue);

	const [shuffledArray, setShuffledArray] = useState<any>([]);

	const productDetails = AllData.find((data) => data.slug === slug);

	const shuffleArray = () => {
		const newArray = AllData.filter(
			(data) => data.productTitle !== productDetails?.productTitle
		);

		for (let i = newArray.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			const temp = newArray[i];
			newArray[i] = newArray[j];
			newArray[j] = temp;
		}
		return newArray.slice(0, 3);
	};

	useEffect(() => setShuffledArray(shuffleArray()), []);

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

	return (
		<ProductDetailsLayout pageTitle={productDetails?.productTitle ?? ""}>
			{productDetails && (
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
							<h6 className="[ heading-6 ] mb-[47px]">
								{formatPrice(productDetails ? +productDetails.productPrice : 0)}
							</h6>
							<div className="flex gap-[16px]">
								<AddToCart />
								<button
									className="[ phile-btn phile-btn-1 ]"
									onClick={() =>
										dispatch(
											addToCart({
												title: productDetails.productTitle,
												price: productDetails.productPrice,
												quantity: 1,
												totalPrice: productDetails.productPrice * 3,
											})
										)
									}
								>
									add to cart
								</button>
							</div>
						</div>
					</div>

					<ProductFeature productDetails={productDetails} />

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

					<div className="mt-lg mb-[250px]">
						<h3 className="[ heading-3 ] text-center mb-[64px]">
							you may also like
						</h3>
						<div className="flex gap-[30px]">
							{shuffledArray.map((item: any) => (
								<div
									className="flex flex-col items-center"
									key={item.productTitle}
								>
									<Image
										src={MarkOneHeadphone}
										alt="XX99 Mark I headphone"
										className="rounded-lg"
									/>
									<h5 className="[ heading-5 ] mt-[40px] mb-[32px]">
										{item.productTitle.split("headphones")}
									</h5>
									<Button
										btnText="see product"
										btnType={1}
										to={`/${item.productCategory}/${item.slug}`}
									/>
								</div>
							))}
						</div>
					</div>
				</div>
			)}
		</ProductDetailsLayout>
	);
};

export default HeadphoneDetails;
