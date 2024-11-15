import React, { useState } from "react";
import { TextField, Grid2, IconButton, Button } from "@mui/material";
import TestPanel from "./TestPanel";
import PlacesList from "./PlacesList";
import Location from "../../Location";
import { Send, Download } from "@mui/icons-material";
import { downloadKMLBrowser } from "../../../examples/generateKML";

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

  const handleKmlDownload = () => {
    downloadKMLBrowser("kmlFormat.kml", locations);
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
        {locations.length > 0 && (
          <Button
            startIcon={<Download />}
            variant="outlined"
            onClick={handleKmlDownload}
          >
            Export to KML
          </Button>
        )}
      </Grid2>
    </div>
  );
};

export default SearchPanel;
