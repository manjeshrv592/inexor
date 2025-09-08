import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "cmn648mb", // Your project ID
  dataset: "production", // Your dataset is production
  useCdn: false,
  token:
    "skvuJxKrQ51aXtRGRi9Cnhsuf6atzOGF1dAHttGGWghpVKcvA70xmGaDDezy9Kh2VOTINq8fiiRlhslOZOcCgPIKsZfkF9l5RSa3xONSdjcG293Ve8zmQ622urTHn6eVX43Yo3b4bX7cInNX5PHKlgKnfNvznrmSSkgoo4T347wYXZjCfZdU", // Hardcoded token
  apiVersion: "2024-01-01",
});

const sampleBlogPosts = [
  {
    _type: "blogPost",
    title: "Air Charter for Humanitarian Aid",
    slug: { current: "air-charter-humanitarian-aid" },
    excerpt:
      "In many humanitarian emergencies, traditional shipping methods cannot deliver aid fast enough. This is where air cargo charter services step in as a lifeline.",
    author: {
      name: "Alex Carter",
    },
    publishedAt: "2025-07-04T10:00:00Z",
    content: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "In many humanitarian emergencies, traditional shipping methods cannot deliver aid fast enough or may be completely cut off due to damaged infrastructure. This is where air cargo charter services step in as a lifeline.",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Many such regions lack road or rail links and have limited ports or runways, while extreme weather can cut off access for weeks. In these situations, air cargo charter services act as a lifeline, enabling direct delivery of freight to places that standard shipping or scheduled flights cannot reach.",
          },
        ],
      },
      {
        _type: "block",
        style: "h5",
        children: [
          {
            _type: "span",
            text: "WHAT IS AIR CARGO CHARTER?",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "An air cargo charter gives you exclusive use of an aircraft, freeing you from fixed airline routes and rigid timetables. Because you reserve the entire plane, the flight path, departure window, and load configuration are tailored precisely to your shipment.",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "This custom approach is ideal when freight is oversized, unusually heavy, or urgently required and can't move through traditional air-freight channels.",
          },
        ],
      },
    ],
    tags: ["air charter", "humanitarian", "emergency logistics"],
    readingTime: 5,
    isActive: true,
    order: 1,
  },
  {
    _type: "blogPost",
    title: "Air Charter for Dangerous Goods",
    slug: { current: "air-charter-dangerous-goods" },
    excerpt:
      "Transporting dangerous goods requires specialized knowledge and equipment. Learn how air charter services handle hazardous materials safely.",
    author: {
      name: "Sarah Johnson",
    },
    publishedAt: "2025-06-15T14:30:00Z",
    content: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Transporting dangerous goods by air requires specialized knowledge, equipment, and strict adherence to international regulations. Air charter services provide the expertise and flexibility needed for safe transport of hazardous materials.",
          },
        ],
      },
      {
        _type: "block",
        style: "h3",
        children: [
          {
            _type: "span",
            text: "Regulatory Compliance",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "All dangerous goods shipments must comply with IATA Dangerous Goods Regulations (DGR) and ICAO Technical Instructions. Our certified dangerous goods specialists ensure full compliance throughout the shipping process.",
          },
        ],
      },
    ],
    tags: ["dangerous goods", "regulations", "safety"],
    readingTime: 7,
    isActive: true,
    order: 2,
  },
  {
    _type: "blogPost",
    title: "Global Supply Chain Optimization",
    slug: { current: "global-supply-chain-optimization" },
    excerpt:
      "Discover strategies for optimizing your global supply chain and reducing costs while maintaining quality and reliability.",
    author: {
      name: "Michael Chen",
    },
    publishedAt: "2025-05-28T09:15:00Z",
    content: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "In today's interconnected world, supply chain optimization has become crucial for business success. Companies must balance cost, speed, and reliability while navigating complex global logistics networks.",
          },
        ],
      },
      {
        _type: "block",
        style: "h3",
        children: [
          {
            _type: "span",
            text: "Key Optimization Strategies",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Successful supply chain optimization involves strategic planning, technology integration, and strong partnerships with reliable logistics providers.",
          },
        ],
      },
    ],
    tags: ["supply chain", "optimization", "logistics"],
    readingTime: 8,
    isActive: true,
    order: 3,
  },
];

async function populateBlogData() {
  console.log("🚀 Starting blog data population...");

  try {
    // Create blog posts
    console.log("📝 Creating blog posts...");
    for (const post of sampleBlogPosts) {
      const result = await client.create(post);
      console.log(`✅ Created blog post: ${post.title} (${result._id})`);
    }

    // Create Resources page settings
    console.log("⚙️ Creating Resources page settings...");
    const resourcesPage = {
      _type: "resourcesPage",
      pageTitle: "Resources & Insights",
      pageDescription:
        "Stay informed with the latest insights, news, and updates from the world of global logistics and air charter services.",
      blogSectionTitle: "LATEST BLOGS",
      blogSectionSubtitle: "Industry insights and expert knowledge",
      isActive: true,
      seo: {
        metaTitle: "Resources & Blog - Inexor Logistics",
        metaDescription:
          "Explore our latest blog posts and resources covering air charter services, logistics insights, and industry news.",
        keywords: [
          "logistics blog",
          "air charter",
          "shipping insights",
          "industry news",
        ],
      },
    };

    const resourcesResult = await client.create(resourcesPage);
    console.log(`✅ Created Resources page settings (${resourcesResult._id})`);

    console.log("🎉 Blog data population completed successfully!");
    console.log("\n📋 Summary:");
    console.log(`- Created ${sampleBlogPosts.length} blog posts`);
    console.log("- Created Resources page settings");
    console.log("\n🎯 Next steps:");
    console.log("1. Go to your Sanity Studio");
    console.log("2. Navigate to Resources → Blog Posts");
    console.log("3. Add featured images to blog posts");
    console.log("4. Customize content as needed");
  } catch (error) {
    console.error("❌ Error populating blog data:", error);
    process.exit(1);
  }
}

// Run the population script
populateBlogData();
