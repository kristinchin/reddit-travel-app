import { GoogleMapsApi, GoogleMapsBrowserApi } from "./GoogleMapsApi";
import { OsmMapsApi } from "./OsmMapsApi";
import { MapApiProvider, MapProviderType } from "./MapApiProvider";

export function getProvider(
  provider: MapProviderType,
  cacheFile: string,
): MapApiProvider {
  switch (provider) {
    case MapProviderType.GOOGLE:
      return new GoogleMapsApi(cacheFile);
    case MapProviderType.GOOGLE_BROWSER:
      return new GoogleMapsBrowserApi();
    case MapProviderType.OSM:
      return new OsmMapsApi(cacheFile);
  }
}
