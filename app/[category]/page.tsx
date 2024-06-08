import { Suspense } from "react";
import type { ProductsQuery } from "@/Types/sharedTypes";
import { fetchHygraphData } from "@/helpers/ServiceClient";
import { Alert } from "@/components/shared/Alert";
import { GetProductByCategory } from "@/queries/AllQueries";
import dynamic from "next/dynamic";
import ProductCategoryLayoutSkeleton from "./layout/ProductCategoryLayoutSkeleton";

const ProductCategoryLayout = dynamic(() => import("./layout/ProductCategoryLayout"), { ssr: true });
const ProductCategory = dynamic(() => import("./components/ProductCategory"), { ssr: true });

export type Category = "headphones" | "earphones" | "speakers";

type PageParam = {
  params: {
    category: Category;
  };
};

export async function generateStaticParams() {
  const categories: Category[] = ["headphones", "speakers", "earphones"];
  return categories.map((category) => ({ category }));
}

async function getProductByCategory({ category }: PageParam["params"]) {
  const firstLetterInCategory = category.charAt(0).toUpperCase();
  const capitalizedCategory = firstLetterInCategory + category.slice(1);
  let productCategoryData!: ProductsQuery;
  let errorResponse = "";

  try {
    const { data } = await fetchHygraphData<ProductsQuery, typeof category>({
      query: GetProductByCategory,
      variables: { category: capitalizedCategory as Category }
    });
    productCategoryData = data;
  } catch (error: any) {
    console.error(error);
    errorResponse = `Fetch failed: Could not retrieve page data for ${category} due to server error, please try again!`;
  }

  return {
    productCategoryData: productCategoryData?.products,
    errorResponse
  };
}

export async function generateMetadata({ params }: PageParam) {
  return {
    title: `Audiophile | ${params.category}`
  };
}

export default async function Page({ params }: PageParam) {
  const { errorResponse, productCategoryData } = await getProductByCategory(params);
  const pageTitle = params.category;

  if (errorResponse) {
    return (
      <Suspense fallback={<ProductCategoryLayoutSkeleton />}>
        <ProductCategoryLayout layoutTitle={pageTitle}>
          <Alert message={errorResponse} alertVariant="error" />
        </ProductCategoryLayout>
      </Suspense>
    );
  }

  if (productCategoryData?.length === 0) {
    return (
      <Suspense fallback={<ProductCategoryLayoutSkeleton />}>
        <ProductCategoryLayout layoutTitle={pageTitle}>
          <Alert message="No product" alertVariant="warning" />
        </ProductCategoryLayout>
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<ProductCategoryLayoutSkeleton />}>
      <ProductCategoryLayout layoutTitle={pageTitle}>
        <section className="w-full flex flex-col gap-[12rem] md:gap-[16rem]">
          {productCategoryData?.map((prodData) => (
            <ProductCategory
              key={prodData.id}
              productSlug={prodData.slug}
              productDescription={prodData.description}
              productImage={prodData.previewImage.secure_url}
              productTitle={prodData.title}
              newProduct={prodData.newProduct}
              category={pageTitle}
            />
          ))}
        </section>
      </ProductCategoryLayout>
    </Suspense>
  );
}
