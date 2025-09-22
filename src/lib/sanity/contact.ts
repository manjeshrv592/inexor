import { client } from "@/lib/sanity";
import { contactInfoQuery, contactPageQuery } from "@/sanity/queries/contact";

// TypeScript interfaces
export interface ContactInfo {
  _id: string;
  phoneNumber: string;
  email: string;
  mainTitle?: string;
  subTitle?: string;
  description?: string;
  address?: string;
  isActive: boolean;
  lastUpdated: string;
}

export interface ContactPageData {
  _id: string;
  pageTitle: string;
  pageDescription?: string;
  mainTitle?: string;
  subTitle?: string;
  description?: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords?: string[];
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: {
      asset: {
        _id: string;
        url: string;
        altText?: string;
      };
    };
  };
  isActive: boolean;
}

// Fetch active contact information
export async function getContactInfo(): Promise<ContactInfo | null> {
  try {
    const contactInfo = await client.fetch<ContactInfo>(contactInfoQuery);
    return contactInfo;
  } catch (error) {
    console.error("Error fetching contact info:", error);
    return null;
  }
}

// Fetch contact page data
export async function getContactPageData(): Promise<ContactPageData | null> {
  try {
    const contactPage = await client.fetch<ContactPageData>(contactPageQuery);
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
  isActive: true,
  lastUpdated: new Date().toISOString(),
};

