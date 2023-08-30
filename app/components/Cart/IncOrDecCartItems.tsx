import React from "react";
import clsx from "clsx";

interface Props {
  itemQuantity: number;
  addedStyle: string;
  decrementCountBtnText: JSX.Element;
  incrementAction: () => {
    payload: string | undefined;
    type: string;
  };
  decrementAction: () => {
    payload: string | undefined;
    type: string;
  } | null;
  isDecrementBtnDisabled?: boolean;
}

const IncOrDecCartItems = ({
  itemQuantity,
  addedStyle,
  isDecrementBtnDisabled,
  incrementAction,
  decrementAction,
  decrementCountBtnText
}: Props) => {
  return (
    <div className={clsx("bg-darkGrey flex items-center justify-center px-[15px]", addedStyle)}>
      <button
        className="font-bold text-black/25 text-[2rem] leading-[1.8rem] mr-auto hover:text-primary/100 hover:cursor-pointer disabled:hover:text-black/25 disabled:hover:cursor-not-allowed"
        disabled={isDecrementBtnDisabled}
        onClick={() => decrementAction()}
      >
        {decrementCountBtnText}
      </button>
      <p className="mr-auto text-[1.3rem] font-bold leading-[18px] tracking-[1px]">{itemQuantity}</p>
      <button
        className="font-bold text-black text-[2em] opacity-25 leading-[18px] hover:text-primary hover:opacity-100 hover:cursor-pointer"
        onClick={() => incrementAction()}
      >
        &#43;
      </button>
    </div>
  );
};

export default IncOrDecCartItems;
