import "../App.css";
import { useEffect, useState } from "react";
import Location from "../../Location";
import MapPanel from "./MapPanel";
import { MapProviderType } from "../../services/MapProviders/MapApiProvider";
import {
  LLMApiProvider,
  LLMProviderType,
} from "../../services/LLMProviders/LLMApiProvider";
import SearchPanel from "./SearchPanel";
import { threadToLocations } from "../../redditToMapData";

const MapViewer: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );
  const [visibleLocations, setVisibleLocations] = useState<{
    [key: string]: boolean;
  }>({});
  const [googleApiKey, setGoogleApiKey] = useState("");
  const [openAIApiKey, setOpenAIApiKey] = useState("");

  // Toggle visibility of a location
  const toggleLocation = (locationId: string) => {
    setVisibleLocations((prev) => ({
      ...prev,
      [locationId]: !prev[locationId],
    }));
  };

  const handleSearch = (value: string) => {
    setInputValue(value); // Update inputValue state
  };

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    console.log("setting selected in map viewer to: ", location.name.text);
  };

  const handleGoogleKey = (apiKey: string | undefined) => {
    if (apiKey) {
      setGoogleApiKey(apiKey);
    }
  };

  const handleOpenAIKey = (apiKey: string | undefined) => {
    if (apiKey) {
      setOpenAIApiKey(apiKey);
    }
  };

  useEffect(() => {
    // Trigger location update only when inputValue changes
    const fetchLocations = async () => {
      if (inputValue.trim()) {
        try {
          // Await the promise
          const locs = await threadToLocations(
            inputValue,
            MapProviderType.GOOGLE_BROWSER,
            LLMProviderType.OPENAI,
            googleApiKey,
            openAIApiKey,
          );
          // Update state with fetched locations
          // console.log("locs: ", locs);
          setLocations(locs);
          setVisibleLocations(
            locs.reduce(
              (acc, loc) => {
                acc[loc.name.text] = true;
                return acc;
              },
              {} as { [key: string]: boolean },
            ),
          );
        } catch (error) {
          console.error("Failed to fetch locations:", error);
        }
      }
    };
    fetchLocations();
  }, [inputValue]);

  return (
    <div className="container">
      <SearchPanel
        locations={locations}
        onSearch={handleSearch}
        onSelectedLocation={handleLocationSelect}
        toggleLocation={toggleLocation}
      />
      <MapPanel
        selected={selectedLocation}
        PoIs={locations}
        visibleLocations={visibleLocations}
        handleOpenAIKey={handleOpenAIKey}
        handleGoogleKey={handleGoogleKey}
      />
    </div>
  );
};

export default MapViewer;
