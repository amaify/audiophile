import React, { useState } from "react";
import Image from "next/image";
import CartIcon from "../../../assets/shared/desktop/icon-cart.svg";
import CartItems from "./CartItems";

const Cart = () => {
	const [showCart, setShowCart] = useState<boolean>(false);

	return (
		<div className="relative">
			<div onClick={() => setShowCart((prevState) => !prevState)}>
				<Image
					src={CartIcon}
					alt="A shopping Cart"
					layout="fixed"
					className="hover:cursor-pointer"
				/>
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
