import Image from "next/image";
import Button from "./Button";

interface Props {
  productImage: string;
  productTitle: string;
  productDescription: string;
  productSlug: string;
  newProduct: boolean;
  category: string;
}

const ProductCategory = ({
  productImage,
  productTitle,
  productDescription,
  productSlug,
  newProduct,
  category
}: Props) => {
  return (
    <div className="flex flex-col gap-[3.2rem] md:flex-row md:even:flex-row-reverse md:gap-[12.5rem]">
      <div className="w-full bg-darkGrey h-[35.2rem] md:h-[40.2rem] md:w-[54rem] xl:h-full xl:bg-transparent 2xl:w-1/2">
        <Image
          src={productImage}
          alt={productTitle}
          width={540}
          height={560}
          loading="lazy"
          className="rounded-lg object-contain w-full h-full"
        />
      </div>
      <div className="w-full self-center text-center md:text-left md:w-[44.5rem] 2xl:w-1/2">
        {newProduct && <p className="[ overline-text ] text-primary mb-[16px]">new product</p>}
        <h2 className="[ heading-2 ] mb-[2.4rem] md:mb-[3.2rem]">{productTitle}</h2>
        <p className="[ body-text ] opacity-50 mb-[40px]">{productDescription}</p>
        <div className="flex justify-center md:justify-start">
          <Button btnText="see product" btnType={1} to={`${category}/${productSlug}`} />
        </div>
      </div>
    </div>
  );
};

export default ProductCategory;
