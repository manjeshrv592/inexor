// This script populates the services section and service items
import { createClient } from "@sanity/client";

// Initialize the Sanity client
const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || "your-project-id",
  dataset: process.env.SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_TOKEN, // You'll need a token with write permissions
  useCdn: false,
});

async function populateServices() {
  console.log("🚀 Starting services population...");

  try {
    // Create the services section
    const servicesSection = await client.create({
      _type: "servicesSection",
      title: "OUR SERVICES",
      isActive: true,
    });
    console.log("✅ Created services section:", servicesSection._id);

    // Create service items
    const serviceItems = [
      {
        _type: "serviceItem",
        code: "VAT",
        title: "GLOBAL VAT REFUND ASSISTANCE (VAT)",
        heading1: "Maximize Your VAT Refunds",
        heading2: "Today",
        description:
          "Recovering VAT on international shipments can be complex. Inexor simplifies the process, maximizing your refunds and minimizing administrative burden. Our experts understand the intricacies of VAT regulations in various jurisdictions and ensure you receive the full refunds you're entitled to.",
        // Note: You'll need to upload the background image manually in Sanity Studio
        // and then reference it here, or provide a default image asset ID
        order: 1,
        isActive: true,
      },
      {
        _type: "serviceItem",
        code: "DDP",
        title: "DELIVERED DUTY PAID (DDP)",
        heading1: "Ship DDP and Eliminate Import",
        heading2: "Risks",
        description:
          "Our DDP solution provides a complete door-to-door service for your IT hardware shipments. We handle everything – pre-compliance, customs brokerage, and white-glove delivery – transferring all import risk to Inexor. This simplified approach ensures predictable costs and hassle-free international shipping.",
        order: 2,
        isActive: true,
      },
      {
        _type: "serviceItem",
        code: "EOR",
        title: "EXPORTER OF RECORD (EOR)",
        heading1: "Streamline Your IT Hardware",
        heading2: "Exports",
        description:
          "Entering New Markets Can Be Challenging. Our EOR Services Facilitate First-Time Custom Clearance For Your IT Hardware In Over 200 Destinations. We Handle All Export Requirements, Including Tariff, Duties and Trade Agreements. Allowing You To Focus On Your Business Expansion.",
        order: 3,
        isActive: true,
      },
      {
        _type: "serviceItem",
        code: "IOR",
        title: "IMPORTER OF RECORD (IOR)",
        heading1: "Expand Your Global Reach With",
        heading2: "IOR Expertise",
        description:
          "Entering New Markets Can Be Challenging. Our IOR Services Facilitate First-Time Custom Clearance For Your IT Hardware In Over 200 Destinations. We Handle All Import Requirements, Including Tariff, Duties and Trade Agreements. Allowing You To Focus On Your Business Expansion.",
        order: 4,
        isActive: true,
      },
    ];

    const createdItems = [];
    for (const item of serviceItems) {
      const created = await client.create(item);
      createdItems.push(created);
      console.log(`✅ Created service item: ${item.code} (${created._id})`);
    }

    console.log("🎉 Successfully populated services!");
    console.log(`📊 Created ${createdItems.length} service items`);
    console.log("\n📝 Next steps:");
    console.log("1. Go to your Sanity Studio");
    console.log("2. Navigate to Homepage > Service Items");
    console.log("3. Upload background images for each service");
    console.log("4. Verify all data looks correct");
  } catch (error) {
    console.error("❌ Error populating services:", error);
  }
}

// Run the population script
populateServices();
