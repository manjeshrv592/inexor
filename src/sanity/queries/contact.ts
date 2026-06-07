import { groq } from "next-sanity";

// Query to get active contact information
export const contactInfoQuery = groq`
  *[_type == "contactInfo" && isActive == true][0] {
    _id,
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

