# Maps Module

A comprehensive interactive world map component built with React Leaflet, featuring country detection, service location markers, and rich tooltips.

## Structure

```
src/components/maps/
├── components/           # Individual map components
│   ├── CountryOverlay.tsx       # GeoJSON country boundaries
│   ├── HomeButton.tsx           # Reset to home view button
│   ├── MapInteractionHandler.tsx # Mouse interactions and tooltips
│   ├── ServiceMarkers.tsx       # Service location markers
│   └── index.ts                 # Component exports
├── constants/           # Configuration and data
│   └── index.ts                 # Service locations, map config
├── hooks/              # Custom hooks
│   └── useCountriesData.ts      # Fetch countries GeoJSON data
├── styles/             # Component styles
│   └── Maps.module.css          # CSS modules for map styling
├── types/              # TypeScript definitions
│   └── index.ts                 # Interface definitions
├── index.ts            # Main module exports
└── README.md           # This file
```

## Components

### CountryOverlay

Renders country boundaries using GeoJSON data with hover effects.

### HomeButton

Provides a control button to reset the map to its initial view.

### MapInteractionHandler

Handles mouse interactions, country detection, and tooltip display.

### ServiceMarkers

Displays animated markers for service locations with ripple effects.

## Hooks

### useCountriesData

Fetches and manages world countries GeoJSON data with loading and error states.

## Usage

```tsx
import { Maps } from "@/components/sections/Maps";

// In your page component
<Maps />;
```

## Features

- **Interactive Country Detection**: Hover over countries to see information
- **Service Location Markers**: Animated markers showing available services
- **Rich Tooltips**: Country flags, service details (tax, duties, lead time)
- **Zoom Controls**: Click to zoom in, home button to reset
- **Responsive Design**: Works on desktop and mobile devices
- **Error Handling**: Graceful fallbacks for network issues

## Styling

The module uses CSS Modules for component-specific styling, ensuring no style conflicts with global styles. All map-related styles are contained within the `Maps.module.css` file.

## Configuration

Service locations and map settings can be modified in `constants/index.ts`:

- `SERVICE_LOCATIONS`: Array of countries with service data
- `MAP_CONFIG`: Map center, zoom levels, and bounds
- `TILE_LAYER_CONFIG`: Map tile provider settings

## Dependencies

- `react-leaflet`: React components for Leaflet maps
- `leaflet`: Core mapping library
- `geojson`: TypeScript types for GeoJSON data
