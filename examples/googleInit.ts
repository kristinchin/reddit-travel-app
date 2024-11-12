export const googleMapsUrl = `http://maps.google.com/maps/api/js?key=${process.env.GOOGLE_API_KEY}`;
console.log("Maps url: " + googleMapsUrl);

// Typescript separates out the types from the definitions of the Google API.
// We must be sure to include the google URL at some point.
//
// https://stackoverflow.com/a/42733315/5977282
export function addMapsScript() {
  console.log("Triggered addMapsScript()");
  if (!document.querySelectorAll(`[src="${googleMapsUrl}"]`).length) {
    document.body.appendChild(
      Object.assign(document.createElement("script"), {
        type: "text/javascript",
        src: googleMapsUrl,
        onload: () => initMap(),
      }),
    );
  } else {
    initMap();
  }
}

// Initialize and add the map
async function initMap(): Promise<void> {
  // Request needed libraries.
  //@ts-ignore
  console.log("Triggered initMap()");
  const { Map } = (await google.maps.importLibrary(
    "maps",
  )) as google.maps.MapsLibrary;
  const {
    Autocomplete,
    AutocompleteService,
    AutocompleteSessionToken,
    AutocompleteSuggestion,
    Place,
  } = (await google.maps.importLibrary("places")) as google.maps.PlacesLibrary;
  const { AdvancedMarkerElement } = (await google.maps.importLibrary(
    "marker",
  )) as google.maps.MarkerLibrary;
}

// using Maps JavaScript Api..didn't work
// async function apiTextSearch(query: Query) {
//   const { Place } = (await google.maps.importLibrary(
//     "places",
//   )) as google.maps.PlacesLibrary;

//   const request = {
//     textQuery: query.queryString,
//     // fields: [
//     //   "displayName",
//     //   "formattedAddress",
//     //   "location",
//     //   "types",
//     //   "rating",
//     // ],
//     fields: ["displayName", "location"],
//     rankPreference: "RELEVANCE",
//     region: "us",
//     language: "en-US",
//     maxResultCount: 4,
//     // minRating: 3.2,
//   };

//   try {
//     console.log("about to do google search: ", request);
//     //@ts-ignore
//     const { response } = await Place.searchByText(request);

//     console.log("google search response: ", response);

//     if (response.length) {
//       return response;
//     }
//     console.log("No place found for ", query.queryString);
//   } catch (e) {
//     console.log("query: ", query);
//     throw new Error("Error searching place: " + e);
//   }
// }
