import { client } from "../../sanity/lib/client";
import {
  WHO_WE_SERVE_QUERY,
  WHO_WE_SERVE_SECTION_QUERY,
  HERO_QUERY,
  WHY_QUERY,
  WHY_ITEMS_QUERY,
  ABOUT_SECTION_QUERY,
  ABOUT_ITEMS_QUERY,
  CLIENTS_QUERY,
  TESTIMONIALS_QUERY,
  TESTIMONIALS_SECTION_QUERY,
  SERVICES_SECTION_QUERY,
  SERVICES_FOR_HOMEPAGE_QUERY,
  FAQ_CATEGORIES_QUERY,
  FAQ_ITEMS_QUERY,
  FAQ_ITEMS_BY_CATEGORY_QUERY,
  FAQ_PAGE_QUERY,
  KEY_VALUE_PILLARS_SECTION_QUERY,
  KEY_VALUE_PILLAR_ITEMS_QUERY,
  FOOTER_QUERY,
  PRIVACY_POLICY_PAGE_QUERY,
  PRIVACY_POLICY_CONTENT_QUERY,
  TERMS_CONDITIONS_PAGE_QUERY,
  TERMS_CONDITIONS_CONTENT_QUERY,
  HOME_SEO_QUERY,
} from "../../sanity/lib/queries";
import { PortableTextBlock } from "@portabletext/types";

// Re-export client for use in other modules
export { client };

export interface WhoWeServeItem {
  _id: string;
  title: string;
  description: string;
  slug: {
    current: string;
  };
  order: number;
}

export interface WhoWeServeSection {
  _id: string;
  title: string;
  isActive: boolean;
}

export interface Hero {
  _id: string;
  title: string;
  description: string;
  backgroundImage: {
    asset: {
      url: string;
      metadata: {
        dimensions: {
          width: number;
          height: number;
        };
      };
    };
  };
  isActive: boolean;
}

export interface Why {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  isActive: boolean;
}

export interface WhyItem {
  _id: string;
  content: string;
  slug: {
    current: string;
  };
  order: number;
}

export interface AboutImage {
  asset: {
    url: string;
    metadata: {
      dimensions: {
        width: number;
        height: number;
      };
    };
  };
}

export interface AboutSection {
  _id: string;
  title: string;
  subtitle: string;
  description: string;
  leftImage: AboutImage;
  rightImage: AboutImage;
  isActive: boolean;
}

export interface AboutItem {
  _id: string;
  content: string;
  slug: {
    current: string;
  };
  order: number;
}

export async function getWhoWeServeItems(): Promise<WhoWeServeItem[]> {
  return client.fetch(
    WHO_WE_SERVE_QUERY,
    {},
    { next: { tags: ["who-we-serve"] } },
  );
}

export async function getWhoWeServeSection(): Promise<WhoWeServeSection | null> {
  return client.fetch(
    WHO_WE_SERVE_SECTION_QUERY,
    {},
    { next: { tags: ["who-we-serve-section"] } },
  );
}

export async function getHero(): Promise<Hero | null> {
  return client.fetch(HERO_QUERY, {}, { next: { tags: ["hero"] } });
}

export async function getWhy(): Promise<Why | null> {
  return client.fetch(WHY_QUERY, {}, { next: { tags: ["why"] } });
}

export async function getWhyItems(): Promise<WhyItem[]> {
  return client.fetch(WHY_ITEMS_QUERY, {}, { next: { tags: ["why-items"] } });
}

export async function getAboutSection(): Promise<AboutSection | null> {
  return client.fetch(ABOUT_SECTION_QUERY, {}, { next: { tags: ["about"] } });
}

export async function getAboutItems(): Promise<AboutItem[]> {
  return client.fetch(
    ABOUT_ITEMS_QUERY,
    {},
    { next: { tags: ["about-items"] } },
  );
}

export interface ClientLogo {
  logo: {
    asset: {
      url: string;
      metadata: {
        dimensions: {
          width: number;
          height: number;
        };
      };
    };
  };
  alt: string;
}

