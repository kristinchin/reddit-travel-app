import Location from "../Location";
import fs from "fs";

// interface for exporting the location data to geospatial format
export interface ExportFormat {
  format(locations: Location[]): string;
  download(filename: string, content: string): void;
  downloadFromBrowser(filename: string, content: string): void;
}

export enum ExportFormatType {
  KML = "kml",
  GeoJSON = "geojson",
}

export abstract class AbstractExportFormat implements ExportFormat {
  abstract format(data: Location[]): string;
  // abstract downloadFromBrowser(filename: string, content: string): void;

  download(filename: string, content: string) {
    fs.writeFile(filename, content, (err: any) => {
      // In case of a error throw err.
      if (err) throw err;
    });
  }

  downloadFromBrowser(filename: string, content: string) {
    const blob = new Blob([content], {
      type: "application/vnd.google-earth.kml+xml",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}

export class KMLFormat extends AbstractExportFormat {
  format(data: Location[]): string {
    data = this.cleanLocationData(data);

    const kmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
  <kml xmlns="http://www.opengis.net/kml/2.2">
    <Document>`;

    const kmlFooter = `
    </Document>
  </kml>`;

    const kmlPlacemarks = data
      .map((location) => {
        return `
        <Placemark>
          <name>${location.name.text}</name>
          <description>Rating: ${location.rating}; Address: ${location.address}; Description: ${location.description} </description>
          <Point>
            <coordinates>${location.location.lng},${location.location.lat}</coordinates>
          </Point>
        </Placemark>`;
      })
      .join("");

    return `${kmlHeader}${kmlPlacemarks}${kmlFooter}`;
  }

  private cleanLocationData(data: Location[]): Location[] {
    data.forEach((place) => {
      place.name.text = this.encodeXmlSpecialChars(place.name.text);
    });
    return data;
  }

  private encodeXmlSpecialChars(str: string) {
    if (str === null || str === "") {
      return str;
    }

    return str.replace(/[&<>'"]/g, function (ch) {
      switch (ch) {
        case "&":
          return "&amp;";
        case "<":
          return "(";
        // return "&lt;";
        case ">":
          return ")";
        // return "&gt;";
        case "'":
          return "&apos;";
        case '"':
          return "&quot;";
        default:
          return ch;
      }
    });
  }
}

export class GeoJSONFormat extends AbstractExportFormat {
  format(data: Location[]): string {
    return "";
  }
  downloadFromBrowser(filename: string, content: string): void {}
}
