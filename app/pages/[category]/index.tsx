import React from "react";
import { useRouter } from "next/router";
import ProductCategory from "@/components/shared/ProductCategory";
import ProductCategoryLayout from "@/components/layout/ProductCategoryLayout";
import type { Product, ProductParam, ProductQuery, ProductsQuery } from "@/Types/data-fetching";
import { GET_PRODUCTS } from "@/queries/get-products";
import client from "@/helpers/apolloClient";

type Category = "headphones" | "earphones" | "speakers";
interface Props {
  data: Product[];
  error?: any;
}

const ProductsPage = ({ data, error }: Props) => {
  const router = useRouter();
  const { query } = router;
  const pageTitle = query.category as string;

  if (error) return <h1>{error}</h1>;

  return (
    <ProductCategoryLayout layoutTitle={pageTitle}>
      <section className="w-full flex flex-col gap-[160px]">
        {data.length > 0 ? (
          data.map((prodData) => (
            <ProductCategory
              key={prodData.id}
              productSlug={prodData.slug}
              productDescription={prodData.description}
              productImage={prodData.previewImage.publicUrl}
              productTitle={prodData.title}
              newProduct={prodData.newProduct}
              category={pageTitle}
            />
          ))
        ) : (
          <h1>No Products</h1>
        )}
      </section>
    </ProductCategoryLayout>
  );
};

export default ProductsPage;

export async function getStaticPaths() {
  const categories: Category[] = ["headphones", "speakers", "earphones"];
  const paths = categories.map((category) => ({ params: { category: category } }));
  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps(context: ProductParam) {
  const category = context.params.category;
  const { data, error } = await client.query<ProductsQuery>({
    query: GET_PRODUCTS,
    variables: { category: category }
  });

  if (!data) {
    return {
      props: {
        error: error
      }
    };
  }

  return {
    props: {
      data: data.products
    },
    revalidate: 60
  };
}
