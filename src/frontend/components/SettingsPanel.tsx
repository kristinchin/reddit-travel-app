import {
  Box,
  Button,
  Drawer,
  Fab,
  List,
  ListItem,
  TextField,
} from "@mui/material";
import { useState } from "react";

interface SettingsPanelProps {
  handleOpenAIKey: Function;
  handleGoogleKey: Function;
  open: boolean;
  handleClose: Function;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  handleOpenAIKey,
  handleGoogleKey,
  open,
  handleClose,
}) => {
  const [openAiKey, setOpenAiKey] = useState("");
  const [googleApiKey, setGoogleApiKey] = useState("");

  const handleSave = () => {
    console.log("OpenAI API Key:", openAiKey);
    console.log("Google API Key:", googleApiKey);
    handleOpenAIKey(openAiKey);
    handleGoogleKey(googleApiKey);
    handleClose();
  };

  const onClose = () => {
    handleClose();
  };

  return (
    <div>
      <Drawer
        open={open}
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
                onClick={onClose}
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

export default SettingsPanel;
