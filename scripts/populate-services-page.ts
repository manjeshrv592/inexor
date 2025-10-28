import { createClient } from "@sanity/client";
import crypto from "crypto";

const client = createClient({
  projectId: "cmn648mb", // Your project ID
  dataset: "production", // Your dataset is production
  useCdn: false,
  token:
    "skvuJxKrQ51aXtRGRi9Cnhsuf6atzOGF1dAHttGGWghpVKcvA70xmGaDDezy9Kh2VOTINq8fiiRlhslOZOcCgPIKsZfkF9l5RSa3xONSdjcG293Ve8zmQ622urTHn6eVX43Yo3b4bX7cInNX5PHKlgKnfNvznrmSSkgoo4T347wYXZjCfZdU", // Hardcoded token
  apiVersion: "2024-01-01",
});

function genKey() {
  if (typeof crypto.randomUUID === "function") return crypto.randomUUID();
  return Math.random().toString(36).slice(2);
}

function addKeysToPortableText(content: any[] | undefined) {
  if (!Array.isArray(content)) return content;
  return content.map((block) => {
    const withKey = { _key: genKey(), ...block };
    if (Array.isArray(withKey.children)) {
      withKey.children = withKey.children.map((child: any) => ({
        _key: genKey(),
        ...child,
      }));
    }
    return withKey;
  });
}

function addKeysToUseCaseSteps(steps: any[] | undefined) {
  if (!Array.isArray(steps)) return steps;
  return steps.map((step) => ({ _key: genKey(), ...step }));
}

