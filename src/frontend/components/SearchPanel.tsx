import React, { useState } from "react";
import { Button, TextField, Grid2 } from "@mui/material";
import TestPanel from "./TestPanel";
import PlacesList from "./PlacesList";
import Location from "../../Location";

interface SearchPanelProps {
  onSearch: (inputValue: string) => void; // Function to handle search with the input value
  locations: Location[];
  onSelectedLocation: Function;
}

const SearchPanel: React.FC<SearchPanelProps> = ({
  onSearch,
  locations,
  onSelectedLocation,
}) => {
  var [inputValue, setInputValue] = useState<string>("");

  // Update state when input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  // Handle form submission with Enter key
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      inputValue += ".json";
      onSearch(inputValue);
    }
  };

  // Trigger the search function with the current input value
  const handleSearch = () => {
    onSearch(inputValue + ".json");
  };

  const handleLocationSelect = (location: Location) => {
    onSelectedLocation(location);
    console.log("setting selected in SearchPanel");
  };

  return (
    <div className="search-panel">
      <Grid2 container spacing={2}>
        <Grid2 size={9}>
          <TextField
            id="standard-basic"
            label="Find your next destination"
            variant="filled"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            fullWidth={true}
            placeholder="Paste a reddit thread..."
          />
        </Grid2>
        <Grid2 size={3}>
          <Button variant="text" onClick={handleSearch}>
            Search
          </Button>
        </Grid2>
        <Grid2 size={12} direction="column" container spacing={2}>
          <TestPanel onSearch={onSearch}></TestPanel>
          <PlacesList
            onLocationSelect={handleLocationSelect}
            locations={locations}
          ></PlacesList>
        </Grid2>
      </Grid2>
    </div>
  );
};

export default SearchPanel;
