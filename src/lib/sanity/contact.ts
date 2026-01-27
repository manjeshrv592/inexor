import { client } from "@/lib/sanity";
import { contactInfoQuery, contactPageQuery, officeLocationsQuery } from "@/sanity/queries/contact";

// TypeScript interfaces
export interface ContactInfo {
  _id: string;
  phoneNumber: string;
  email: string;
  mainTitle?: string;
  subTitle?: string;
  description?: string;
  address?: string;
  successMessage?: string;
  failureMessage?: string;
  isActive: boolean;
  lastUpdated: string;
}

export interface OfficeAddress {
  city: string;
  address: string;
  email?: string;
  phone?: string;
  mapsLink?: string;
}

export interface OfficeLocation {
  _id: string;
  country: string;
  addresses: OfficeAddress[];
  displayOrder?: number;
}

export interface ContactPageData {
  _id: string;
  pageTitle?: string; // Keep for backward compatibility
  pageDescription?: string; // Keep for backward compatibility
  mainTitle?: string;
  subTitle?: string;
  description?: string;
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string[];
    noIndex?: boolean;
    noFollow?: boolean;
  };
  isActive: boolean;
}

// Fetch active contact information
export async function getContactInfo(): Promise<ContactInfo | null> {
  try {
    const contactInfo = await client.fetch<ContactInfo>(
      contactInfoQuery,
      {},
      {
        cache: 'force-cache',
        next: {
          tags: ['contact-info'],
          revalidate: 3600
        }
      }
    );
    return contactInfo;
  } catch (error) {
    console.error("Error fetching contact info:", error);
    return null;
  }
}

// Fetch office locations
export async function getOfficeLocations(): Promise<OfficeLocation[]> {
  try {
    const officeLocations = await client.fetch<OfficeLocation[]>(
      officeLocationsQuery,
      {},
      {
        cache: 'force-cache',
        next: {
          tags: ['office-locations'],
          revalidate: 3600
        }
      }
    );
    return officeLocations;
  } catch (error) {
    console.error("Error fetching office locations:", error);
    return [];
  }
}

// Fetch contact page data
export async function getContactPageData(): Promise<ContactPageData | null> {
  try {
    const contactPage = await client.fetch<ContactPageData>(
      contactPageQuery,
      {},
      {
        cache: 'force-cache',
        next: {
          tags: ['contact-page'],
          revalidate: 3600
        }
      }
    );
    return contactPage;
  } catch (error) {
    console.error("Error fetching contact page data:", error);
    return null;
  }
}

// Fallback contact information (used when Sanity fetch fails)
export const fallbackContactInfo: ContactInfo = {
  _id: "fallback",
  phoneNumber: "623211512211",
  email: "hello@inexor.io",
  mainTitle: "Contact Us",
  subTitle: "Get a Quote/Contact Us",
  description: "Our experts simplify global trade compliance and deliver tailored solutions. Driven by integrity, expertise, and client focus—let's make global shipping seamless together.",
  address: "Gopalan Signature Mall, Old Madras Rd, Rahat Bagh, Nagavarapalya, Bennigana Halli, Bengaluru, Karnataka 560093",
  successMessage: "Message sent successfully! We'll get back to you soon.",
  failureMessage: "Something went wrong. Please try again.",
  isActive: true,
  lastUpdated: new Date().toISOString(),
};

