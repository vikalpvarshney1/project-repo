import { memo } from "react";

const CoinRow = memo(({ coin }) => {
  return (
    <tr
      key={coin.id}
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
      <td>${coin.market_cap.toLocaleString()}</td>
    </tr>
  );
});

export default CoinRow;
