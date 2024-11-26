import "../App.css";
import { useEffect, useState } from "react";
import { Dialog, Card, CardHeader, CardActions } from "@mui/material";
import { Button, List, ListItem, TextField } from "@mui/material";

interface ApiKeyFormProps {
  handleOpenAIKey: Function;
  handleGoogleKey: Function;
  open: boolean;
}

const ApiKeyForm: React.FC<ApiKeyFormProps> = ({
  handleOpenAIKey,
  handleGoogleKey,
  open,
}) => {
  const [openAiKey, setOpenAiKey] = useState("");
  const [googleApiKey, setGoogleApiKey] = useState("");

  const handleSave = () => {
    handleOpenAIKey(openAiKey);
    handleGoogleKey(googleApiKey);

    if (validKeys()) {
      open = false;
    }
  };

  // TODO: check that keys are valid and have the right apis/models enabled
  const validKeys = () => {
    return openAiKey != "" && googleApiKey != "";
  };

  return (
    <Dialog open={googleApiKey == "" || openAiKey == "" || open}>
      <Card raised={true} sx={{ padding: 1, width: 400 }}>
        <CardHeader
          title="Enter API Keys"
          subheader="Google API key requires PlacesAPI (new) and Maps JavaScript 
          API to be enabled. OpenAI Api Key requires GPT-4o."
        ></CardHeader>
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
              }}
            />
          </ListItem>
        </List>
        <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            disabled={!validKeys()}
            onClick={handleSave}
            variant="contained"
            color="primary"
          >
            Save
          </Button>
        </CardActions>
      </Card>
    </Dialog>
  );
};

export default ApiKeyForm;
