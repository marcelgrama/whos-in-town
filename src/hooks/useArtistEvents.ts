import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Artist, Event } from "../types";

const useArtistEvents = (artistName: string) => {
  const [artist, setArtist] = useState<Artist | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchArtistEvents = useCallback(() => {
    setIsLoading(true);
    setError(null);

    const artistPromise = axios.get<Artist>(
      `${process.env.REACT_APP_BASE_URL}artists/${artistName}?app_id=${process.env.REACT_APP_APP_ID}`
    );
    const eventsPromise = axios.get<Event[]>(
      `${process.env.REACT_APP_BASE_URL}artists/${artistName}/events?app_id=${process.env.REACT_APP_APP_ID}`
    );

    Promise.allSettled([artistPromise, eventsPromise])
      .then((results) => {
        results.forEach((result) => {
          if (result.status === "fulfilled") {
            const { value } = result;
            if (value.config.url && value.config.url.includes("events")) {
              setEvents(value.data as Event[]);
            } else {
              setArtist(value.data as Artist | null);
            }
          }
        });
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setError("Failed to fetch artist and events data");
      });
  }, [artistName]);

  useEffect(() => {
    artistName && fetchArtistEvents();
  }, [artistName]);

  return { artist, events, isLoading, error };
};

export default useArtistEvents;
