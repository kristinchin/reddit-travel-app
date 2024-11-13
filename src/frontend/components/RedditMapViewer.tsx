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

  const handleSearch = (value: string) => {
    setInputValue(value); // Update inputValue state
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
      <SearchPanel onSearch={handleSearch} />
      <MapPanel PoIs={locations} />
    </div>
  );
};

const locs: Location[] = [
  {
    name: { text: "Coventry", languageCode: "en" },
    address: "10 Coventry Street, Boston, MA 02120",
    location: { lat: 42.337207615109115, lng: -71.08595619628686 },
    types: ["Residential"],
    rating: 4,
    description: "dorm for college students",
  },
  {
    name: { text: "Stinson", languageCode: "en" },
    address: "4 Stinson Court, Cambridge, MA 02139",
    location: { lat: 42.360496015227035, lng: -71.11190446929932 },
    types: ["Residential"],
    rating: 4.5,
    description: "my cambridge aparmtment",
  },
];

export default MapViewer;
