import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

const initialState: { value: number } = {
  value: 1
};

export const ProdQuantity = createSlice({
  name: "itemCount",
  initialState,
  reducers: {
    incrementCount: (state) => {
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
    }
  }
});

export const { incrementCount, decrementCount, resetCount } = ProdQuantity.actions;

export const selectItemCount = (state: RootState) => state.itemCount.value;

export default ProdQuantity.reducer;
