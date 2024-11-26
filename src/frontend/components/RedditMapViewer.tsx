import "../App.css";
import { useEffect, useState } from "react";
import Location from "../../Location";
import GoogleMapPanel from "./MapPanel";
import { MapProviderType } from "../../services/MapProviders/MapApiProvider";
import { LLMProviderType } from "../../services/LLMProviders/LLMApiProvider";
import SearchPanel from "./SearchPanel";
import { threadToLocations } from "../../redditToMapData";
import SettingsPanel from "./SettingsPanel";
import { Fab } from "@mui/material";
import { Settings } from "@mui/icons-material";
import ApiKeyForm from "./CredentialsPage";

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
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
      console.log("setting google key: ", apiKey);
    }
  };

  const handleOpenAIKey = (apiKey: string | undefined) => {
    if (apiKey) {
      setOpenAIApiKey(apiKey);
      console.log("setting openAI key: ", apiKey);
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
      {googleApiKey == "" && openAIApiKey == "" && (
        <ApiKeyForm
          handleOpenAIKey={handleOpenAIKey}
          handleGoogleKey={handleGoogleKey}
          open={true}
        ></ApiKeyForm>
      )}
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        {googleApiKey && (
          <GoogleMapPanel
            selected={selectedLocation}
            PoIs={locations}
            visibleLocations={visibleLocations}
            handleOpenAIKey={handleOpenAIKey}
            handleGoogleKey={handleGoogleKey}
            googleApiKey={googleApiKey}
          />
        )}
        {/* Overlay button */}
        <div
          style={{
            position: "absolute",
            top: "10px", // Adjust as needed
            right: "60px", // Adjust as needed
            zIndex: 1000, // Ensure it's above the map
          }}
        >
          <Fab size="small" onClick={handleOpen}>
            <Settings />
          </Fab>
        </div>
        <SettingsPanel
          handleOpenAIKey={handleOpenAIKey}
          handleGoogleKey={handleGoogleKey}
          open={open}
          handleClose={handleClose}
        ></SettingsPanel>
      </div>
    </div>
  );
};

export default MapViewer;
