# Reddit Travel Map

At this point, I know we all add that famous "reddit" suffix to our searches when we're looking for recommendations.
**Reddit Travel Map** is a TypeScript-based application that allows users to search for locations discussed in Reddit threads and visualize these places on a Google Map. The project includes both backend and frontend functionality and enables users to export location data in various formats like KML and GeoJSON for use in other geospatial applications.

## Table of Contents

- [Features](#features)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Setup](#setup)
- [Adding API Keys](#adding-api-keys)

## Features

- Search for and visualize points of interest (PoIs) from Reddit posts.
- Interactive map using Google Maps, with toggleable markers.
- Export location data as KML for external use.
- Dynamically updated search panel and map components.

## Usage

Paste a Reddit thread URL into the search bar and click "Search."
View the identified locations on the interactive map.
Click on markers or list items to see additional details in an info window.
Toggle the visibility of markers using the toggle buttons in the search panel.
Export to KML or GeoJson. You can import KML to Google My Maps or Google Earth and copy and paste the GeoJson into [Mapbox's GeoJson tool](https://geojson.io)

## Setup

### Adding API Keys

## Project Structure

```
[src]
    ├── [frontend]
        ├── App.css
        ├── App.tsx
        ├── [components]
            ├── ExportPanel.tsx
            ├── MapPanel.tsx
            ├── PlaceMarkers.tsx
            ├── PlacesList.tsx
            ├── RedditMapViewer.tsx
            ├── SearchPanel.tsx
            └── TestPanel.tsx
        └── index.tsx
    ├── index.ts
    ├── redditClient.ts
    ├── redditToMapData.ts
    ├── Location.ts
    └── [services]
        ├── [ExportFormatters]
            ├── ExportFormat.ts
            └── ExportFormatFactory.ts
        ├── [LLMProviders]
            ├── LLMApiProvider.ts
            ├── LLMApiProviderFactory.ts
            └── OpenAIApi.ts
        └── [MapProviders]
            ├── GoogleMapsApi.ts
            ├── MapApiProvider.ts
            ├── MapApiProviderFactory.ts
            ├── OsmMapsApi.ts
            └── [testData]
                └── gptResponse_test.json
```

## Technologies
