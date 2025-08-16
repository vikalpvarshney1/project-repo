import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white mb-6">
      <h1 className="text-lg font-bold">Crypto Portfolio</h1>
      <div className="space-x-4">
        <Link to="/dashboard" className="hover:underline">
          Dashboard
        </Link>
        <Link to="/portfolio" className="hover:underline">
          Portfolio
        </Link>
      </div>
    </nav>
  );
}
