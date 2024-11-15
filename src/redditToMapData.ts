import {
  MapApiProvider,
  MapProviderType,
  Query,
  SearchResult,
} from "./MapProviders/MapApiProvider";
import { getProvider } from "./MapProviders/MapApiProviderFactory";
// import { extractLocationsFromComments } from "./openAIClient";
import {
  LLMApiProvider,
  PromptResult,
  LLMProviderType,
} from "./LLMProviders/LLMApiProvider";
import { getLLMProvider } from "./LLMProviders/LLMApiProviderFactory";
import { fetchRedditThreadComments } from "./redditClient";
// import { generateKML, downloadKML } from "./generateKML";
import Location from "./Location";
import {
  ExportFormat,
  ExportFormatType,
} from "./ExportFormatters/ExportFormat";
import { getExportFormat } from "./ExportFormatters/ExportFormatFactory";

const cacheFile = "output/mapRequestCache.json";
const llmProvider: LLMApiProvider = getLLMProvider(LLMProviderType.OPENAI);
const formatter: ExportFormat = getExportFormat(ExportFormatType.KML);

export async function threadToLocations(
  url: string,
  mapProviderType: MapProviderType,
): Promise<Location[]> {
  const mapProvider: MapApiProvider = getProvider(mapProviderType, cacheFile);

  const comments = await fetchRedditThreadComments(url);
  let id = getThreadId(url);
  // console.log("reddit comments: ", comments);
  const placeNames = await llmProvider.submitPrompt(comments);
  // console.log("locationNames: ", placeNames);
  const searchResults: SearchResult[] = await searchPlaces(
    placeNames,
    mapProvider,
  );
  console.log("searchResults: ", searchResults);
  let locations: Location[] = [];
  searchResults.forEach((sr, index) => {
    let loc = {
      description: placeNames[index].description,
      name: sr.name,
      address: sr.address,
      location: sr.location,
      types: sr.types,
      rating: sr.rating,
      googleMapsLinks: sr.googleMapsLinks,
    };
    locations.push(loc);
  });
  return locations;
}

export async function locationsToKml(url: string, locations: Location[]) {
  // const comments = await fetchRedditThreadComments(url);
  let id = getThreadId(url);
  // // console.log("reddit comments: ", comments);
  // const placeNames = await llmProvider.submitPrompt(comments);
  // // console.log("locationNames: ", placeNames);
  // const searchResults: SearchResult[] = await searchPlaces(placeNames);
  // // console.log("places: ", locations);
  // let locations: Location[] = [];
  // searchResults.forEach((sr, index) => {
  //   let loc = {
  //     description: placeNames[index].description,
  //     name: sr.name,
  //     address: sr.address,
  //     location: sr.location,
  //     types: sr.types,
  //     rating: sr.rating,
  //   };
  //   locations.push(loc);
  // });

  const kml = formatter.format(locations);
  formatter.download(`output/${id}.kml`, kml);

  // formatter.download(`output/${placeNames[0].city}_${id}.kml`, kml);
}

async function searchPlaces(
  places: PromptResult[],
  mapProvider: MapApiProvider,
): Promise<SearchResult[]> {
  let queries: Query[] = [];

  places.map((place: PromptResult) => {
    let query: Query = {
      queryString: `${place.name} ${place.city}, ${place.state}`,
    };
    queries.push(query);
  });
  return await mapProvider.searchList(queries);
}

function getThreadId(url: string): string | null {
  const regex = /comments\/([a-z0-9]+)\//;
  const match = url.match(regex);
  return match ? match[1] : null;
}
