import { createSlice } from "@reduxjs/toolkit";

const portfolioSlice = createSlice({
  name: "portfolio",
  initialState: {},
  reducers: {
    updateHolding(state, action) {
      const { coinId, amount } = action.payload;
      state[coinId] = amount;
    },
  },
});

export const { updateHolding } = portfolioSlice.actions;
export default portfolioSlice.reducer;
