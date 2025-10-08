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
          // Also revalidate about page
          revalidatePath("/about");
          break;
        case "contactInfo":
          revalidateTag("contact-info");
          revalidatedTags.push("contact-info");
          // Also revalidate contact page
          revalidatePath("/contact");
          break;
        case "privacyPolicy":
          revalidateTag("privacy-policy");
          revalidatedTags.push("privacy-policy");
          revalidatePath("/privacy-policy");
          break;
        case "termsConditions":
          revalidateTag("terms-conditions");
          revalidatedTags.push("terms-conditions");
          revalidatePath("/terms-conditions");
          break;
        case "keyValuePillarsSection":
        case "keyValuePillarItem":
          revalidateTag("key-value-pillars-section");
          revalidateTag("key-value-pillar-items");
          revalidatedTags.push("key-value-pillars-section", "key-value-pillar-items");
          break;
        case "footer":
          revalidateTag("footer");
          revalidatedTags.push("footer");
          break;
        default:
          // Revalidate all tags for unknown types
          const allTags = [
            "hero",
            "who-we-serve",
            "why",
            "why-items",
            "about",
            "about-items",
            "about-page",
            "clients",
            "testimonials",
            "testimonials-section",
            "countries",
            "maps",
            "services",
            "services-section",
            "blog-posts",
            "faq-categories",
            "faq-items",
            "faq-page",
            "contact-info",
            "privacy-policy",
            "terms-conditions",
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
        "why",
        "why-items",
        "about",
        "about-items",
        "clients",
        "testimonials",
        "testimonials-section",
        "countries",
        "maps",
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
