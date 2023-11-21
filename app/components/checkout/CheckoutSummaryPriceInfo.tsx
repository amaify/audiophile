import { useSelector } from "react-redux";
import { selectCart } from "@/store/cart/cart.reducer";
import { calculateVAT } from "@/store/cart/cart.util";
import { formatPrice } from "../util/utils";

export default function CheckoutSummaryPriceInfo() {
  const { cart, total, grandTotal } = useSelector(selectCart);

  return (
    cart.length > 0 && (
      <>
        <ul className="list-none flex flex-col gap-2 mb-[24px]">
          <li className="[ body-text ] flex">
            <span className=" text-black/50 font-medium leading-[25px] uppercase mr-auto">total</span>
            <span className="font-bold">{formatPrice(total)}</span>
          </li>
          <li className="[ body-text ] flex">
            <span className=" text-black/50 font-medium leading-[25px] uppercase mr-auto">shipping</span>
            <span className="font-bold">{formatPrice(35)}</span>
          </li>
          <li className="[ body-text ] flex">
            <span className=" text-black/50 font-medium leading-[25px] uppercase mr-auto">VAT (Included)</span>
            <span className="font-bold">{formatPrice(calculateVAT(grandTotal))}</span>
          </li>
        </ul>

        <p className="[ body-text ] flex mb-[32px]">
          <span className="text-black/50 font-medium leading-[25px] uppercase mr-auto">Grand Total</span>
          <span className="text-primary font-bold">{formatPrice(grandTotal)}</span>
        </p>
      </>
    )
  );
}
