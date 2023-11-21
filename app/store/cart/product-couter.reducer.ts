import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

const initialState: { value: number } = {
  value: 1
};

export const productCounter = createSlice({
  name: "productCounterReducer",
  initialState,
  reducers: {
    incrementCount: (state) => {
      state.value += 1;
    },

    decrementCount: (state) => {
      if (state.value === 1) return;
      state.value -= 1;
    },

    resetCount: () => initialState
  }
});

export const { incrementCount, decrementCount, resetCount } = productCounter.actions;
export default productCounter.reducer;

export const selectItemCount = (state: RootState) => state.productCounter.value;
