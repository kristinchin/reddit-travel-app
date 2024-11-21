import Location from "../../Location";
import fs from "fs";

// interface for exporting the location data to geospatial format
export interface ExportFormat {
  format(locations: Location[]): string;
  download(filename: string, content: string): void;
  downloadFromBrowser(filename: string, data: Location[]): void;
}

export enum ExportFormatType {
  KML = "kml",
  GeoJSON = "geojson",
}

export abstract class AbstractExportFormat implements ExportFormat {
  abstract format(data: Location[]): string;

  download(filename: string, content: string) {
    fs.writeFile(filename, content, (err: NodeJS.ErrnoException | null) => {
      if (err) throw err;
    });
  }

  downloadFromBrowser(filename: string, data: Location[]) {
    const content = this.format(data);
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
        <description><b>Address:</b> ${location.address}
          <br/><b>Rating:</b> ${location.rating}
          <br/><b>Description:</b> ${location.description} 
          <br/><a href="${location.googleMapsLinks?.placeUri}" target="_blank">View In Google Maps</a>
        </description>
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
    const geoJSON = {
      type: "FeatureCollection",
      features: data.map((location) => ({
        type: "Feature",
        properties: {
          Name: location.name.text,
          Address: location.address,
          Rating: location.rating,
          Description: location.description,
          "Google Maps Link": location.googleMapsLinks?.placeUri,
        },
        geometry: {
          type: "Point",
          coordinates: [location.location.lng, location.location.lat],
        },
      })),
    };

    // Convert GeoJSON object to string
    return JSON.stringify(geoJSON, null, 2);
  }
}
