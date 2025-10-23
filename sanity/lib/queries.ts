import { groq } from "next-sanity";

export const WHO_WE_SERVE_QUERY = groq`*[_type == "whoWeServeItem"] | order(order asc) {
  _id,
  title,
  description,
  slug,
  order
}`;

export const WHO_WE_SERVE_SECTION_QUERY = groq`*[_type == "whoWeServeSection" && isActive == true][0] {
  _id,
  title,
  subtitle,
  isActive
}`;

export const HERO_QUERY = groq`*[_type == "hero" && isActive == true][0] {
  _id,
  title,
  description,
  scheduleCallButtonText,
  contactButtonText,
  backgroundImage {
    asset->{
      url,
      metadata {
        dimensions
      }
    }
  },
  isActive
}`;

export const WHY_QUERY = groq`*[_type == "why" && isActive == true][0] {
  _id,
  title,
  subtitle,
  description,
  isActive
}`;

export const WHY_ITEMS_QUERY = groq`*[_type == "whyItem"] | order(order asc) {
  _id,
  content,
  slug,
  order
}`;

export const CLIENTS_QUERY = groq`*[_type == "clientsSection"][0] {
  _id,
  title,
  subtitle,
  logos[] {
    logo {
      asset->{
        url,
        mimeType,
        metadata {
          dimensions,
          lqip
        }
      }
    },
    alt
  }
}`;

export const TESTIMONIALS_QUERY = groq`*[_type == "testimonial" && isActive == true] | order(order asc) {
  _id,
  name,
  position,
  company,
  image {
    asset->{
      url,
      mimeType,
      metadata {
        dimensions,
        lqip
      }
    }
  },
  title,
  quote,
  order
}`;

export const TESTIMONIALS_SECTION_QUERY = groq`*[_type == "testimonialsSection" && isActive == true][0] {
  _id,
  title,
  subtitle,
  autoplayDuration,
  enableAutoplay,
  testimonials[]->{
    _id,
    name,
    position,
    company,
    image {
      asset->{
        url,
        mimeType,
        metadata {
          dimensions,
          lqip
        }
      }
    },
    title,
    quote,
    order
  }
}`;

export const ABOUT_SECTION_QUERY = groq`*[_type == "aboutSection" && isActive == true][0] {
  _id,
  title,
  subtitle,
  description,
  leftImage {
    asset->{
      url,
      metadata {
        dimensions
      }
    },
    alt,
    isGrayscale
  },
  rightImage {
    asset->{
      url,
      metadata {
        dimensions
      }
    },
    alt,
    isGrayscale
  },
  isActive
}`;

export const ABOUT_ITEMS_QUERY = groq`*[_type == "aboutItem"] | order(order asc) {
  _id,
  content,
  slug,
  order
}`;

export const SERVICES_SECTION_QUERY = groq`*[_type == "servicesSection" && isActive == true][0] {
  _id,
  title,
  isActive
}`;

export const SERVICES_FOR_HOMEPAGE_QUERY = groq`*[_type == "service" && isActive == true] | order(order asc) {
  _id,
  code,
  title,
  slug,
  homepagePreview {
    heading1,
    description,
    backgroundImage {
      asset->{
        url,
        mimeType,
        metadata {
          dimensions,
          lqip
        }
      },
      alt
    }
  },
  order,
  isActive
}`;

export const FAQ_CATEGORIES_QUERY = groq`*[_type == "faqCategory" && isActive == true] | order(order asc) {
  _id,
  name,
  slug,
  order,
  isActive,
  "firstQuestionSlug": *[_type == "faqItem" && isActive == true && category->_id == ^._id] | order(order asc) [0].slug.current
}`;

export const FAQ_ITEMS_QUERY = groq`*[_type == "faqItem" && isActive == true] | order(category->order asc, order asc) {
  _id,
  question,
  answer,
  category->{
    _id,
    name,
    slug
  },
  slug,
  order,
  isActive
}`;

export const FAQ_ITEMS_BY_CATEGORY_QUERY = groq`*[_type == "faqItem" && isActive == true && category->slug.current == $categorySlug] | order(order asc) {
  _id,
  question,
  answer,
  category->{
    _id,
    name,
    slug
  },
  slug,
  order,
  isActive
}`;

export const FAQ_PAGE_QUERY = groq`*[_type == "faqPage" && isActive == true][0] {
  _id,
  seo,
  pageTitle,
  pageDescription,
  isActive
}`;

// Lightweight query for redirects - fetches first category and its first question slug
export const FIRST_FAQ_SLUG_QUERY = groq`{
  "firstCategory": *[_type == "faqCategory" && isActive == true] | order(order asc) [0] {
    slug
  },
  "firstQuestion": *[_type == "faqItem" && isActive == true && category->_id == *[_type == "faqCategory" && isActive == true] | order(order asc) [0]._id] | order(order asc) [0] {
    slug
  }
}`;

export const KEY_VALUE_PILLARS_SECTION_QUERY = groq`*[_type == "keyValuePillarsSection" && isActive == true][0] {
  _id,
  description,
  isActive
}`;

export const KEY_VALUE_PILLAR_ITEMS_QUERY = groq`*[_type == "keyValuePillarItem" && isActive == true] | order(order asc) {
  _id,
  title,
  description,
  icon {
    asset->{
      url,
      metadata {
        dimensions
      }
    }
  },
  slug,
  order,
  isActive
}`;

export const FOOTER_QUERY = groq`*[_type == "footer" && isActive == true][0] {
  _id,
  heading,
  copyrightText,
  logo {
    asset->{
      url,
      metadata {
        dimensions
      }
    }
  },
  ctaButtonText,
  ctaButtonLink,
  privacyPolicyLink,
  termsConditionsLink,
  facebookLink,
  twitterLink,
  linkedinLink,
  instagramLink,
  isActive
}`;

export const PRIVACY_POLICY_PAGE_QUERY = groq`*[_type == "privacyPolicyPage" && isActive == true][0] {
  _id,
  seo,
  isActive
}`;

export const PRIVACY_POLICY_CONTENT_QUERY = groq`*[_type == "privacyPolicyContent" && isActive == true][0] {
  _id,
  pageTitle,
  content,
  lastUpdated,
  isActive
}`;

export const TERMS_CONDITIONS_PAGE_QUERY = groq`*[_type == "termsConditionsPage" && isActive == true][0] {
  _id,
  seo,
  isActive
}`;

export const TERMS_CONDITIONS_CONTENT_QUERY = groq`*[_type == "termsConditionsContent" && isActive == true][0] {
  _id,
  pageTitle,
  content,
  lastUpdated,
  isActive
}`;

export const HOME_SEO_QUERY = groq`*[_type == "homeSeo" && isActive == true][0] {
  _id,
  seo {
    metaTitle,
    metaDescription,
    metaKeywords,
    openGraphTitle,
    openGraphDescription,
    openGraphImage {
      asset->{
        url,
        metadata {
          dimensions
        }
      },
      alt
    },
    canonicalUrl,
    noIndex,
    noFollow
  },
  isActive
}`;
