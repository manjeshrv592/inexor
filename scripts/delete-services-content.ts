import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "cmn648mb", // Your project ID
  dataset: "production", // Your dataset is production
  useCdn: false,
  token:
    "skvuJxKrQ51aXtRGRi9Cnhsuf6atzOGF1dAHttGGWghpVKcvA70xmGaDDezy9Kh2VOTINq8fiiRlhslOZOcCgPIKsZfkF9l5RSa3xONSdjcG293Ve8zmQ622urTHn6eVX43Yo3b4bX7cInNX5PHKlgKnfNvznrmSSkgoo4T347wYXZjCfZdU", // Hardcoded token
  apiVersion: "2024-01-01",
});

async function deleteServicesContent() {
  try {
    const services = await client.fetch(`*[_type == "service"]`);

    if (services.length === 0) {
      return;
    }

    // Delete each service
    for (const service of services) {
      await client.delete(service._id);
    }

    const servicesPages = await client.fetch(`*[_type == "servicesPage"]`);

    for (const page of servicesPages) {
      await client.delete(page._id);
    }
  } catch (error) {
    console.error("❌ Error deleting services content:", error);
    process.exit(1);
  }
}

// Run the deletion script
deleteServicesContent();
