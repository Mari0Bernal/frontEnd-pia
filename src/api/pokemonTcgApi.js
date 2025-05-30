const API_URL = "https://api.pokemontcg.io/v2";

/**
 * Fetches cards with pagination and filtering
 */
export async function getCards(page = 1, pageSize = 20, filters = {}) {
  let queryParams = `&orderBy=-set.releaseDate&page=${page}&pageSize=${pageSize}`;

  // Add filters to query params if they exist
  if (Object.keys(filters).length) {
    const filterQueries = [];

    // Handle set filter separately
    if (filters.set) {
      filterQueries.push(`set.id:${filters.set}`);
    }

    if (filters.types) {
      filterQueries.push(`types:${filters.types}`);
    }

    if (filters.rarity) {
      filterQueries.push(`rarity:"${filters.rarity}"`);
    }

    // // Handle other filters
    // Object.entries(filters)
    //   .filter(([key, value]) => value && value !== "" && key !== "set")
    //   .forEach(([key, value]) => {
    //     filterQueries.push(`${key}:${value}`);
    //   });

    if (filterQueries.length > 0) {
      queryParams += `&q=${encodeURIComponent(filterQueries.join(" "))}`;
    }
  }

  try {
    const response = await fetch(`${API_URL}/cards?${queryParams}`);
    if (!response.ok) {
      throw new Error("Failed to fetch cards");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching cards:", error);
    throw error;
  }
}

/**
 * Fetches a single card by ID
 */
export async function getCardById(id) {
  try {
    const response = await fetch(`${API_URL}/cards/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch card");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching card:", error);
    throw error;
  }
}

/**
 * Fetches all card sets
 */
export async function getSets() {
  try {
    const response = await fetch(`${API_URL}/sets?orderBy=-releaseDate`);
    if (!response.ok) {
      throw new Error("Failed to fetch sets");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching sets:", error);
    throw error;
  }
}

export async function getSetSection(page = 1, pageSize = 20) {
  try {
    const response = await fetch(
      `${API_URL}/sets?orderBy=-releaseDate&page=${page}&pageSize=${pageSize}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch sets");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching sets:", error);
    throw error;
  }
}

/**
 * Fetches all card types
 */
export async function getTypes() {
  try {
    const response = await fetch(`${API_URL}/types`);
    if (!response.ok) {
      throw new Error("Failed to fetch types");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching types:", error);
    throw error;
  }
}

/**
 * Fetches all card rarities
 */
export async function getRarities() {
  try {
    const response = await fetch(`${API_URL}/rarities`);
    if (!response.ok) {
      throw new Error("Failed to fetch rarities");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching rarities:", error);
    throw error;
  }
}

/**
 * Search cards by name or text
 */
export async function searchCards(query, page = 1, pageSize = 20) {
  const encodedQuery = encodeURIComponent(`name:*${query}*`);
  try {
    const response = await fetch(
      `${API_URL}/cards?q=${encodedQuery}&page=${page}&pageSize=${pageSize}`
    );
    if (!response.ok) {
      throw new Error("Failed to search cards");
    }
    return await response.json();
  } catch (error) {
    console.error("Error searching cards:", error);
    throw error;
  }
}
