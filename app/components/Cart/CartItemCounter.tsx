import React from "react";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { TrashIcon } from "@heroicons/react/24/solid";
import { decrementCount, incrementCount, selectItemCount } from "@/store/reducers/IncOrDecrementCount";
import { CartItem, decrementCartCount, incrementCartCount, removeFromCart } from "@/store/reducers/cartReducer";

interface Props {
  addedStyle: string;
  cartItem?: CartItem;
  handleButtonClick?: () => void;
  showAddToCartBtn?: boolean;
}

const CartItemCounter = ({ addedStyle, cartItem, handleButtonClick, showAddToCartBtn }: Props) => {
  const dispatch = useDispatch();
  const itemCount = useSelector(selectItemCount);

  const incrementCountAction = () => {
    if (cartItem) {
      dispatch(incrementCartCount(cartItem.id));
      return;
    }

    if (!cartItem) dispatch(incrementCount());
  };

  const decrementCountAction = () => {
    if (cartItem && cartItem.itemCount > 1) {
      dispatch(decrementCartCount(cartItem.id));
      return;
    }

    if (!cartItem && itemCount > 1) dispatch(decrementCount());
  };

  const decrementCountBtn = () => {
    let decrementCountText = <span>&#8722;</span>;

    if (cartItem && cartItem.itemCount === 1)
      decrementCountText = (
        <span onClick={() => dispatch(removeFromCart(cartItem.id))}>
          <TrashIcon className="w-7 h-7 text-black/25 hover:fill-primary" />
        </span>
      );

    return decrementCountText;
  };

  return (
    <div className="flex gap-[1.6rem]">
      <div className={clsx("bg-darkGrey flex items-center justify-center px-[15px]", addedStyle)}>
        <button
          className="font-bold text-black/25 text-[2rem] leading-[1.8rem] mr-auto hover:text-primary/100 hover:cursor-pointer disabled:hover:text-black/25 disabled:hover:cursor-not-allowed"
          disabled={!cartItem ? itemCount === 1 : false}
          onClick={decrementCountAction}
        >
          {decrementCountBtn()}
        </button>
        <p className="mr-auto text-[1.3rem] font-bold leading-[18px] tracking-[1px]">
          {cartItem ? cartItem.itemCount : itemCount}
        </p>
        <button
          className="font-bold text-black text-[2em] opacity-25 leading-[18px] hover:text-primary hover:opacity-100 hover:cursor-pointer"
          onClick={incrementCountAction}
        >
          &#43;
        </button>
      </div>

      {showAddToCartBtn && (
        <button
          className="[ phile-btn phile-btn-1 !h-[4.8rem] ]"
          onClick={() => {
            if (handleButtonClick) {
              handleButtonClick();
              toast.success("Item successfully added");
            }
          }}
        >
          add to cart
        </button>
      )}
    </div>
  );
};

export default CartItemCounter;
