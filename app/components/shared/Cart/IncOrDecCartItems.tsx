import React, { useState } from "react";
import {
	incrementCount,
	decrementCount,
	selectValue,
} from "../../../store/reducers/IncOrDecrementCount";
import { useDispatch, useSelector } from "react-redux";

interface Props {
	itemQuantity?: number;
}

const IncOrDecCartItems = ({ itemQuantity }: Props) => {
	const dispatch = useDispatch();
	const itemCount = useSelector(selectValue);

	return (
		<div className="bg-darkGrey w-[120px] h-[53px] flex items-center justify-center px-[15px]">
			<p
				className="font-bold text-black text-[2em] opacity-25 leading-[18px] mr-auto hover:text-primary hover:opacity-100 hover:cursor-pointer"
				onClick={() => itemCount > 1 && dispatch(decrementCount())}
			>
				&#8722;
			</p>
			<p className="mr-auto text-[1.7em] font-bold leading-[18px] tracking-[1px]">
				{itemQuantity ?? itemCount}
			</p>
			<p
				className="font-bold text-black text-[2em] opacity-25 leading-[18px] hover:text-primary hover:opacity-100 hover:cursor-pointer"
				onClick={() => dispatch(incrementCount())}
			>
				&#43;
			</p>
		</div>
	);
};

export default IncOrDecCartItems;
