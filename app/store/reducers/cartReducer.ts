import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Cart, CartItem } from "../Types/Cart";
import { sumAllPrice } from "../util/util";

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
      const sum = sumAllPrice(cart);
      const productInCart = cart.find((item) => item.id === action.payload.id);

      if (productInCart) {
        productInCart.itemCount += action.payload.itemCount;
        productInCart.totalPrice += action.payload.totalPrice;
      } else {
        cart.push(action.payload);
      }

      state.total = sum;
      state.grandTotal = sum + 35;
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      const index = state.cart.findIndex((item) => item.id === action.payload);
      if (index !== -1) {
        state.cart.splice(index, 1);
      }

      const sum = sumAllPrice(state.cart);

      state.total = sum;
    },

    removeAllItems: (state) => {
      state.cart = [];
      state.total = 0;
      state.grandTotal = 0;
    },

    incrementCartCount: (state, action: PayloadAction<string>) => {
      const item = state.cart.find((item) => item.id === action.payload);

      if (item) {
        item.itemCount += 1;
        item.totalPrice = item.itemCount * item.price;
      }
    },

    decrementCartCount: (state, action: PayloadAction<string>) => {
      const item = state.cart.find((item) => item.id === action.payload);

      if (item) {
        if (item.itemCount === 1) {
          item.itemCount = 1;
        } else {
          item.itemCount -= 1;
          item.totalPrice = item.itemCount * item.price;
        }
      }
    }
  }
});

export const { addToCart, removeFromCart, removeAllItems, incrementCartCount, decrementCartCount } =
  addToCartSlice.actions;

export const selectCart = (state: RootState) => state.cart;

export default addToCartSlice.reducer;
