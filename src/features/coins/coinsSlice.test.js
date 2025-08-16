import coinsReducer, { fetchCoins } from "./coinsSlice";

describe("coins reducer", () => {
  const initialState = {
    byId: {},
    allIds: [],
    status: "idle",
    error: null,
  };

  it("should return the initial state", () => {
    expect(coinsReducer(undefined, { type: undefined })).toEqual(initialState);
  });

  it("should handle fetchCoins.pending", () => {
    const action = { type: fetchCoins.pending.type };
    const state = coinsReducer(initialState, action);
    expect(state.status).toBe("loading");
  });
});
