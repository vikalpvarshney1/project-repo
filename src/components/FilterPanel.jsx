import { useDispatch, useSelector } from "react-redux";
import { setMarketCap, setPriceChange } from "../features/filters/filtersSlice";

export default function FilterPanel() {
  const dispatch = useDispatch();
  const { marketCap, priceChange } = useSelector((state) => state.filters);

  return (
    <div className="flex gap-4 mb-4">
      <select
        value={marketCap}
        onChange={(e) => dispatch(setMarketCap(e.target.value))}
        className="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
      >
        <option value="top_10">Top 10</option>
        <option value="top_50">Top 50</option>
      </select>

      <select
        value={priceChange}
        onChange={(e) => dispatch(setPriceChange(e.target.value))}
        className="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
      >
        <option value="all">All</option>
        <option value="positive">Positive 24h</option>
        <option value="negative">Negative 24h</option>
      </select>
    </div>
  );
}
