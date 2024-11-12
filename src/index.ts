import { threadToLocations } from "./redditToMapData";
import { MapProviderType } from "./MapProviders/MapApiProvider";

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

    // const threads = [url_7, url_8, url_9, url_10];
    const threads = [url_7];

    threads.forEach((thread) => {
      threadToLocations(thread, MapProviderType.GOOGLE_BROWSER);
    });

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
