import { Popover } from "@headlessui/react";
import { useSelector } from "react-redux";
import Image from "next/image";
import CartIcon from "../../assets/shared/desktop/icon-cart.svg";
import CartItems from "./CartItems";
import { selectCart } from "../../store/reducers/cartReducer";

const Cart = () => {
  const { cart } = useSelector(selectCart);

  return (
    <Popover className="relative">
      <Popover.Button className="outline-none border-none">
        <Image src={CartIcon} alt="A shopping Cart" layout="fixed" className="hover:cursor-pointer" />
        {cart.length > 0 && (
          <p className="w-9 h-9 bg-primary text-white absolute -top-[50%] left-[50%] text-center rounded-full">
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 [ body-text ] font-bold">
              {cart.length}
            </span>
          </p>
        )}
      </Popover.Button>
      <Popover.Overlay className="[ cart-backdrop ]" />
      <Popover.Panel>
        <CartItems />
      </Popover.Panel>
    </Popover>
  );
};

export default Cart;
