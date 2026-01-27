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
  FIRST_FAQ_SLUG_QUERY,
  KEY_VALUE_PILLARS_SECTION_QUERY,
  KEY_VALUE_PILLAR_ITEMS_QUERY,
  FOOTER_QUERY,
  PRIVACY_POLICY_PAGE_QUERY,
  PRIVACY_POLICY_CONTENT_QUERY,
  TERMS_CONDITIONS_PAGE_QUERY,
  TERMS_CONDITIONS_CONTENT_QUERY,
  HOME_SEO_QUERY,
  ABOUT_PAGE_SEO_QUERY,
  RESOURCES_PAGE_SEO_QUERY,
  SERVICES_PAGE_SEO_QUERY,
  FAQ_PAGE_SEO_QUERY,
  CONTACT_PAGE_SEO_QUERY,
  PRIVACY_POLICY_SEO_QUERY,
  TERMS_CONDITIONS_SEO_QUERY,
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
  subtitle: string;
  isActive: boolean;
}

export interface Hero {
  _id: string;
  title: string;
  description: string;
  scheduleCallButtonText: string;
  contactButtonText: string;
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
  subtitle?: string;
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
  alt?: string;
  isGrayscale?: boolean;
}

export interface AboutSection {
  _id: string;
  title: string;
  subtitle?: string;
  description: string;
  leftImage: AboutImage;
  rightImage: AboutImage;
  isActive: boolean;
}

export interface AboutItem {
  _id: string;
  content: string;
  order: number;
  serviceSlug: string;
}

export async function getWhoWeServeItems(): Promise<WhoWeServeItem[]> {
  return client.fetch(
    WHO_WE_SERVE_QUERY,
    {},
    {
      cache: 'force-cache',
      next: {
        tags: ["who-we-serve"],
        revalidate: 3600
      }
    },
  );
}

export async function getWhoWeServeSection(): Promise<WhoWeServeSection | null> {
  return client.fetch(
    WHO_WE_SERVE_SECTION_QUERY,
    {},
    {
      cache: 'force-cache',
      next: {
        tags: ["who-we-serve-section"],
        revalidate: 3600
      }
    },
  );
}

export async function getHero(): Promise<Hero | null> {
  return client.fetch(
    HERO_QUERY,
    {},
    {
      cache: 'force-cache',
      next: {
        tags: ["hero"],
        revalidate: 3600
      }
    }
  );
}

export async function getWhy(): Promise<Why | null> {
  return client.fetch(
    WHY_QUERY,
    {},
    {
      cache: 'force-cache',
      next: {
        tags: ["why"],
        revalidate: 3600
      }
    }
  );
}

export async function getWhyItems(): Promise<WhyItem[]> {
  return client.fetch(
    WHY_ITEMS_QUERY,
    {},
    {
      cache: 'force-cache',
      next: {
        tags: ["why-items"],
        revalidate: 3600
      }
    }
  );
}

export async function getAboutSection(): Promise<AboutSection | null> {
  return client.fetch(
    ABOUT_SECTION_QUERY,
    {},
    {
      cache: 'force-cache',
      next: {
        tags: ["about"],
        revalidate: 3600
      }
    }
  );
}

export async function getAboutItems(): Promise<AboutItem[]> {
  return client.fetch(
    ABOUT_ITEMS_QUERY,
    {},
    {
      cache: 'force-cache',
      next: {
        tags: ["about-items"],
        revalidate: 3600
      }
    },
  );
}

export interface ClientLogo {
  logo: {
    asset: {
      url: string;
      mimeType: string;
      metadata: {
        dimensions: {
          width: number;
          height: number;
        };
        lqip?: string;
      };
    };
  };
  alt: string;
}

export interface ClientsSection {
  _id: string;
  title: string;
  subtitle: string;
  logos: ClientLogo[];
}

export async function getClientsSection(): Promise<ClientsSection | null> {
  return client.fetch(
    CLIENTS_QUERY,
    {},
    {
      cache: 'force-cache',
      next: {
        tags: ["clients"],
        revalidate: 3600
      }
    }
  );
}

