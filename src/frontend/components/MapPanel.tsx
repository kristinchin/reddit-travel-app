// import React from "react";
// import { createRoot } from "react-dom/client";
import { threadToLocations } from "../../redditToMapData";
import {
  AdvancedMarker,
  APIProvider,
  Map,
  MapCameraChangedEvent,
  InfoWindow,
  Pin,
  useMap,
} from "@vis.gl/react-google-maps";
import Location from "../../Location";
import { useEffect, useRef, useState } from "react";
// import { LatLngBounds } from "@googlemaps/google-maps-services-js";
// import { MarkerClusterer } from "@googlemaps/markerclusterer";
// import type { Marker } from "@googlemaps/markerclusterer";

// type Poi = { key: string; location: google.maps.LatLngLiteral };

const PoiMarkers = (props: { pois: Location[] }) => {
  const [selectedPoi, setSelectedPoi] = useState<Location | null>(null);
  if (!props.pois || props.pois.length === 0) {
    return null; // or display a message, e.g., <p>No locations available</p>
  }
  return (
    <>
      {props.pois.map((poi: Location, index) => (
        <AdvancedMarker
          key={poi.name.text + index}
          position={poi.location}
          onClick={() => setSelectedPoi(poi)} // Set the selected location
        >
          <Pin background={"PURPLE"} glyphColor={"#000"} borderColor={"#000"} />
        </AdvancedMarker>
      ))}

      {/* Info window to show location details */}
      {selectedPoi && (
        <InfoWindow
          position={selectedPoi.location}
          onCloseClick={() => setSelectedPoi(null)} // Close the popup
        >
          <h3>{selectedPoi.name.text}</h3>
          <p>{selectedPoi.address}</p>
          <p>Rating: {selectedPoi.rating?.toString()}</p>
          <p>{selectedPoi.description}</p>
        </InfoWindow>
      )}
    </>
  );
};

interface MapPanelProps {
  PoIs: Location[]; // Function to handle search with the input value
}

const MapComponent: React.FC<MapPanelProps> = ({ PoIs }) => {
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
      bounds.extend({ lat, lng });
    });

    // console.log("PoIs: ", PoIs);

    // Calculate the center of the bounds to show most markers in view
    const center = bounds.getCenter();
    // const boundsLiteral = {
    //   north: bounds.getNorthEast().lat(),
    //   east: bounds.getNorthEast().lng(),
    //   south: bounds.getSouthWest().lat(),
    //   west: bounds.getSouthWest().lng(),
    // };

    map?.fitBounds(bounds);

    // setBounds(boundsLiteral);
    setCenter({ lat: center.lat(), lng: center.lng() }); // Update the state with the new center
  }, [PoIs]);

  // useEffect(() => {
  //   if (!map) return;

  //   // do something with the map instance
  // }, [map]);

  return (
    <>
      <Map
        /// <reference path="" />
        mapId="DEMO_MAP_ID"
        defaultZoom={13}
        center={center}
        gestureHandling={"greedy"}
        // onBoundsChanged={(event: MapCameraChangedEvent) => {
        //   setBounds(event.detail.bounds);
        // }}
        onCenterChanged={(event: MapCameraChangedEvent) => {
          setCenter(event.detail.center);
        }}
        // onCameraChanged={(ev: MapCameraChangedEvent) =>
        //   console.log(
        //     "camera changed:",
        //     ev.detail.center,
        //     "zoom:",
        //     ev.detail.zoom,
        //   )
        // }
      >
        <PoiMarkers pois={PoIs} />
      </Map>
    </>
  );
};

const MapPanel: React.FC<MapPanelProps> = ({ PoIs }) => {
  // const mapRef = useRef<google.maps.Map | null>(null);

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
