export type ProductParam = {
  params: {
    category: "headphones" | "earphones" | "speakers";
  };
};

type ImageUrl = { publicUrl: string };

type BoxContent = {
  content: string;
  quantity: string;
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
  features: { document: any[] };
  previewImage: ImageUrl;
  galleryOne: ImageUrl;
  galleryTwo: ImageUrl;
  galleryThree: ImageUrl;
  cartImage: ImageUrl;
  title: string;
  newProduct: boolean;
}

export interface ProductsQuery {
  products: Product[];
}

export interface ProductQuery {
  product: Product;
}

type HomePageHeroes = {
  heroCategory: ProductParam["params"]["category"] | (string & {});
  heroDescription: string;
  heroTitle: string;
};

export type HomePageContent = {
  homePageHeroes: HomePageHeroes[];
};
