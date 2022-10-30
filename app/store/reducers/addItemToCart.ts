import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Cart, CartItem } from "../Types/Cart";

const initialState: Cart = {
	cart: [],
	total: 0,
};

export const addToCartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<CartItem>) => {
			state.cart.push(action.payload);
		},
	},
});

export const { addToCart } = addToCartSlice.actions;

export const selectValue = (state: RootState) => state.cart;

export default addToCartSlice.reducer;