export interface ClientsSection {
  _id: string;
  title: string;
  logos: ClientLogo[];
}

export async function getClientsSection(): Promise<ClientsSection | null> {
  return client.fetch(CLIENTS_QUERY, {}, { next: { tags: ["clients"] } });
}

export interface ResourcesPage {
  _id: string;
  blogSectionTitle: string;
  blogSectionSubtitle?: string;
  leftPanelBackgroundImage?: {
    asset: {
      url: string;
    };
    alt?: string;
  };
  isActive: boolean;
}

export async function getResourcesPage(): Promise<ResourcesPage | null> {
  const query = `*[_type == "resourcesPage" && isActive == true][0] {
    _id,
    blogSectionTitle,
    blogSectionSubtitle,
    leftPanelBackgroundImage {
      asset-> {
        url
      },
      alt
    },
    isActive
  }`;
  
  return client.fetch(query, {}, { next: { tags: ["resourcesPage"] } });
}

export interface TestimonialImage {
  asset: {
    url: string;
    metadata: {
      dimensions: {
        width: number;
        height: number;
      };
    };
  };
}

export interface Testimonial {
  _id: string;
  name: string;
  position: string;
  company: string;
  image?: TestimonialImage; // Make image optional since it might not be uploaded yet
  title: string;
  quote: string;
  order: number;
}

export interface TestimonialsSection {
  _id: string;
  title: string;
  subtitle: string;
  autoplayDuration: number;
  enableAutoplay: boolean;
  testimonials?: Testimonial[];
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return client.fetch(
    TESTIMONIALS_QUERY,
    {},
    { next: { tags: ["testimonials"] } },
  );
}

export async function getTestimonialsSection(): Promise<TestimonialsSection | null> {
  const section = await client.fetch(
    TESTIMONIALS_SECTION_QUERY,
    {},
    { next: { tags: ["testimonials-section"] } },
  );

  // If section has no specific testimonials selected, get all active testimonials
  if (section && (!section.testimonials || section.testimonials.length === 0)) {
    const allTestimonials = await getTestimonials();
    return {
      ...section,
      testimonials: allTestimonials,
    };
  }

  return section;
}

export interface ServiceImage {
  asset: {
    url: string;
    metadata: {
      dimensions: {
        width: number;
        height: number;
      };
    };
  };
}

export interface ServiceForHomepage {
  _id: string;
  code: string;
  title: string;
  homepagePreview: {
    heading1: string;
    description: string;
    backgroundImage: ServiceImage & { alt?: string };
  };
  order: number;
  isActive: boolean;
}

export interface ServicesSection {
  _id: string;
  title: string;
  isActive: boolean;
}

export async function getServicesSection(): Promise<ServicesSection | null> {
  return client.fetch(SERVICES_SECTION_QUERY);
}

export async function getServicesForHomepage(): Promise<ServiceForHomepage[]> {
  return client.fetch(SERVICES_FOR_HOMEPAGE_QUERY);
}

export interface FAQCategory {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  description?: string;
  order: number;
  isActive: boolean;
}

export interface FAQItem {
  _id: string;
  question: string;
  answer: string;
  category: {
    _id: string;
    name: string;
    slug: {
      current: string;
    };
  };
  slug: {
    current: string;
  };
  order: number;
  isActive: boolean;
}

export interface FAQPage {
  _id: string;
  seo: Record<string, unknown>; // Generic object type instead of any
  pageTitle: string;
  pageDescription?: string;
  isActive: boolean;
}

export async function getFAQCategories(): Promise<FAQCategory[]> {
  return client.fetch(
    FAQ_CATEGORIES_QUERY,
    {},
    { next: { tags: ["faq-categories"] } },
  );
}

export async function getFAQItems(): Promise<FAQItem[]> {
  return client.fetch(FAQ_ITEMS_QUERY, {}, { next: { tags: ["faq-items"] } });
}

export async function getFAQItemsByCategory(
  categorySlug: string,
): Promise<FAQItem[]> {
  return client.fetch(
    FAQ_ITEMS_BY_CATEGORY_QUERY,
    { categorySlug },
    { next: { tags: ["faq-items", `faq-category-${categorySlug}`] } },
  );
}

