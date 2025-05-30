import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { useState, useEffect } from "react";
import { getCards } from "../api/pokemonTcgApi";
import CardGrid from "../components/CardGrid";
import Pagination from "../components/Pagination";
import FilterPanel from "../components/FilterPanel";

function Home() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getCards(currentPage, 20, filters);
        setCards(response.data);
        setTotalPages(Math.ceil(response.totalCount / 20) || 1);
      } catch (error) {
        console.error("Error fetching cards:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, [currentPage, filters]);

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
          className={`py-12 bg-gradient-to-r from-red-500 to-blue-500 rounded-lg shadow-lg mb-8`}
        >
          <div className="container mx-auto px-4 text-center">
            <h1 className={"text-3xl md:text-4xl font-bold mb-4 text-white"}>
              Welcome to PokéTCG Market
            </h1>
            <p className="text-lg text-white mb-6">
              Discover, collect, and track your favorite Pokémon trading cards
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
      <Footer />
    </div>
  );
}

export default Home;
