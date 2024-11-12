import React, { useState } from "react";

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
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        placeholder="Paste a reddit thread..."
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchPanel;
