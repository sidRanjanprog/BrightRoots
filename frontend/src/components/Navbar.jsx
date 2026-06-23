import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div>
          <h1 className="text-3xl font-bold text-green-700">AnkurPath</h1>

          <p className="text-sm text-gray-500">
            Guiding Parents. Nurturing Children.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-8 font-medium">
          <a href="#features">Features</a>
          <a href="#resources">Resources</a>
          <a href="#about">About</a>
        </div>

        {/* Auth Buttons */}
        <div className="flex gap-3">
          <Link
            to="/login"
            className="border border-green-600 text-green-700 px-4 py-2 rounded-lg"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
