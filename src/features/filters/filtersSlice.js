import { createSlice } from "@reduxjs/toolkit";

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    search: "",
    marketCap: "top_50",
    priceChange: "all",
  },
  reducers: {
    setSearch(state, action) {
      state.search = action.payload;
    },
    setMarketCap(state, action) {
      state.marketCap = action.payload;
    },
    setPriceChange(state, action) {
      state.priceChange = action.payload;
    },
  },
});

export const { setSearch, setMarketCap, setPriceChange } = filtersSlice.actions;
export default filtersSlice.reducer;
