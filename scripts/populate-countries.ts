/**
 * Script to populate all countries in Sanity from the existing countries database
 * Run this once to initialize all countries in Sanity CMS
 *
 * Usage: npx tsx scripts/populate-countries.ts
 */

import { createClient } from "@sanity/client";
import {
  countriesDatabase,
  getFlagFromCountryName,
} from "../src/data/countries";
import * as fs from "fs";
import * as path from "path";

const client = createClient({
  projectId: "cmn648mb", // Your project ID
  dataset: "production", // Your dataset is production
  useCdn: false,
  token:
    "skvuJxKrQ51aXtRGRi9Cnhsuf6atzOGF1dAHttGGWghpVKcvA70xmGaDDezy9Kh2VOTINq8fiiRlhslOZOcCgPIKsZfkF9l5RSa3xONSdjcG293Ve8zmQ622urTHn6eVX43Yo3b4bX7cInNX5PHKlgKnfNvznrmSSkgoo4T347wYXZjCfZdU", // Replace this with your actual Sanity API token
  apiVersion: "2024-01-01",
});

async function populateCountries() {
  console.log("🌍 Starting to populate countries in Sanity...");

  try {
    // Get existing countries to avoid duplicates
    const existingCountries = await client.fetch(
      '*[_type == "country"] { code, _id }',
    );
    const existingCodes = new Set(existingCountries.map((c: any) => c.code));

    const countriesToCreate = countriesDatabase.filter(
      (country) => !existingCodes.has(country.code),
    );

    if (countriesToCreate.length === 0) {
      console.log("✅ All countries already exist in Sanity");
      return;
    }

    console.log(`📝 Creating ${countriesToCreate.length} new countries...`);

    // Create countries in batches
    const batchSize = 10;
    for (let i = 0; i < countriesToCreate.length; i += batchSize) {
      const batch = countriesToCreate.slice(i, i + batchSize);

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
      console.log(
        `✅ Created batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(countriesToCreate.length / batchSize)}`,
      );
    }

    // Create a default maps section
    const existingMapsSection = await client.fetch(
      '*[_type == "mapsSection"][0]',
    );

    if (!existingMapsSection) {
      await client.create({
        _type: "mapsSection",
        _id: "maps-section-default",
        title: "Global Service Coverage",
        description:
          "Interactive map showing countries where our services are available",
        isActive: true,
        mapConfig: {
          centerLat: 20,
          centerLng: 0,
          zoomLevel: 2,
        },
        countries: [], // Empty initially, admin can add countries
      });
      console.log("✅ Created default maps section");
    }

    console.log("🎉 All countries populated successfully!");
    console.log("📋 Next steps:");
    console.log("1. Go to Sanity Studio");
    console.log(
      "2. Navigate to Homepage > Maps Section > Countries Management",
    );
    console.log("3. Toggle countries to active and add tax/duties/lead time");
    console.log("4. Add active countries to Maps Settings");
  } catch (error) {
    console.error("❌ Error populating countries:", error);
  }
}

// Run the script
populateCountries();
