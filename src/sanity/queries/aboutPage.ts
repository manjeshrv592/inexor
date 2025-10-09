import { groq } from "next-sanity";

export const aboutPageQuery = groq`
  *[_type == "aboutPage" && isActive == true][0] {
    _id,
    pageTitle,
    pageSubtitle,
    sidebarImage {
      asset-> {
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
    },
    content[],
    isActive
  }
`;

// Legacy queries - these will be removed after migration
export const processSectionQuery = groq`
  *[_type == "processSection" && isActive == true][0] {
    title,
    description,
    buttonText
  }
`;

export const processStepsQuery = groq`
  *[_type == "processStep"] | order(stepNumber asc) {
    stepNumber,
    title,
    description
  }
`;

export const contentSectionsQuery = groq`
  *[_type == "contentSection"] {
    sectionTitle,
    titleStyle,
    content[]
  }
`;
