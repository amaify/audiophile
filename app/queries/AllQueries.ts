const PRODUCT_FRAGMENT = `
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

export const GET_PRODUCTS = `
  query GET_PRODUCTS($category: String!) {
    products(where: { category: { equals: $category } }) {
      ...product_fragment
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export const GET_ALL_PRODUCTS = `
  query GET_ALL_PRODUCTS {
    products {
      ...product_fragment
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export const GET_PRODUCT = `
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
  ${PRODUCT_FRAGMENT}
`;

export const HOME_PAGE_HERO_SECTION = `
  query heroSection {
    homePageHeroes {
      heroCategory
      heroDescription
      heroTitle
    }
  }
`;
