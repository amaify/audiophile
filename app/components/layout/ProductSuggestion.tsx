import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { Product } from "@/Types/data-fetching";
import Button from "../shared/Button";

interface Props {
  data: Product;
  allProducts: Product[];
}

export default function ProductSuggestion({ allProducts, data: productDetail }: Props) {
  const router = useRouter();
  const { slug } = router.query;
  const [shuffledArray, setShuffledArray] = useState<Product[]>([]);

  const shuffleArray = () => {
    const newArray = allProducts.filter((data) => data.title !== productDetail.title);

    // eslint-disable-next-line no-plusplus
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = newArray[i];
      newArray[i] = newArray[j];
      newArray[j] = temp;
    }
    return newArray.slice(0, 3);
  };

  useEffect(() => {
    setShuffledArray(shuffleArray());
  }, [slug]);

  return (
    <div className="mt-[10rem] mb-[12rem] sm:mt-[12rem] lg:mt-lg lg:mb-[25rem]">
      <h3 className="[ heading-3 ] text-center mb-[4rem] md:mb-[6.4rem]">you may also like</h3>
      <div className="[ product-suggestions ]">
        {shuffledArray.map((item) => (
          <div className="flex flex-col items-center w-full" key={item.title}>
            <div className="w-full bg-darkGrey h-[12rem] sm:h-[31.8rem]">
              <Image
                src={item.previewImage.publicUrl}
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
