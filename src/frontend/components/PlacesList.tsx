import { useState } from "react";
// import List from '@mui/material/List';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  IconButton,
} from "@mui/material";
import { LocationOn, LocationOff } from "@mui/icons-material";
import Location from "../../Location";

interface PlacesListProps {
  locations: Location[];
}

const PlacesList: React.FC<PlacesListProps> = ({ locations }) => {
  const [checked, setChecked] = useState<string[]>([]);

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

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {locations.map((location) => {
        const labelId = `checkbox-list-label-${location.name.text}`;

        return (
          <ListItem
            key={location.name.text}
            secondaryAction={
              <IconButton edge="end" aria-label="comments">
                <LocationOn />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton
              role={undefined}
              onClick={handleToggle(location.name.text)}
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
  );
};

export default PlacesList;
