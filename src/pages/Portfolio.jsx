// src/pages/Portfolio.jsx
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect, useCallback } from "react";
import { updateHolding } from "../features/portfolio/portfolioSlice";
import { fetchCoins } from "../features/coins/coinsSlice";
import Navbar from "../components/Navbar";
import ThemeToggle from "../components/ThemeToggle";

export default function Portfolio() {
  const dispatch = useDispatch();

  // Get coins and portfolio from Redux
  const coins = useSelector((state) => state.coins.byId);
  const allCoinIds = useSelector((state) => state.coins.allIds);
  const portfolio = useSelector((state) => state.portfolio);

  // Fetch coin data on mount
  useEffect(() => {
    dispatch(fetchCoins());
  }, [dispatch]);

  // Local input state for all coin fields
  const [localHoldings, setLocalHoldings] = useState({});

  // Handle input changes
  const handleChange = useCallback(
    (e, coinId) => {
      const amount = parseFloat(e.target.value) || 0;
      setLocalHoldings((prev) => ({ ...prev, [coinId]: e.target.value }));
      dispatch(updateHolding({ coinId, amount }));
    },
    [dispatch]
  );

  // Calculate total value
  const totalValue = allCoinIds.reduce((acc, coinId) => {
    const coin = coins[coinId];
    const amount = portfolio[coinId] || 0;
    return coin ? acc + coin.current_price * amount : acc;
  }, 0);

  // Calculate 24h % change
  const totalChange = allCoinIds.reduce(
    (acc, coinId) => {
      const coin = coins[coinId];
      const amount = portfolio[coinId] || 0;
      if (!coin || amount === 0) return acc;

      const current = coin.current_price * amount;
      const prev =
        (coin.current_price / (1 + coin.price_change_percentage_24h / 100)) *
        amount;

      return {
        current: acc.current + current,
        previous: acc.previous + prev,
      };
    },
    { current: 0, previous: 0 }
  );

  const changePercent =
    totalChange.previous === 0
      ? 0
      : ((totalChange.current - totalChange.previous) / totalChange.previous) *
        100;

  return (
    <div className="container mx-auto px-4">
      <Navbar />
      <ThemeToggle />
      <h2 className="text-2xl font-bold mb-4">Your Portfolio</h2>
      <p className="mb-2">
        Total Value: <strong>${totalValue.toFixed(2)}</strong>
      </p>
      <p
        className={`mb-4 ${
          changePercent >= 0 ? "text-green-500" : "text-red-500"
        }`}
      >
        24h Change: {changePercent.toFixed(2)}%
      </p>

      <table className="w-full table-auto text-left border-t">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>24h %</th>
            <th>Holdings</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {allCoinIds.slice(0, 50).map((coinId) => {
            const coin = coins[coinId];
            const amount = portfolio[coinId] || 0;
            const inputValue =
              localHoldings[coinId] ?? (amount !== 0 ? amount : "");
            const value = coin ? coin.current_price * amount : 0;

            return (
              coin && (
                <tr
                  key={coinId}
                  className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="flex items-center gap-2">
                    <img src={coin.image} alt={coin.name} className="w-6 h-6" />
                    <span>
                      {coin.name} ({coin.symbol.toUpperCase()})
                    </span>
                  </td>
                  <td>${coin.current_price.toLocaleString()}</td>
                  <td
                    className={
                      coin.price_change_percentage_24h >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      value={inputValue}
                      onChange={(e) => handleChange(e, coinId)}
                      className="px-4 py-2 border rounded w-24 mb-4 bg-white text-black dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                    />
                  </td>
                  <td>${value.toFixed(2)}</td>
                </tr>
              )
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
