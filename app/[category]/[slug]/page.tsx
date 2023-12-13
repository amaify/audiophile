import { fetchData } from "@/helpers/ServiceClient";
import { Product, ProductsQuery } from "@/Types/sharedTypes";
import { GetAllProducts, GetProduct } from "@/queries/AllQueries";
import PageComponent from "./PageComponent";
import { Category } from "../page";

export type ProductDetailParam = {
  params: { category: Category; slug: string };
};

export async function generateStaticParams() {
  try {
    const { data } = await fetchData<ProductsQuery>({
      query: GetAllProducts
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
      await fetchData<{ product: Product }, typeof slug>({
        query: GetProduct,
        variables: { slug },
        cache: "no-store"
      }),
      await fetchData<ProductsQuery>({ query: GetAllProducts })
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
  return {
    title: `Audiophile | ${params.slug.replaceAll("-", " ").toUpperCase()}`
  };
}

export default async function Page(pageParams: ProductDetailParam) {
  const { allProductsData, pageProductData, errorResponse } = await getProductInformation(pageParams);

  return <PageComponent allProducts={allProductsData} data={pageProductData} error={errorResponse ?? ""} />;
}
