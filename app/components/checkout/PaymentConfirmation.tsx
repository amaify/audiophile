import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CheckIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import * as RadixDialog from "@radix-ui/react-dialog";
import { resetCart, selectCart } from "@/store/reducers/cartReducer";
import LinkButton from "../shared/Link";
import { formatPrice } from "../util/utils";
import PaymentConfirmationItems from "./PaymentConfirmationItems";
import useCheckoutForm from "./hooks/useCheckoutForm";

const Confirmation = () => {
  const dispatch = useDispatch();
  const { cart, grandTotal } = useSelector(selectCart);
  const { isOpen, setConfirmation } = useCheckoutForm();
  const [toggleItems, setToggleItems] = useState(false);
  const firstCartItem = cart[0];
  const cartItemPrice = firstCartItem.price * firstCartItem.itemCount;

  const handleClose = () => {
    setConfirmation(false);
    dispatch(resetCart());
  };

  return (
    <RadixDialog.Root open={isOpen} onOpenChange={handleClose}>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className="fixed inset-0 z-50 bg-black/40" />
        <RadixDialog.Content
          className={clsx(
            "bg-white p-[2.4rem] rounded-lg w-11/12 h-[58.1rem] min-w-[30rem] max-h-[71.3rem] overflow-auto md:w-[54rem] md:p-[4.8rem]",
            "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50"
          )}
        >
          <div className="w-[5rem] h-[5rem] bg-primary relative rounded-full mb-[3.3rem]">
            <CheckIcon
              className="w-14 h-14 font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              fill="#FFFFFF"
            />
          </div>

          <RadixDialog.Title className="[ heading-3 ] text-black font-bold mb-[2.4rem]">
            <span className="block">Thank You</span>
            <span>for you order</span>
          </RadixDialog.Title>
          <p className="[ body-text ] text-black/50 font-medium mb-[2.4rem]">
            You will receive an email confirmation shortly.
          </p>
          <div className="flex items-stretch mb-[4.6rem] w-full">
            <div className="bg-darkGrey p-[1.2rem] w-[65%] rounded-tl-lg rounded-bl-lg md:p-[2.4rem]">
              {!toggleItems ? (
                <PaymentConfirmationItems
                  itemTitle={firstCartItem.cartTitle}
                  itemImage={firstCartItem.cartImage}
                  itemCount={firstCartItem.itemCount}
                  itemPrice={cartItemPrice}
                />
              ) : (
                cart.map((cartItem) => (
                  <PaymentConfirmationItems
                    key={cartItem.id}
                    itemTitle={cartItem.cartTitle}
                    itemImage={cartItem.cartImage}
                    itemCount={cartItem.itemCount}
                    itemPrice={cartItemPrice}
                  />
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
            <div className="bg-black flex flex-col justify-end self-stretch w-[35%] rounded-tr-lg rounded-br-lg py-[2.1rem] pl-[1.2rem] md:py-[4.1rem] md:pl-[3.2rem]">
              <p className="[ body-text ] text-white/50 uppercase">grand total</p>
              <p className="text-[1.5rem] text-white font-bold sm:text-[1.8rem]">{formatPrice(grandTotal)}</p>
            </div>
          </div>
          <LinkButton btnText="Back to Home" btnLink="/" onClick={handleClose} />
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};

export default Confirmation;
