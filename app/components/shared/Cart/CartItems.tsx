import React from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import IncOrDecCartItems from "./IncOrDecCartItems";
import XX99MarkTwoHeadphone from "../../../assets/cart/image-xx99-mark-two-headphones.jpg";
import XX59Headphone from "../../../assets/cart/image-xx59-headphones.jpg";
import YX1Earphones from "../../../assets/cart/image-yx1-earphones.jpg";
import Link from "next/link";
import { formatPrice, itemPriceSum } from "../utils";
import {
	removeAllItems,
	selectValue,
} from "../../../store/reducers/addItemToCart";

const CartItems = () => {
	const dispatch = useDispatch();
	const { cart } = useSelector(selectValue);

	return (
		<div className="bg-white flex flex-col py-[31px] pr-[31px] pl-[33px] rounded-lg w-[425px] [ cart-items ]">
			<div className="mb-[32px] flex">
				<h6 className="mr-auto [ heading-6 ] font-bold">{`cart (${cart.length})`}</h6>
				<p
					className="[ body-text ] text-black opacity-50 capitalize hover: cursor-pointer underline"
					onClick={() => dispatch(removeAllItems())}
				>
					remove all
				</p>
			</div>

			<div className="mb-[32px] flex flex-col gap-[24px]">
				{cart.length > 0 ? (
					cart.map((item) => {
						let itemImage = XX99MarkTwoHeadphone;
						if (item.title.includes("xx59")) itemImage = XX59Headphone;
						if (item.title.includes("yx1")) itemImage = YX1Earphones;

						return (
							<div className="flex items-center" key={item.id}>
								<div className="flex items-center gap-[16px] mr-auto">
									<Image
										src={itemImage}
										alt={item.title}
										width={84}
										height={84}
										className="rounded-[8px]"
									/>
									<div>
										<p className="[ body-text ] text-black font-bold uppercase">
											{item.title.substring(0, 5)}
										</p>
										<p className="[ body-text ] text-black font-bold opacity-50">
											{formatPrice(item.price)}
										</p>
									</div>
								</div>
								<IncOrDecCartItems
									itemQuantity={item.itemCount}
									itemId={item.id}
									isCartVisible={true}
								/>
							</div>
						);
					})
				) : (
					<p className="[ body-text ] text-center">Please add Items!</p>
				)}
			</div>

			<div className="flex mb-[24px]">
				<p className="mr-auto [ body-text ] text-black opacity-50 uppercase">
					total
				</p>
				<p className="[ body-text ] text-black">
					{formatPrice(itemPriceSum(cart))}
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
