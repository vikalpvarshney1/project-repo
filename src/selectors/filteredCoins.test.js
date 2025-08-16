import { selectFilteredCoins } from "./filteredCoins";

describe("selectFilteredCoins", () => {
  it("filters coins by search term", () => {
    const state = {
      coins: {
        byId: {
          bitcoin: { id: "bitcoin", name: "Bitcoin", symbol: "btc" },
          ethereum: { id: "ethereum", name: "Ethereum", symbol: "eth" },
        },
        allIds: ["bitcoin", "ethereum"],
      },
      filters: { search: "bit", marketCap: "top_50", priceChange: "all" },
    };
    const result = selectFilteredCoins(state);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("bitcoin");
  });
});
