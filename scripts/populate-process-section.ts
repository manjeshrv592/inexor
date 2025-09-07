import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "cmn648mb",
  dataset: "production",
  useCdn: false,
  token:
    "skvuJxKrQ51aXtRGRi9Cnhsuf6atzOGF1dAHttGGWghpVKcvA70xmGaDDezy9Kh2VOTINq8fiiRlhslOZOcCgPIKsZfkF9l5RSa3xONSdjcG293Ve8zmQ622urTHn6eVX43Yo3b4bX7cInNX5PHKlgKnfNvznrmSSkgoo4T347wYXZjCfZdU",
  apiVersion: "2024-01-01",
});

async function populateProcessSection() {
  try {
    console.log("🚀 Creating process section settings...");

    const processSectionData = {
      _type: "processSection",
      title: "We follow a clear process to help you out.",
      description:
        "With a specialized focus on global trade compliance, we combine deep industry knowledge with a client-first approach to deliver seamless.",
      buttonText: "Contact Us",
      isActive: true,
    };

    // Check if an active process section already exists
    const existingSection = await client.fetch(
      '*[_type == "processSection" && isActive == true][0]',
    );

    if (existingSection) {
      console.log("📄 Active process section already exists. Updating...");

      const result = await client
        .patch(existingSection._id)
        .set(processSectionData)
        .commit();

      console.log("✅ Process section updated successfully:", result._id);
    } else {
      console.log("📄 Creating new process section...");

      const result = await client.create(processSectionData);
      console.log("✅ Process section created successfully:", result._id);
    }

    console.log("🎉 Process section population completed!");
  } catch (error) {
    console.error("❌ Error populating process section:", error);
    process.exit(1);
  }
}

populateProcessSection();
