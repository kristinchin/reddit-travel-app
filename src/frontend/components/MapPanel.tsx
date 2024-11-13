import {
  APIProvider,
  Map,
  MapCameraChangedEvent,
  useMap,
} from "@vis.gl/react-google-maps";
import Location from "../../Location";
import { useEffect, useState } from "react";
import PlaceMarkers from "./PlaceMarkers";

interface MapPanelProps {
  PoIs: Location[]; // Function to handle search with the input value
}
const MapComponent: React.FC<MapPanelProps> = ({ PoIs }) => {
  const map = useMap();
  // map?.setOptions(options: {ColorScheme: ColorScheme.FOLLOW})
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
      bounds.extend({ lat, lng });
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
        <PlaceMarkers pois={PoIs} />
      </Map>
    </>
  );
};

const MapPanel: React.FC<MapPanelProps> = ({ PoIs }) => {
  return (
    <APIProvider
      apiKey={import.meta.env.VITE_GOOGLE_API_KEY}
      onLoad={() => console.log("Maps API has loaded.")}
    >
      <MapComponent PoIs={PoIs}></MapComponent>
    </APIProvider>
  );
};

export default MapPanel;
