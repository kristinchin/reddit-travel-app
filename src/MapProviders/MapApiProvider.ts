import fs from "fs";

export interface MapApiProvider {
  provider(): MapProviderType;
  search(query: Query): Promise<SearchResult | undefined>;
  searchList(queries: Query[]): Promise<SearchResult[]>;
}

export enum MapProviderType {
  GOOGLE = "google",
  OSM = "osm",
  GOOGLE_BROWSER = "google-browser",
}

export interface Query {
  queryString: string;
}

export interface SearchResult {
  name: { text: string; languageCode: string };
  address: string;
  location: { lat: number; lng: number };
  // icon: string | undefined;
  types?: Array<string>;
  rating?: Number;
  googleMapsLinks: {
    directionsUri: string;
    photosUri: string;
    placeUri: string;
    reviewsUri: string;
    writeAReviewUri: string;
  };
}

export abstract class AbstractMapApiProvider implements MapApiProvider {
  abstract provider(): MapProviderType;
  abstract search(query: Query): Promise<SearchResult | undefined>;

  async searchList(queries: Query[]): Promise<SearchResult[]> {
    const promises = queries.map(async (query: Query) => {
      try {
        let response = await this.search(query);

        return response; // Return the response
      } catch (e) {
        throw e;
      }
    });

    console.log("searchList: ", promises);

    const placesList = await Promise.all(promises);
    const placesClean = placesList.filter((loc) => loc !== undefined);
    return placesClean as SearchResult[]; // Return a promise
  }
}

export abstract class AbstractServerMapApiProvider extends AbstractMapApiProvider {
  private cache: Map<string, SearchResult>;
  private cacheFile: string;

  constructor(cacheFile: string) {
    super();
    this.cacheFile = cacheFile;
    this.cache = this.LoadFromCache(cacheFile);
  }

  abstract provider(): MapProviderType;
  protected abstract doSearch(query: Query): Promise<SearchResult>;

  async search(query: Query): Promise<SearchResult | undefined> {
    // if in cache, return result from cache
    // else
    //  - do search
    //  - save in cache
    //  - return result
    // return {};
    if (this.cache.has(query.queryString)) {
      console.log("retrieved from cache: ", query.queryString);
      return this.cache.get(query.queryString) as SearchResult;
    } else {
      const res = await this.doSearch(query);
      this.cache.set(query.queryString, res);
      // console.log("cache set: ", res);
      this.WriteToCache(this.cacheFile, this.cache);
      return res;
    }
  }

  private LoadFromCache(filePath: string): Map<string, SearchResult> {
    try {
      const data = fs.readFileSync(filePath, "utf-8");
      const obj: Map<string, SearchResult> = new Map<string, SearchResult>(
        Object.entries(JSON.parse(data)),
      );

      return obj;
    } catch (err) {
      console.error("Error reading JSON file:", err);
    }
    return new Map<string, SearchResult>();
  }

  private async WriteToCache(
    filePath: string,
    data: Map<string, SearchResult>,
  ) {
    try {
      const content = JSON.stringify(Object.fromEntries(data));
      fs.writeFile(filePath, content, (err: NodeJS.ErrnoException | null) => {
        // In case of a error throw err.
        // console.log("writing to file:", content, data);
        if (err) throw err;
      });
    } catch (err) {
      console.error("Error writing to JSON file:", err);
    }
  }
}
