import React, { useState } from "react";

interface Props {
	itemQuantity?: number;
}

const IncOrDecCartItems = ({ itemQuantity }: Props) => {
	const [productQuantity, setProductQuantity] = useState<number>(
		itemQuantity ?? 1
	);
	return (
		<div className="bg-darkGrey w-[120px] h-[53px] flex items-center justify-center px-[15px]">
			<p
				className="font-bold text-black text-[2em] opacity-25 leading-[18px] mr-auto hover:text-primary hover:opacity-100 hover:cursor-pointer"
				onClick={() =>
					setProductQuantity((prevState) =>
						prevState === 1 ? 1 : prevState - 1
					)
				}
			>
				&#8722;
			</p>
			<p className="mr-auto text-[1.7em] font-bold leading-[18px] tracking-[1px]">
				{productQuantity}
			</p>
			<p
				className="font-bold text-black text-[2em] opacity-25 leading-[18px] hover:text-primary hover:opacity-100 hover:cursor-pointer"
				onClick={() => setProductQuantity((prevState) => prevState + 1)}
			>
				&#43;
			</p>
		</div>
	);
};

export default IncOrDecCartItems;
