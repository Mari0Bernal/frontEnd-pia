import { Link, useNavigate } from "react-router-dom";
import { Search, Heart, Menu, X, Sun, Moon } from "lucide-react";
import { useState } from "react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsMenuOpen(false);
    }
  };
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
              PokéTCG Market
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <form onSubmit={handleSearch} className="m-4 relative">
              <input
                type="text"
                placeholder="Search cards..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full py-2 pl-10 pr-4 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-100 text-gray-900 border-gray-300`}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
            </form>

            <Link
              to="/"
              className="font-medium hover:text-red-500 transition duration-200"
            >
              Home
            </Link>
            <Link
              to="/sets"
              className="font-medium hover:text-red-500 transition duration-200"
            >
              Sets
            </Link>
            <Link
              to="/favorites"
              className="font-medium hover:text-red-500 transition duration-200"
            >
              My Favorites
            </Link>
            <Link
              to="/about"
              className="font-medium hover:text-red-500 transition duration-200"
            >
              About
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-200"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            className={`md:hidden py-4 bg-white
          `}
          >
            <form onSubmit={handleSearch} className="mb-4 relative">
              <input
                type="text"
                placeholder="Search cards..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full py-2 pl-10 pr-4 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-100 text-gray-900 border-gray-300`}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" />
            </form>

            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="px-4 py-2 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/sets"
                className="px-4 py-2 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Sets
              </Link>
              <Link
                to="/favorites"
                className="px-4 py-2 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                My Favorites
              </Link>
              <Link
                to="/about"
                className="px-4 py-2 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
