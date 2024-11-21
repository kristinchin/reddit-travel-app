import React, { useState } from "react";
import { TextField, Grid2, IconButton } from "@mui/material";
import TestPanel from "./TestPanel";
import PlacesList from "./PlacesList";
import Location from "../../Location";
import { Send } from "@mui/icons-material";
import { ExportPanel } from "./ExportPanel";

interface SearchPanelProps {
  onSearch: (inputValue: string) => void;
  locations: Location[];
  onSelectedLocation: Function;
  toggleLocation: Function;
}

const SearchPanel: React.FC<SearchPanelProps> = ({
  onSearch,
  locations,
  onSelectedLocation,
  toggleLocation,
}) => {
  var [inputValue, setInputValue] = useState<string>("");

  // Update state when input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  // Handle form submission with Enter key
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      onSearch((inputValue += ".json"));
    }
  };

  // Trigger the search function with the current input value
  const handleSearch = () => {
    onSearch(inputValue + ".json");
  };

  return (
    <div className="search-panel">
      <Grid2
        container
        display="flex"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid2 size={10}>
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
        <Grid2 size={2}>
          <IconButton onClick={handleSearch}>
            <Send></Send>
          </IconButton>
        </Grid2>
        <Grid2 size={12} direction="column" container spacing={2}>
          <TestPanel onSearch={onSearch}></TestPanel>
          <PlacesList
            onLocationSelect={onSelectedLocation}
            locations={locations}
            toggleLocation={toggleLocation}
          ></PlacesList>
        </Grid2>
        <ExportPanel locations={locations} />
      </Grid2>
    </div>
  );
};

export default SearchPanel;
