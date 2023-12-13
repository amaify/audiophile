import { Popover, Transition } from "@headlessui/react";
import { useSelector } from "react-redux";
import Image from "next/image";
import { selectCart } from "@/store/cart/CartReducer";
import CartIcon from "@/public/shared/desktop/icon-cart.svg";
import CartItems from "./CartItems";

const Cart = () => {
  const { cart } = useSelector(selectCart);

  return (
    <Popover>
      <Popover.Button className="relative outline-none border-none">
        <Image src={CartIcon} alt="Shopping Cart" className="hover:cursor-pointer" />
        {cart.length > 0 && (
          <p className="w-9 h-9 bg-primary text-white absolute -top-1/2 left-1/2 text-center rounded-full">
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 [ body-text ] font-light">
              {cart.length}
            </span>
          </p>
        )}
      </Popover.Button>

      <Popover.Overlay className="fixed inset-0 bg-black/50 z-20" />

      <div className="w-full relative z-50">
        <Transition.Child
          enter="transition ease-in-out duration-300 transform"
          enterFrom="scale-0"
          enterTo="scale-100"
          leave="transition ease-out duration-300 transform"
          leaveFrom="scale-100"
          leaveTo="scale-0"
        >
          <Popover.Panel>
            <CartItems />
          </Popover.Panel>
        </Transition.Child>
      </div>
    </Popover>
  );
};

export default Cart;
