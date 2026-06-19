import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 shadow">
      <h1 className="text-2xl font-bold text-black-600">
        TripAI
      </h1>

      <div className="space-x-4">
        <Link to="/login">
          <button className="px-4 py-2 border rounded">
            Login
          </button>
        </Link>

        <Link to="/signup">
          <button className="px-4 py-2 bg-teal-400 text-white rounded">
            Sign Up
          </button>
        </Link>
      </div>
    </nav>
  );
}