export type CartItem = {
  id: string;
  title: string;
  itemCount: number;
  price: number;
  cartImage: string;
  totalPrice: number;
};

export type Cart = {
  cart: CartItem[];
  total: number;
  grandTotal: number;
};
