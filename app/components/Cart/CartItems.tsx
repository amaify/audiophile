/* eslint-disable import/extensions */
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";
import { TrashIcon } from "@heroicons/react/24/solid";
import {
  decrementCartCount,
  incrementCartCount,
  removeAllItems,
  removeFromCart,
  selectCart
} from "@/store/reducers/cartReducer";
import { formatPrice, itemPriceSum } from "@/components/util/utils";
import IncOrDecCartItems from "./IncOrDecCartItems";

const CartItems = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector(selectCart);

  const checkoutDisabled = cart.length === 0;
  const incrementCount = (id: string) => dispatch(incrementCartCount(id));
  const decrementCount = (id: string, itemCount: number) => (itemCount > 1 ? dispatch(decrementCartCount(id)) : null);
  const removeFromCartAction = (id: string) => dispatch(removeFromCart(id));

  const decrementCountBtnText = (itemQuantity: number, id: string) => {
    let decrementCountText = <span>&#8722;</span>;

    if (itemQuantity === 1)
      decrementCountText = (
        <span onClick={() => removeFromCartAction(id)}>
          <TrashIcon className="w-7 h-7 text-black/25 hover:fill-primary" />
        </span>
      );

    return decrementCountText;
  };

  return (
    <div
      className={clsx(
        "bg-white flex flex-col py-[3.1rem] pr-[2.4rem] pl-[2.4rem] rounded-lg w-[32.7rem] max-h-[48.8rem] overflow-auto",
        " absolute top-[6rem] right-0 z-30",
        "lg:w-[37.7rem] md:top-[10rem] md:pr-[3.1rem] md:pl-[3.3rem]"
      )}
    >
      <div className="mb-[3.1rem] flex">
        <h6 className="mr-auto [ heading-6 ] font-bold">{`cart (${cart.length})`}</h6>
        <button
          className="[ body-text ] text-black opacity-50 capitalize border-none outline-none hover:cursor-pointer underline hover:text-primary hover:opacity-100"
          onClick={() => cart.length > 0 && dispatch(removeAllItems())}
        >
          remove all
        </button>
      </div>

      <div className="mb-[3.2rem] flex flex-col gap-[2.4rem]">
        {cart.length > 0 ? (
          cart.map((item) => (
            <div className="flex items-center" key={item.id}>
              <div className="flex items-center gap-[16px] mr-auto">
                <Image
                  src={item.cartImage}
                  alt={item.title}
                  width={64}
                  height={64}
                  className="rounded-lg w-auto h-auto"
                />
                <div>
                  <p className="text-[1.5rem] text-black font-bold uppercase">{item.title}</p>
                  <p className="text-[1.4rem] text-black/50 font-bold">{formatPrice(item.price)}</p>
                </div>
              </div>
              <IncOrDecCartItems
                itemQuantity={item.itemCount}
                incrementAction={() => incrementCount(item.id)}
                decrementAction={() => decrementCount(item.id, item.itemCount)}
                decrementCountBtnText={decrementCountBtnText(item.itemCount, item.id)}
                addedStyle="w-[9.6rem] h-[3.2rem]"
              />
            </div>
          ))
        ) : (
          <p className="[ body-text ] text-center">Your cart is empty!</p>
        )}
      </div>

      <div className="flex mb-[2.4rem]">
        <p className="mr-auto [ body-text ] text-black opacity-50 uppercase">total</p>
        <p className="[ body-text ] text-black">{formatPrice(itemPriceSum(cart))}</p>
      </div>
      <Link
        href="/checkout"
        aria-disabled={checkoutDisabled}
        className={clsx(
          "bg-primary hover:bg-primaryHover text-white text-center w-full py-[15px] font-bold [ phile-btn ]",
          checkoutDisabled && "bg-primary/40 hover:bg-primary/40 cursor-not-allowed pointer-events-none"
        )}
      >
        checkout
      </Link>
    </div>
  );
};

export default CartItems;
