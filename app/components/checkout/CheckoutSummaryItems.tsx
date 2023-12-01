import Image from "next/image";
import { useSelector } from "react-redux";
import { selectCart } from "@/store/cart/cart.reducer";
import { formatPrice } from "../../helpers/utils";

export default function CheckoutSummaryItems() {
  const { cart } = useSelector(selectCart);
  return (
    <div className="mb-[32px] flex flex-col gap-[24px]">
      {cart.length > 0 ? (
        cart.map((item) => (
          <div className="flex items-center" key={item.id}>
            <div className="flex items-center gap-[16px] mr-auto">
              <Image
                src={item.cartImage}
                alt={item.cartTitle}
                width={64}
                height={64}
                className="rounded-[0.8rem] w-full h-full"
              />
              <div>
                <p className="text-[1.5rem] text-black font-bold uppercase">{item.cartTitle.substring(0, 5)}</p>
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
  );
}
