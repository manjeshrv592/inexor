import { client } from "../../sanity/lib/client";
import {
  WHO_WE_SERVE_QUERY,
  HERO_QUERY,
  WHY_QUERY,
  WHY_ITEMS_QUERY,
  ABOUT_SECTION_QUERY,
  ABOUT_ITEMS_QUERY,
  CLIENTS_QUERY,
  TESTIMONIALS_QUERY,
  TESTIMONIALS_SECTION_QUERY,
} from "../../sanity/lib/queries";

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

export interface Hero {
  _id: string;
  title: string;
  description: string;
  isActive: boolean;
}

export interface Why {
  _id: string;
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
  logos: ClientLogo[];
}

export async function getClientsSection(): Promise<ClientsSection | null> {
  return client.fetch(CLIENTS_QUERY, {}, { next: { tags: ["clients"] } });
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
