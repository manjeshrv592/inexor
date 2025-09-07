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
