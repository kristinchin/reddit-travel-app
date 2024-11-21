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

// Usage example
(async () => {
  try {
    const url1 = "https://www.reddit.com/r/Denver/comments/180jqeh.json";
    const url2 =
      "https://www.reddit.com/r/Bozeman/comments/1binuhn/traveling_to_bozeman.json";
    const url3 =
      "https://www.reddit.com/r/denverfood/comments/1bsqppj/leaving_denver_must_not_miss_restaurants.json";
    const url4 =
      "https://www.reddit.com/r/denverfood/comments/11yu8bk/whats_actually_good_in_the_south_metro_area.json";
    const url5 =
      "https://www.reddit.com/r/denverfood/comments/18ibm7l/interesting_new_spots_south_part_of_denver.json";
    const url6 =
      "https://www.reddit.com/r/denverfood/comments/1fam97u/anyone_know_any_good_food_in_south_denver.json";
    const url_7 =
      "https://www.reddit.com/r/Denver/comments/1312ptq/what_are_some_good_coffee_shops_to_work_out_of.json";
    const url_8 =
      "https://www.reddit.com/r/denverfood/comments/12kal2a/coffeeshops_or_breweries_for_casual_remote_work.json";
    const url_9 =
      "https://www.reddit.com/r/denverfood/comments/1b5ns9e/best_coffee_shops_to_get_work_done.json";
    const url_10 =
      "https://www.reddit.com/r/Denver/comments/qh68zi/struggling_to_find_a_good_cafe_to_work_at_draw.json";

    const url_11 = "https://www.reddit.com/r/denverfood/comments/w1acLLxkMk";

    // const threads = [url_7, url_8, url_9, url_10];
    const threads = [url_7];

    // threads.forEach((thread) => {
    //   threadToLocations(thread, MapProviderType.GOOGLE_BROWSER);
    // });

    // const comments = await fetchRedditThreadComments(url1);
    // console.log("reddit comments: ", comments);
    // const locationNames = await extractLocationsFromComments(comments);
    // console.log("Recommended locations:", locationNames);
    const locationNames1 = [
      "The Butterfly Pavilion Denver, Colorado",
      "Air and Space Museum in Lowry Denver, Colorado",
      "Cheyenne Mountain Zoo Colorado Springs, Colorado",
      "Golden Gate Canyon State Park Golden, Colorado",
      "Mount Falcon - Morrison, Colorado",
    ];

    // const place = await callSearchText("Dave's Denver, Colorado");
    // console.log("place: ", place);
    // const places = await searchListPlaces(locationNames1);
    // console.log("places: ", places);
    // const kml = generateKML(places1);
    // downloadKML("output/denver1.kml", kml);
  } catch (error) {
    console.error("Error:", error);
  }
})();
