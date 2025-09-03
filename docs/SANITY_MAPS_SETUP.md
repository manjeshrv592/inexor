# Sanity CMS Maps Configuration

This document explains how to set up and use the new Sanity CMS integration for managing the interactive maps feature.

## Overview

The maps feature now uses Sanity CMS to manage:

- All country data (flags, names, service availability)
- Tax rates, duties, and lead times for each country
- Map configuration (center point, zoom level)
- Section title and description

## Initial Setup

### 1. Environment Variables

Make sure you have the following environment variables in your `.env.local`:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_write_token  # For the populate script
```

### 2. Populate Countries

Run the populate script to add all countries from the existing database to Sanity:

```bash
npx tsx scripts/populate-countries.ts
```

This script will:

- Create all countries in Sanity (initially inactive)
- Create a default maps section
- Set up the basic structure

## Using the Sanity Studio

### Accessing Maps Configuration

1. Go to your Sanity Studio
2. Navigate to **Homepage** → **Maps Section**

You'll see two sections:

- **Maps Settings**: Configure the overall maps section
- **Countries Management**: Manage individual countries

### Managing Countries

#### Countries Management Interface

In **Countries Management**, you'll see all countries with:

- 🟢 Green dot = Service available (active)
- 🔴 Red dot = Service not available (inactive)
- Country flag thumbnail
- Country name and code
- Service details (tax, duties, lead time) if active

#### Activating a Country

1. Click on any country
2. Toggle **Service Available** to `true`
3. Fill in the required fields:
   - **Tax**: e.g., "5%", "8.5%"
   - **Duties**: e.g., "12%", "15%"
   - **Lead Time**: e.g., "12H", "2-3 days", "24H"
4. Save the document

#### Deactivating a Country

1. Click on the country
2. Toggle **Service Available** to `false`
3. Save (tax, duties, and lead time fields will be hidden)

### Maps Settings

#### Configuring the Maps Section

1. Go to **Maps Settings**
2. You can configure:
   - **Section Title**: Main heading (default: "GO GLOBAL. INSTANTLY.")
   - **Section Description**: Subheading (default: "Reach Over 120 Markets...")
   - **Countries**: Reference to active countries (optional, auto-populated from active countries)
   - **Map Configuration**:
     - **Map Center Latitude**: Default center latitude (20)
     - **Map Center Longitude**: Default center longitude (0)
     - **Zoom Level**: Initial zoom (1-18, default: 2)

#### Multiple Maps Sections

You can create multiple maps configurations, but only one should be active at a time. The active one will be used on the website.

## How It Works

### Data Flow

1. **Sanity CMS**: Admin manages countries and settings
2. **API Calls**: Website fetches data from Sanity
3. **Maps Component**: Renders interactive map with Sanity data
4. **Hover Tooltips**: Show country info (flag, name, tax, duties, lead time)

### Fallback Behavior

If Sanity data is unavailable:

- Maps will show loading state
- Error messages for connection issues
- Fallback to hardcoded titles if needed

### Performance

- Data is fetched once when the component mounts
- Countries are filtered client-side for active services
- Flags are served from `/public/flags/` directory (fast loading)

## File Structure

```
sanity/
├── schemas/
│   ├── country.ts          # Individual country schema
│   ├── mapsSection.ts      # Maps section configuration
│   └── index.ts           # Schema exports
└── structure.ts           # Studio navigation structure

src/
├── lib/
│   └── sanity-maps.ts     # Sanity data fetching functions
├── components/
│   ├── maps/hooks/
│   │   └── useSanityMapsData.ts  # React hook for maps data
│   └── sections/
│       ├── Maps.tsx       # Main maps section component
│       └── MapComponent.tsx # Interactive map component
└── scripts/
    └── populate-countries.ts # Initial data population script
```

## Customization Tips

### Adding New Countries

If you need to add countries not in the initial database:

1. Go to **Countries Management**
2. Click "Create" (+ button)
3. Fill in all required fields:
   - Country name
   - 2-letter country code
   - Flag path (e.g., `/flags/xx.svg`)
   - Coordinates and bounds
4. Save and activate as needed

### Styling Country Previews

The country preview in Sanity shows:

- Status indicator (🟢/🔴)
- Country name and code
- Service details if active
- Flag thumbnail

This is configured in the `preview` section of `sanity/schemas/country.ts`.

### Custom Validation

The schema includes validation:

- Tax, duties, and lead time are required when country is active
- Country codes must be exactly 2 characters
- Map coordinates have proper min/max bounds

## Troubleshooting

### Countries Not Showing

1. Check if countries are marked as active in Sanity
2. Verify the maps section is active
3. Check browser console for API errors

### Flags Not Loading

1. Ensure flag files exist in `/public/flags/`
2. Check flag path format: `/flags/xx.svg` (lowercase)
3. Verify SVG files are valid

### Data Not Updating

1. Check if you're in development mode (data updates immediately)
2. In production, Sanity CDN may cache for a few minutes
3. Use `useCdn: false` in client config for real-time updates

### Script Errors

If the populate script fails:

1. Check environment variables
2. Ensure SANITY_API_TOKEN has write permissions
3. Verify project ID and dataset are correct

## Best Practices

1. **Always test changes**: Preview in Sanity Studio before publishing
2. **Keep one active maps section**: Multiple active sections may cause conflicts
3. **Use consistent formatting**: Keep tax/duties format consistent (e.g., "5%" not "5 percent")
4. **Regular backups**: Export your Sanity data regularly
5. **Monitor performance**: Keep an eye on load times with many active countries

## Support

For issues with:

- Sanity Studio: Check Sanity documentation
- Maps functionality: Review the maps components code
- Data fetching: Check the `sanity-maps.ts` helper functions