const sampleServices = [
  {
    _type: "service",
    title: "Reliable Importer of Record Services for Global Business",
    code: "IOR",
    slug: { current: "importer-of-record" },
    subtitle: "Importer of Records",
    excerpt:
      "Expand your global reach with our comprehensive IOR services. We handle all import requirements, including tariffs, duties, and trade agreements across 200+ destinations.",
    content: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Entering new markets can be challenging, especially when it comes to navigating complex import regulations and compliance requirements. Our Importer of Record (IOR) services facilitate first-time custom clearance for your IT hardware in over 200 destinations worldwide.",
          },
        ],
      },
      {
        _type: "block",
        style: "h3",
        children: [
          {
            _type: "span",
            text: "What We Handle",
          },
        ],
      },
      {
        _type: "block",
        style: "bullet",
        children: [
          {
            _type: "span",
            text: "Import licenses and permits",
          },
        ],
      },
      {
        _type: "block",
        style: "bullet",
        children: [
          {
            _type: "span",
            text: "Customs documentation and declarations",
          },
        ],
      },
      {
        _type: "block",
        style: "bullet",
        children: [
          {
            _type: "span",
            text: "Tariff classification and duty calculations",
          },
        ],
      },
      {
        _type: "block",
        style: "bullet",
        children: [
          {
            _type: "span",
            text: "Trade agreement optimization",
          },
        ],
      },
      {
        _type: "block",
        style: "bullet",
        children: [
          {
            _type: "span",
            text: "Regulatory compliance management",
          },
        ],
      },
      {
        _type: "block",
        style: "h3",
        children: [
          {
            _type: "span",
            text: "Benefits of Our IOR Services",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "By partnering with Inexor as your Importer of Record, you can focus on your core business expansion while we handle all the complexities of international trade compliance. Our expertise ensures smooth customs clearance, minimizes delays, and reduces the risk of costly compliance issues.",
          },
        ],
      },
    ],
    useCases: {
      title: "Use cases",
      steps: [
        {
          _type: "serviceUseCase",
          stepNumber: 1,
          title: "Global rollouts",
          description:
            "Deploy IT infrastructure across 20+ countries with unified compliance.",
        },
        {
          _type: "serviceUseCase",
          stepNumber: 2,
          title: "First-time imports",
          description:
            "Clear customs in new markets without local entity setup.",
        },
        {
          _type: "serviceUseCase",
          stepNumber: 3,
          title: "Spares & RMAs",
          description:
            "Move high-value spares efficiently with predictable timelines.",
        },
      ],
    },
    order: 1,
    isActive: true,
  },
  {
    _type: "service",
    title: "Streamline Your IT Hardware Exports Worldwide",
    code: "EOR",
    slug: { current: "exporter-of-record" },
    subtitle: "Exporter of Records",
    excerpt:
      "Simplify your export processes with our EOR services. We manage all export requirements and documentation for seamless international shipping.",
    content: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Expanding your business internationally requires careful attention to export regulations and compliance. Our Exporter of Record (EOR) services streamline your IT hardware exports, ensuring compliance with all international trade requirements.",
          },
        ],
      },
      {
        _type: "block",
        style: "h3",
        children: [
          {
            _type: "span",
            text: "Export Services We Provide",
          },
        ],
      },
      {
        _type: "block",
        style: "bullet",
        children: [
          {
            _type: "span",
            text: "Export licenses and permits acquisition",
          },
        ],
      },
      {
        _type: "block",
        style: "bullet",
        children: [
          {
            _type: "span",
            text: "Export documentation preparation",
          },
        ],
      },
      {
        _type: "block",
        style: "bullet",
        children: [
          {
            _type: "span",
            text: "Restricted party screening",
          },
        ],
      },
      {
        _type: "block",
        style: "bullet",
        children: [
          {
            _type: "span",
            text: "Export control classification",
          },
        ],
      },
      {
        _type: "block",
        style: "bullet",
        children: [
          {
            _type: "span",
            text: "End-user certificate management",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Our experienced team understands the complexities of international export regulations and ensures your shipments comply with all applicable laws and trade agreements, reducing delays and potential penalties.",
          },
        ],
      },
    ],
    useCases: {
      title: "Use cases",
      steps: [
        {
          _type: "serviceUseCase",
          stepNumber: 1,
          title: "Data center refresh",
          description:
            "Export legacy devices compliantly for global refresh programs.",
        },
        {
          _type: "serviceUseCase",
          stepNumber: 2,
          title: "Cross-border RMAs",
          description:
            "Return defective units across borders with controlled paperwork.",
        },
      ],
    },
    order: 2,
    isActive: true,
  },
  {
    _type: "service",
    title: "Maximize Your VAT Refunds with Expert Assistance",
    code: "VAT",
    slug: { current: "vat-refund-assistance" },
    subtitle: "Global VAT Refund Assistance",
    excerpt:
      "Recover VAT on international shipments with our expert assistance. We simplify the complex VAT refund process and maximize your recoveries.",
    content: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Recovering VAT on international shipments can be complex and time-consuming. Inexor simplifies the process, maximizing your refunds and minimizing administrative burden. Our experts understand the intricacies of VAT regulations in various jurisdictions.",
          },
        ],
      },
      {
        _type: "block",
        style: "h3",
        children: [
          {
            _type: "span",
            text: "Our VAT Recovery Process",
          },
        ],
      },
      {
        _type: "block",
        style: "number",
        children: [
          {
            _type: "span",
            text: "Documentation Review: We analyze your shipping documents and identify VAT recovery opportunities",
          },
        ],
      },
      {
        _type: "block",
        style: "number",
        children: [
          {
            _type: "span",
            text: "Application Preparation: Our team prepares and submits VAT refund applications in multiple jurisdictions",
          },
        ],
      },
      {
        _type: "block",
        style: "number",
        children: [
          {
            _type: "span",
            text: "Follow-up Management: We track applications and communicate with tax authorities on your behalf",
          },
        ],
      },
      {
        _type: "block",
        style: "number",
        children: [
          {
            _type: "span",
            text: "Refund Processing: We ensure you receive the full refunds you're entitled to",
          },
        ],
      },
      {
        _type: "block",
        style: "h3",
        children: [
          {
            _type: "span",
            text: "Why Choose Our VAT Services?",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "With years of experience in international VAT regulations, our specialists ensure you receive maximum refunds while maintaining full compliance with local tax authorities. We handle the entire process, from documentation to collection.",
          },
        ],
      },
    ],
    useCases: {
      title: "Use cases",
      steps: [
        {
          _type: "serviceUseCase",
          stepNumber: 1,
          title: "Quarterly refunds",
          description:
            "Recover VAT on recurring project shipments across EU/UK.",
        },
        {
          _type: "serviceUseCase",
          stepNumber: 2,
          title: "Project-based claims",
          description: "One-off VAT recovery for large global deployments.",
        },
      ],
    },
    order: 3,
    isActive: true,
  },
  {
    _type: "service",
    title: "Complete Door-to-Door DDP Solutions",
    code: "DDP",
    slug: { current: "delivered-duty-paid" },
    subtitle: "Delivered Duty Paid",
    excerpt:
      "Eliminate import risks with our comprehensive DDP service. We handle everything from pre-compliance to white-glove delivery.",
    content: [
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "Our Delivered Duty Paid (DDP) solution provides a complete door-to-door service for your IT hardware shipments. We handle everything – pre-compliance, customs brokerage, and white-glove delivery – transferring all import risk to Inexor.",
          },
        ],
      },
      {
        _type: "block",
        style: "h3",
        children: [
          {
            _type: "span",
            text: "What's Included in Our DDP Service",
          },
        ],
      },
      {
        _type: "block",
        style: "bullet",
        children: [
          {
            _type: "span",
            text: "Pre-shipment compliance verification",
          },
        ],
      },
      {
        _type: "block",
        style: "bullet",
        children: [
          {
            _type: "span",
            text: "All import duties and taxes",
          },
        ],
      },
      {
        _type: "block",
        style: "bullet",
        children: [
          {
            _type: "span",
            text: "Customs clearance and documentation",
          },
        ],
      },
      {
        _type: "block",
        style: "bullet",
        children: [
          {
            _type: "span",
            text: "Final mile delivery coordination",
          },
        ],
      },
      {
        _type: "block",
        style: "bullet",
        children: [
          {
            _type: "span",
            text: "White-glove installation services",
          },
        ],
      },
      {
        _type: "block",
        style: "h3",
        children: [
          {
            _type: "span",
            text: "Benefits of DDP Shipping",
          },
        ],
      },
      {
        _type: "block",
        style: "normal",
        children: [
          {
            _type: "span",
            text: "This simplified approach ensures predictable costs and hassle-free international shipping. Your customers receive their equipment ready to use, while you benefit from transparent pricing and reduced administrative overhead.",
          },
        ],
      },
      {
        _type: "block",
        style: "blockquote",
        children: [
          {
            _type: "span",
            text: "With DDP, you ship with confidence knowing that all import responsibilities are handled by our experienced team.",
          },
        ],
      },
    ],
    useCases: {
      title: "Use cases",
      steps: [
        {
          _type: "serviceUseCase",
          stepNumber: 1,
          title: "Turnkey deliveries",
          description:
            "Deliver ready-to-rack equipment with all duties prepaid.",
        },
        {
          _type: "serviceUseCase",
          stepNumber: 2,
          title: "Site go-lives",
          description:
            "Ensure day-1 readiness with white-glove handling and installation.",
        },
      ],
    },
    order: 4,
    isActive: true,
  },
];

