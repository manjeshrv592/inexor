import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "cmn648mb", // Your project ID
  dataset: "production", // Your dataset is production
  useCdn: false,
  token:
    "skvuJxKrQ51aXtRGRi9Cnhsuf6atzOGF1dAHttGGWghpVKcvA70xmGaDDezy9Kh2VOTINq8fiiRlhslOZOcCgPIKsZfkF9l5RSa3xONSdjcG293Ve8zmQ622urTHn6eVX43Yo3b4bX7cInNX5PHKlgKnfNvznrmSSkgoo4T347wYXZjCfZdU", // Same token as countries script
  apiVersion: "2024-01-01",
});

const testimonialsData = [
  {
    name: "ELENA RODRIGUEZ",
    position: "SUPPLY CHAIN DIRECTOR",
    company: "PACIFIC FOOD",
    title: "Reliable and Transparent",
    quote:
      "Inexor's Outworld division has completely streamlined our international logistics. From port coordination to customs compliance, they've been proactive, transparent, and reliable every step of the way. It's rare to find a partner this dependable in global trade.",
    order: 1,
    isActive: true,
  },
  {
    name: "MARCUS CHEN",
    position: "OPERATIONS MANAGER",
    company: "GLOBAL TECH SOLUTIONS",
    title: "Innovative Solutions",
    quote:
      "Working with Inexor has transformed our supply chain efficiency. Their innovative approach to logistics management and real-time tracking capabilities have given us unprecedented visibility into our operations. The team's expertise in international trade regulations is unmatched.",
    order: 2,
    isActive: true,
  },
  {
    name: "SARAH JOHNSON",
    position: "PROCUREMENT HEAD",
    company: "MERIDIAN INDUSTRIES",
    title: "Exceptional Service",
    quote:
      "The level of service and attention to detail from Inexor is exceptional. They've consistently delivered on time, within budget, and have helped us navigate complex international markets with ease. Their strategic insights have been invaluable to our growth.",
    order: 3,
    isActive: true,
  },
  {
    name: "DAVID THOMPSON",
    position: "LOGISTICS DIRECTOR",
    company: "APEX MANUFACTURING",
    title: "Game-Changing Platform",
    quote:
      "Inexor's comprehensive approach to global logistics has been a game-changer for our business. Their technology platform, combined with their experienced team, has streamlined our operations and reduced costs significantly. Highly recommended!",
    order: 4,
    isActive: true,
  },
];

const testimonialsSection = {
  _type: "testimonialsSection",
  title: "WHAT OUR CLIENTS SAY",
  subtitle: "Hear From Those Who Trust Us",
  autoplayDuration: 5,
  enableAutoplay: true,
  isActive: true,
};

async function populateTestimonials() {
  console.log("🚀 Starting testimonials population...");

  try {
    // Create testimonials section first
    console.log("📝 Creating testimonials section...");
    const sectionResult = await client.create(testimonialsSection);
    console.log(
      `✅ Testimonials section created with ID: ${sectionResult._id}`,
    );

    // Create individual testimonials
    console.log("👥 Creating testimonials...");
    const testimonialPromises = testimonialsData.map(
      async (testimonial, index) => {
        const testimonialDoc = {
          _type: "testimonial",
          ...testimonial,
        };

        const result = await client.create(testimonialDoc);
        console.log(
          `✅ Created testimonial ${index + 1}: ${testimonial.name} (ID: ${result._id})`,
        );
        return result;
      },
    );

    await Promise.all(testimonialPromises);

    console.log("\n🎉 All testimonials populated successfully!");
    console.log("\n📋 Next steps:");
    console.log("1. Go to your Sanity Studio");
    console.log("2. Navigate to Homepage → Testimonials Section");
    console.log("3. Upload images for each testimonial");
    console.log("4. Customize content as needed");
    console.log(
      "\n💡 Note: You'll need to upload images through the Sanity Studio interface.",
    );
  } catch (error) {
    console.error("❌ Error populating testimonials:", error);
    process.exit(1);
  }
}

// Run the script
populateTestimonials();
