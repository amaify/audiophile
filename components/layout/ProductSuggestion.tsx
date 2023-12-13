import Image from "next/image";
import { Product } from "@/Types/sharedTypes";
import Button from "@/components/shared/Button";

interface Props {
  productSuggestions: Product[];
}

export default function ProductSuggestion({ productSuggestions }: Props) {
  if (productSuggestions.length === 0) return null;

  return (
    <div className="mt-[10rem] mb-[12rem] sm:mt-[12rem] lg:mt-lg lg:mb-[25rem]">
      <h3 className="[ heading-3 ] text-center mb-[4rem] md:mb-[6.4rem]">you may also like</h3>
      <div className="[ product-suggestions ]">
        {productSuggestions.map((item) => (
          <div className="flex flex-col items-center w-full" key={item.title}>
            <div className="w-full bg-darkGrey h-[12rem] sm:h-[31.8rem]">
              <Image
                src={item.previewImage.secure_url}
                alt={item.title}
                width={350}
                height={318}
                loading="lazy"
                className="rounded-lg object-contain w-full h-full"
              />
            </div>
            <h5 className="[ heading-5 ] mt-[3.2rem] mb-[3.2rem] md:mt-[4rem]">{item.suggestionTitle}</h5>
            <Button btnText="see product" btnType={1} to={`/${item.category}/${item.slug}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
