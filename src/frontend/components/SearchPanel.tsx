import React, { useState } from "react";
import { Button, TextField, Grid2 } from "@mui/material";
import TestPanel from "./TestPanel";

interface SearchPanelProps {
  onSearch: (inputValue: string) => void; // Function to handle search with the input value
}

const SearchPanel: React.FC<SearchPanelProps> = ({ onSearch }) => {
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

  return (
    <div className="search-panel">
      <Grid2 container direction="column" spacing={2}>
        <Grid2 container direction="row" spacing={2}>
          <TextField
            id="standard-basic"
            label="Find some cool places"
            variant="standard"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            placeholder="Paste a reddit thread..."
          />
          {/* <button>Search</button> */}
          <Button variant="text" onClick={handleSearch}>
            Search
          </Button>
        </Grid2>
        <TestPanel onSearch={onSearch}></TestPanel>
      </Grid2>
    </div>
  );
};

export default SearchPanel;
