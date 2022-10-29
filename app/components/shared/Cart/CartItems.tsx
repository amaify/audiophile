import React from "react";
import Image from "next/image";
import IncOrDecCartItems from "./IncOrDecCartItems";
import XX99MarkTwoHeadphone from "../../../assets/cart/image-xx99-mark-two-headphones.jpg";
import XX59Headphone from "../../../assets/cart/image-xx59-headphones.jpg";
import YX1Earphones from "../../../assets/cart/image-yx1-earphones.jpg";
import Link from "next/link";
import CartData from "./data.json";
import { formatPrice, itemPriceSum } from "../utils";

const CartItems = () => {
	const cartItems = CartData;

	return (
		<div className="bg-white flex flex-col py-[31px] pr-[31px] pl-[33px] rounded-lg w-[425px] [ cart-items ]">
			<div className="mb-[32px] flex">
				<h6 className="mr-auto [ heading-6 ] font-bold">{`cart (${cartItems.length})`}</h6>
				<p className="[ body-text ] text-black opacity-50 capitalize hover: cursor-pointer underline">
					remove all
				</p>
			</div>

			<div className="mb-[32px] flex flex-col gap-[24px]">
				{cartItems.map((item) => {
					let itemImage = XX99MarkTwoHeadphone;
					if (item.itemTitle === "xx59") itemImage = XX59Headphone;
					if (item.itemTitle === "yx1") itemImage = YX1Earphones;
					return (
						<div className="flex items-center" key={item.itemTitle}>
							<div className="flex items-center gap-[16px] mr-auto">
								<Image
									src={itemImage}
									alt="XX99 Mark Two Headphones"
									width={84}
									height={84}
									className="rounded-[8px]"
								/>
								<div>
									<p className="[ body-text ] text-black font-bold uppercase">
										{item.itemTitle}
									</p>
									<p className="[ body-text ] text-black font-bold opacity-50">
										{formatPrice(item.price)}
									</p>
								</div>
							</div>
							<IncOrDecCartItems itemQuantity={item.quantity} />
						</div>
					);
				})}
			</div>

			<div className="flex mb-[24px]">
				<p className="mr-auto [ body-text ] text-black opacity-50 uppercase">
					total
				</p>
				<p className="[ body-text ] text-black">
					{formatPrice(itemPriceSum(cartItems))}
				</p>
			</div>
			<Link href="/checkout">
				<a className="bg-primary hover:bg-primaryHover text-white text-center w-full py-[15px] font-bold [ phile-btn ]">
					checkout
				</a>
			</Link>
		</div>
	);
};

export default CartItems;
