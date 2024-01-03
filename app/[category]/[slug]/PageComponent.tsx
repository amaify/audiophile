"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { Product } from "@/Types/sharedTypes";
import { Alert } from "@/components/shared/Alert";
import ProductDetailsLayout from "@/components/layout/ProductDetailsLayout";
import { decrementCount, incrementCount, resetCount, selectItemCount } from "@/store/cart/ProductCounterReducer";
import ProductCounter from "@/components/shared/ProductCounter";
import { formatPrice } from "@/helpers/FormatPrice";
import { addToCart } from "@/store/cart/CartReducer";
import dynamic from "next/dynamic";

const ProductFeature = dynamic(import("@/components/shared/ProductFeature"), { ssr: false });
const ProductDetailsGallery = dynamic(import("@/components/shared/ProductDetailsGallery"), { ssr: false });
const ProductSuggestion = dynamic(import("@/components/layout/ProductSuggestion"), { ssr: false });

interface Props {
  data: Product;
  allProducts: Product[];
  error: string;
}

export default function PageComponent({ data: productDetail, allProducts, error }: Props) {
  const params = useParams();
  const { back } = useRouter();
  const itemCount = useSelector(selectItemCount);
  const dispatch = useDispatch();

  if (error)
    return (
      <ProductDetailsLayout removeSubFooter={false} onClick={() => back()}>
        <Alert message={error} alertVariant="error" />
      </ProductDetailsLayout>
    );

  const [productSuggestions, setProductSuggestions] = useState<Product[]>([]);

  const randomizeProductSuggestion = () => {
    const sortedArray = allProducts
      .filter((data) => data.title !== productDetail.title)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    return sortedArray;
  };

  const handleAddtoCart = () => {
    dispatch(
      addToCart({
        id: productDetail.id,
        cartTitle: productDetail.cartTitle,
        productTitle: productDetail.title,
        price: productDetail.price,
        itemCount,
        cartImage: productDetail.cartImage.secure_url,
        totalPrice: productDetail.price * itemCount
      })
    );
    dispatch(resetCount());
    toast.success("Product successfully added to cart", { duration: 2500 });
  };

  useEffect(() => {
    dispatch(resetCount());
    setProductSuggestions(randomizeProductSuggestion());
  }, [params]);

  return (
    <ProductDetailsLayout removeSubFooter={false} onClick={() => back()}>
      {productDetail ? (
        <>
          <div className="flex flex-col gap-[3.2rem] mb-[8.8rem] sm:flex-row sm:gap-[6.95rem] md:mb-lg md:gap-[12.5rem]">
            <div className="w-full bg-darkGrey rounded-lg h-[32.7rem] sm:w-[28.1rem] sm:h-[48rem] lg:w-1/2 lg:h-auto">
              <Image
                src={productDetail.previewImage.secure_url}
                alt={`${productDetail.title} Image`}
                width={540}
                height={560}
                priority
                className="rounded-lg object-contain w-full h-full"
              />
            </div>

            <div className="w-full self-center sm:w-[33.9rem] md:w-1/2">
              {productDetail.newProduct && <p className="[ overline-text ] text-primary mb-[1.6rem]">new product</p>}
              <h2 className="[ heading-2 ] mb-[2.4rem] md:mb-[3.2rem]">{productDetail.title}</h2>
              <p className="[ body-text ] opacity-50 mb-[2.4rem] md:mb-[3.2rem]">{productDetail.description}</p>
              <h6 className="[ heading-6 ] mb-[3.1rem] md:mb-[4.7rem]">{formatPrice(+productDetail.price)}</h6>
              <ProductCounter
                addedStyle="w-[12rem] h-[4.8rem]"
                decrementCountBtn="&#8722;"
                variant="product"
                itemCount={itemCount}
                isDisabled={itemCount === 1}
                onAddToCart={handleAddtoCart}
                decrementCount={() => dispatch(decrementCount())}
                incrementCount={() => dispatch(incrementCount())}
              />
            </div>
          </div>

          <ProductFeature productDetail={productDetail} />
          <ProductDetailsGallery productDetail={productDetail} />
          <ProductSuggestion productSuggestions={productSuggestions} />
        </>
      ) : (
        <h1>Nothing to see here</h1>
      )}
    </ProductDetailsLayout>
  );
}
