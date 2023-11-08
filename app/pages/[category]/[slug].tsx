import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import client from "@/helpers/apolloClient";
import { GET_ALL_PRODUCTS, GET_PRODUCT } from "@/queries/get-products";
import { Product, ProductsQuery } from "@/Types/data-fetching";
import ProductDetailsGallery from "@/components/shared/ProductDetailsGallery";
import { addToCart } from "../../store/reducers/cartReducer";
import { resetCount, selectItemCount } from "../../store/reducers/IncOrDecrementCount";
import ProductDetailsLayout from "../../components/layout/ProductDetailsLayout";

import AddToCart from "../../components/Cart/CartItemCounter";
import ProductFeature from "../../components/shared/ProductFeature";
import { formatPrice } from "../../components/util/utils";
import { Alert } from "@/components/shared/Alert";
import ProductSuggestion from "@/components/layout/ProductSuggestion";

interface Props {
  data: Product;
  allProducts: Product[];
  error: string;
}

const ProductDetails = ({ data: productDetail, allProducts, error }: Props) => {
  const router = useRouter();
  const { slug } = router.query;
  const itemCount = useSelector(selectItemCount);
  const dispatch = useDispatch();

  const handleAddtoCart = () => {
    dispatch(
      addToCart({
        id: productDetail.id,
        title: productDetail.cartTitle,
        price: productDetail.price,
        itemCount,
        cartImage: productDetail.cartImage.publicUrl,
        totalPrice: productDetail.price * itemCount
      })
    );

    dispatch(resetCount());
  };

  useEffect(() => {
    dispatch(resetCount());
  }, [slug]);

  if (error)
    return (
      <ProductDetailsLayout pageTitle={productDetail?.title ?? ""} removeSubFooter={false}>
        <Alert message={error} alertVariant="error" />
      </ProductDetailsLayout>
    );

  return (
    <ProductDetailsLayout pageTitle={productDetail?.title ?? ""} removeSubFooter={false}>
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
              <AddToCart addedStyle="w-[12rem] h-[4.8rem]" handleButtonClick={handleAddtoCart} showAddToCartBtn />
            </div>
          </div>

          <ProductFeature productDetail={productDetail} />
          <ProductDetailsGallery productDetail={productDetail} />
          <ProductSuggestion allProducts={allProducts} data={productDetail} />
        </>
      ) : (
        <h1>Nothing to see here</h1>
      )}
    </ProductDetailsLayout>
  );
};

export default ProductDetails;

export const getStaticPaths = async () => {
  try {
    const { data } = await client.query<ProductsQuery>({
      query: GET_ALL_PRODUCTS
    });

    if (!data) return null;

    const { products } = data;
    const paths = products?.map((product) => ({ params: { category: product.category, slug: product.slug } }));
    return { paths, fallback: false };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return { paths: [], fallback: false };
  }
};

export const getStaticProps = async (context: { params: { slug: string } }) => {
  const { slug } = context.params;

  try {
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
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return {
      props: {
        error: `Fetch failed: Could not retrieve page data for ${slug} due to server error, please try again!`
      }
    };
  }
};
