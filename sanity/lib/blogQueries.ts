// Blog Posts Queries
export const BLOG_POSTS_QUERY = `*[_type == "blogPost" && isActive == true] | order(publishedAt desc) {
  _id,
  title,
  slug,
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
  author,
  publishedAt,
  tags,
  readingTime,
  isActive,
  order
}`;

export const BLOG_POST_BY_SLUG_QUERY = `*[_type == "blogPost" && slug.current == $slug && isActive == true][0] {
  _id,
  title,
  slug,
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
  author {
    name,
    "image": image {
      asset->{
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      }
    }
  },
  publishedAt,
  content[] {
    ...,
    _type == "image" => {
      ...,
      asset->{
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      }
    }
  },
  tags,
  readingTime,
  isActive
}`;

// Get previous and next blog posts
export const BLOG_POST_NAVIGATION_QUERY = `{
  "previous": *[_type == "blogPost" && isActive == true && publishedAt < $currentDate] | order(publishedAt desc)[0] {
    _id,
    title,
    slug
  },
  "next": *[_type == "blogPost" && isActive == true && publishedAt > $currentDate] | order(publishedAt asc)[0] {
    _id,
    title,
    slug
  }
}`;

// Recent blog posts
export const RECENT_BLOG_POSTS_QUERY = `*[_type == "blogPost" && isActive == true] | order(publishedAt desc) [0...$limit] {
  _id,
  title,
  slug,
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
  author,
  publishedAt,
  readingTime
}`;
