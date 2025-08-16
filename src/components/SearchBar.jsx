import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../features/filters/filtersSlice";

export default function SearchBar() {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.filters.search);

  return (
    <input
      type="text"
      placeholder="Search coins..."
      value={search}
      onChange={(e) => dispatch(setSearch(e.target.value))}
      className="px-4 py-2 border rounded w-full mb-4 bg-white text-black dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
    />
  );
}
