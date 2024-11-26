import { useState } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import { LocationOn, LocationOff } from "@mui/icons-material";
import Location from "../../Location";

interface PlacesListProps {
  locations: Location[];
  onLocationSelect: Function;
  toggleLocation: Function;
}

const PlacesList: React.FC<PlacesListProps> = ({
  locations,
  onLocationSelect,
  toggleLocation,
}) => {
  const [hidden, setHidden] = useState<string[]>([]);

  const handleToggle = (value: string) => {
    const currentIndex = hidden.indexOf(value);
    const newHidden = [...hidden];

    if (currentIndex === -1) {
      newHidden.push(value);
    } else {
      newHidden.splice(currentIndex, 1);
    }
    // console.log("newChecked: ", newChecked);
    // console.log("currentIndex: ", currentIndex);

    setHidden(newHidden);
    toggleLocation(value);
  };

  const handleListItemClick = (location: Location) => {
    onLocationSelect(location);
  };

  return (
    <>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "#333",
          overflow: "auto",
          maxHeight: 450,
        }}
      >
        {locations.map((location) => {
          const labelId = `checkbox-list-label-${location.name.text}`;

          return (
            <ListItem key={location.name.text} disablePadding>
              <ListItemIcon>
                <IconButton onClick={() => handleToggle(location.name.text)}>
                  {hidden.includes(location.name.text) ? (
                    <LocationOff />
                  ) : (
                    <LocationOn />
                  )}
                </IconButton>
              </ListItemIcon>
              <ListItemButton
                role={undefined}
                onClick={() => handleListItemClick(location)}
                dense
              >
                <ListItemText
                  id={labelId}
                  primary={location.name.text}
                  secondary={location.address}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

export default PlacesList;
