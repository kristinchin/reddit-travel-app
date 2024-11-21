import { Button } from "@mui/material";
import { Download } from "@mui/icons-material";
import { getExportFormat } from "../../services/ExportFormatters/ExportFormatFactory";
import { ExportFormatType } from "../../services/ExportFormatters/ExportFormat";
import Location from "../../Location";

const kmlExporter = getExportFormat(ExportFormatType.KML);
const geoJsonExporter = getExportFormat(ExportFormatType.GeoJSON);

export const ExportPanel: React.FC<{ locations: Location[] }> = ({
  locations,
}) => {
  function handleKmlDownload() {
    kmlExporter.downloadFromBrowser("kmlFormat.kml", locations);
  }

  function handleGeoJsonDownload() {
    geoJsonExporter.downloadFromBrowser("geoJsonFormat.json", locations);
  }

  return (
    locations.length > 0 && (
      <>
        <Button
          startIcon={<Download />}
          variant="outlined"
          onClick={handleKmlDownload}
        >
          KML
        </Button>
        <Button
          startIcon={<Download />}
          variant="outlined"
          onClick={handleGeoJsonDownload}
        >
          GeoJSON
        </Button>
      </>
    )
  );
};
