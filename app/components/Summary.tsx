import Image from "next/image";
import { useSelector } from "react-redux";
import { clsx } from "clsx";
import { selectCart } from "../store/reducers/cartReducer";
import { formatPrice, itemPriceSum } from "./util/utils";

interface Props {
  isDisabled: boolean;
  isError: boolean;
  // eslint-disable-next-line no-unused-vars
  setConfirmation: (value: boolean) => void;
}

const CheckoutSummary = ({ isError, isDisabled, setConfirmation }: Props) => {
  const { cart } = useSelector(selectCart);

  const submitBtnDisabled = !isDisabled || isError || cart.length === 0;
  return (
    <div className="bg-white self-start px-[3.3rem] py-[3.2rem] w-[30%] max-h-[61.2rem] overflow-auto rounded-lg">
      <h6 className="[ heading-6 ] font-bold mb-[31px]">summary</h6>
      <div className="mb-[32px] flex flex-col gap-[24px]">
        {cart.length > 0 ? (
          cart.map((item) => (
            <div className="flex items-center" key={item.id}>
              <div className="flex items-center gap-[16px] mr-auto">
                <Image src={item.cartImage} alt={item.title} width={64} height={64} className="rounded-[8px]" />
                <div>
                  <p className="text-[1.5rem] text-black font-bold uppercase">{item.title.substring(0, 5)}</p>
                  <p className="text-[1.4rem] text-black/50 font-bold">{formatPrice(item.price)}</p>
                </div>
              </div>

              <p className="[ body-text ] font-bold text-black/50">{`x${item.itemCount}`}</p>
            </div>
          ))
        ) : (
          <p className="[ body-text ] text-center">Your cart is empty</p>
        )}
      </div>

      {cart.length > 0 && (
        <>
          <ul className="list-none flex flex-col gap-2 mb-[24px]">
            <li className="[ body-text ] flex">
              <span className=" text-black/50 font-medium leading-[25px] uppercase mr-auto">total</span>
              <span className="font-bold">{formatPrice(itemPriceSum(cart))}</span>
            </li>
            <li className="[ body-text ] flex">
              <span className=" text-black/50 font-medium leading-[25px] uppercase mr-auto">shipping</span>
              <span className="font-bold">{formatPrice(35)}</span>
            </li>
            <li className="[ body-text ] flex">
              <span className=" text-black/50 font-medium leading-[25px] uppercase mr-auto">VAT (Included)</span>
              <span className="font-bold">{formatPrice(1079)}</span>
            </li>
          </ul>

          <p className="[ body-text ] flex mb-[32px]">
            <span className="text-black/50 font-medium leading-[25px] uppercase mr-auto">Grand Total</span>
            <span className="text-primary font-bold">{formatPrice(itemPriceSum(cart) + 35)}</span>
          </p>
        </>
      )}

      <button
        className={clsx(
          "inline-block bg-primary hover:bg-primaryHover text-white text-center w-full py-[15px] font-bold [ phile-btn ]",
          submitBtnDisabled && "disabled:bg-gray-300 disabled:cursor-not-allowed"
        )}
        onClick={() => setConfirmation(true)}
        disabled={submitBtnDisabled}
      >
        Continue and Pay
      </button>
    </div>
  );
};

export default CheckoutSummary;
