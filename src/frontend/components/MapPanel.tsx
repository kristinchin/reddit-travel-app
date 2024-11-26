import {
  APIProvider,
  Map,
  MapCameraChangedEvent,
  useMap,
} from "@vis.gl/react-google-maps";
import Location from "../../Location";
import { useEffect, useState } from "react";
import PlaceMarkers from "./PlaceMarkers";
import { Fab } from "@mui/material";
import { Settings } from "@mui/icons-material";
import SettingsPanel from "./SettingsPanel";

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
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
      <SettingsPanel
        handleOpenAIKey={handleOpenAIKey}
        handleGoogleKey={handleGoogleKey}
        open={open}
        handleClose={handleClose}
      ></SettingsPanel>
    </div>
  );
};

export default MapPanel;
