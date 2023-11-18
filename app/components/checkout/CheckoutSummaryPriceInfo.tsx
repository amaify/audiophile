import { useSelector } from "react-redux";
import { selectCart } from "@/store/reducers/cartReducer";
import { calculateVAT, sumAllPrice } from "@/store/util/util";
import { formatPrice } from "../util/utils";

export default function CheckoutSummaryPriceInfo() {
  const { cart } = useSelector(selectCart);
  const totalProductPrice = sumAllPrice(cart) + 35;
  return (
    cart.length > 0 && (
      <>
        <ul className="list-none flex flex-col gap-2 mb-[24px]">
          <li className="[ body-text ] flex">
            <span className=" text-black/50 font-medium leading-[25px] uppercase mr-auto">total</span>
            <span className="font-bold">{formatPrice(totalProductPrice)}</span>
          </li>
          <li className="[ body-text ] flex">
            <span className=" text-black/50 font-medium leading-[25px] uppercase mr-auto">shipping</span>
            <span className="font-bold">{formatPrice(35)}</span>
          </li>
          <li className="[ body-text ] flex">
            <span className=" text-black/50 font-medium leading-[25px] uppercase mr-auto">VAT (Included)</span>
            <span className="font-bold">{formatPrice(calculateVAT(totalProductPrice))}</span>
          </li>
        </ul>

        <p className="[ body-text ] flex mb-[32px]">
          <span className="text-black/50 font-medium leading-[25px] uppercase mr-auto">Grand Total</span>
          <span className="text-primary font-bold">{formatPrice(totalProductPrice)}</span>
        </p>
      </>
    )
  );
}
