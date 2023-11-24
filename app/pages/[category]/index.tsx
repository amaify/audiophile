import React from "react";
import { useRouter } from "next/router";
import type { Product, ProductParam, ProductsQuery } from "@/Types/shared-types";
import { GET_PRODUCTS } from "@/queries/all-queries";
import client from "@/helpers/apolloClient";
import { Alert } from "@/components/shared/Alert";
import ProductCategory from "@/components/shared/ProductCategory";
import ProductCategoryLayout from "@/components/layout/ProductCategoryLayout";

type Category = ("headphones" | "earphones" | "speakers")[];
interface Props {
  data: Product[];
  error: string;
}

const ProductsPage = ({ data, error }: Props) => {
  const router = useRouter();
  const { query } = router;
  const pageTitle = query.category as string;

  if (error)
    return (
      <ProductCategoryLayout layoutTitle={pageTitle}>
        <Alert message={error} alertVariant="error" />
      </ProductCategoryLayout>
    );

  return (
    <ProductCategoryLayout layoutTitle={pageTitle}>
      <section className="w-full flex flex-col gap-[12rem] md:gap-[16rem]">
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
          <h1>No Product</h1>
        )}
      </section>
    </ProductCategoryLayout>
  );
};

export default ProductsPage;

export async function getStaticPaths() {
  const categories: Category = ["headphones", "speakers", "earphones"];
  const paths = categories.map((category) => ({ params: { category } }));
  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps(context: ProductParam) {
  const { category } = context.params;
  try {
    const { data } = await client.query<ProductsQuery>({
      query: GET_PRODUCTS,
      variables: { category }
    });

    return {
      props: {
        data: data.products
      },
      revalidate: 60
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        error: `Fetch failed: Could not retrieve page data for ${category} due to server error, please try again!`
      }
    };
  }
}
