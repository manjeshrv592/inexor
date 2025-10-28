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
  console.log("🗑️ Starting services content deletion...");

  try {
    // Delete all service documents
    console.log("🔍 Finding services to delete...");
    const services = await client.fetch(`*[_type == "service"]`);
    console.log(`📊 Found ${services.length} services to delete`);

    if (services.length === 0) {
      console.log("✅ No services found to delete");
      return;
    }

    // Delete each service
    for (const service of services) {
      await client.delete(service._id);
      console.log(`✅ Deleted service: ${service.code} - ${service.title}`);
    }

    // Delete services page settings
    console.log("🔍 Finding services page settings to delete...");
    const servicesPages = await client.fetch(`*[_type == "servicesPage"]`);
    console.log(
      `📊 Found ${servicesPages.length} services page settings to delete`,
    );

    for (const page of servicesPages) {
      await client.delete(page._id);
      console.log(`✅ Deleted services page settings: ${page.seo?.metaTitle || page._id}`);
    }

    console.log("🎉 Services content deletion completed successfully!");
    console.log("\n📋 Summary:");
    console.log(`- Deleted ${services.length} services`);
    console.log(`- Deleted ${servicesPages.length} services page settings`);
    console.log(
      "\n💡 You can now run 'npm run populate-services-page' to recreate the content",
    );
  } catch (error) {
    console.error("❌ Error deleting services content:", error);
    process.exit(1);
  }
}

// Run the deletion script
deleteServicesContent();
