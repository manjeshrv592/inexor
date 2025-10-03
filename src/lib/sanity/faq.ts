import { client } from "@/lib/sanity";
import { faqPageSettingsQuery } from "@/sanity/queries/faq";

export interface FAQPageSettings {
  sidebarImage?: {
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
  };
}

export async function getFAQPageSettings(): Promise<FAQPageSettings> {
  try {
    const data = await client.fetch(
      faqPageSettingsQuery,
      {},
      {
        cache: 'force-cache',
        next: { 
          revalidate: 3600, // Revalidate every hour
          tags: ['faq-settings']
        }
      }
    );
    return data || {};
  } catch (error) {
    console.error("Error fetching FAQ page settings:", error);
    return {};
  }
}
