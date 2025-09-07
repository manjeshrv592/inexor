import { client } from "../sanity/lib/client";

// Sample FAQ categories
const categories = [
  {
    _type: "faqCategory",
    name: "General",
    slug: { _type: "slug", current: "general" },
    description: "General questions about our services",
    order: 1,
    isActive: true,
  },
  {
    _type: "faqCategory",
    name: "EOR/IOR",
    slug: { _type: "slug", current: "eor-ior" },
    description: "Questions about Exporter/Importer of Record services",
    order: 2,
    isActive: true,
  },
  {
    _type: "faqCategory",
    name: "VAT/DDP",
    slug: { _type: "slug", current: "vat-ddp" },
    description: "Questions about VAT and Delivered Duty Paid services",
    order: 3,
    isActive: true,
  },
  {
    _type: "faqCategory",
    name: "Product",
    slug: { _type: "slug", current: "product" },
    description: "Questions about our products and offerings",
    order: 4,
    isActive: true,
  },
  {
    _type: "faqCategory",
    name: "Support",
    slug: { _type: "slug", current: "support" },
    description: "Technical and customer support questions",
    order: 5,
    isActive: true,
  },
];

// Sample FAQ items
const faqItems = [
  // General category
  {
    _type: "faqItem",
    question: "What is trade compliance?",
    answer:
      "International trade compliance refers to the adherence to laws, trade regulations, sanctions, and standards that govern the movement of goods across international borders. Effective trade compliance is crucial when navigating the global supply chain.",
    slug: { _type: "slug", current: "what-is-trade-compliance" },
    order: 1,
    isActive: true,
  },
  {
    _type: "faqItem",
    question: "What countries do you ship IT hardware to?",
    answer:
      "We ship IT hardware to over 100 countries worldwide. Our extensive network covers major markets in North America, Europe, Asia-Pacific, Latin America, and emerging markets. Contact us for specific country availability and shipping options.",
    slug: { _type: "slug", current: "countries-we-ship-to" },
    order: 2,
    isActive: true,
  },
  {
    _type: "faqItem",
    question: "Can I get a custom solution?",
    answer:
      "Yes, we specialize in creating custom trade compliance solutions tailored to your specific business needs. Our team works closely with you to understand your requirements and develop a solution that fits your operational model and compliance requirements.",
    slug: { _type: "slug", current: "custom-solutions" },
    order: 3,
    isActive: true,
  },

  // EOR/IOR category
  {
    _type: "faqItem",
    question: "What is an Importer and Exporter of Record?",
    answer:
      "An Importer of Record (IOR) is the entity responsible for ensuring that goods are imported legally and in compliance with local regulations. An Exporter of Record (EOR) is responsible for the legal export of goods. Both roles involve significant compliance responsibilities and liability.",
    slug: { _type: "slug", current: "what-is-importer-exporter" },
    order: 1,
    isActive: true,
  },
  {
    _type: "faqItem",
    question: "Do you provide IOR services globally?",
    answer:
      "Yes, we provide comprehensive IOR services in over 100 countries. Our global network ensures that your imports comply with local regulations, customs requirements, and trade laws in each destination country.",
    slug: { _type: "slug", current: "global-ior-services" },
    order: 2,
    isActive: true,
  },

  // VAT/DDP category
  {
    _type: "faqItem",
    question: "What does DDP mean in shipping?",
    answer:
      "Delivered Duty Paid (DDP) means the seller is responsible for all costs and risks associated with transporting goods to the buyer's location, including import duties, taxes, and customs clearance. This provides maximum convenience for the buyer.",
    slug: { _type: "slug", current: "what-does-ddp-mean" },
    order: 1,
    isActive: true,
  },
  {
    _type: "faqItem",
    question: "How do you handle VAT registration?",
    answer:
      "We handle VAT registration in multiple jurisdictions as part of our comprehensive tax compliance services. Our team manages the registration process, ongoing compliance, and reporting requirements to ensure your business meets all VAT obligations.",
    slug: { _type: "slug", current: "vat-registration-process" },
    order: 2,
    isActive: true,
  },

  // Product category
  {
    _type: "faqItem",
    question: "What types of IT hardware do you ship?",
    answer:
      "We ship a wide range of IT hardware including servers, networking equipment, storage devices, workstations, laptops, components, and specialized computing equipment. Our expertise covers both consumer and enterprise-grade technology products.",
    slug: { _type: "slug", current: "types-of-it-hardware" },
    order: 1,
    isActive: true,
  },
  {
    _type: "faqItem",
    question: "Do you handle sensitive or regulated products?",
    answer:
      "Yes, we have extensive experience with sensitive and regulated products including encryption devices, dual-use items, and products subject to export controls. We ensure full compliance with relevant regulations and licensing requirements.",
    slug: { _type: "slug", current: "sensitive-regulated-products" },
    order: 2,
    isActive: true,
  },

  // Support category
  {
    _type: "faqItem",
    question: "Do you offer full logistics support?",
    answer:
      "Yes, we provide end-to-end logistics support including warehousing, inventory management, order fulfillment, shipping, and delivery tracking. Our comprehensive logistics services ensure smooth operations from procurement to final delivery.",
    slug: { _type: "slug", current: "full-logistics-support" },
    order: 1,
    isActive: true,
  },
  {
    _type: "faqItem",
    question: "What support do you provide after delivery?",
    answer:
      "We provide comprehensive post-delivery support including documentation management, warranty coordination, return processing, and ongoing compliance monitoring. Our support team is available to assist with any issues that may arise.",
    slug: { _type: "slug", current: "post-delivery-support" },
    order: 2,
    isActive: true,
  },
];

