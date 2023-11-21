import React, { ReactNode } from "react";
import clsx from "clsx";

interface Props {
  decrementCountBtn: ReactNode;
  addedStyle: string;
  itemCount: number;
  variant?: "product" | "cart";
  incrementCount: () => void;
  decrementCount: () => void;
  onAddToCart?: () => void;
}

export default function CartItemCounter({
  addedStyle,
  decrementCountBtn,
  variant,
  itemCount,
  incrementCount,
  decrementCount,
  onAddToCart
}: Props) {
  return (
    <div className="flex gap-[1.6rem]">
      <div className={clsx("bg-darkGrey flex items-center justify-center px-[1.5rem]", addedStyle)}>
        <button
          className="font-bold text-black/25 text-[2rem] leading-[1.8rem] mr-auto hover:text-primary/100 hover:cursor-pointer disabled:hover:text-black/25 disabled:hover:cursor-not-allowed"
          disabled={false}
          onClick={decrementCount}
        >
          {decrementCountBtn}
        </button>
        <p className="mr-auto text-[1.3rem] font-bold leading-[18px] tracking-[1px]">{itemCount}</p>
        <button
          className="font-bold text-black text-[2rem] opacity-25 leading-[18px] hover:text-primary hover:opacity-100 hover:cursor-pointer"
          onClick={incrementCount}
        >
          &#43;
        </button>
      </div>

      {variant === "product" && (
        <button className="[ phile-btn phile-btn-1 !h-[4.8rem] ]" onClick={onAddToCart}>
          add to cart
        </button>
      )}
    </div>
  );
}
