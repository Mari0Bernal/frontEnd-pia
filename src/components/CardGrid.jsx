import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useFavorites } from "../Context/FavoritesContext";
import LoadingSpinner from "./LoadingSpinner";

function CardGrid({ cards, loading, error }) {
  const { favorites, toggleFavorite } = useFavorites();
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 text-lg">
          Error loading cards: {error.message}
        </p>
        <button
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!cards || cards.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-lg">No cards found. Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {cards.map((card) => (
        <CardItem
          key={card.id}
          card={card}
          isFavorite={favorites.includes(card.id)}
          toggleFavorite={toggleFavorite}
        />
      ))}
    </div>
  );
}

function CardItem({ card, isFavorite, toggleFavorite }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(card.id);
  };

  return (
    <Link
      to={`/card/${card.id}`}
      className={`relative group rounded-lg overflow-hidden transition-all duration-300 bg-white shadow-md hover:shadow-xl transform hover:-translate-y-1`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card Image */}
      <div className="relative aspect-[2.5/3.5] overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
            <LoadingSpinner size="small" />
          </div>
        )}
        <img
          src={card.images.small}
          alt={card.name}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isHovered ? "scale-110" : "scale-100"
          } ${imageLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Price Tag */}
        {card.cardmarket?.prices?.averageSellPrice && (
          <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded-md text-xs">
            ${card.cardmarket.prices.averageSellPrice.toFixed(2)}
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-2 right-2 p-2 rounded-full ${
            isFavorite
              ? "bg-red-500 text-white"
              : "bg-black/50 text-white hover:bg-black/70"
          } transition-colors duration-200`}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart size={16} fill={isFavorite ? "white" : "none"} />
        </button>
      </div>

      {/* Card Info */}
      <div className="p-3">
        <h3 className="font-semibold text-sm truncate">{card.name}</h3>
        <div className="flex justify-between items-center mt-1">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {card.set.name}
          </span>
          <span
            className={`text-xs px-2 py-0.5 rounded-full ${getRarityColor(
              card.rarity
            )}`}
          >
            {card.rarity}
          </span>
        </div>
      </div>
    </Link>
  );
}

// Helper function to get color based on rarity
function getRarityColor(rarity) {
  if (!rarity) return "bg-gray-200 text-gray-800";

  switch (rarity.toLowerCase()) {
    case "common":
      return "bg-gray-200 text-gray-800";
    case "uncommon":
      return "bg-green-100 text-green-800";
    case "rare":
      return "bg-blue-100 text-blue-800";
    case "rare holo":
    case "rare ultra":
    case "rare secret":
      return "bg-purple-100 text-purple-800";
    case "rare rainbow":
      return "bg-pink-100 text-pink-800";
    case "amazing rare":
      return "bg-indigo-100 text-indigo-800";
    case "legendary":
    case "ultra rare":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-200 text-gray-800";
  }
}

export default CardGrid;
