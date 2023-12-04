import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { fetchDataFromAdmin } from "@/helpers/ServiceClient";
import { GET_ALL_PRODUCTS, GET_PRODUCT } from "@/queries/AllQueries";
import { Product, ProductsQuery } from "@/Types/shared-types";
import ProductDetailsGallery from "@/components/shared/ProductDetailsGallery";
import { Alert } from "@/components/shared/Alert";
import ProductDetailsLayout from "@/components/layout/ProductDetailsLayout";
import ProductSuggestion from "@/components/layout/ProductSuggestion";
import { decrementCount, incrementCount, resetCount, selectItemCount } from "@/store/cart/ProductCounterReducer";
import ProductCounter from "@/components/shared/ProductCounter";
import { formatPrice } from "@/helpers/FormatPrice";
import ProductFeature from "@/components/shared/ProductFeature";
import { addToCart } from "@/store/cart/CartReducer";

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
        cartImage: productDetail.cartImage.publicUrl,
        totalPrice: productDetail.price * itemCount
      })
    );
    dispatch(resetCount());
    toast.success("Product successfully added to cart", { duration: 2500 });
  };

  useEffect(() => {
    dispatch(resetCount());
    setProductSuggestions(randomizeProductSuggestion());
  }, [slug]);

  if (error)
    return (
      <ProductDetailsLayout
        pageTitle={productDetail?.title ?? ""}
        removeSubFooter={false}
        onClick={() => router.back()}
      >
        <Alert message={error} alertVariant="error" />
      </ProductDetailsLayout>
    );

  return (
    <ProductDetailsLayout pageTitle={productDetail?.title ?? ""} removeSubFooter={false} onClick={() => router.back()}>
      {productDetail ? (
        <>
          <div className="flex flex-col gap-[3.2rem] mb-[8.8rem] sm:flex-row sm:gap-[6.95rem] md:mb-lg md:gap-[12.5rem]">
            <div className="w-full bg-darkGrey rounded-lg h-[32.7rem] sm:w-[28.1rem] sm:h-[48rem] lg:w-1/2 lg:h-auto">
              <Image
                src={productDetail.previewImage.publicUrl}
                alt={`${productDetail.title} Image`}
                width={540}
                height={560}
                loading="lazy"
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
};

export default ProductDetails;

export const getStaticPaths = async () => {
  try {
    const { data } = await fetchDataFromAdmin<ProductsQuery>({
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
      await fetchDataFromAdmin<ProductsQuery, typeof slug>({
        query: GET_PRODUCT,
        variables: { slug }
      }),
      await fetchDataFromAdmin<ProductsQuery>({
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
    console.error(JSON.stringify(error, undefined, 4));
    return {
      props: {
        error: `Fetch failed: Could not retrieve page data for ${slug} due to server error, please try again!`
      }
    };
  }
};
