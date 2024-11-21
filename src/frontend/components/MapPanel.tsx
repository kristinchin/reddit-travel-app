import {
  APIProvider,
  Map,
  MapCameraChangedEvent,
  useMap,
} from "@vis.gl/react-google-maps";
import Location from "../../Location";
import { useEffect, useState } from "react";
import PlaceMarkers from "./PlaceMarkers";
import {
  Box,
  Button,
  Drawer,
  Fab,
  List,
  ListItem,
  TextField,
} from "@mui/material";
import { Settings } from "@mui/icons-material";

interface MapComponentProps {
  PoIs: Location[]; // Function to handle search with the input value
  selected: Location | null;
  visibleLocations: { [key: string]: boolean };
}

interface MapPanelProps {
  PoIs: Location[]; // Function to handle search with the input value
  selected: Location | null;
  visibleLocations: { [key: string]: boolean };
  handleOpenAIKey: Function;
  handleGoogleKey: Function;
}

const MapComponent: React.FC<MapComponentProps> = ({
  PoIs,
  selected,
  visibleLocations,
}) => {
  const map = useMap();
  const [center, setCenter] = useState<google.maps.LatLngLiteral>({
    lat: 42.3601,
    lng: -71.0589,
  }); // Default center at boston

  useEffect(() => {
    if (PoIs.length <= 0) {
      return;
    }
    const bounds = new google.maps.LatLngBounds();

    PoIs.forEach((poi) => {
      if (!poi.location) return;

      const { lat, lng } = poi.location;
      bounds.extend({ lat, lng }); // extends bounds to include coordinate
    });

    // console.log("PoIs: ", PoIs);

    // Calculate the center of the bounds to show most markers in view
    map?.fitBounds(bounds);
  }, [PoIs]);

  return (
    <>
      <Map
        mapId="DEMO_MAP_ID"
        defaultZoom={13}
        colorScheme="FOLLOW_SYSTEM"
        defaultCenter={center}
        center={center}
        gestureHandling={"greedy"}
        onCenterChanged={(event: MapCameraChangedEvent) => {
          setCenter(event.detail.center);
        }}
      >
        <PlaceMarkers
          visibleLocations={visibleLocations}
          selected={selected}
          pois={PoIs}
        />
      </Map>
    </>
  );
};

const MapPanel: React.FC<MapPanelProps> = ({
  PoIs,
  selected,
  visibleLocations,
  handleOpenAIKey,
  handleGoogleKey,
}) => {
  const [open, setOpen] = useState(false);
  const [openAiKey, setOpenAiKey] = useState("");
  const [googleApiKey, setGoogleApiKey] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = () => {
    console.log("OpenAI API Key:", openAiKey);
    console.log("Google API Key:", googleApiKey);
    handleOpenAIKey(openAiKey);
    handleGoogleKey(googleApiKey);
    handleClose();
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <APIProvider
        apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
        onLoad={() => console.log("Maps API has loaded.")}
      >
        <MapComponent
          selected={selected}
          PoIs={PoIs}
          visibleLocations={visibleLocations}
        ></MapComponent>

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
      </APIProvider>
      <Drawer
        open={open}
        onClose={handleClose}
        anchor="right"
        aria-labelledby="api-keys-modal-title"
        aria-describedby="api-keys-modal-description"
      >
        <Box sx={{ padding: 1, width: 300 }}>
          <h3>Enter API Keys</h3>
          <List>
            <ListItem>
              <TextField
                fullWidth
                label="OpenAI API Key"
                value={openAiKey}
                onChange={(e) => setOpenAiKey(e.target.value)}
              />
            </ListItem>
            <ListItem>
              <TextField
                fullWidth
                label="Google API Key"
                value={googleApiKey}
                onChange={(e) => {
                  setGoogleApiKey(e.target.value);
                  console.log("setting google key to: ", e.target.value);
                }}
              />
            </ListItem>
            <ListItem sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                onClick={handleClose}
                color="secondary"
                sx={{ marginRight: 1 }}
              >
                Cancel
              </Button>
              <Button onClick={handleSave} variant="contained" color="primary">
                Save
              </Button>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </div>
  );
};

export default MapPanel;
