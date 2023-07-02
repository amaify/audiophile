import React from "react";
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
    <div className="flex gap-[175px] even:flex-row-reverse">
      <div className="w-[54rem] h-[56rem]">
        <Image
          src={productImage}
          alt={productTitle}
          width={540}
          height={560}
          loading="lazy"
          className="rounded-lg object-contain"
        />
      </div>
      <div className="w-[35%] self-center">
        {newProduct && <p className="[ overline-text ] text-primary mb-[16px]">new product</p>}
        <h2 className="[ heading-2 ] mb-[32px]">{productTitle}</h2>
        <p className="[ body-text ] opacity-50 mb-[40px]">{productDescription}</p>
        <Button btnText="see product" btnType={1} to={`${category}/${productSlug}`} />
      </div>
    </div>
  );
};

export default ProductCategory;
