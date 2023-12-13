export type ProductCategory = "headphones" | "earphones" | "speakers";

export type ProductParam = {
  params: {
    category: ProductCategory;
  };
};

type HygraphImageUrl = { secure_url: string };
type BoxContent = { content: string; quantity: string };

export type HeroSection = {
  title: string;
  category: ProductCategory | (string & {});
  description: string;
};

export type HeroSectionData = {
  heroSections: HeroSection[];
};

export interface Product {
  id: string;
  slug: string;
  category: string;
  description: string;
  price: number;
  cartTitle: string;
  suggestionTitle: string;
  boxContent: BoxContent[];
  features: { raw: any };
  previewImage: HygraphImageUrl;
  productGalleryImage1: HygraphImageUrl;
  productGalleryImage2: HygraphImageUrl;
  productGalleryImage3: HygraphImageUrl;
  cartImage: HygraphImageUrl;
  title: string;
  newProduct: boolean;
}

export interface ProductsQuery {
  products: Product[];
}
