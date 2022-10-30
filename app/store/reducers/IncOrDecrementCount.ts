import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { CartItem } from "../Types/Cart";

interface Count {
	value: number;
}

const initialState: Count = {
	value: 1,
};

export const ProdQuantity = createSlice({
	name: "itemCount",
	initialState,
	reducers: {
		incrementCount: (state) => {
			console.log(state);
			state.value += 1;
		},

		decrementCount: (state) => {
			if (state.value === 1) {
				state.value = 1;
			} else {
				state.value -= 1;
			}
		},

		resetCount: (state) => {
			state.value = 1;
		},
	},
});

export const { incrementCount, decrementCount, resetCount } =
	ProdQuantity.actions;

export const selectValue = (state: RootState) => state.itemCount.value;

export default ProdQuantity.reducer;
