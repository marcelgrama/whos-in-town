import { useState, useEffect } from "react";
import axios from "axios";
import { Artist, Event } from "../types";

const useArtistEvents = (artistName: string) => {
  const [artist, setArtist] = useState<Artist | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtistEvents = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const { data: artistData } = await axios.get<Artist>(
          `${process.env.REACT_APP_BASE_URL}artists/${artistName}?app_id=${process.env.REACT_APP_APP_ID}`
        );
        setArtist(artistData);

        const { data: eventsData } = await axios.get<Event[]>(
          `${process.env.REACT_APP_BASE_URL}artists/${artistName}/events?app_id=${process.env.REACT_APP_APP_ID}`
        );
        setEvents(eventsData);

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError("Failed to fetch artist and events data");
      }
    };

    artistName && fetchArtistEvents();
  }, [artistName]);

  return { artist, events, isLoading, error };
};

export default useArtistEvents;