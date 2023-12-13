import type { ProductsQuery } from "@/Types/sharedTypes";
import { fetchData } from "@/helpers/ServiceClient";
import { Alert } from "@/components/shared/Alert";
import ProductCategory from "@/components/shared/ProductCategory";
import ProductCategoryLayout from "@/components/layout/ProductCategoryLayout";
import { GetProductByCategory } from "@/queries/AllQueries";

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

async function getProductByCategory({ params }: PageParam) {
  const { category } = params;
  const firstLetterInCategory = category.charAt(0).toUpperCase();
  const capitalizedCategory = firstLetterInCategory + category.slice(1);
  let productCategoryData!: ProductsQuery;
  let errorResponse = "";

  try {
    const { data } = await fetchData<ProductsQuery, typeof category>({
      query: GetProductByCategory,
      variables: { category: capitalizedCategory as Category },
      cache: "no-store"
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

export default async function Page(pageParams: PageParam) {
  const { errorResponse, productCategoryData } = await getProductByCategory(pageParams);
  const pageTitle = pageParams.params.category;

  if (errorResponse) {
    return (
      <ProductCategoryLayout layoutTitle={pageTitle}>
        <Alert message={errorResponse} alertVariant="error" />
      </ProductCategoryLayout>
    );
  }

  if (productCategoryData?.length === 0) {
    return (
      <ProductCategoryLayout layoutTitle={pageTitle}>
        <Alert message="No product" alertVariant="warning" />
      </ProductCategoryLayout>
    );
  }

  return (
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
  );
}
