/**
 * Script to populate ALL countries in Sanity with proper geographic data
 * Uses the complete countries database with accurate coordinates and bounds
 *
 * Usage: npx tsx scripts/populate-complete-countries.ts
 */

import { createClient } from "@sanity/client";
import { allCountriesDatabase } from "../src/data/all-countries";

const client = createClient({
  projectId: "cmn648mb",
  dataset: "production",
  useCdn: false,
  token:
    "skvuJxKrQ51aXtRGRi9Cnhsuf6atzOGF1dAHttGGWghpVKcvA70xmGaDDezy9Kh2VOTINq8fiiRlhslOZOcCgPIKsZfkF9l5RSa3xONSdjcG293Ve8zmQ622urTHn6eVX43Yo3b4bX7cInNX5PHKlgKnfNvznrmSSkgoo4T347wYXZjCfZdU",
  apiVersion: "2024-01-01",
});

async function deleteAllExistingCountries() {
  console.log("🗑️  Deleting all existing countries to start fresh...");

  try {
    // Get all existing countries
    const existingCountries = await client.fetch(
      '*[_type == "country"] { _id }',
    );

    if (existingCountries.length > 0) {
      console.log(
        `Found ${existingCountries.length} existing countries to delete`,
      );

      // Delete all existing countries
      const deletePromises = existingCountries.map((country: any) =>
        client.delete(country._id),
      );

      await Promise.all(deletePromises);
      console.log("✅ All existing countries deleted");
    } else {
      console.log("No existing countries found");
    }
  } catch (error) {
    console.error("❌ Error deleting existing countries:", error);
    throw error;
  }
}

async function populateCompleteCountries() {
  console.log(
    "🌍 Starting to populate ALL countries with complete geographic data...",
  );

  try {
    // First, delete all existing countries to start fresh
    await deleteAllExistingCountries();

    console.log(`📊 Total countries to create: ${allCountriesDatabase.length}`);

    // Create countries in batches
    const batchSize = 10;
    let createdCount = 0;

    for (let i = 0; i < allCountriesDatabase.length; i += batchSize) {
      const batch = allCountriesDatabase.slice(i, i + batchSize);

      const mutations = batch.map((country) => ({
        create: {
          _type: "country",
          _id: `country-${country.code.toLowerCase()}`,
          name: country.name,
          code: country.code,
          flag: country.flag,
          isActive: false, // Default to inactive
          coordinates: {
            lat: country.center[0],
            lng: country.center[1],
          },
          bounds: {
            north: country.bounds.north,
            south: country.bounds.south,
            east: country.bounds.east,
            west: country.bounds.west,
          },
        },
      }));

      await client.mutate(mutations);
      createdCount += batch.length;

      console.log(
        `✅ Created batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(allCountriesDatabase.length / batchSize)} (${createdCount}/${allCountriesDatabase.length} countries)`,
      );
    }

    // Create or update the default maps section
    console.log("🗺️  Creating/updating maps section...");

    try {
      await client.createOrReplace({
        _type: "mapsSection",
        _id: "maps-section-default",
        title: "GO GLOBAL. INSTANTLY.",
        description: "Reach Over 120 Markets With Zero Compliance Issues",
        isActive: true,
        mapConfig: {
          centerLat: 20,
          centerLng: 0,
          zoomLevel: 2,
        },
        countries: [],
      });
      console.log("✅ Maps section created/updated");
    } catch (error) {
      console.error("⚠️  Maps section creation failed:", error);
    }

    console.log("🎉 All countries populated successfully!");
    console.log(`📊 Total countries created: ${allCountriesDatabase.length}`);
    console.log(
      `📍 All countries include proper geographic coordinates and boundaries`,
    );
    console.log("📋 Next steps:");
    console.log("1. Go to Sanity Studio");
    console.log("2. Navigate to Homepage > Countries Service Management");
    console.log("3. Toggle countries to active and add tax/duties/lead time");
    console.log(
      "4. Countries now have accurate geographic data for map positioning",
    );
  } catch (error) {
    console.error("❌ Error populating countries:", error);
  }
}

// Run the script
populateCompleteCountries();
