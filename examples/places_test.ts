import Location from "./Location";
import { SearchResult } from "./MapProviders/MapApiProvider";
let placesTest: SearchResult[] = [
  {
    name: { text: "Butterfly 'Pavilion'", languageCode: "en" },
    address: "6252 W 104th Ave, Westminster, CO 80020, USA",
    location: { latitude: 39.8873108, longitude: -105.0666409 },
    // icon: undefined,
    types: [
      "zoo",
      "tourist_attraction",
      "event_venue",
      "point_of_interest",
      "establishment",
    ],
  },
  {
    name: {
      text: "Wings Over the Rockies Air & Space Museum",
      languageCode: "en",
    },
    address: "7711 E Academy Blvd, Denver, CO 80230, USA",
    location: { latitude: 39.7208907, longitude: -104.8955075 },
    // icon: undefined,
    types: [
      "tourist_attraction",
      "museum",
      "event_venue",
      "point_of_interest",
      "establishment",
    ],
  },
  {
    name: { text: "Cheyenne <Mountain> Zoo", languageCode: "en" },
    address: "4250 Cheyenne Mountain Zoo Rd, Colorado Springs, CO 80906, USA",
    location: { latitude: 38.7703872, longitude: -104.8548688 },
    // icon: undefined,
    types: ["zoo", "tourist_attraction", "point_of_interest", "establishment"],
  },
  {
    name: { text: "Golden Gate Canyon State Park", languageCode: "en" },
    address: "92 Crawford Gulch Rd, Golden, CO 80403, USA",
    location: { latitude: 39.8414296, longitude: -105.4197987 },
    // icon: undefined,
    types: ["tourist_attraction", "park", "point_of_interest", "establishment"],
  },
  {
    name: { text: "Mount Falcon Park", languageCode: "en" },
    address: "Castle Trail, Morrison, CO 80465, USA",
    location: { latitude: 39.6413501, longitude: -105.2251088 },
    // icon: undefined,
    types: [
      "park",
      "hiking_area",
      "tourist_attraction",
      "point_of_interest",
      "establishment",
    ],
  },
];
