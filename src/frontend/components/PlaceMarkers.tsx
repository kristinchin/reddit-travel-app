import { AdvancedMarker, InfoWindow, Pin } from "@vis.gl/react-google-maps";
import Location from "../../Location";
import { useState } from "react";
import "../App.css";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
// import CloseIcon from '@mui/icons-material/Close';

const PlaceMarkers = (props: { pois: Location[] }) => {
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
        // <div className="info-window-content">
        <InfoWindow
          position={selectedPoi.location}
          onCloseClick={() => setSelectedPoi(null)} // Close the popup
        >
          <h3>{selectedPoi.name.text}</h3>
          <p>{selectedPoi.address}</p>
          <p>Rating: {selectedPoi.rating?.toString()}</p>
          <p>{selectedPoi.description}</p>
        </InfoWindow>
        // </div>
      )}
    </>
  );
};

export default PlaceMarkers;
