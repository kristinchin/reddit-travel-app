import {
  MapApiProvider,
  MapProviderType,
  Query,
  SearchResult,
} from "./services/MapProviders/MapApiProvider";
import { getProvider } from "./services/MapProviders/MapApiProviderFactory";
import {
  LLMApiProvider,
  PromptResult,
  LLMProviderType,
} from "./services/LLMProviders/LLMApiProvider";
import { getLLMProvider } from "./services/LLMProviders/LLMApiProviderFactory";
import { fetchRedditThreadComments } from "./redditClient";
import Location from "./Location";

const cacheFile = "output/mapRequestCache.json";

export async function threadToLocations(
  url: string,
  mapProviderType: MapProviderType,
  llmProviderType: LLMProviderType,
  mapsApiKey: string,
  openApiKey: string,
): Promise<Location[]> {
  const mapProvider: MapApiProvider = getProvider(
    mapProviderType,
    cacheFile,
    mapsApiKey,
  );
  const llmProvider: LLMApiProvider = getLLMProvider(
    llmProviderType,
    openApiKey,
  );

  const comments = await fetchRedditThreadComments(url);
  // let id = getThreadId(url);
  console.log("got reddit comments");

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
