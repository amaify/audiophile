import { Popover, PopoverBackdrop, PopoverButton, PopoverPanel } from "@headlessui/react";
import { useSelector } from "react-redux";
import Image from "next/image";
import { selectCart } from "@/store/cart/CartReducer";
import CartIcon from "@/public/shared/desktop/icon-cart.svg";
import CartItems from "./CartItems";

const Cart = () => {
  const { cart } = useSelector(selectCart);

  return (
    <Popover>
      <PopoverButton className="relative outline-none border-none">
        <Image src={CartIcon} alt="Shopping Cart" className="hover:cursor-pointer" />
        {cart.length > 0 && (
          <p className="w-9 h-9 bg-primary text-white absolute -top-1/2 left-1/2 text-center rounded-full">
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 [ body-text ] font-light">
              {cart.length}
            </span>
          </p>
        )}
      </PopoverButton>
      <PopoverBackdrop
        transition
        className="fixed inset-0 bg-black/50 z-20 duration-300 ease-out transition data-[closed]:opacity-0"
      />

      <PopoverPanel
        transition
        className="w-full relative z-50 ease-out transition duration-300 data-[closed]:scale-0 transform"
      >
        <CartItems />
      </PopoverPanel>
    </Popover>
  );
};

export default Cart;
