import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
function SetGrid({ sets, loading, error }) {
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

  if (!sets || sets.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-lg">No Sets found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {sets.map((set) => (
        <SetItem key={set.id} set={set} />
      ))}
    </div>
  );
}

function SetItem({ set }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  return (
    <div className="relative group rounded-lg overflow-hidden transition-all duration-300 bg-white shadow-md hover:shadow-xl transform hover:-translate-y-1">
      {/* Set Image */}
      <div className="relative aspect-[2.5/2.5] overflow-hidden bg-gray-100 p-4">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-700">
            <LoadingSpinner size="small" />
          </div>
        )}
        <img
          src={set.images.logo || set.images.symbol}
          alt={set.name}
          className={`w-full h-full object-contain transition-transform duration-500 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      {/* Set Info */}
      <div className="p-4">
        <h3 className="font-semibold text-sm truncate">{set.name}</h3>
        <div className="flex justify-between items-center mt-1">
          <span className="text-xs text-gray-500">{set.series}</span>
          <span className="text-xs text-gray-500">{set.total} cards</span>
        </div>
        {set.releaseDate && (
          <p className="text-xs text-gray-500 mt-1">
            Released: {new Date(set.releaseDate).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
}

export default SetGrid;
