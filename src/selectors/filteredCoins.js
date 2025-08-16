import { createSelector } from "@reduxjs/toolkit";

export const selectFilteredCoins = createSelector(
  [
    (state) => state.coins.byId,
    (state) => state.coins.allIds,
    (state) => state.filters,
  ],
  (byId, allIds, filters) => {
    let coins = allIds.map((id) => byId[id]);

    if (filters.search) {
      const term = filters.search.toLowerCase();
      coins = coins.filter(
        (c) =>
          c.name.toLowerCase().includes(term) ||
          c.symbol.toLowerCase().includes(term)
      );
    }

    if (filters.marketCap === "top_10") {
      coins = coins.slice(0, 10);
    } else {
      coins = coins.slice(0, 50);
    }

    if (filters.priceChange === "positive") {
      coins = coins.filter((c) => c.price_change_percentage_24h > 0);
    } else if (filters.priceChange === "negative") {
      coins = coins.filter((c) => c.price_change_percentage_24h < 0);
    }

    return coins;
  }
);
