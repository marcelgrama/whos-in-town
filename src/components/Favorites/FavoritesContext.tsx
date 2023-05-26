import React, { createContext, useState, useEffect } from "react";
import { Favorite, Event } from "../../types";

interface FavoritesContextProps {
  favorites: Favorite[];
  addFavorite: (event: Event, artist: string) => void;
  removeFavorite: (eventId: string) => void;
}

export const FavoritesContext = createContext<FavoritesContextProps>({
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
});

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    favorites.length > 0 &&
      localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (event: Event, artist: string) => {
    const newFavorite: Favorite = {
      artist,
      event: event,
    };
    setFavorites((prevFavorites) => [...prevFavorites, newFavorite]);
  };

  const removeFavorite = (eventId: string) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((favorite) => favorite.event.id !== eventId)
    );
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
