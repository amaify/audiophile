import { useSelector } from "react-redux";
import { clsx } from "clsx";
import { selectCart } from "@/store/cart/CartReducer";
import CheckoutSummaryPriceInfo from "./CheckoutSummaryPriceInfo";
import CheckoutSummaryItems from "./CheckoutSummaryItems";
import useCheckoutForm from "./hooks/useCheckoutForm";

const CheckoutSummary = () => {
  const { cart } = useSelector(selectCart);
  const { isValid, isPending } = useCheckoutForm();

  const submitBtnDisabled = !isValid || cart.length === 0 || isPending;
  const btnText = !isPending ? "Continue & Pay" : "Processing...";
  return (
    <div className="bg-white self-start px-[2.4rem] py-[3.2rem] w-full max-h-[61.2rem] overflow-auto rounded-lg lg:px-[3.3rem] lg:w-[50%] xl:w-[30%]">
      <h6 className="[ heading-6 ] font-bold mb-[31px]">summary</h6>
      <CheckoutSummaryItems />
      <CheckoutSummaryPriceInfo />
      <button
        className={clsx(
          "inline-block bg-primary hover:bg-primaryHover text-white text-center w-full py-[15px] font-bold [ phile-btn ]",
          submitBtnDisabled && "disabled:bg-gray-300 disabled:cursor-not-allowed"
        )}
        type="submit"
        disabled={submitBtnDisabled}
      >
        {btnText}
      </button>
    </div>
  );
};

export default CheckoutSummary;
