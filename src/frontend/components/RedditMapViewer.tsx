// src/App.tsx
import SearchPanel from "./SearchPanel";
import MapPanel from "./MapPanel";
import "../App.css";
// import { threadToLocations } from "../../redditToMapData";
import { threadToLocations } from "../../redditToMapData";
import { useEffect, useState } from "react";
import Location from "../../Location";
import { MapProviderType } from "../../MapProviders/MapApiProvider";

const MapViewer: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );

  const handleSearch = (value: string) => {
    setInputValue(value); // Update inputValue state
  };

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
    console.log("setting selected in map viewer to: ", location.name.text);
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
          );
          // Update state with fetched locations
          // console.log("locs: ", locs);
          setLocations(locs);
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
      />
      <MapPanel selected={selectedLocation} PoIs={locations} />
    </div>
  );
};

export default MapViewer;
