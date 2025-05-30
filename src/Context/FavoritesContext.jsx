import { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    // Load favorites from local storage
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  
  useEffect(() => {
    // Save favorites to local storage whenever they change
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);
  
  const toggleFavorite = (cardId) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(cardId)) {
        return prevFavorites.filter(id => id !== cardId);
      } else {
        return [...prevFavorites, cardId];
      }
    });
  };
  
  const isFavorite = (cardId) => {
    return favorites.includes(cardId);
  };
  
  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}