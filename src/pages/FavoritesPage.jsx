import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { useState, useEffect } from "react";
import { getCardById } from "../api/pokemonTcgApi";
import { useFavorites } from "../Context/FavoritesContext";
import CardGrid from "../components/CardGrid";
import LoadingSpinner from "../components/LoadingSpinner";

function FavoritesPage() {
  const { favorites } = useFavorites();
  const [favoriteCards, setFavoriteCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavoriteCards = async () => {
      if (favorites.length === 0) {
        setFavoriteCards([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const cardPromises = favorites.map((id) => getCardById(id));
        const cardResponses = await Promise.all(cardPromises);

        setFavoriteCards(cardResponses.map((response) => response.data));
      } catch (error) {
        console.error("Error fetching favorite cards:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteCards();
  }, [favorites]);
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 space-y-6">
        <section
          className={
            "py-10 bg-gradient-to-r from-red-500 to-blue-500 rounded-lg shadow-lg mb-6"
          }
        >
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold mb-4 text-white">
              My Collection
            </h1>
            <p className="text-lg text-white">
              View and manage your favorite Pokémon cards
            </p>
          </div>
        </section>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-red-500 text-lg">
              Error loading favorite cards: {error.message}
            </p>
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        ) : favoriteCards.length === 0 ? (
          <div
            className={`text-center py-16 px-4 rounded-lg bg-white shadow-md`}
          >
            <h2 className="text-xl font-semibold mb-2">
              Your collection is empty
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Add cards to your favorites to build your collection
            </p>
            <a
              href="/"
              className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
            >
              Browse Cards
            </a>
          </div>
        ) : (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                Your Cards ({favoriteCards.length})
              </h2>
            </div>

            <CardGrid cards={favoriteCards} loading={false} error={null} />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default FavoritesPage;
