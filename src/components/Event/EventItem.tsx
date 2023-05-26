import React, { useState, useContext } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Switch,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { EventResponse, Favorite } from "../../types";
import { FavoritesContext } from "../Favorites/FavoritesContext";

interface EventItemProps {
  event: EventResponse;
  artist: string;
}

type Offer = {
  type: string;
  url: string | undefined;
  status: string;
};

const EventItem: React.FC<EventItemProps> = ({
  event,
  artist,
}) => {
  const { id, venue, datetime, description, offers } = event || {
    id: "",
    venue: { name: "", city: ""},
    datetime: "",
    description: "",
    offers: [],
  };

  const [expanded, setExpanded] = useState(false);
  const { favorites, addFavorite, removeFavorite } = useContext(
    FavoritesContext
  );
  const isFavorite = favorites.some(
    (favorite: Favorite) => favorite.event.id === id
  );

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const handleFavoriteToggle = () => {
    const { id } = event;
    if (isFavorite) {
      removeFavorite(id);
    } else {
      addFavorite(event, artist);
    }
  };

  return (
    <Accordion expanded={expanded} onChange={handleExpand}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="event-content"
        id="event-header"
      >
        <Typography variant="h6">{venue.name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div>
          <p>Date: {datetime}</p>
          <p>Venue: {venue.city}</p>
          <p>Description: {description}</p>
          {event &&
            offers.length > 0 &&
            offers.map((offer: Offer, index: React.Key) => (
              <p key={index}>
                {offer.type}: <a href={offer.url}>{offer.status}</a>
              </p>
            ))}
          <span>Add to Favorite:</span>{" "}
          <Switch
            checked={isFavorite}
            onChange={handleFavoriteToggle}
            color="primary"
          />
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default EventItem;
