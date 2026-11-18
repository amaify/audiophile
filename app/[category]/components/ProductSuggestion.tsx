import Image from "next/image";
import { Product } from "@/Types/sharedTypes";
import Button from "@/components/shared/Button";

interface Props {
  productSuggestions: Product[];
}

export default function ProductSuggestion({ productSuggestions }: Props) {
  if (productSuggestions.length === 0) return null;

  return (
    <div className="mt-40 mb-48 sm:mt-48 lg:mt-64 lg:mb-100">
      <h3 className="heading-3 text-center mb-16 md:mb-[6.4rem]">you may also like</h3>
      <div className="grid place-items-center gap-[5.6rem] grid-cols-[repeat(auto-fit,100%)] md:gap-12 md:grid-cols-[repeat(auto-fit,minmax(20.8rem,1fr))]">
        {productSuggestions.map((item) => (
          <div className="flex flex-col items-center w-full" key={item.title}>
            <div className="w-full bg-dark-grey h-48 sm:h-[31.8rem]">
              <Image
                src={item.previewImage.secure_url}
                alt={item.title}
                width={350}
                height={318}
                loading="lazy"
                className="rounded-lg object-contain w-full h-full"
              />
            </div>
            <h5 className="heading-5 mt-[3.2rem] mb-[3.2rem] md:mt-16">{item.suggestionTitle}</h5>
            <Button btnText="see product" to={`/${item.category.toLowerCase()}/${item.slug}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
