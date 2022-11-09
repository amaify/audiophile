import React from "react";
import { useSelector } from "react-redux";
import { selectValue } from "../store/reducers/addItemToCart";
import { clsx } from "clsx";
import Image from "next/image";

import XX99MarkTwoHeadphone from "../assets/cart/image-xx99-mark-two-headphones.jpg";
import XX59Headphone from "../assets/cart/image-xx59-headphones.jpg";
import YX1Earphones from "../assets/cart/image-yx1-earphones.jpg";
import { formatPrice } from "./util/utils";
import { FormInput, InputError } from "../Types/FormInput";
import { validatePayButton } from "./util/utils";

interface Props {
	isDisabled: boolean;
	isError: boolean;
	setConfirmation: (value: boolean) => void;
}

const CheckoutSummary = ({ isError, isDisabled, setConfirmation }: Props) => {
	const { cart, total } = useSelector(selectValue);

	return (
		<div className="bg-white self-start px-[33px] py-[32px] w-[30%] rounded-lg">
			<h6 className="[ heading-6 ] font-bold mb-[31px]">summary</h6>
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

								<p className="[ body-text ] font-bold text-black opacity-50">{`x${item.itemCount}`}</p>
							</div>
						);
					})
				) : (
					<p className="[ body-text ] text-center">Your cart is empty</p>
				)}
			</div>

			<ul className="list-none flex flex-col gap-2 mb-[24px]">
				<li className="[ body-text ] flex">
					<span className=" text-black font-medium leading-[25px] uppercase opacity-50 mr-auto">
						total
					</span>
					<span>{formatPrice(total)}</span>
				</li>
				<li className="[ body-text ] flex">
					<span className=" text-black font-medium leading-[25px] uppercase opacity-50 mr-auto">
						shipping
					</span>
					<span>{formatPrice(50)}</span>
				</li>
				<li className="[ body-text ] flex">
					<span className=" text-black font-medium leading-[25px] uppercase opacity-50 mr-auto">
						VAT (Included)
					</span>
					<span>{formatPrice(1079)}</span>
				</li>
			</ul>

			<p className="[ body-text ] flex mb-[32px]">
				<span className="text-black font-medium leading-[25px] uppercase opacity-50 mr-auto">
					Grand Total
				</span>
				<span>{formatPrice(total)}</span>
			</p>

			<button
				className={clsx(
					"inline-block bg-primary hover:bg-primaryHover text-white text-center w-full py-[15px] font-bold [ phile-btn ]",
					(!isDisabled || isError) &&
						"disabled:bg-gray-300 disabled:cursor-not-allowed"
				)}
				onClick={() => setConfirmation(true)}
				disabled={!isDisabled || isError}
			>
				Continue and Pay
			</button>
		</div>
	);
};

export default CheckoutSummary;
