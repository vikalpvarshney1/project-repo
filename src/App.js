
import logo from "./logo.svg";
import "./App.css";
import AppRouter from "./routes/AppRouter";
import { useSelector } from "react-redux";
function App() {
  const theme = useSelector((state) => state.theme.mode); // 'light' or 'dark'

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-white transition-colors duration-300">
        <AppRouter />
      </div>
    </div>
  );
}

export default App;
