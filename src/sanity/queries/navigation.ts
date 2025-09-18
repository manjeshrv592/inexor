import { groq } from "next-sanity";

export const navigationItemsQuery = groq`
  *[_type == "navigationItem" && isActive == true] | order(order asc) {
    _id,
    label,
    href,
    hasDropdown,
    order,
    isActive,
    description
  }
`;

export const navigationSettingsQuery = groq`
  *[_type == "navigationSettings"][0] {
    _id,
    title,
    maxItems,
    showOnMobile,
    animationEnabled,
    lastUpdated,
    notes
  }
`;

export const activeNavigationItemsQuery = groq`
  *[_type == "navigationItem" && isActive == true] | order(order asc) {
    _id,
    label,
    href,
    hasDropdown,
    order
  }
`;

export const navigationConfigQuery = groq`
  *[_type == "navigationConfig"][0] {
    _id,
    resources {
      label,
      hasDropdown,
      href
    },
    services {
      label,
      hasDropdown,
      href
    },
    about {
      label,
      hasDropdown,
      href
    },
    faq {
      label,
      hasDropdown,
      href
    }
  }
`;
