import React, { useState } from "react";
import {
	incrementCount,
	decrementCount,
	selectValue,
} from "../../../store/reducers/IncOrDecrementCount";
import { useDispatch, useSelector } from "react-redux";
import {
	removeFromCart,
	incrementCartCount,
	decrementCartCount,
} from "../../../store/reducers/addItemToCart";
import { TrashIcon } from "@heroicons/react/24/solid";

interface Props {
	itemQuantity: number;
	isCartVisible: boolean;
	itemId?: number;
}

const IncOrDecCartItems = ({ itemQuantity, itemId, isCartVisible }: Props) => {
	const dispatch = useDispatch();
	const itemCount = useSelector(selectValue);

	return (
		<div className="bg-darkGrey w-[120px] h-[53px] flex items-center justify-center px-[15px]">
			<p
				className="font-bold text-black text-[2em] opacity-25 leading-[18px] mr-auto hover:text-primary hover:opacity-100 hover:cursor-pointer"
				onClick={() =>
					!isCartVisible
						? itemCount > 1 && dispatch(decrementCount())
						: itemQuantity > 1 && dispatch(decrementCartCount(itemId ?? 0))
				}
			>
				{!isCartVisible ? (
					<span>&#8722;</span>
				) : itemQuantity > 1 ? (
					<span>&#8722;</span>
				) : (
					<span onClick={() => dispatch(removeFromCart(itemId ? itemId : 0))}>
						<TrashIcon className="w-7 h-7 text-black hover:fill-primary" />
					</span>
				)}
			</p>
			<p className="mr-auto text-[1.7em] font-bold leading-[18px] tracking-[1px]">
				{itemQuantity}
			</p>
			<p
				className="font-bold text-black text-[2em] opacity-25 leading-[18px] hover:text-primary hover:opacity-100 hover:cursor-pointer"
				onClick={() =>
					!isCartVisible
						? dispatch(incrementCount())
						: dispatch(incrementCartCount(itemId ?? 0))
				}
			>
				&#43;
			</p>
		</div>
	);
};

export default IncOrDecCartItems;
