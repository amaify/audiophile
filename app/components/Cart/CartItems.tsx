import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import IncOrDecCartItems from "./IncOrDecCartItems";
import { removeAllItems, selectCart } from "@/store/reducers/cartReducer";
import { formatPrice, itemPriceSum } from "@/components/util/utils";

const CartItems = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector(selectCart);

  return (
    <div className="bg-white flex flex-col py-[31px] pr-[31px] pl-[33px] rounded-lg w-[425px] [ cart-items ]">
      <div className="mb-[32px] flex">
        <h6 className="mr-auto [ heading-6 ] font-bold">{`cart (${cart.length})`}</h6>
        <p
          className="[ body-text ] text-black opacity-50 capitalize hover: cursor-pointer underline hover:text-primary hover:opacity-100"
          onClick={() => cart.length > 0 && dispatch(removeAllItems())}
        >
          remove all
        </p>
      </div>

      <div className="mb-[32px] flex flex-col gap-[24px]">
        {cart.length > 0 ? (
          cart.map((item) => (
            <div className="flex items-center" key={item.id}>
              <div className="flex items-center gap-[16px] mr-auto">
                <Image src={item.cartImage} alt={item.title} width={84} height={84} className="rounded-[8px]" />
                <div>
                  <p className="[ body-text ] text-black font-bold uppercase">{item.title}</p>
                  <p className="[ body-text ] text-black font-bold opacity-50">{formatPrice(item.price)}</p>
                </div>
              </div>
              <IncOrDecCartItems itemQuantity={item.itemCount} itemId={item.id} isCartVisible={true} />
            </div>
          ))
        ) : (
          <p className="[ body-text ] text-center">Your cart is empty!</p>
        )}
      </div>

      <div className="flex mb-[24px]">
        <p className="mr-auto [ body-text ] text-black opacity-50 uppercase">total</p>
        <p className="[ body-text ] text-black">{formatPrice(itemPriceSum(cart))}</p>
      </div>
      <Link href="/checkout">
        <a className="bg-primary hover:bg-primaryHover text-white text-center w-full py-[15px] font-bold [ phile-btn ]">
          checkout
        </a>
      </Link>
    </div>
  );
};

export default CartItems;
