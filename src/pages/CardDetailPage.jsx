import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  ExternalLink,
  DollarSign,
  Bookmark,
} from "lucide-react";
import { getCardById } from "../api/pokemonTcgApi";
import { useFavorites } from "../Context/FavoritesContext";
import LoadingSpinner from "../components/LoadingSpinner";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

function CardDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { favorites, toggleFavorite } = useFavorites();

  useEffect(() => {
    const fetchCard = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getCardById(id);
        setCard(response.data);
      } catch (error) {
        console.error("Error fetching card:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCard();
    }
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 text-lg">
          Error loading card: {error.message}
        </p>
        <button
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
          onClick={handleGoBack}
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!card) {
    return (
      <div className="text-center py-10">
        <p className="text-lg">Card not found.</p>
        <button
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
          onClick={handleGoBack}
        >
          Go Back
        </button>
      </div>
    );
  }

  const isFavorite = favorites.includes(card.id);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <div className="flex-grow container mx-auto py-6 px-4">
        {/* Back button */}
        <button
          className="flex items-center mb-6 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition duration-200"
          onClick={handleGoBack}
        >
          <ArrowLeft size={18} className="mr-1" />
          Back to results
        </button>

        <div className={`rounded-lg overflow-hidden shadow-lg bg-white`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {/* Card Image */}
            <div className="p-6 flex justify-center items-start">
              <div className="relative">
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
                    <LoadingSpinner />
                  </div>
                )}
                <img
                  src={card.images.large}
                  alt={card.name}
                  className={`rounded-lg shadow-md transition-opacity duration-300 ${
                    imageLoaded ? "opacity-100" : "opacity-0"
                  }`}
                  onLoad={() => setImageLoaded(true)}
                />

                {/* Favorite Button */}
                <button
                  onClick={() => toggleFavorite(card.id)}
                  className={`absolute top-3 right-3 p-3 rounded-full ${
                    isFavorite
                      ? "bg-red-500 text-white"
                      : "bg-black/50 text-white hover:bg-black/70"
                  } transition-colors duration-200`}
                  aria-label={
                    isFavorite ? "Remove from favorites" : "Add to favorites"
                  }
                >
                  <Heart size={20} fill={isFavorite ? "white" : "none"} />
                </button>
              </div>
            </div>

            {/* Card Info */}
            <div className="p-6 border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-700">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold mb-1">{card.name}</h1>
                  <div className="flex items-center mb-4">
                    <span
                      className={`text-sm px-2 py-0.5 rounded-full ${getRarityColor(
                        card.rarity
                      )}`}
                    >
                      {card.rarity}
                    </span>
                    {card.supertype && (
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                        {card.supertype}
                      </span>
                    )}
                    {card.subtypes && card.subtypes.length > 0 && (
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                        - {card.subtypes.join(", ")}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Set Information */}
              <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Set Information</h2>
                <p className="text-sm">
                  <span className="font-medium">Set:</span> {card.set.name}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Series:</span> {card.set.series}
                </p>
                {card.number && (
                  <p className="text-sm">
                    <span className="font-medium">Card Number:</span>{" "}
                    {card.number}/{card.set.printedTotal}
                  </p>
                )}
                {card.artist && (
                  <p className="text-sm">
                    <span className="font-medium">Artist:</span> {card.artist}
                  </p>
                )}
              </div>

              {/* Card Details */}
              {card.hp && (
                <div className="mb-4">
                  <h2 className="text-lg font-semibold mb-2">Card Details</h2>
                  <p className="text-sm">
                    <span className="font-medium">HP:</span> {card.hp}
                  </p>
                  {card.types && card.types.length > 0 && (
                    <p className="text-sm">
                      <span className="font-medium">Types:</span>{" "}
                      {card.types.join(", ")}
                    </p>
                  )}
                  {card.weaknesses && card.weaknesses.length > 0 && (
                    <p className="text-sm">
                      <span className="font-medium">Weaknesses:</span>{" "}
                      {card.weaknesses
                        .map((w) => `${w.type} (${w.value})`)
                        .join(", ")}
                    </p>
                  )}
                  {card.resistances && card.resistances.length > 0 && (
                    <p className="text-sm">
                      <span className="font-medium">Resistances:</span>{" "}
                      {card.resistances
                        .map((r) => `${r.type} (${r.value})`)
                        .join(", ")}
                    </p>
                  )}
                  {card.retreatCost && (
                    <p className="text-sm">
                      <span className="font-medium">Retreat Cost:</span>{" "}
                      {card.retreatCost.length}
                    </p>
                  )}
                </div>
              )}

              {/* Rules or Abilities */}
              {(card.rules ||
                (card.abilities && card.abilities.length > 0)) && (
                <div className="mb-4">
                  <h2 className="text-lg font-semibold mb-2">
                    {card.rules ? "Rules" : "Abilities"}
                  </h2>
                  {card.rules &&
                    card.rules.map((rule, index) => (
                      <p key={index} className="text-sm mb-2 italic">
                        {rule}
                      </p>
                    ))}
                  {card.abilities &&
                    card.abilities.map((ability, index) => (
                      <div key={index} className="mb-2">
                        <p className="text-sm font-medium">
                          {ability.name} {ability.type && `(${ability.type})`}
                        </p>
                        <p className="text-sm italic">{ability.text}</p>
                      </div>
                    ))}
                </div>
              )}

              {/* Attacks */}
              {card.attacks && card.attacks.length > 0 && (
                <div className="mb-4">
                  <h2 className="text-lg font-semibold mb-2">Attacks</h2>
                  {card.attacks.map((attack, index) => (
                    <div key={index} className="mb-3">
                      <div className="flex items-center">
                        <span className="font-medium">{attack.name}</span>
                        {attack.damage && (
                          <span className="ml-2 text-sm bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded">
                            {attack.damage}
                          </span>
                        )}
                      </div>
                      {attack.cost && attack.cost.length > 0 && (
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          Cost: {attack.cost.join(", ")}
                        </p>
                      )}
                      {attack.text && (
                        <p className="text-sm mt-1 italic">{attack.text}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Pricing Information */}
            <div className="p-6 border-t lg:border-t-0 lg:border-l border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <DollarSign size={18} className="mr-1" />
                Market Prices
              </h2>

              {card.cardmarket?.prices ? (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg bg-gray-100 `}>
                    <p className="text-lg font-bold text-red-500">
                      $
                      {card.cardmarket.prices.averageSellPrice?.toFixed(2) ||
                        "N/A"}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Average Selling Price
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className={`p-3 rounded-lg bg-gray-100 `}>
                      <p className="font-semibold">
                        ${card.cardmarket.prices.lowPrice?.toFixed(2) || "N/A"}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Lowest Price
                      </p>
                    </div>

                    <div className={`p-3 rounded-lg bg-gray-100 `}>
                      <p className="font-semibold">
                        $
                        {card.cardmarket.prices.trendPrice?.toFixed(2) || "N/A"}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Trend Price
                      </p>
                    </div>

                    <div className={`p-3 rounded-lg bg-gray-100 `}>
                      <p className="font-semibold">
                        ${card.cardmarket.prices.avg1?.toFixed(2) || "N/A"}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        1 Day Average
                      </p>
                    </div>

                    <div className={`p-3 rounded-lg bg-gray-100 `}>
                      <p className="font-semibold">
                        ${card.cardmarket.prices.avg7?.toFixed(2) || "N/A"}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        7 Day Average
                      </p>
                    </div>

                    <div className={`p-3 rounded-lg bg-gray-100 `}>
                      <p className="font-semibold">
                        ${card.cardmarket.prices.avg30?.toFixed(2) || "N/A"}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        30 Day Average
                      </p>
                    </div>

                    <div className={`p-3 rounded-lg bg-gray-100 `}>
                      <p className="font-semibold">
                        $
                        {card.cardmarket.prices.reverseHoloAvg1?.toFixed(2) ||
                          "N/A"}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Reverse Holo Avg
                      </p>
                    </div>
                  </div>

                  {card.cardmarket.url && (
                    <a
                      href={card.cardmarket.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-full mt-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
                    >
                      <ExternalLink size={16} className="mr-2" />
                      View on CardMarket
                    </a>
                  )}
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-400">
                  No pricing information available for this card.
                </p>
              )}

              {/* TCGPlayer Pricing if available */}
              {card.tcgplayer?.prices && (
                <div className="mt-6">
                  <h3 className="text-md font-semibold mb-3">
                    TCGPlayer Prices
                  </h3>

                  {Object.entries(card.tcgplayer.prices).map(
                    ([variant, prices]) => (
                      <div key={variant} className="mb-3">
                        <p className="text-sm font-medium capitalize">
                          {variant.replace(/([A-Z])/g, " $1").trim()}
                        </p>
                        <div className="grid grid-cols-3 gap-2 mt-1">
                          <div className="text-xs">
                            <p className="text-gray-600 dark:text-gray-400">
                              Low
                            </p>
                            <p>${prices.low?.toFixed(2) || "N/A"}</p>
                          </div>
                          <div className="text-xs">
                            <p className="text-gray-600 dark:text-gray-400">
                              Mid
                            </p>
                            <p>${prices.mid?.toFixed(2) || "N/A"}</p>
                          </div>
                          <div className="text-xs">
                            <p className="text-gray-600 dark:text-gray-400">
                              High
                            </p>
                            <p>${prices.high?.toFixed(2) || "N/A"}</p>
                          </div>
                        </div>
                      </div>
                    )
                  )}

                  {card.tcgplayer.url && (
                    <a
                      href={card.tcgplayer.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-full mt-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
                    >
                      <ExternalLink size={16} className="mr-2" />
                      View on TCGPlayer
                    </a>
                  )}
                </div>
              )}

              {/* Add to Collection/Wishlist buttons */}
              <div className="mt-6 space-y-3">
                <button
                  onClick={() => toggleFavorite(card.id)}
                  className={`flex items-center justify-center w-full py-2 rounded-md ${
                    isFavorite
                      ? "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                      : "bg-red-500 text-white hover:bg-red-600"
                  } transition duration-200`}
                >
                  <Heart
                    size={16}
                    className="mr-2"
                    fill={isFavorite ? "currentColor" : "none"}
                  />
                  {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
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

export default CardDetailPage;
