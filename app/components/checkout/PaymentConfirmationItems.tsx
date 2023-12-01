import Image from "next/image";
import { formatPrice } from "../../helpers/utils";

interface Props {
  itemTitle: string;
  itemImage: string;
  itemCount: number;
  itemPrice: number;
}

export default function PaymentConfirmationItems({ itemTitle, itemImage, itemCount, itemPrice }: Props) {
  return (
    <div className="flex mb-[1.6rem]">
      <div className="mr-4 w-[3rem] h-[3rem] sm:w-[5rem] sm:h-[5rem]">
        <Image
          src={itemImage}
          alt={`${itemTitle} product image`}
          className="w-full h-full object-contain"
          width={50}
          height={50}
        />
      </div>

      <div className="self-center mr-auto">
        <p className="[ body-text ] uppercase text-black font-bold">{itemTitle}</p>
        <p className="text-[1.4rem] text-black font-bold opacity-50 leading-[25px]">{formatPrice(itemPrice)}</p>
      </div>

      <p className="[ body-text ] font-bold text-black opacity-50">x{itemCount}</p>
    </div>
  );
}
