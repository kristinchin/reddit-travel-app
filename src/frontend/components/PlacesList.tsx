import { useState } from "react";
// import List from '@mui/material/List';
import {
  Card,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  IconButton,
  Typography,
  Button,
  CardActions,
  CardContent,
  CardHeader,
} from "@mui/material";
import { LocationOn, LocationOff, Close } from "@mui/icons-material";
import Location from "../../Location";

interface PlacesListProps {
  locations: Location[];
  onLocationSelect: Function;
}

const PlacesList: React.FC<PlacesListProps> = ({
  locations,
  onLocationSelect,
}) => {
  const [checked, setChecked] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    console.log("newChecked: ", newChecked);
    console.log("currentIndex: ", currentIndex);

    setChecked(newChecked);
  };

  const handleListItemClick = (location: Location) => {
    onLocationSelect(location);
    console.log("item selected in PlacesList");
  };
  const closeInfoCard = () => {
    setSelectedLocation(null);
    onLocationSelect(location);
    console.log("closing info card, setting selected to null: ", location);
  };

  const openMapsLink = () => {
    console.log("google maps link");
  };

  return (
    <>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
          overflow: "auto",
          maxHeight: 500,
        }}
      >
        {locations.map((location) => {
          const labelId = `checkbox-list-label-${location.name.text}`;

          return (
            <ListItem
              key={location.name.text}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="comments"
                  // onClick={handleToggle}
                >
                  <LocationOn />
                </IconButton>
              }
              disablePadding
            >
              <ListItemButton
                role={undefined}
                onClick={() => handleListItemClick(location)}
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked.includes(location.name.text)}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={location.name.text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      {selectedLocation && (
        <Card sx={{ minWidth: 275 }}>
          <CardHeader
            action={
              <IconButton onClick={closeInfoCard} size="small">
                <Close></Close>
              </IconButton>
            }
            title={selectedLocation.name.text}
            subheader={selectedLocation.address}
          ></CardHeader>
          <CardContent>
            <Typography variant="body2">
              {selectedLocation.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button onClick={openMapsLink} size="small">
              Open In Google Maps
            </Button>
          </CardActions>
        </Card>
      )}
    </>
  );
};

export default PlacesList;
