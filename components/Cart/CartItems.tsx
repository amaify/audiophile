import Image from "next/image";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { TrashIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { formatPrice } from "@/helpers/FormatPrice";
import {
  CartItem,
  decrementCartItemCount,
  incrementCartItemCount,
  removeItemFromCart,
  resetCart,
  selectCart
} from "@/store/cart/CartReducer";
import ProductCounter from "../../app/[category]/components/ProductCounter";

const CartItems = () => {
  const dispatch = useDispatch();
  const { cart, total } = useSelector(selectCart);

  const checkoutDisabled = cart.length === 0;

  const decrementCountBtn = (item: CartItem) => {
    let decrementCountText = <span>&#8722;</span>;

    if (item.itemCount === 1)
      decrementCountText = (
        <span onClick={() => dispatch(removeItemFromCart(item.id))}>
          <TrashIcon className="w-7 h-7 text-black/25 hover:fill-primary" />
        </span>
      );

    return decrementCountText;
  };

  return (
    <div
      className={clsx(
        "bg-white flex flex-col py-[3.1rem] pr-[1.8rem] pl-[1.8rem] rounded-lg w-[88vw] min-w-[28rem] max-h-[49.8rem] overflow-auto",
        "absolute top-[6rem] right-0 z-30 2xs:w-[32.7rem] sm:py-[3.1rem] sm:pl-[2.4rem] sm:pr-[2.4rem]",
        "lg:w-[37.7rem] md:top-[6.7rem] md:pr-[3.1rem] md:pl-[3.3rem]"
      )}
    >
      <div className="mb-[3.1rem] flex">
        <h6 className="mr-auto [ heading-6 ] font-bold">{`cart (${cart.length})`}</h6>
        <button
          className="[ body-text ] text-black opacity-50 capitalize border-none outline-none hover:cursor-pointer underline hover:text-primary hover:opacity-100"
          onClick={() => cart.length > 0 && dispatch(resetCart())}
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
                  alt={item.cartTitle}
                  width={64}
                  height={64}
                  className="rounded-lg w-auto h-auto"
                />
                <div>
                  <p className="text-[1.3rem] text-black font-bold uppercase sm:text-[1.5rem]">{item.cartTitle}</p>
                  <p className="text-[1.2rem] text-black/50 font-bold sm:text-[1.4rem]">{formatPrice(item.price)}</p>
                </div>
              </div>
              <ProductCounter
                addedStyle="w-[9.6rem] h-[3.2rem]"
                incrementCount={() => dispatch(incrementCartItemCount(item.id))}
                decrementCount={() => dispatch(decrementCartItemCount(item.id))}
                itemCount={item.itemCount}
                decrementCountBtn={decrementCountBtn(item)}
              />
            </div>
          ))
        ) : (
          <p className="[ body-text ] text-center">Your cart is empty!</p>
        )}
      </div>

      <div className="flex mb-[2.4rem]">
        <p className="mr-auto [ body-text ] text-black opacity-50 uppercase">total</p>
        <p className="[ body-text ] text-black">{formatPrice(total)}</p>
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
