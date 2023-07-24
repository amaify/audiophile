import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { addToCart } from "../../store/reducers/cartReducer";
import { useDispatch, useSelector } from "react-redux";
import { resetCount, selectItemCount } from "../../store/reducers/IncOrDecrementCount";
import ProductDetailsLayout from "../../components/layout/ProductDetailsLayout";

import Button from "../../components/shared/Button";
import AddToCart from "../../components/Cart/IncOrDecCartItems";
import ProductFeature from "../../components/shared/ProductFeature";
import { formatPrice } from "../../components/util/utils";
import client from "@/helpers/apolloClient";
import { GET_ALL_PRODUCTS, GET_PRODUCT } from "@/queries/get-products";
import { Product, ProductsQuery } from "@/Types/data-fetching";
import ProductDetailsGallery from "@/components/shared/ProductDetailsGallery";

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

    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = newArray[i];
      newArray[i] = newArray[j];
      newArray[j] = temp;
    }
    return newArray.slice(0, 3);
  };

  const handleAddtoCart = (productDetail: Product) => {
    dispatch(
      addToCart({
        id: productDetail.id,
        title: productDetail.cartTitle,
        price: productDetail.price,
        itemCount: itemCount,
        cartImage: productDetail.cartImage.publicUrl,
        totalPrice: productDetail.price * itemCount
      })
    );

    dispatch(resetCount());
  };

  useEffect(() => {
    dispatch(resetCount());
    setShuffledArray(shuffleArray());
  }, [slug]);

  return (
    <ProductDetailsLayout pageTitle={productDetail?.title ?? ""} removeSubFooter={false}>
      <div>
        <button
          className="[ body-text ] opacity-50 capitalize  hover:text-primary mb-[56px]"
          onClick={() => router.back()}
        >
          go back
        </button>

        {productDetail ? (
          <>
            <div className="flex gap-[125px] mb-lg">
              <div className="w-1/2">
                <Image
                  src={productDetail.previewImage.publicUrl}
                  alt={`${productDetail.title} Image`}
                  width={540}
                  height={560}
                  loading="lazy"
                  className="rounded-lg object-contain"
                />
              </div>

              <div className="w-[35%] self-center">
                <p className="[ overline-text ] text-primary mb-[16px]">new product</p>
                <h2 className="[ heading-2 ] mb-[32px]">{productDetail.title}</h2>
                <p className="[ body-text ] opacity-50 mb-[32px]">{productDetail.description}</p>
                <h6 className="[ heading-6 ] mb-[47px]">{formatPrice(+productDetail.price ?? 0)}</h6>
                <div className="flex gap-[16px]">
                  <AddToCart isCartVisible={false} itemQuantity={itemCount} />
                  <button className="[ phile-btn phile-btn-1 ]" onClick={() => handleAddtoCart(productDetail)}>
                    add to cart
                  </button>
                </div>
              </div>
            </div>

            <ProductFeature productDetail={productDetail} />

            <ProductDetailsGallery productDetail={productDetail} />

            <div className="mt-lg mb-[25rem]">
              <h3 className="[ heading-3 ] text-center mb-[64px]">you may also like</h3>
              <div className="flex gap-[30px]">
                {shuffledArray.map((item) => (
                  <div className="flex flex-col items-center" key={item.title}>
                    <Image
                      src={item.previewImage.publicUrl}
                      alt={item.title}
                      width={350}
                      height={318}
                      loading="lazy"
                      className="rounded-lg object-contain"
                    />
                    <h5 className="[ heading-5 ] mt-[40px] mb-[32px]">{item.suggestionTitle}</h5>
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
      variables: { slug: slug }
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
