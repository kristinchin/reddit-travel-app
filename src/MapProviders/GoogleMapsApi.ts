import {
  Query,
  SearchResult,
  AbstractMapApiProvider,
  MapProviderType,
  AbstractServerMapApiProvider,
} from "./MapApiProvider";
const { PlacesClient } = require("@googlemaps/places").v1;
import axios from "axios";
// import { places } from "@googlemaps/places";

interface GoogleTextSearchRequest {
  textQuery: string;
  languageCode: string;
  maxResultCount: number;
  rankPreference: string;
  minRating: Number;
}

interface GoogleMapsPlace {
  formattedAddress: string;
  displayName: { text: string; languageCode: string };
  location: { latitude: number; longitude: number };
  rating: number;
  types: string[];
}

// this class is for browser use, does not implement caching
export class GoogleMapsBrowserApi extends AbstractMapApiProvider {
  provider(): MapProviderType {
    return MapProviderType.GOOGLE_BROWSER;
  }

  // @override
  async search(query: Query): Promise<SearchResult | undefined> {
    return await this.doSearch(query);
  }

  protected async doSearch(query: Query): Promise<SearchResult | undefined> {
    const apiResponse = await this.apiTextSearch(query);
    if (!apiResponse) {
      return;
    }
    return this.processTextSearchResponse(apiResponse);
  }

  async apiTextSearch(query: Query): Promise<GoogleMapsPlace | undefined> {
    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY; // Replace with your actual key or environment variable setup
    const textQuery = query.queryString;

    try {
      const response = await axios.post(
        "https://places.googleapis.com/v1/places:searchText",
        { textQuery },
        {
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": apiKey || "", // Fallback to empty string if apiKey is undefined
            "X-Goog-FieldMask":
              "places.displayName,places.formattedAddress,places.location,places.types,places.rating",
          },
        },
      );

      console.log("google search response: ", response);
      if (
        response.data &&
        response.data.places &&
        response.data.places.length
      ) {
        return response.data.places[0];
      } else {
        return;
      }
    } catch (error) {
      console.error("Error fetching data from Google Places API: ", error);
      throw error;
    }
  }

  private processTextSearchResponse(place: GoogleMapsPlace): SearchResult {
    const searchResult: SearchResult = {
      name: place.displayName,
      address: place.formattedAddress,
      location: {
        lat: place.location.latitude,
        lng: place.location.longitude,
      },
      // icon: topPlace.iconMaskBaseUri,
      rating: place.rating, // advanced
      types: place.types,
    };
    return searchResult;
  }
}

// this class only runs with node because of PlacesClient
export class GoogleMapsApi extends AbstractServerMapApiProvider {
  private placesClient: any;

  constuctor() {
    const options = {
      fallback: true, // Use HTTP REST mode
      // service account JSON file
      keyFilename:
        "/Users/kristinchin/Documents/Software/reddit-travel-map-key.json",
      // apiEndpoint: "places.googleapis.com", // Explicitly set the Places API endpoint
    };
    // Instantiates a client
    console.log("instantiating a places client");
    const placesClient = new PlacesClient(options);
    this.placesClient = placesClient;
    console.log("places client loaded");
  }

  provider(): MapProviderType {
    return MapProviderType.GOOGLE;
  }
  async doSearch(query: Query): Promise<SearchResult> {
    const apiResponse = await this.apiTextSearch(query);
    return this.processTextSearchResponse(apiResponse);
  }

  private async apiTextSearch(query: Query) {
    //Promise<SearchResult> | undefined
    const request: GoogleTextSearchRequest = {
      textQuery: query.queryString,
      languageCode: "en-US",
      maxResultCount: 4,
      rankPreference: "RELEVANCE",
      minRating: 3.2,
    };

    try {
      console.log("about to do google search: ", request);
      const response = await this.placesClient.searchText(request, {
        otherArgs: {
          headers: {
            "X-Goog-FieldMask":
              "places.displayName,places.formattedAddress,places.location,places.types,places.rating",
          },
        },
      });

      if (response?.[0]?.places?.[0]) {
        return response;
      }
      return;
    } catch (e) {
      console.log("query: ", query);
      throw new Error("Error searching place: " + e);
    }
  }

  private processTextSearchResponse(response: any): SearchResult {
    const topPlace = response[0].places[0];
    const place: SearchResult = {
      name: topPlace.displayName,
      address: topPlace.formattedAddress,
      location: {
        lat: topPlace.location.latitude,
        lng: topPlace.location.longitude,
      },
      // icon: topPlace.iconMaskBaseUri,
      rating: topPlace.rating, // advanced
      types: topPlace.types,
    };
    return place;
  }
}
