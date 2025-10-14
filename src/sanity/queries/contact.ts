import { groq } from "next-sanity";

// Query to get active contact information
export const contactInfoQuery = groq`
  *[_type == "contactInfo" && isActive == true][0] {
    _id,
    phoneNumber,
    email,
    mainTitle,
    subTitle,
    description,
    address,
    successMessage,
    failureMessage,
    isActive,
    lastUpdated
  }
`;

// Query to get office locations grouped by country
export const officeLocationsQuery = groq`
  *[_type == "officeLocation"] {
    _id,
    country,
    addresses[] {
      city,
      address,
      email,
      phone,
      mapsLink
    }
  }
`;

// Query to get contact page SEO data
export const contactPageQuery = groq`
  *[_type == "contactPage" && isActive == true][0] {
    _id,
    pageTitle,
    pageDescription,
    mainTitle,
    subTitle,
    description,
    seo {
      metaTitle,
      metaDescription,
      keywords,
      ogTitle,
      ogDescription,
      ogImage {
        asset-> {
          _id,
          url,
          altText
        }
      }
    },
    isActive
  }
`;
