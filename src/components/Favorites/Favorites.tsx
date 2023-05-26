import React, { useContext, useMemo } from "react";
import { FavoritesContext } from "./FavoritesContext";
import "./Favorites.css";
import { Event } from "../../types";

const Favorites: React.FC = () => {
  const { favorites, removeFavorite } = useContext(FavoritesContext);

  const handleRemoveFavorite = (eventId: string) => {
    removeFavorite(eventId);
  };

  const groupedFavorites: { [artist: string]: Event[] } = useMemo(() => {
    return favorites.reduce(
      (grouped: { [artist: string]: Event[] }, favorite) => {
        const artistName = favorite.artist;
        if (!grouped[artistName]) {
          grouped[artistName] = [];
        }
        grouped[artistName].push(favorite.event);
        return grouped;
      },
      {}
    );
  }, [favorites]);

  return (
    <div>
      <h2>Favorite Events</h2>
      {Object.entries(groupedFavorites).map(([artist, events]) => (
        <div key={artist} className="favorites-container">
          <h3>{artist}'s events</h3>
          {events.length > 0 &&
            events.map((event) => (
              <div key={event.id} className="favorite-item">
                <h3>{event.venue.name}</h3>
                <p>Venue: {event.venue.name}</p>
                <button onClick={() => handleRemoveFavorite(event.id)}>
                  Remove from favorites
                </button>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
};

export default Favorites;
