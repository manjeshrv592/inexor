import { groq } from "next-sanity";

export const faqPageSettingsQuery = groq`
  *[_type == "faqPageSettings"][0] {
    sidebarImage {
      asset->{
        url,
        mimeType,
        metadata {
          dimensions {
            width,
            height
          },
          lqip
        }
      },
      alt,
      isGrayscale
    }
  }
`;
