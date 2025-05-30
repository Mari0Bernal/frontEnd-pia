import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { searchCards } from "../api/pokemonTcgApi";
import CardGrid from "../components/CardGrid";
import Pagination from "../components/Pagination";
import FilterPanel from "../components/FilterPanel";
import Header from "../components/layout/Header";

function SearchResultsPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("q") || "";

  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchQuery) {
        setCards([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Combine search query with other filters
        const combinedFilters = { ...filters };

        const response = await searchCards(searchQuery, currentPage, 20);
        setCards(response.data);
        setTotalPages(Math.ceil(response.totalCount / 20) || 1);
      } catch (error) {
        console.error("Error searching cards:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery, currentPage, filters]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top when changing page
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto py-6 px-4 space-y-6">
        <section
          className={`py-8 bg-gradient-to-r from-red-500 to-blue-500 rounded-lg shadow-lg mb-6`}
        >
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold mb-2 text-white">
              Search Results: "{searchQuery}"
            </h1>
            <p className="text-white">
              {loading
                ? "Searching..."
                : cards.length > 0
                ? `Found ${cards.length} cards`
                : "No cards found"}
            </p>
          </div>
        </section>

        <FilterPanel filters={filters} onFilterChange={handleFilterChange} />

        <CardGrid cards={cards} loading={loading} error={error} />

        {!loading && !error && cards.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </main>
    </div>
  );
}

export default SearchResultsPage;
