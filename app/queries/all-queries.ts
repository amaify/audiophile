import { gql } from "@apollo/client";

const PRODUCT_FRAGMENT = gql`
  fragment product_fragment on Product {
    id
    newProduct
    title
    slug
    category
    description
    features {
      document
    }
    suggestionTitle
    price
    boxContent
    cartTitle
    suggestionTitle
    previewImage {
      publicUrl
    }
    cartImage {
      publicUrl
    }
  }
`;

export const GET_PRODUCTS = gql`
  ${PRODUCT_FRAGMENT}
  query GET_PRODUCTS($category: String!) {
    products(where: { category: { equals: $category } }) {
      ...product_fragment
    }
  }
`;

export const GET_ALL_PRODUCTS = gql`
  ${PRODUCT_FRAGMENT}
  query GET_ALL_PRODUCTS {
    products {
      ...product_fragment
    }
  }
`;

export const GET_PRODUCT = gql`
  ${PRODUCT_FRAGMENT}
  query GET_PRODUCTS($slug: String!) {
    products(where: { slug: { equals: $slug } }) {
      ...product_fragment
      cartTitle
      galleryOne {
        publicUrl
      }
      galleryTwo {
        publicUrl
      }
      galleryThree {
        publicUrl
      }
    }
  }
`;

export const HOME_PAGE = gql`
  query heroSection {
    homePageHeroes {
      heroCategory
      heroDescription
      heroTitle
    }
  }
`;
