import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "cmn648mb", // Your project ID
  dataset: "production", // Your dataset is production
  useCdn: false,
  token:
    "skvuJxKrQ51aXtRGRi9Cnhsuf6atzOGF1dAHttGGWghpVKcvA70xmGaDDezy9Kh2VOTINq8fiiRlhslOZOcCgPIKsZfkF9l5RSa3xONSdjcG293Ve8zmQ622urTHn6eVX43Yo3b4bX7cInNX5PHKlgKnfNvznrmSSkgoo4T347wYXZjCfZdU", // Sanity API token
  apiVersion: "2024-01-01",
});

async function populateAboutPage() {
  try {
    console.log("🚀 Starting About page population...");

    // First, create process steps
    console.log("📝 Creating process steps...");
    const processSteps = [];

    const stepData = [
      {
        stepNumber: 1,
        title: "Get a Quote",
        description:
          "Through True Rich Attended does no end it his mother since real had half every.",
      },
      {
        stepNumber: 2,
        title: "Book an Appointment",
        description:
          "Through True Rich Attended does no end it his mother since real had half every.",
      },
      {
        stepNumber: 3,
        title: "Get your Service Done",
        description:
          "Through True Rich Attended does no end it his mother since real had half every.",
      },
    ];

    for (const step of stepData) {
      const createdStep = await client.create({
        _type: "processStep",
        ...step,
      });
      processSteps.push({ _type: "reference", _ref: createdStep._id });
      console.log(`✅ Created process step: ${step.title}`);
    }

    // Create content sections
    console.log("📝 Creating content sections...");
    const contentSections = [];

    const sectionData = [
      {
        sectionTitle: "Who We Are",
        titleStyle: "orange",
        content: [
          {
            _type: "block",
            _key: "who-we-are-1",
            style: "normal",
            children: [
              {
                _type: "span",
                _key: "who-we-are-1-text",
                text: "At Inexor, we are more than just a logistics provider—we are your trusted partner in navigating the complexities of international IT hardware shipping. With a specialized focus on global trade compliance, we combine deep industry knowledge with a client-first approach to deliver seamless, secure, and scalable shipping solutions for businesses around the world.",
                marks: [],
              },
            ],
          },
          {
            _type: "block",
            _key: "who-we-are-2",
            style: "normal",
            children: [
              {
                _type: "span",
                _key: "who-we-are-2-text",
                text: "Our team is made up of seasoned professionals with decades of experience in both IT and international logistics. We understand the high-value, high-risk nature of IT infrastructure components—and we know that getting them where they need to go, on time and in full compliance, is critical to your success.",
                marks: [],
              },
            ],
          },
        ],
      },
      {
        sectionTitle: "What We Do",
        titleStyle: "orange",
        content: [
          {
            _type: "block",
            _key: "what-we-do-1",
            style: "normal",
            children: [
              {
                _type: "span",
                _key: "what-we-do-1-text",
                text: "Inexor offers a full spectrum of services tailored specifically for the global movement of IT hardware, including:",
                marks: [],
              },
            ],
          },
        ],
      },
    ];

    for (const section of sectionData) {
      const createdSection = await client.create({
        _type: "contentSection",
        ...section,
      });
      contentSections.push({ _type: "reference", _ref: createdSection._id });
      console.log(`✅ Created content section: ${section.sectionTitle}`);
    }

    // Create the about page with references
    const aboutPageData = {
      _type: "aboutPage",
      pageTitle: "About Inexor",
      pageSubtitle: "Your Global Trade Compliance Partner",
      processSection: {
        title: "We follow a clear process to help you out.",
        description:
          "With a specialized focus on global trade compliance, we combine deep industry knowledge with a client-first approach to deliver seamless.",
        buttonText: "Contact Us",
        steps: processSteps,
      },
      contentSections: contentSections,
      seo: {
        _type: "seo",
        metaTitle: "About Inexor - Your Global Trade Compliance Partner",
        metaDescription:
          "Learn about Inexor, your trusted partner for international IT hardware shipping with specialized focus on global trade compliance.",
        metaKeywords:
          "Inexor, IT hardware shipping, global trade compliance, international logistics, customs compliance",
        canonicalUrl: "/about",
        noIndex: false,
        noFollow: false,
      },
      isActive: true,
    };

    // Check if an active about page already exists
    const existingPage = await client.fetch(
      '*[_type == "aboutPage" && isActive == true][0]',
    );

    if (existingPage) {
      console.log("📄 Active About page already exists. Updating...");

      // Update existing page
      const result = await client
        .patch(existingPage._id)
        .set(aboutPageData)
        .commit();

      console.log("✅ About page updated successfully:", result._id);
    } else {
      console.log("📄 Creating new About page...");

      // Create new page
      const result = await client.create(aboutPageData);
      console.log("✅ About page created successfully:", result._id);
    }

    console.log("🎉 About page population completed!");
  } catch (error) {
    console.error("❌ Error populating About page:", error);
    process.exit(1);
  }
}

// Run the script
populateAboutPage();
