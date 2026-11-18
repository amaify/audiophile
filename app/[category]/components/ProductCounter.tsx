import type { ReactNode } from "react";
import clsx from "clsx";
import { cn } from "@/helpers/cn";
import { buttonVariants } from "@/components/shared/Button";

interface Props {
  decrementCountBtn: ReactNode;
  addedStyle: string;
  itemCount: number;
  isDisabled?: boolean;
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
  isDisabled,
  incrementCount,
  decrementCount,
  onAddToCart
}: Props) {
  return (
    <div className="flex gap-[1.6rem]">
      <div className={clsx("bg-dark-grey flex items-center justify-center px-6", addedStyle)}>
        <button
          className="font-bold text-black/25 text-[2rem] leading-[1.8rem] mr-auto hover:text-primary hover:cursor-pointer disabled:hover:text-black/25 disabled:hover:cursor-not-allowed"
          disabled={isDisabled}
          onClick={decrementCount}
        >
          {decrementCountBtn}
        </button>
        <p className="mr-auto text-[1.3rem] font-bold leading-4.5 tracking-[1px]">{itemCount}</p>
        <button
          className="font-bold text-black text-[2rem] opacity-25 leading-4.5 hover:text-primary hover:opacity-100 hover:cursor-pointer"
          onClick={incrementCount}
        >
          &#43;
        </button>
      </div>

      {variant === "product" && (
        <button className={cn(buttonVariants(), "lg:h-[4.8rem]")} onClick={onAddToCart}>
          add to cart
        </button>
      )}
    </div>
  );
}
