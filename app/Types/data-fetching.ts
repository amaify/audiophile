export type ProductParam = {
  params: {
    category: "headphones" | "earphones" | "speakers";
  };
};

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
  previewImage: { publicUrl: string };
  galleryOne: { publicUrl: string };
  galleryTwo: { publicUrl: string };
  galleryThree: { publicUrl: string };
  cartImage: { publicUrl: string };
  title: string;
  newProduct: boolean;
}

export interface ProductsQuery {
  products: Product[];
}

export interface ProductQuery {
  product: Product;
}
