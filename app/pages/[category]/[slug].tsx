import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import client from "@/helpers/apolloClient";
import { GET_ALL_PRODUCTS, GET_PRODUCT } from "@/queries/get-products";
import { Product, ProductsQuery } from "@/Types/data-fetching";
import ProductDetailsGallery from "@/components/shared/ProductDetailsGallery";
import { addToCart } from "../../store/reducers/cartReducer";
import { decrementCount, incrementCount, resetCount, selectItemCount } from "../../store/reducers/IncOrDecrementCount";
import ProductDetailsLayout from "../../components/layout/ProductDetailsLayout";

import Button from "../../components/shared/Button";
import AddToCart from "../../components/Cart/IncOrDecCartItems";
import ProductFeature from "../../components/shared/ProductFeature";
import { formatPrice } from "../../components/util/utils";
import BackButton from "@/components/shared/BackButton";

interface Params {
  params: {
    slug: string;
  };
}

interface Props {
  data: Product;
  allProducts: Product[];
}

const ProductDetails = ({ data: productDetail, allProducts }: Props) => {
  const router = useRouter();
  const { slug } = router.query;
  const itemCount = useSelector(selectItemCount);
  const dispatch = useDispatch();

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

  const handleAddtoCart = (product: Product) => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.cartTitle,
        price: product.price,
        itemCount,
        cartImage: product.cartImage.publicUrl,
        totalPrice: product.price * itemCount
      })
    );

    dispatch(resetCount());
  };

  useEffect(() => {
    dispatch(resetCount());
    setShuffledArray(shuffleArray());
  }, [slug]);

  const incrementCountAction = () => dispatch(incrementCount());
  const decrementCountAction = () => (itemCount > 1 ? dispatch(decrementCount()) : null);
  const decrementCountText = <span>&#8722;</span>;

  return (
    <ProductDetailsLayout pageTitle={productDetail?.title ?? ""} removeSubFooter={false}>
      <div>
        <BackButton />

        {productDetail ? (
          <>
            <div className="flex flex-col gap-[3.2rem] mb-[8.8rem] md:mb-lg md:gap-[12.5rem] md:flex-row">
              <div className="w-full md:w-1/2">
                <Image
                  src={productDetail.previewImage.publicUrl}
                  alt={`${productDetail.title} Image`}
                  width={540}
                  height={560}
                  loading="lazy"
                  className="rounded-lg object-contain w-full h-full"
                />
              </div>

              <div className="w-full self-center md:w-[35%]">
                {productDetail.newProduct && <p className="[ overline-text ] text-primary mb-[1.6rem]">new product</p>}
                <h2 className="[ heading-2 ] mb-[2.4rem] md:mb-[3.2rem]">{productDetail.title}</h2>
                <p className="[ body-text ] opacity-50 mb-[2.4rem] md:mb-[3.2rem]">{productDetail.description}</p>
                <h6 className="[ heading-6 ] mb-[3.1rem] md:mb-[4.7rem]">{formatPrice(+productDetail.price ?? 0)}</h6>
                <div className="flex gap-[1.6rem]">
                  <AddToCart
                    itemQuantity={itemCount}
                    addedStyle="w-[12rem] h-[4.8rem]"
                    incrementAction={incrementCountAction}
                    decrementAction={decrementCountAction}
                    decrementCountBtnText={decrementCountText}
                    isDecrementBtnDisabled={itemCount === 1}
                  />
                  <button
                    className="[ phile-btn phile-btn-1 !h-[4.8rem] ]"
                    onClick={() => {
                      handleAddtoCart(productDetail);
                      toast.success("Item successfully added");
                    }}
                  >
                    add to cart
                  </button>
                </div>
              </div>
            </div>

            <ProductFeature productDetail={productDetail} />

            <ProductDetailsGallery productDetail={productDetail} />

            <div className="mt-[10rem] mb-[12rem] md:mt-lg md:mb-[25rem]">
              <h3 className="[ heading-3 ] text-center mb-[4rem] md:mb-[6.4rem]">you may also like</h3>
              <div className="flex flex-col w-full gap-[5.6rem] md:gap-[3rem] md:flex-row">
                {shuffledArray.map((item) => (
                  <div className="flex flex-col items-center w-full md:w-1/3 md:min-w-[35rem]" key={item.title}>
                    <div className="w-full bg-darkGrey h-[12rem] md:h-[31.8rem] md:bg-transparent">
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
          </>
        ) : (
          <h1>Nothing to see here</h1>
        )}
      </div>
    </ProductDetailsLayout>
  );
};

export default ProductDetails;

export const getStaticPaths = async () => {
  const { data } = await client.query<ProductsQuery>({
    query: GET_ALL_PRODUCTS
  });

  if (!data) return;

  const { products } = data;
  const paths = products?.map((product) => ({ params: { category: product.category, slug: product.slug } }));
  // eslint-disable-next-line consistent-return
  return {
    paths,
    fallback: false
  };
};

export const getStaticProps = async (context: Params) => {
  const { slug } = context.params;
  const [{ data: pageProduct }, { data: allProducts }] = await Promise.all([
    await client.query<ProductsQuery>({
      query: GET_PRODUCT,
      variables: { slug }
    }),
    await client.query<ProductsQuery>({
      query: GET_ALL_PRODUCTS
    })
  ]);

  if (!pageProduct || !allProducts) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      data: pageProduct.products[0],
      allProducts: allProducts.products
    }
  };
};
