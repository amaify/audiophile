import React, { useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import CartIcon from "../../../assets/shared/desktop/icon-cart.svg";
import CartItems from "./CartItems";
import { selectValue } from "../../../store/reducers/addItemToCart";

const Cart = () => {
	const [showCart, setShowCart] = useState<boolean>(false);
	const { cart } = useSelector(selectValue);

	return (
		<div className="relative">
			<div
				className="relative"
				onClick={() => setShowCart((prevState) => !prevState)}
			>
				<Image
					src={CartIcon}
					alt="A shopping Cart"
					layout="fixed"
					className="hover:cursor-pointer"
				/>
				{cart.length > 0 && (
					<p className="w-9 h-9 bg-primary text-white absolute -top-[50%] left-[50%] text-center rounded-full">
						<span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 [ body-text ] font-bold">
							{cart.length}
						</span>
					</p>
				)}
			</div>

			{showCart && (
				<>
					<div
						className="[ cart-backdrop ]"
						onClick={() => setShowCart((prevState) => !prevState)}
					></div>
					<CartItems />
				</>
			)}
		</div>
	);
};

export default Cart;
