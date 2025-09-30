import { groq } from "next-sanity";

export const faqPageSettingsQuery = groq`
  *[_type == "faqPageSettings"][0] {
    sidebarImage {
      asset->{
        url,
        metadata {
          dimensions
        }
      },
      alt,
      isGrayscale
    }
  }
`;
