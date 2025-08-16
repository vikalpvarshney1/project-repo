import { configureStore } from "@reduxjs/toolkit";
import coinsReducer from "../features/coins/coinsSlice";
import portfolioReducer from "../features/portfolio/portfolioSlice";
import filtersReducer from "../features/filters/filtersSlice";
import themeReducer from "../features/theme/themeSlice";

export const store = configureStore({
  reducer: {
    coins: coinsReducer,
    portfolio: portfolioReducer,
    filters: filtersReducer,
    theme: themeReducer,
  },
});
