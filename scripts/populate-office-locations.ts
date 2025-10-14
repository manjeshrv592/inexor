import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "cmn648mb", // Your project ID
  dataset: "production", // Your dataset is production
  useCdn: false,
  token:
    "skvuJxKrQ51aXtRGRi9Cnhsuf6atzOGF1dAHttGGWghpVKcvA70xmGaDDezy9Kh2VOTINq8fiiRlhslOZOcCgPIKsZfkF9l5RSa3xONSdjcG293Ve8zmQ622urTHn6eVX43Yo3b4bX7cInNX5PHKlgKnfNvznrmSSkgoo4T347wYXZjCfZdU", // Same token as other scripts
  apiVersion: "2024-01-01",
});

const officeLocationsData = [
  {
    _type: "officeLocation",
    country: "United States",
    officeName: "Inexor USA Headquarters",
    address: "1234 Business Ave, Suite 500, New York, NY 10001",
    phoneNumber: "+1 (555) 123-4567",
    email: "usa@inexor.com",
    mapsLink: "https://maps.google.com/?q=1234+Business+Ave+New+York+NY",
    displayOrder: 1,
    isActive: true,
  },
  {
    _type: "officeLocation",
    country: "Netherlands",
    officeName: "Inexor Europe B.V.",
    address: "Herengracht 123, 1015 BG Amsterdam, Netherlands",
    phoneNumber: "+31 20 123 4567",
    email: "europe@inexor.com",
    mapsLink: "https://maps.google.com/?q=Herengracht+123+Amsterdam+Netherlands",
    displayOrder: 2,
    isActive: true,
  },
  {
    _type: "officeLocation",
    country: "Germany",
    officeName: "Inexor Deutschland GmbH",
    address: "Unter den Linden 77, 10117 Berlin, Germany",
    phoneNumber: "+49 30 123 4567",
    email: "germany@inexor.com",
    mapsLink: "https://maps.google.com/?q=Unter+den+Linden+77+Berlin+Germany",
    displayOrder: 3,
    isActive: true,
  },
  {
    _type: "officeLocation",
    country: "Singapore",
    officeName: "Inexor Asia Pacific Pte Ltd",
    address: "1 Marina Bay, #20-01, Singapore 018989",
    phoneNumber: "+65 6123 4567",
    email: "singapore@inexor.com",
    mapsLink: "https://maps.google.com/?q=1+Marina+Bay+Singapore",
    displayOrder: 4,
    isActive: true,
  },
];

async function populateOfficeLocations() {
  try {
    console.log("Starting office locations population...");

    // Create office location documents
    for (const location of officeLocationsData) {
      try {
        const result = await client.create(location);
        console.log(`✅ Created office location: ${location.officeName} (${location.country})`);
        console.log(`   Document ID: ${result._id}`);
      } catch (error) {
        console.error(`❌ Failed to create office location ${location.officeName}:`, error);
      }
    }

    console.log("\n🎉 Office locations population completed!");
    console.log(`📊 Total locations created: ${officeLocationsData.length}`);
    
  } catch (error) {
    console.error("❌ Error during office locations population:", error);
  }
}

populateOfficeLocations();