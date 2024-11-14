// src/App.tsx
import MapViewer from "./components/RedditMapViewer";
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
const App: React.FC = () => {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <MapViewer></MapViewer>
    </ThemeProvider>
  );
};

export default App;
