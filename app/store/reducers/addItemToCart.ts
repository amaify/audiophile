import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Cart, CartItem } from "../Types/Cart";
import { sumAllPrice } from "../util/util";

const initialState: Cart = {
	cart: [],
	total: 0,
};

export const addToCartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<CartItem>) => {
			const { cart } = state;

			cart.push(action.payload);

			const sum = sumAllPrice(cart);

			state.total = sum;
		},

		removeFromCart: (state, action: PayloadAction<number>) => {
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
		},

		incrementCartCount: (state, action: PayloadAction<number>) => {
			const item = state.cart.find((item) => item.id === action.payload);

			if (item) {
				item.itemCount += 1;
				item.totalPrice = item.itemCount * item.price;
			}
		},

		decrementCartCount: (state, action: PayloadAction<number>) => {
			const item = state.cart.find((item) => item.id === action.payload);

			if (item) {
				if (item.itemCount === 1) {
					item.itemCount = 1;
				} else {
					item.itemCount -= 1;
					item.totalPrice = item.itemCount * item.price;
				}
			}
		},
	},
});

export const {
	addToCart,
	removeFromCart,
	removeAllItems,
	incrementCartCount,
	decrementCartCount,
} = addToCartSlice.actions;

export const selectValue = (state: RootState) => state.cart;

export default addToCartSlice.reducer;
