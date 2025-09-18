# Interactive World Map Component

A high-performance interactive world map built with D3.js, featuring dual-view navigation, service location visualization, and professional user interactions.

## Architecture

```
src/components/maps/
├── components/                    # React components
│   ├── SvgInteractiveMap.tsx     # Main D3.js SVG map component
│   ├── MapComponent.tsx          # React wrapper component
│   └── MapWrapper.tsx            # Container with data fetching
├── constants/                     # Configuration and data
│   └── svgMapConstants.ts        # Continent mappings, zoom coordinates, config
├── utils/                        # Utility functions
│   └── svgMapUtils.ts           # Country detection, zoom functions, data helpers
├── styles/                       # Component styles
│   └── Maps.module.css          # CSS modules for tooltips and UI elements
├── hooks/                        # Custom hooks
│   └── useSanityMapsData.ts     # Sanity CMS data fetching
└── README.md                     # This file
```

## Core Features

### 🌍 Dual-View System
- **Continent View**: Overview of all continents with hover effects
- **Country View**: Detailed view of countries within selected continent
- **Smooth Transitions**: 750ms animated zoom transitions between views

### 🎯 Smart Interactions
- **Continent Hover**: Hovered continent becomes lighter (#5a5a5a), others darker (#1a1a1a)
- **Country Hover**: Service countries show tooltips only, non-service countries get visual feedback
- **Click Navigation**: Click continents to zoom in, click other continents to switch
- **Zoom Controls**: Zoom in/out buttons and home button with Lucide icons

### 📍 Service Location System
- **Visual Indicators**: Orange borders (#f65009) for countries with services
- **Service Markers**: 3px orange dots that scale with zoom level
- **Rich Tooltips**: Country flags, tax info, duties, lead times
- **Cursor Following**: Tooltips follow mouse movement smoothly

### ⚡ Performance Optimizations
- **Zoom-Independent Elements**: Borders and dots maintain 1px visual appearance
- **Transition Management**: Smart state management prevents re-renders during animations
- **Efficient Rendering**: D3.js SVG for high-performance graphics

## Component Structure

### SvgInteractiveMap
The main component handling all D3.js interactions:
- SVG rendering with geoNaturalEarth1 projection
- Zoom and pan behavior management
- Mouse event handling for hover and click
- Tooltip creation and positioning
- Transition state management

### MapWrapper
React container component:
- Data fetching from Sanity CMS
- Loading and error states
- Props management for map configuration

## Configuration

### Continent Zoom Coordinates
Precisely configured zoom positions for each continent:

```typescript
export const CONTINENT_ZOOM_COORDS = {
  Asia: { zoom: 3, x: -1739, y: -250 },
  Europe: { zoom: 5.5, x: -2853, y: -598 },
  "North America": { zoom: 3.5, x: -754, y: -332 },
  "South America": { zoom: 3.5, x: -1033, y: -938 },
  Africa: { zoom: 3.5, x: -1487, y: -668 },
  Oceania: { zoom: 4, x: -2948, y: -1223 }
};
```

### Map Configuration
```typescript
export const SVG_MAP_CONFIG = {
  width: 1200,
  height: 600,
  initialZoom: 1.5,
  initialX: -340,
  initialY: -94,
  zoomExtent: [1.5, 8],
  dataUrl: "/world-countries.geojson"
};
```

### Color Scheme
- **Initial continent color**: `#3a3a3a`
- **Hovered continent**: `#5a5a5a` (lighter)
- **Non-hovered continents**: `#1a1a1a` (darker)
- **Service country borders**: `#f65009` (brand orange)
- **Service country fill**: `#1a0f05` (dark with orange tint)
- **Regular country borders**: `#050505` (dark)

## Usage

```tsx
import { Maps } from "@/components/sections/Maps";

// Basic usage
<Maps />

// With Sanity CMS data
<Maps 
  serviceLocations={serviceData}
  mapsSection={mapConfig}
/>
```

## User Interactions

### Navigation Flow
1. **Continent View**: Hover continents to see names, click to zoom in
2. **Country View**: Hover countries for service details, click other continents to switch
3. **Controls**: Use zoom buttons or home button to navigate

### Tooltip System
- **Service Countries**: Rich tooltips with flag, tax, duties, lead time
- **Non-Service Countries**: Simple "Service Not Available" message
- **Cursor Following**: Tooltips move with mouse for better UX
- **Transition Aware**: Hidden during zoom animations

### Responsive Behavior
- **Zoom-Independent Scaling**: All elements maintain visual consistency
- **Touch Support**: Works on mobile devices
- **Keyboard Accessible**: Proper focus management

## Technical Implementation

### D3.js Integration
- **Projection**: geoNaturalEarth1 for balanced world view
- **Zoom Behavior**: Smooth zoom with scale limits
- **Path Generation**: Efficient country boundary rendering
- **Event Handling**: Mouse interactions with proper cleanup

### State Management
- **View Mode**: Continent vs country view state
- **Selected Continent**: Currently active continent
- **Transition State**: Prevents interactions during animations
- **Hover State**: Current hovered item tracking

### Performance Features
- **Efficient Re-renders**: Minimal React re-renders during D3 interactions
- **Memory Management**: Proper event listener cleanup
- **Optimized Scaling**: Mathematical scaling for consistent visuals

## Dependencies

- **D3.js**: `d3-geo`, `d3-zoom`, `d3-selection` for map functionality
- **React**: Component structure and state management
- **Lucide React**: Professional icons for controls
- **TypeScript**: Type safety and better development experience

## Styling

The component uses a hybrid approach:
- **CSS Modules**: For tooltip styling and UI elements
- **Inline Styles**: For dynamic D3.js element styling
- **Tailwind CSS**: For layout and responsive design

All map-specific styles are contained within `Maps.module.css` to prevent conflicts.
