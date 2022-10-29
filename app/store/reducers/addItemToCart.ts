import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface CartItem {
	title: string;
	quantity: number;
	price: number;
	totalPrice: number;
}

const initialState: CartItem[] = [];

export const addToCartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<CartItem>) => {
			state.push(action.payload);
		},
	},
});

export const { addToCart } = addToCartSlice.actions;

export const selectValue = (state: RootState) => state.cart;

export default addToCartSlice.reducer;
