import { fetchDataFromAdmin } from "@/helpers/ServiceClient";
import { GET_ALL_PRODUCTS, GET_PRODUCT } from "@/queries/AllQueries";
import { Product, ProductsQuery } from "@/Types/shared-types";
import PageComponent from "./PageComponent";
import { Category } from "../page";

export type ProductDetailParam = {
  params: { category: Category; slug: string };
};

export async function generateStaticParams() {
  try {
    const { data } = await fetchDataFromAdmin<ProductsQuery>({
      query: GET_ALL_PRODUCTS
    });

    const { products } = data;
    return products.map((product) => ({ category: product.category, slug: product.slug }));
  } catch (error) {
    console.error(JSON.stringify(error, undefined, 4));
    return [];
  }
}

async function getProductInformation({ params }: ProductDetailParam) {
  const { slug } = params;
  let allProductsData!: Product[];
  let pageProductData!: Product;
  let errorResponse = "";

  try {
    const [{ data: pageProduct }, { data: allProducts }] = await Promise.all([
      await fetchDataFromAdmin<ProductsQuery, typeof slug>({
        query: GET_PRODUCT,
        variables: { slug },
        cache: "no-store"
      }),
      await fetchDataFromAdmin<ProductsQuery>({ query: GET_ALL_PRODUCTS })
    ]);

    allProductsData = allProducts?.products;
    pageProductData = pageProduct?.products[0];
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
  return {
    title: `Audiophile | ${params.slug.replaceAll("-", " ").toUpperCase()}`
  };
}

export default async function Page(pageParams: ProductDetailParam) {
  const { allProductsData, pageProductData, errorResponse } = await getProductInformation(pageParams);

  return <PageComponent allProducts={allProductsData} data={pageProductData} error={errorResponse ?? ""} />;
}
