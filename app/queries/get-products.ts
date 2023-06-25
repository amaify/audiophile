import { OperationData, gql } from "@ts-gql/tag";

export const GET_PRODUCTS = gql`
  query GET_PRODUCTS($category: String!) {
    products(where: { category: { equals: $category } }) {
      id
      newProduct
      title
      slug
      cartTitle
      suggestionTitle
      gallery
    }
  }
` as import("../__generated__/ts-gql/GET_PRODUCTS").type;

export type Products = OperationData<typeof GET_PRODUCTS>;
