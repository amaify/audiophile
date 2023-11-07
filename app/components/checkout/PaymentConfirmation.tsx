import { useState } from "react";
import { useSelector } from "react-redux";
import { CheckIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { Dialog } from "@headlessui/react";
// eslint-disable-next-line import/extensions
import { selectCart } from "@/store/reducers/cartReducer";
import LinkButton from "../shared/Link";
import { formatPrice } from "../util/utils";

interface Props {
  isOpen: boolean;
  // eslint-disable-next-line no-unused-vars
  setConfirmation: (value: boolean) => void;
}

const Confirmation = ({ isOpen, setConfirmation }: Props) => {
  const { cart, grandTotal } = useSelector(selectCart);
  const [toggleItems, setToggleItems] = useState(false);
  const SingleCartItem = cart[0];
  const cartItemPrice = SingleCartItem.price * SingleCartItem.itemCount;

  return (
    <Dialog open={isOpen} onClose={() => setConfirmation(false)} className="max-h-[71.3rem] overflow-auto">
      <div className="fixed top-0 left-0 w-full h-full bg-black opacity-40 z-10" />

      <div className="bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 p-[48px] rounded-lg w-[54rem]">
        <Dialog.Panel>
          <div className="w-[50px] h-[50px] bg-primary relative rounded-full mb-[33px]">
            <CheckIcon
              className="w-14 h-14 font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              fill="#FFFFFF"
            />
          </div>

          <Dialog.Title className="[ heading-3 ] text-black font-bold mb-[24px]">
            <span className="block">Thank You</span>
            <span>for you order</span>
          </Dialog.Title>
          <p className="[ body-text ] text-black opacity-50 font-medium mb-[24px]">
            You will receive an email confirmation shortly.
          </p>
          <div className="flex items-stretch mb-[4.6rem] w-full">
            <div className="bg-darkGrey p-[24px] w-[65%] rounded-tl-lg rounded-bl-lg">
              {!toggleItems ? (
                <div className="flex">
                  <div className="mr-4">
                    <Image src={SingleCartItem.cartImage} alt="A Headphone" width={50} height={50} />
                  </div>

                  <div className="self-center mr-auto">
                    <p className="[ body-text ] uppercase text-black font-bold">{SingleCartItem.title}</p>
                    <p className="text-[14px] text-black font-bold opacity-50 leading-[25px]">
                      {formatPrice(cartItemPrice)}
                    </p>
                  </div>

                  <p className="[ body-text ] font-bold text-black opacity-50">x{SingleCartItem.itemCount}</p>
                </div>
              ) : (
                cart.map((cartItem) => (
                  <div className="flex mb-[1.6rem]" key={cartItem.id}>
                    <div className="mr-4">
                      <Image src={cartItem.cartImage} alt="A Headphone" width={50} height={50} />
                    </div>

                    <div className="self-center mr-auto">
                      <p className="[ body-text ] uppercase text-black font-bold">{cartItem.title}</p>
                      <p className="text-[14px] text-black font-bold opacity-50 leading-[25px]">
                        {formatPrice(cartItem.price * cartItem.itemCount)}
                      </p>
                    </div>

                    <p className="[ body-text ] font-bold text-black opacity-50">x{cartItem.itemCount}</p>
                  </div>
                ))
              )}

              <hr className="my-3" />

              {cart.length > 1 && (
                <button
                  className="text-[1.2rem] w-full text-center font-bold text-black opacity-50 leading-4 border-none outline-none transition-colors hover:text-primary"
                  onClick={() => setToggleItems((currentState) => !currentState)}
                >
                  {!toggleItems ? `and ${cart.length - 1} other item(s)` : "Show less"}
                </button>
              )}
            </div>
            <div className="bg-black flex flex-col justify-end self-stretch w-[35%] rounded-tr-lg rounded-br-lg py-[4.1rem] pl-[3.2rem]">
              <p className="[ body-text ] text-white opacity-50 uppercase">grand total</p>
              <p className="text-[1.8rem] text-white font-bold">{formatPrice(grandTotal)}</p>
            </div>
          </div>
        </Dialog.Panel>

        <LinkButton btnText="Back to Home" btnLink="/" />
      </div>
    </Dialog>
  );
};

export default Confirmation;