async function populateServicesData() {
  console.log("🚀 Starting services page data population...");

  try {
    // Create services
    console.log("🔧 Creating services...");
    for (const service of sampleServices) {
      const prepared = {
        ...service,
        content: addKeysToPortableText(service.content),
        useCases: service.useCases
          ? {
              ...service.useCases,
              steps: addKeysToUseCaseSteps(service.useCases.steps),
            }
          : undefined,
      };
      const result = await client.create(prepared);
      console.log(
        `✅ Created service: ${service.code} - ${service.title} (${result._id})`,
      );
    }

    // Create Services page settings (if it doesn't exist)
    console.log("⚙️ Creating Services page settings...");
    const servicesPage = {
      _type: "servicesPage",
      isActive: true,
      seo: {
        metaTitle: "Services - Inexor Global Trade Solutions",
        metaDescription:
          "Explore our comprehensive range of trade compliance services including IOR, EOR, VAT refund assistance, and DDP solutions for global business.",
        keywords: [
          "importer of record",
          "exporter of record",
          "VAT refund",
          "DDP services",
          "trade compliance",
          "customs clearance",
        ],
      },
    };

    const servicesResult = await client.create(servicesPage);
    console.log(`✅ Created Services page settings (${servicesResult._id})`);

    console.log("🎉 Services data population completed successfully!");
    console.log("\n📋 Summary:");
    console.log(`- Created ${sampleServices.length} services`);
    console.log("- Created Services page settings");
    console.log("\n🎯 Next steps:");
    console.log("1. Go to your Sanity Studio");
    console.log("2. Navigate to Services → Services");
    console.log(
      "3. Add featured images to services (optional - fallback image will be used)",
    );
    console.log("4. Customize content and order as needed");
    console.log(
      "5. Test the services page to ensure everything displays correctly",
    );
  } catch (error) {
    console.error("❌ Error populating services data:", error);
    process.exit(1);
  }
}

// Run the population script
populateServicesData();
