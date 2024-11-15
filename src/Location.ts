interface Location {
  name: { text: string; languageCode: string };
  address: string;
  location: { lat: number; lng: number };
  // icon: string | undefined;
  types: Array<string> | undefined;
  rating: Number | undefined;
  description: string | undefined;
  googleMapsLinks?: {
    directionsUri?: string;
    photosUri?: string;
    placeUri: string;
    reviewsUri?: string;
    writeAReviewUri?: string;
  };
}

export default Location;
