// Service Queries
export const SERVICES_QUERY = `*[_type == "service" && isActive == true] | order(order asc) {
  _id,
  title,
  code,
  slug,
  subtitle,
  excerpt,
  "featuredImage": featuredImage {
    asset->{
      url,
      metadata {
        dimensions {
          width,
          height
        }
      }
    },
    alt
  },
  "useCases": useCases {
    title,
    "image": image {
      asset->{ url },
      alt
    },
    steps[]{
      stepNumber,
      title,
      description
    }
  },
  order,
  isActive
}`;

export const SERVICE_BY_SLUG_QUERY = `*[_type == "service" && slug.current == $slug && isActive == true][0] {
  _id,
  title,
  code,
  slug,
  subtitle,
  excerpt,
  "featuredImage": featuredImage {
    asset->{
      url,
      metadata {
        dimensions {
          width,
          height
        }
      }
    },
    alt
  },
  content,
  "useCases": useCases {
    title,
    "image": image {
      asset->{ url },
      alt
    },
    steps[]{
      stepNumber,
      title,
      description
    }
  },
  order,
  isActive
}`;

export const SERVICE_BY_CODE_QUERY = `*[_type == "service" && code == $code && isActive == true][0] {
  _id,
  title,
  code,
  slug,
  subtitle,
  excerpt,
  "featuredImage": featuredImage {
    asset->{
      url,
      metadata {
        dimensions {
          width,
          height
        }
      }
    },
    alt
  },
  content,
  "useCases": useCases {
    title,
    "image": image {
      asset->{ url },
      alt
    },
    steps[]{
      stepNumber,
      title,
      description
    }
  },
  order,
  isActive
}`;

// Get previous and next services based on order
export const SERVICE_NAVIGATION_QUERY = `{
  "previous": *[_type == "service" && isActive == true && order < $currentOrder] | order(order desc)[0] {
    _id,
    title,
    code,
    slug
  },
  "next": *[_type == "service" && isActive == true && order > $currentOrder] | order(order asc)[0] {
    _id,
    title,
    code,
    slug
  }
}`;
