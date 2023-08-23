import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TrashIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { removeFromCart, incrementCartCount, decrementCartCount } from "../../store/reducers/cartReducer";
import { incrementCount, decrementCount, selectItemCount } from "../../store/reducers/IncOrDecrementCount";

interface Props {
  itemQuantity: number;
  isCartVisible: boolean;
  addedStyle: string;
  itemId?: string;
}

const IncOrDecCartItems = ({ itemQuantity, itemId, isCartVisible, addedStyle }: Props) => {
  const dispatch = useDispatch();
  const itemCount = useSelector(selectItemCount);

  const minusText = <span>&#8722;</span>;
  let decrementCountText = minusText;

  if (isCartVisible) {
    decrementCountText =
      itemQuantity > 1 ? (
        minusText
      ) : (
        <span onClick={() => dispatch(removeFromCart(itemId ?? ""))}>
          <TrashIcon className="w-7 h-7 text-black hover:fill-primary" />
        </span>
      );
  }

  return (
    <div className={clsx("bg-darkGrey flex items-center justify-center px-[15px]", addedStyle)}>
      <button
        className="font-bold text-black text-[2em] opacity-25 leading-[18px] mr-auto hover:text-primary hover:opacity-100 hover:cursor-pointer"
        onClick={() =>
          !isCartVisible
            ? itemCount > 1 && dispatch(decrementCount())
            : itemQuantity > 1 && dispatch(decrementCartCount(itemId ?? ""))
        }
      >
        {decrementCountText}
      </button>
      <p className="mr-auto text-[1.3rem] font-bold leading-[18px] tracking-[1px]">{itemQuantity}</p>
      <button
        className="font-bold text-black text-[2em] opacity-25 leading-[18px] hover:text-primary hover:opacity-100 hover:cursor-pointer"
        onClick={() => (!isCartVisible ? dispatch(incrementCount()) : dispatch(incrementCartCount(itemId ?? "")))}
      >
        &#43;
      </button>
    </div>
  );
};

export default IncOrDecCartItems;
