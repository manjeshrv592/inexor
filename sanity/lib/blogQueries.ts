// Blog Posts Queries
export const BLOG_POSTS_QUERY = `*[_type == "blogPost" && isActive == true] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  "featuredImage": featuredImage {
    _type,
    asset->{
      _ref,
      _type,
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
    crop,
    hotspot,
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
    _type,
    asset->{
      _ref,
      _type,
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
    crop,
    hotspot,
    alt
  },
  author {
    name,
    "image": image {
      _type,
      asset->{
        _ref,
        _type,
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
      crop,
      hotspot
    }
  },
  publishedAt,
  content[] {
    ...,
    _type == "image" => {
      ...,
      _type,
      asset->{
        _ref,
        _type,
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
      crop,
      hotspot,
      alt,
      caption,
      isGrayscale
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
    _type,
    asset->{
      _ref,
      _type,
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
    crop,
    hotspot,
    alt
  },
  author,
  publishedAt,
  readingTime
}`;
