import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { sumAllPrice } from "../util/util";
import type { RootState } from "../store";

export type CartItem = {
  id: string;
  cartTitle: string;
  productTitle: string;
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

const initialState: Cart = {
  cart: [],
  total: 0,
  grandTotal: 0
};

export const addToCartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const { cart } = state;
      const productInCart = cart.find((item) => item.id === action.payload.id);

      if (productInCart) {
        productInCart.itemCount += action.payload.itemCount;
        productInCart.totalPrice += action.payload.totalPrice;
      } else {
        cart.push(action.payload);
      }

      const sum = sumAllPrice(cart);
      state.total = sum;
      state.grandTotal = sum + 35;
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      const index = state.cart.findIndex((item) => item.id === action.payload);
      if (index !== -1) state.cart.splice(index, 1);
      const sum = sumAllPrice(state.cart);
      state.total = sum;
    },

    resetCart: () => initialState,

    incrementCartCount: (state, action: PayloadAction<string>) => {
      const item = state.cart.find((cartItem) => cartItem.id === action.payload);
      if (item) {
        item.itemCount += 1;
        item.totalPrice = item.itemCount * item.price;
      }
    },

    decrementCartCount: (state, action: PayloadAction<string>) => {
      const item = state.cart.find((cartItem) => cartItem.id === action.payload);
      if (item && item.itemCount === 1) {
        item.itemCount = 1;
        return;
      }

      if (item && item.itemCount > 1) {
        item.itemCount -= 1;
        item.totalPrice = item.itemCount * item.price;
      }
    }
  }
});

export const { addToCart, removeFromCart, resetCart, incrementCartCount, decrementCartCount } = addToCartSlice.actions;
export const selectCart = (state: RootState) => state.cart;

export default addToCartSlice.reducer;
