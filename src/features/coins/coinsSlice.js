import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCoins = createAsyncThunk("coins/fetchCoins", async () => {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1"
  );
  return await res.json();
});

const coinsSlice = createSlice({
  name: "coins",
  initialState: {
    byId: {},
    allIds: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoins.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCoins.fulfilled, (state, action) => {
        state.status = "succeeded";
        const normalized = {};
        const ids = [];
        action.payload.forEach((coin) => {
          normalized[coin.id] = coin;
          ids.push(coin.id);
        });
        state.byId = normalized;
        state.allIds = ids;
      })
      .addCase(fetchCoins.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default coinsSlice.reducer;
