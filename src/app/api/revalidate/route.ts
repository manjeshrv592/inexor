import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // You can add a secret token for security
    const secret = request.nextUrl.searchParams.get("secret");

    // Optional: Verify the secret token
    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }

    // Get the webhook payload to determine what to revalidate
    const body = await request.json().catch(() => null);
    const documentType = body?._type;

    // Revalidate specific tags based on document type
    const revalidatedTags: string[] = [];

    if (documentType) {
      switch (documentType) {
        case "hero":
          revalidateTag("hero");
          revalidatedTags.push("hero");
          break;
        case "whoWeServeItem":
          revalidateTag("who-we-serve");
          revalidatedTags.push("who-we-serve");
          break;
        case "whoWeServeSection":
          revalidateTag("who-we-serve-section");
          revalidatedTags.push("who-we-serve-section");
          break;
        case "why":
          revalidateTag("why");
          revalidatedTags.push("why");
          break;
        case "whyItem":
          revalidateTag("why-items");
          revalidatedTags.push("why-items");
          break;
        case "aboutSection":
          revalidateTag("about");
          revalidatedTags.push("about");
          break;
        case "aboutItem":
          revalidateTag("about-items");
          revalidatedTags.push("about-items");
          break;
        case "clientsSection":
          revalidateTag("clients");
          revalidatedTags.push("clients");
          break;
        case "testimonial":
          revalidateTag("testimonials");
          revalidatedTags.push("testimonials");
          break;
        case "testimonialsSection":
          revalidateTag("testimonials-section");
          revalidatedTags.push("testimonials-section");
          break;
        case "country":
        case "mapsSection":
          revalidateTag("countries");
          revalidateTag("maps");
          revalidatedTags.push("countries", "maps");
          break;
        case "service":
        case "servicesSection":
          revalidateTag("services");
          revalidateTag("services-section");
          revalidatedTags.push("services", "services-section");
          // Also revalidate services page
          revalidatePath("/services");
          break;
        case "servicesPageSettings":
          revalidateTag("servicesPageSettings");
          revalidatedTags.push("servicesPageSettings");
          revalidatePath("/services");
          break;
        case "blogPost":
          revalidateTag("blog-posts");
          revalidatedTags.push("blog-posts");
          // Also revalidate resources page
          revalidatePath("/resources");
          break;
        case "faqCategory":
        case "faqItem":
        case "faqPage":
          revalidateTag("faq-categories");
          revalidateTag("faq-items");
          revalidateTag("faq-page");
          revalidatedTags.push("faq-categories", "faq-items", "faq-page");
          // Also revalidate FAQ page
          revalidatePath("/faq");
          break;
        case "aboutPage":
          revalidateTag("about-page");
          revalidatedTags.push("about-page");
          revalidatePath("/about");
          break;
        case "aboutPageSeo":
          revalidateTag("about-page-seo");
          revalidatedTags.push("about-page-seo");
          revalidatePath("/about");
          break;
        case "contactInfo":
          revalidateTag("contact-info");
          revalidatedTags.push("contact-info");
          // Also revalidate contact page
          revalidatePath("/contact");
          break;
        case "privacyPolicyPage":
          revalidateTag("privacy-policy-page");
          revalidateTag("privacy-policy-seo");
          revalidatedTags.push("privacy-policy-page", "privacy-policy-seo");
          revalidatePath("/privacy-policy");
          break;
        case "privacyPolicyContent":
          revalidateTag("privacy-policy-content");
          revalidatedTags.push("privacy-policy-content");
          revalidatePath("/privacy-policy");
          break;
        case "termsConditionsPage":
          revalidateTag("terms-conditions-page");
          revalidateTag("terms-conditions-seo");
          revalidatedTags.push("terms-conditions-page", "terms-conditions-seo");
          revalidatePath("/terms-conditions");
          break;
        case "termsConditionsContent":
          revalidateTag("terms-conditions-content");
          revalidatedTags.push("terms-conditions-content");
          revalidatePath("/terms-conditions");
          break;
        case "resourcesPage":
          revalidateTag("resourcesPage");
          revalidatedTags.push("resourcesPage");
          revalidatePath("/resources");
          break;
        case "resourcesPageSeo":
          revalidateTag("resources-page-seo");
          revalidatedTags.push("resources-page-seo");
          revalidatePath("/resources");
          break;
        case "servicesPageSeo":
          revalidateTag("services-page-seo");
          revalidatedTags.push("services-page-seo");
          revalidatePath("/services");
          break;
        case "faqPageSeo":
          revalidateTag("faq-page-seo");
          revalidatedTags.push("faq-page-seo");
          revalidatePath("/faq");
          break;
        case "contactPageSeo":
          revalidateTag("contact-page-seo");
          revalidatedTags.push("contact-page-seo");
          revalidatePath("/contact");
          break;
        case "keyValuePillarsSection":
        case "keyValuePillarItem":
          revalidateTag("key-value-pillars-section");
          revalidateTag("key-value-pillar-items");
          revalidatedTags.push(
            "key-value-pillars-section",
            "key-value-pillar-items",
          );
          break;
        case "footer":
          revalidateTag("footer");
          revalidatedTags.push("footer");
          break;
        case "homeSeo":
          revalidateTag("home-seo");
          revalidatedTags.push("home-seo");
          // Also revalidate homepage
          revalidatePath("/");
          break;
        default:
          // Revalidate all tags for unknown types
          const allTags = [
            "hero",
            "who-we-serve",
            "who-we-serve-section",
            "why",
            "why-items",
            "about",
            "about-items",
            "about-page",
            "about-page-seo",
            "clients",
            "testimonials",
            "testimonials-section",
            "countries",
            "maps",
            "services",
            "services-section",
            "servicesPageSettings",
            "blog-posts",
            "faq-categories",
            "faq-items",
            "faq-page",
            "faq-page-seo",
            "contact-info",
            "contact-page-seo",
            "privacy-policy-page",
            "privacy-policy-seo",
            "privacy-policy-content",
            "terms-conditions-page",
            "terms-conditions-seo",
            "terms-conditions-content",
            "resourcesPage",
            "resources-page-seo",
            "key-value-pillars-section",
            "key-value-pillar-items",
            "footer",
          ];
          allTags.forEach((tag) => revalidateTag(tag));
          revalidatedTags.push(...allTags);

          // Revalidate all pages
          revalidatePath("/");
          revalidatePath("/about");
          revalidatePath("/services");
          revalidatePath("/resources");
          revalidatePath("/faq");
          revalidatePath("/contact");
          revalidatePath("/privacy-policy");
          revalidatePath("/terms-conditions");
      }
    } else {
      // No document type provided, revalidate everything
      const allTags = [
        "hero",
        "who-we-serve",
        "who-we-serve-section",
        "why",
        "why-items",
        "about",
        "about-items",
        "clients",
        "testimonials",
        "testimonials-section",
        "countries",
        "maps",
        "services",
        "services-section",
        "servicesPageSettings",
        "faq-categories",
        "faq-items",
        "faq-page",
        "faq-page-seo",
        "about-page",
        "about-page-seo",
        "contact-info",
        "contact-page-seo",
        "resourcesPage",
        "resources-page-seo",
        "privacy-policy-page",
        "privacy-policy-seo",
        "privacy-policy-content",
        "terms-conditions-page",
        "terms-conditions-seo",
        "terms-conditions-content",
        "key-value-pillars-section",
        "key-value-pillar-items",
        "footer",
      ];
      allTags.forEach((tag) => revalidateTag(tag));
      revalidatedTags.push(...allTags);
    }

    // Also revalidate the homepage
    revalidatePath("/");

    return NextResponse.json({
      message: "Revalidation completed successfully",
      documentType: documentType || "unknown",
      revalidatedTags,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error revalidating:", error);
    return NextResponse.json(
      { message: "Error revalidating" },
      { status: 500 },
    );
  }
}
