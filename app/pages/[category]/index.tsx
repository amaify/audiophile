import { useRouter } from "next/router";
import type { Product, ProductParam, ProductsQuery } from "@/Types/shared-types";
import { GET_PRODUCTS } from "@/queries/AllQueries";
import { fetchDataFromAdmin } from "@/helpers/ServiceClient";
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

  if (error) {
    return (
      <ProductCategoryLayout layoutTitle={pageTitle}>
        <Alert message={error} alertVariant="error" />
      </ProductCategoryLayout>
    );
  }

  if (data.length === 0) {
    return (
      <ProductCategoryLayout layoutTitle={pageTitle}>
        <h1>No Product</h1>
      </ProductCategoryLayout>
    );
  }

  return (
    <ProductCategoryLayout layoutTitle={pageTitle}>
      <section className="w-full flex flex-col gap-[12rem] md:gap-[16rem]">
        {data.map((prodData) => (
          <ProductCategory
            key={prodData.id}
            productSlug={prodData.slug}
            productDescription={prodData.description}
            productImage={prodData.previewImage.publicUrl}
            productTitle={prodData.title}
            newProduct={prodData.newProduct}
            category={pageTitle}
          />
        ))}
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
    const { data } = await fetchDataFromAdmin<ProductsQuery, typeof category>({
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
