import fs from "fs";
import Location from "../src/Location";

export function generateKML(data: Location[]): string {
  data = cleanLocationData(data);
  // console.log("in generate kml");

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

export function downloadKMLBrowser(filename: string, data: Location[]) {
  const kmlContent = generateKML(data);

  const blob = new Blob([kmlContent], {
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

export function downloadKML(filename: string, kmlContent: string) {
  fs.writeFile(filename, kmlContent, (err: NodeJS.ErrnoException | null) => {
    // In case of a error throw err.
    if (err) throw err;
  });
}

function cleanLocationData(data: Location[]): Location[] {
  data.forEach((place) => {
    place.name.text = encodeXmlSpecialChars(place.name.text);
  });
  return data;
}

function encodeXmlSpecialChars(str: string) {
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
