import React from "react";
import ProductCategoryLayout from "../../components/layout/ProductCategoryLayout";
import MarkOneHeadphone from "../../assets/shared/desktop/image-xx99-mark-one-headphones.jpg";
import MarkTwoHeadphone from "../../assets/shared/desktop/image-xx99-mark-two-headphones.jpg";
import XX59Headphone from "../../assets/shared/desktop/image-xx59-headphones.jpg";
import headphoneData from "../../data.json";
import ProductCategory from "../../components/shared/ProductCategory";
import client from "../../helpers/apolloClient";
import { GET_PRODUCTS, type Products } from "../../queries/get-products";
import { useRouter } from "next/router";
import { ProductQuery } from "../../Types/data-fetching";

interface Props {
  data: Products;
}

const Product = ({ data }: Props) => {
  const router = useRouter();
  const { query } = router;
  const pageTitle = query.category as string;
  const productData = headphoneData.filter((headphone) => headphone.productCategory === "headphones");
  console.log(data);

  return (
    <ProductCategoryLayout layoutTitle={pageTitle}>
      <section className="w-full flex flex-col gap-[160px]">
        {productData.map((data) => {
          let productImage = MarkOneHeadphone;
          if (data.productTitle === "xx99 mark ii headphones") productImage = MarkTwoHeadphone;
          if (data.productTitle === "xx59 headphones") productImage = XX59Headphone;
          return (
            <ProductCategory
              key={data.slug}
              productSlug={data.slug}
              productDescription={data.productDescription}
              productImage={productImage}
              productTitle={data.productTitle}
            />
          );
        })}
      </section>
    </ProductCategoryLayout>
  );
};

export default Product;

export async function getStaticPaths() {
  return {
    paths: [
      { params: { category: "headphones" } },
      { params: { category: "speakers" } },
      { params: { category: "earphones" } }
    ],
    fallback: false
  };
}

export async function getStaticProps(context: ProductQuery) {
  const { category } = context.params;
  const { data, error } = await client.query<Products>({
    query: GET_PRODUCTS,
    variables: { category: category }
  });

  if (error) {
    return {
      props: {
        error: error
      }
    };
  }

  return {
    props: {
      data: data.products
    }
  };
}
