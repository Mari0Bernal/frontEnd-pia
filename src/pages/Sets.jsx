import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { useState, useEffect } from "react";
import { getSetSection } from "../api/pokemonTcgApi";
import SetGrid from "../components/SetGrid";
import Pagination from "../components/Pagination";

function Sets() {
  const [sets, setSets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    const fecthSets = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getSetSection(currentPage, 20);
        setSets(response.data);
        setTotalPages(Math.ceil(response.totalCount / 20) || 1);
      } catch (error) {
        console.error("Error fetching sets:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fecthSets();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top when changing page
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto py-6 px-4 space-y-6">
        <section className="py-12 bg-gradient-to-r from-red-500 to-blue-500 rounded-lg shadow-lg mb-8">
          <div className="container mx-auto px-4 text-center">
            <h1 className={"text-3xl md:text-4xl font-bold mb-4 text-white"}>
              Pokémon Sets
            </h1>
            <p className="text-lg text-white">
              See the various Pokémon sets available in the market.
            </p>
          </div>
        </section>
        <SetGrid sets={sets} loading={loading} error={error} />

        {!loading && !error && sets.length > 0 && (
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

export default Sets;
