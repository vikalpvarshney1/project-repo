import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchCoins } from "../features/coins/coinsSlice";
import { selectFilteredCoins } from "../selectors/filteredCoins";
import SearchBar from "../components/SearchBar";
import FilterPanel from "../components/FilterPanel";
import ThemeToggle from "../components/ThemeToggle";
import Navbar from "../components/Navbar";
import CoinRow from "../components/CoinRow";
import { toast } from "react-toastify";
import ErrorToastHandler from "../components/ErrorToastHandler";
export default function Dashboard() {
  const dispatch = useDispatch();
  const coins = useSelector(selectFilteredCoins);
  const status = useSelector((state) => state.coins.status);
  const error = useSelector((state) => state.coins.error);

  useEffect(() => {
    dispatch(fetchCoins());
    const interval = setInterval(() => dispatch(fetchCoins()), 30000);
    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    if (status === "failed" && error) toast.error(error);
  }, [status, error]);

  return (
    <div className="container mx-auto px-4">
      <Navbar />
      <ThemeToggle />
      <ErrorToastHandler />
      <SearchBar />
      <FilterPanel />
      {status === "loading" ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full table-auto text-left border-t">
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>24h %</th>
              <th>Market Cap</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => (
              <CoinRow key={coin.id} coin={coin} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
