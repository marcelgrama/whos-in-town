import React, { FC, useState } from "react";
import Search from "../Search/Search";
import EventItem from "../Event/EventItem";
import useArtistEvents from "../../hooks/useArtistEvents";
import "./Results.css";

const Results: FC = () => {
  const [searchValue, setSearchValue] = useState("");

  const { artist, events, isLoading, error } = useArtistEvents(searchValue);

  const { name } = artist || { name: "" };

  const handleSearch = async (artistName: string) => {
    setSearchValue(artistName);
  };

  return (
    <>
      {isLoading ? (
        <span>Is loading...</span>
      ) : (
        <div className="results">
          <Search onSearch={handleSearch} />

          {artist && (
            <div className="artist-info">
              <h2>{artist.name}</h2>
              <img src={artist.image_url} alt={artist.name} />
            </div>
          )}

          <div className="event-list">
            {events.length > 0 ? (
              events.map((event) => (
                <EventItem key={event.id} event={event} artist={name || ""} />
              ))
            ) : (
              <p>No events found.</p>
            )}
          </div>
        </div>
      )}
      {error && <span>{error}</span>}
    </>
  );
};

export default Results;
