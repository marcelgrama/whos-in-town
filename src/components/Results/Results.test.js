import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import axios from "axios";
import Results from "./Results";

jest.mock("axios");

describe("Results", () => {
  beforeEach(() => {
    // Reset mock implementation before each test
    axios.get.mockReset();
  });

  test("renders search input", () => {
    render(<Results />);

    const searchInput = screen.getByPlaceholderText("Search for an artist");
    expect(searchInput).toBeInTheDocument();
  });

  test("fetches artist and events data on search", async () => {
    axios.get.mockResolvedValueOnce({ data: { name: "Maroon 5" } });
    axios.get.mockResolvedValueOnce({ data: [{ id: "123", name: "Event 1" }] });

    render(<Results />);

    const searchInput = screen.getByPlaceholderText("Search for an artist");
    fireEvent.change(searchInput, { target: { value: "Maroon 5" } });

    fireEvent.keyDown(searchInput, { key: "Enter" });

    expect(axios.get).toHaveBeenCalledTimes(2);
    expect(axios.get).toHaveBeenCalledWith(
      `https://rest.bandsintown.com/artists/Maroon%205?app_id=123`
    );
    expect(axios.get).toHaveBeenCalledWith(
      `https://rest.bandsintown.com/artists/Maroon%205/events?app_id=123`
    );

    // Wait for data to be fetched and rendered
    await screen.findByText("Maroon 5");
    await screen.findByText("Event 1");
  });

  test("displays error message on failed fetch", async () => {
    axios.get.mockRejectedValueOnce(new Error("Failed to fetch data"));

    render(<Results />);

    const searchInput = screen.getByPlaceholderText("Search for an artist");
    fireEvent.change(searchInput, { target: { value: "Maroon 5" } });

    fireEvent.keyDown(searchInput, { key: "Enter" });

    await screen.findByText("Failed to fetch artist and events data");
  });
});
