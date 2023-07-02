export type ProductParam = {
  params: {
    category: "headphones" | "earphones" | "speakers";
  };
};

export interface Product {
  id: string;
  slug: string;
  category: string;
  description: string;
  previewImage: { publicUrl: string };
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
