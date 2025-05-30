import { useState, useEffect } from "react";
import { X, Filter, ChevronDown, ChevronUp } from "lucide-react";
import { getSets, getTypes, getRarities } from "../api/pokemonTcgApi";

function FilterPanel({ filters, onFilterChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [sets, setSets] = useState([]);
  const [types, setTypes] = useState([]);
  const [rarities, setRarities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        setLoading(true);
        const [setsData, typesData, raritiesData] = await Promise.all([
          getSets(),
          getTypes(),
          getRarities(),
        ]);

        setSets(setsData.data || []);
        setTypes(typesData.data || []);
        setRarities(raritiesData.data || []);
      } catch (error) {
        console.error("Error fetching filter options:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilterOptions();
  }, []);

  const handleClearFilters = () => {
    onFilterChange({});
  };

  const toggleFilterPanel = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`mb-8 rounded-lg bg-white shadow-md overflow-hidden`}>
      {/* Filter Header */}
      <div
        className="p-4 flex justify-between items-center cursor-pointer"
        onClick={toggleFilterPanel}
      >
        <div className="flex items-center">
          <Filter size={18} className="mr-2" />
          <h2 className="font-semibold">Filters</h2>
        </div>
        <div className="flex items-center">
          {Object.keys(filters).length > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClearFilters();
              }}
              className="text-sm text-red-500 hover:text-red-600 mr-4 transition duration-200"
            >
              Clear All
            </button>
          )}
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </div>

      {/* Filter Content */}
      {isOpen && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Set Filter */}
          <div>
            <label className="block text-sm font-medium mb-2">Set</label>
            <select
              value={filters.set || ""}
              onChange={(e) =>
                onFilterChange({ ...filters, set: e.target.value })
              }
              className={`w-full p-2 rounded-md border bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500`}
            >
              <option value="">All Sets</option>
              {sets.map((set) => (
                <option key={set.id} value={set.id}>
                  {set.name}
                </option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div>
            <label className="block text-sm font-medium mb-2">Type</label>
            <select
              value={filters.types || ""}
              onChange={(e) =>
                onFilterChange({ ...filters, types: e.target.value })
              }
              className={`w-full p-2 rounded-md border bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500`}
            >
              <option value="">All Types</option>
              {types.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Rarity Filter */}
          <div>
            <label className="block text-sm font-medium mb-2">Rarity</label>
            <select
              value={filters.rarity || ""}
              onChange={(e) =>
                onFilterChange({ ...filters, rarity: e.target.value })
              }
              className={`w-full p-2 rounded-md border bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500`}
            >
              <option value="">All Rarities</option>
              {rarities.map((rarity) => (
                <option key={rarity} value={rarity}>
                  {rarity}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          {/* <div>
            <label className="block text-sm font-medium mb-2">
              Max Price ($)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={filters.maxPrice || ""}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  maxPrice: e.target.value ? e.target.value : "",
                })
              }
              placeholder="No limit"
              className={`w-full p-2 rounded-md border bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500`}
            />
          </div> */}
        </div>
      )}
    </div>
  );
}

export default FilterPanel;
