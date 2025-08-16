import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/theme/themeSlice";

export default function ThemeToggle() {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.theme.mode);

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="px-4 py-2 border rounded mb-4"
    >
      Switch to {mode === "light" ? "Dark" : "Light"} Mode
    </button>
  );
}
