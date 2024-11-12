import {
  Query,
  SearchResult,
  AbstractServerMapApiProvider,
  MapProviderType,
} from "./MapApiProvider";

export class OsmMapsApi extends AbstractServerMapApiProvider {
  provider(): MapProviderType {
    return MapProviderType.OSM;
  }
  async doSearch(query: Query): Promise<SearchResult> {
    throw new Error("Method not implemented.");
  }
}
