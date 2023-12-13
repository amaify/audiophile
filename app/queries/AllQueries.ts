const hygraphFragment = `
  fragment hygraph_fragment on Product {
    id
    newProduct
    title
    slug
    category
    description
    features {
      html
      raw
    }
    suggestionTitle
    price
    boxContent
    cartTitle
    suggestionTitle
    previewImage
    cartImage
  }
`;

export const getHeroSection = `
  query heroSection {
    heroSections {
      title
      category
      description
    }
  }
`;

export const GetProductByCategory = `
  query queryProductByCategory($category: Category!) {
    products(where: { category: $category }) {
      ...hygraph_fragment
    }
  }
  ${hygraphFragment}
`;

export const GetAllProducts = `
  query getAllProducts {
    products {
      ...hygraph_fragment
    }
  }
${hygraphFragment}
`;

export const GetProduct = `
  query getProduct($slug: String!) {
    product(where: { slug: $slug }) {
      ...hygraph_fragment
      cartTitle
      productGalleryImage1
      productGalleryImage2
      productGalleryImage3
    }
  }
  ${hygraphFragment}
`;
