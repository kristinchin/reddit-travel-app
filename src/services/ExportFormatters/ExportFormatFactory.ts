import {
  ExportFormat,
  ExportFormatType,
  KMLFormat,
  GeoJSONFormat,
} from "./ExportFormat";

export function getExportFormat(format: ExportFormatType): ExportFormat {
  switch (format) {
    case ExportFormatType.KML:
      return new KMLFormat();
    case ExportFormatType.GeoJSON:
      return new GeoJSONFormat();
  }
}
