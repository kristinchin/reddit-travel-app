import { AdvancedMarker, InfoWindow, Pin } from "@vis.gl/react-google-maps";
import Location from "../../Location";
import { useEffect, useState } from "react";
import "../App.css";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  CardActions,
  CardHeader,
  Button,
  Rating,
  Grid2,
} from "@mui/material";
import { Close } from "@mui/icons-material";

interface PlaceMarkersProps {
  pois: Location[];
  selected: Location | null;
  visibleLocations: { [key: string]: boolean };
}

const PlaceMarkers: React.FC<PlaceMarkersProps> = ({
  pois,
  selected,
  visibleLocations,
}) => {
  const [selectedPoi, setSelectedPoi] = useState<Location | null>(null);

  useEffect(() => {
    // setSelectedPoi(null);
    setSelectedPoi(selected);
  }, [selected]);

  //   const [visiblePoi, setVisiblePoi] = useState<{
  //     [key: string]: boolean;
  //   }>({});

  //   useEffect(() => {
  //     setVisiblePoi(visibleLocations);
  //   }, [visibleLocations]);

  const openMapsLink = () => {
    console.log("google maps link");
  };

  return (
    <>
      {pois
        .filter((location) => visibleLocations[location.name.text])
        .map((poi: Location, index) => (
          <AdvancedMarker
            key={poi.name.text + index}
            position={poi.location}
            onClick={() => setSelectedPoi(poi)} // Set the selected location
          >
            <Pin
              background={"PURPLE"}
              glyphColor={"#000"}
              borderColor={"#000"}
            />
          </AdvancedMarker>
        ))}

      {/* Info window to show location details */}
      {selectedPoi && (
        <InfoWindow headerDisabled={true} position={selectedPoi.location}>
          <Card sx={{ maxWidth: 370 }}>
            <CardHeader
              action={
                <IconButton onClick={() => setSelectedPoi(null)} size="small">
                  <Close></Close>
                </IconButton>
              }
              title={selectedPoi.name.text}
              subheader={
                <>
                  {selectedPoi.address}
                  <Rating
                    name="read-only"
                    value={selectedPoi.rating as number}
                    readOnly
                    precision={0.1}
                  />
                  {selectedPoi.rating}
                </>
              }
            ></CardHeader>
            <CardContent>
              <Typography variant="body2">{selectedPoi.description}</Typography>
            </CardContent>
            <CardActions>
              <Button onClick={openMapsLink} size="small">
                Open In Google Maps
              </Button>
            </CardActions>
          </Card>
        </InfoWindow>
      )}
    </>
  );
};

export default PlaceMarkers;
