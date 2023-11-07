import { CartItem } from "../reducers/cartReducer";

export const sumAllPrice = (cart: CartItem[]) => cart.reduce((acc, curr) => acc + curr.totalPrice, 0);

export const calculateVAT = (productPrice: number) => productPrice * 0.2;
