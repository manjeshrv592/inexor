import { groq } from "next-sanity";

export const WHO_WE_SERVE_QUERY = groq`*[_type == "whoWeServeItem"] | order(order asc) {
  _id,
  title,
  description,
  slug,
  order
}`;

export const HERO_QUERY = groq`*[_type == "hero" && isActive == true][0] {
  _id,
  title,
  description,
  isActive
}`;

export const WHY_QUERY = groq`*[_type == "why" && isActive == true][0] {
  _id,
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
  logos[] {
    logo {
      asset->{
        url,
        metadata {
          dimensions
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
      metadata {
        dimensions
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
        metadata {
          dimensions
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
    }
  },
  rightImage {
    asset->{
      url,
      metadata {
        dimensions
      }
    }
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

export const SERVICE_ITEMS_QUERY = groq`*[_type == "serviceItem" && isActive == true] | order(order asc) {
  _id,
  code,
  title,
  heading1,
  heading2,
  description,
  backgroundImage {
    asset->{
      url,
      metadata {
        dimensions
      }
    }
  },
  order,
  isActive
}`;

export const FAQ_CATEGORIES_QUERY = groq`*[_type == "faqCategory" && isActive == true] | order(order asc) {
  _id,
  name,
  slug,
  description,
  order,
  isActive
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
  socialLinks[] {
    platform,
    url,
    isActive
  },
  isActive
}`;

export const PRIVACY_POLICY_PAGE_QUERY = groq`*[_type == "privacyPolicyPage" && isActive == true][0] {
  _id,
  seo,
  pageTitle,
  pageSubtitle,
  isActive
}`;

export const PRIVACY_POLICY_CONTENT_QUERY = groq`*[_type == "privacyPolicyContent" && isActive == true][0] {
  _id,
  content,
  lastUpdated,
  isActive
}`;

export const TERMS_CONDITIONS_PAGE_QUERY = groq`*[_type == "termsConditionsPage" && isActive == true][0] {
  _id,
  seo,
  pageTitle,
  pageSubtitle,
  isActive
}`;

export const TERMS_CONDITIONS_CONTENT_QUERY = groq`*[_type == "termsConditionsContent" && isActive == true][0] {
  _id,
  content,
  lastUpdated,
  isActive
}`;