export interface ResourcesPage {
  _id: string;
  blogSectionTitle: string;
  blogSectionSubtitle?: string;
  leftPanelBackgroundImage?: {
    asset: {
      url: string;
      mimeType: string;
      metadata: {
        dimensions: {
          width: number;
          height: number;
        };
        lqip?: string;
      };
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
        url,
        mimeType,
        metadata {
          dimensions,
          lqip
        }
      },
      alt
    },
    isActive
  }`;

  return client.fetch(
    query,
    {},
    {
      cache: 'force-cache',
      next: {
        tags: ["resourcesPage"],
        revalidate: 3600
      }
    }
  );
}

export interface TestimonialImage {
  asset: {
    url: string;
    mimeType: string;
    metadata: {
      dimensions: {
        width: number;
        height: number;
      };
      lqip?: string;
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
  subtitle?: string;
  autoplayDuration: number;
  enableAutoplay: boolean;
  testimonials?: Testimonial[];
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return client.fetch(
    TESTIMONIALS_QUERY,
    {},
    {
      cache: 'force-cache',
      next: {
        tags: ["testimonials"],
        revalidate: 3600
      }
    },
  );
}

export async function getTestimonialsSection(): Promise<TestimonialsSection | null> {
  const section = await client.fetch(
    TESTIMONIALS_SECTION_QUERY,
    {},
    {
      cache: 'force-cache',
      next: {
        tags: ["testimonials-section"],
        revalidate: 3600
      }
    },
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
    mimeType: string;
    metadata: {
      dimensions: {
        width: number;
        height: number;
      };
      lqip?: string;
    };
  };
}

export interface ServiceForHomepage {
  _id: string;
  code: string;
  title: string;
  slug: {
    current: string;
  };
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
  return client.fetch(
    SERVICES_SECTION_QUERY,
    {},
    {
      cache: 'force-cache',
      next: {
        tags: ["services-section"],
        revalidate: 3600
      }
    }
  );
}

export async function getServicesForHomepage(): Promise<ServiceForHomepage[]> {
  return client.fetch(
    SERVICES_FOR_HOMEPAGE_QUERY,
    {},
    {
      cache: 'force-cache',
      next: {
        tags: ["services"],
        revalidate: 3600
      }
    }
  );
}

export interface FAQCategory {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  order: number;
  isActive: boolean;
  firstQuestionSlug?: string;
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
  seo: SEO;
  pageTitle?: string; // Keep for backward compatibility
  pageDescription?: string; // Keep for backward compatibility
  isActive: boolean;
}

export async function getFAQCategories(): Promise<FAQCategory[]> {
  return client.fetch(
    FAQ_CATEGORIES_QUERY,
    {},
    {
      cache: 'force-cache',
      next: {
        tags: ["faq-categories"],
        revalidate: 3600
      }
    },
  );
}

export async function getFAQItems(): Promise<FAQItem[]> {
  return client.fetch(
    FAQ_ITEMS_QUERY,
    {},
    {
      cache: 'force-cache',
      next: {
        tags: ["faq-items"],
        revalidate: 3600
      }
    }
  );
}

export async function getFAQItemsByCategory(
  categorySlug: string,
): Promise<FAQItem[]> {
  return client.fetch(
    FAQ_ITEMS_BY_CATEGORY_QUERY,
    { categorySlug },
    {
      cache: 'force-cache',
      next: {
        tags: ["faq-items", `faq-category-${categorySlug}`],
        revalidate: 3600
      }
    },
  );
}

export async function getFAQPage(): Promise<FAQPage | null> {
  return client.fetch(
    FAQ_PAGE_QUERY,
    {},
    {
      cache: 'force-cache',
      next: {
        tags: ["faq-page"],
        revalidate: 3600
      }
    }
  );
}

export interface FirstFAQSlugs {
  firstCategory: {
    slug: {
      current: string;
    };
  } | null;
  firstQuestion: {
    slug: {
      current: string;
    };
  } | null;
}

export async function getFirstFAQSlugs(): Promise<FirstFAQSlugs> {
  return client.fetch(
    FIRST_FAQ_SLUG_QUERY,
    {},
    {
      cache: "force-cache",
      next: {
        tags: ["faq-categories", "faq-items"],
        revalidate: 3600, // Cache for 1 hour
      },
    },
  );
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
    {
      cache: 'force-cache',
      next: {
        tags: ["key-value-pillars-section"],
        revalidate: 3600
      }
    },
  );
}

export async function getKeyValuePillarItems(): Promise<KeyValuePillarItem[]> {
  return client.fetch(
    KEY_VALUE_PILLAR_ITEMS_QUERY,
    {},
    {
      cache: 'force-cache',
      next: {
        tags: ["key-value-pillar-items"],
        revalidate: 3600
      }
    },
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
  return client.fetch(
    FOOTER_QUERY,
    {},
    {
      cache: 'force-cache',
      next: {
        tags: ["footer"],
        revalidate: 3600
      }
    }
  );
}

// Privacy Policy and Terms & Conditions interfaces and functions
export interface SEO {
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  keywords?: string[]; // Keep for backward compatibility
  noIndex?: boolean;
  noFollow?: boolean;
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
    {
      cache: "force-cache",
      next: {
        tags: ["privacy-policy-page"],
        revalidate: 86400, // Cache for 24 hours (privacy policy rarely changes)
      },
    },
  );
}

export async function getPrivacyPolicyContent(): Promise<PrivacyPolicyContent | null> {
  return client.fetch(
    PRIVACY_POLICY_CONTENT_QUERY,
    {},
    {
      cache: "force-cache",
      next: {
        tags: ["privacy-policy-content"],
        revalidate: 86400, // Cache for 24 hours (privacy policy rarely changes)
      },
    },
  );
}

export async function getTermsConditionsPage(): Promise<TermsConditionsPage | null> {
  return client.fetch(
    TERMS_CONDITIONS_PAGE_QUERY,
    {},
    {
      cache: "force-cache",
      next: {
        tags: ["terms-conditions-page"],
        revalidate: 86400, // Cache for 24 hours (terms rarely change)
      },
    },
  );
}

export async function getTermsConditionsContent(): Promise<TermsConditionsContent | null> {
  return client.fetch(
    TERMS_CONDITIONS_CONTENT_QUERY,
    {},
    {
      cache: "force-cache",
      next: {
        tags: ["terms-conditions-content"],
        revalidate: 86400, // Cache for 24 hours (terms rarely change)
      },
    },
  );
}

// Home SEO interfaces and functions
export interface HomeSeo {
  _id: string;
  seo: SEO;
  isActive: boolean;
}

export async function getHomeSeo(): Promise<HomeSeo | null> {
  return client.fetch(
    HOME_SEO_QUERY,
    {},
    {
      cache: 'force-cache',
      next: {
        tags: ["home-seo"],
        revalidate: 3600
      }
    }
  );
}

// About Page SEO interfaces and functions
export interface AboutPageSeo {
  _id: string;
  seo: SEO;
  isActive: boolean;
}

export async function getAboutPageSeo(): Promise<AboutPageSeo | null> {
  return client.fetch(
    ABOUT_PAGE_SEO_QUERY,
    {},
    {
      cache: 'force-cache',
      next: {
        tags: ["about-page-seo"],
        revalidate: 3600
      }
    },
  );
}

// Resources Page SEO interfaces and functions
export interface ResourcesPageSeo {
  _id: string;
  seo: SEO;
  isActive: boolean;
}

export async function getResourcesPageSeo(): Promise<ResourcesPageSeo | null> {
  return client.fetch(
    RESOURCES_PAGE_SEO_QUERY,
    {},
    {
      cache: 'force-cache',
      next: {
        tags: ["resources-page-seo"],
        revalidate: 3600
      }
    },
  );
}

// Services Page SEO interfaces and functions
export interface ServicesPageSeo {
  _id: string;
  seo: SEO;
  isActive: boolean;
}

export async function getServicesPageSeo(): Promise<ServicesPageSeo | null> {
  return client.fetch(
    SERVICES_PAGE_SEO_QUERY,
    {},
    {
      cache: 'force-cache',
      next: {
        tags: ["services-page-seo"],
        revalidate: 3600
      }
    },
  );
}

// FAQ Page SEO interfaces and functions
export interface FaqPageSeo {
  _id: string;
  seo: SEO;
  isActive: boolean;
}

export async function getFaqPageSeo(): Promise<FaqPageSeo | null> {
  return client.fetch(
    FAQ_PAGE_SEO_QUERY,
    {},
    {
      cache: 'force-cache',
      next: {
        tags: ["faq-page-seo"],
        revalidate: 3600
      }
    },
  );
}

// Contact Page SEO interfaces and functions
export interface ContactPageSeo {
  _id: string;
  seo: SEO;
  isActive: boolean;
}

export async function getContactPageSeo(): Promise<ContactPageSeo | null> {
  return client.fetch(
    CONTACT_PAGE_SEO_QUERY,
    {},
    {
      cache: 'force-cache',
      next: {
        tags: ["contact-page-seo"],
        revalidate: 3600
      }
    },
  );
}

// Privacy Policy SEO interfaces and functions
export interface PrivacyPolicySeo {
  _id: string;
  seo: SEO;
  isActive: boolean;
}

export async function getPrivacyPolicySeo(): Promise<PrivacyPolicySeo | null> {
  return client.fetch(
    PRIVACY_POLICY_SEO_QUERY,
    {},
    {
      cache: "force-cache",
      next: {
        tags: ["privacy-policy-seo"],
        revalidate: 86400, // Cache for 24 hours (SEO rarely changes)
      },
    },
  );
}

// Terms Conditions SEO interfaces and functions
export interface TermsConditionsSeo {
  _id: string;
  seo: SEO;
  isActive: boolean;
}

export async function getTermsConditionsSeo(): Promise<TermsConditionsSeo | null> {
  return client.fetch(
    TERMS_CONDITIONS_SEO_QUERY,
    {},
    {
      cache: "force-cache",
      next: {
        tags: ["terms-conditions-seo"],
        revalidate: 86400, // Cache for 24 hours (SEO rarely changes)
      },
    },
  );
}