// FAQ Page configuration
const faqPage = {
  _type: "faqPage",
  seo: {
    _type: "seo",
    metaTitle: "Frequently Asked Questions - Inexor",
    metaDescription:
      "Find answers to common questions about our trade compliance, logistics, and IT hardware shipping services.",
    keywords:
      "FAQ, trade compliance, logistics, IT hardware, shipping, EOR, IOR, VAT, DDP",
  },
  pageTitle: "FAQ's",
  pageDescription:
    "Our FAQ Section Offers Fast, Clear Answers To Popular Questions, So You Can Find Information Easily.",
  isActive: true,
};

async function populateFAQ() {
  try {
    console.log("Creating FAQ categories...");

    // Create categories first
    const createdCategories = [];
    for (const category of categories) {
      const result = await client.create(category);
      createdCategories.push(result);
      console.log(`Created category: ${category.name}`);
    }

    console.log("Creating FAQ items...");

    // Create FAQ items with category references
    let itemIndex = 0;
    for (const category of createdCategories) {
      const categorySlug = category.slug.current;

      // Find items for this category based on the sample data structure
      let itemsForCategory: typeof faqItems = [];

      if (categorySlug === "general") {
        itemsForCategory = faqItems.slice(0, 3);
      } else if (categorySlug === "eor-ior") {
        itemsForCategory = faqItems.slice(3, 5);
      } else if (categorySlug === "vat-ddp") {
        itemsForCategory = faqItems.slice(5, 7);
      } else if (categorySlug === "product") {
        itemsForCategory = faqItems.slice(7, 9);
      } else if (categorySlug === "support") {
        itemsForCategory = faqItems.slice(9, 11);
      }

      for (const item of itemsForCategory) {
        const faqItem = {
          ...item,
          category: {
            _type: "reference",
            _ref: category._id,
          },
        };

        await client.create(faqItem);
        console.log(`Created FAQ item: ${item.question}`);
      }
    }

    console.log("Creating FAQ page configuration...");
    await client.create(faqPage);
    console.log("Created FAQ page configuration");

    console.log("✅ FAQ data populated successfully!");
  } catch (error) {
    console.error("❌ Error populating FAQ data:", error);
  }
}

populateFAQ();