export async function getFAQPage(): Promise<FAQPage | null> {
  return client.fetch(FAQ_PAGE_QUERY, {}, { next: { tags: ["faq-page"] } });
}

export interface KeyValuePillarsSection {
  _id: string;
  description: string;
  isActive: boolean;
}

export interface KeyValuePillarItem {
  _id: string;
  title: string;
  description: string;
  icon: {
    asset: {
      url: string;
      metadata: {
        dimensions: {
          width: number;
          height: number;
        };
      };
    };
  };
  slug: {
    current: string;
  };
  order: number;
  isActive: boolean;
}

export async function getKeyValuePillarsSection(): Promise<KeyValuePillarsSection | null> {
  return client.fetch(
    KEY_VALUE_PILLARS_SECTION_QUERY,
    {},
    { next: { tags: ["key-value-pillars-section"] } },
  );
}

export async function getKeyValuePillarItems(): Promise<KeyValuePillarItem[]> {
  return client.fetch(
    KEY_VALUE_PILLAR_ITEMS_QUERY,
    {},
    { next: { tags: ["key-value-pillar-items"] } },
  );
}

export interface SocialLink {
  platform: string;
  url: string;
  isActive: boolean;
}

export interface Footer {
  _id: string;
  heading: string;
  copyrightText: string;
  logo: {
    asset: {
      url: string;
      metadata: {
        dimensions: {
          width: number;
          height: number;
        };
      };
    };
  };
  ctaButtonText: string;
  ctaButtonLink?: string;
  privacyPolicyLink: string;
  termsConditionsLink: string;
  facebookLink?: string;
  twitterLink?: string;
  linkedinLink?: string;
  instagramLink?: string;
  isActive: boolean;
}

export async function getFooter(): Promise<Footer | null> {
  return client.fetch(FOOTER_QUERY, {}, { next: { tags: ["footer"] } });
}

// Privacy Policy and Terms & Conditions interfaces and functions
export interface SEO {
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  ogImage?: {
    asset: {
      url: string;
    };
  };
}

export interface PrivacyPolicyPage {
  _id: string;
  seo: SEO;
  isActive: boolean;
}

export interface PrivacyPolicyContent {
  _id: string;
  pageTitle: string;
  content: PortableTextBlock[];
  lastUpdated: string;
  isActive: boolean;
}

export interface TermsConditionsPage {
  _id: string;
  seo: SEO;
  isActive: boolean;
}

export interface TermsConditionsContent {
  _id: string;
  pageTitle: string;
  content: PortableTextBlock[];
  lastUpdated: string;
  isActive: boolean;
}

export async function getPrivacyPolicyPage(): Promise<PrivacyPolicyPage | null> {
  return client.fetch(
    PRIVACY_POLICY_PAGE_QUERY,
    {},
    { next: { tags: ["privacy-policy-page"] } },
  );
}

export async function getPrivacyPolicyContent(): Promise<PrivacyPolicyContent | null> {
  return client.fetch(
    PRIVACY_POLICY_CONTENT_QUERY,
    {},
    { next: { tags: ["privacy-policy-content"] } },
  );
}

export async function getTermsConditionsPage(): Promise<TermsConditionsPage | null> {
  return client.fetch(
    TERMS_CONDITIONS_PAGE_QUERY,
    {},
    { next: { tags: ["terms-conditions-page"] } },
  );
}

export async function getTermsConditionsContent(): Promise<TermsConditionsContent | null> {
  return client.fetch(
    TERMS_CONDITIONS_CONTENT_QUERY,
    {},
    { next: { tags: ["terms-conditions-content"] } },
  );
}

// Home SEO interfaces and functions
export interface HomeSeo {
  _id: string;
  seo: SEO;
  isActive: boolean;
}

export async function getHomeSeo(): Promise<HomeSeo | null> {
  return client.fetch(HOME_SEO_QUERY, {}, { next: { tags: ["home-seo"] } });
}
