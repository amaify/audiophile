import { Suspense } from "react";
import { fetchHygraphData } from "@/helpers/ServiceClient";
import { Product, ProductsQuery } from "@/Types/sharedTypes";
import { GetAllProducts, GetProduct } from "@/queries/AllQueries";
import PageComponent from "./PageComponent";
import { Category } from "../page";
import ProductDetailsLayoutSkeleton from "../layout/ProductDetailsLayoutSkeleton";

export type ProductDetailParam = {
  params: Promise<{ category: Category; slug: string }>;
};

export async function generateStaticParams() {
  try {
    const { data } = await fetchHygraphData<ProductsQuery>({
      query: GetAllProducts
    });

    const { products } = data;
    return products.map((product) => ({ category: product.category.toLowerCase(), slug: product.slug }));
  } catch (error) {
    console.error(JSON.stringify(error, undefined, 4));
    return [];
  }
}

async function getProductInformation(slug: string) {
  let allProductsData!: Product[];
  let pageProductData!: Product;
  let errorResponse = "";

  try {
    const [{ data: pageProduct }, { data: allProducts }] = await Promise.all([
      await fetchHygraphData<{ product: Product }, typeof slug>({
        query: GetProduct,
        variables: { slug }
      }),
      await fetchHygraphData<ProductsQuery>({ query: GetAllProducts })
    ]);
    allProductsData = allProducts?.products;
    pageProductData = pageProduct?.product;
  } catch (error: any) {
    console.error(JSON.stringify(error, undefined, 4));
    errorResponse = `Fetch failed: Could not retrieve page data for ${slug} due to server error, please try again or refresh!`;
  }

  return {
    allProductsData,
    pageProductData,
    errorResponse
  };
}

export async function generateMetadata({ params }: ProductDetailParam) {
  const { slug } = await params;
  return {
    title: `Audiophile | ${slug.replaceAll("-", " ").toUpperCase()}`
  };
}

export default async function Page({ params }: ProductDetailParam) {
  const { slug } = await params;
  const { allProductsData, pageProductData, errorResponse } = await getProductInformation(slug);

  return (
    <Suspense fallback={<ProductDetailsLayoutSkeleton />}>
      <PageComponent allProducts={allProductsData} data={pageProductData} error={errorResponse ?? ""} />
    </Suspense>
  );
}
