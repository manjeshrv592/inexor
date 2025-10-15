import { PortableTextBlock } from "@portabletext/types";
import { client } from "../../../sanity/lib/client";
import {
  BLOG_POSTS_QUERY,
  BLOG_POST_BY_SLUG_QUERY,
  BLOG_POST_NAVIGATION_QUERY,
  RECENT_BLOG_POSTS_QUERY,
  FIRST_BLOG_POST_SLUG_QUERY,
  BLOG_POSTS_NAVIGATION_QUERY,
} from "../../../sanity/lib/blogQueries";

// Types
export interface BlogImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
    url?: string; // Keep for backward compatibility
    mimeType?: string;
    metadata?: {
      dimensions: {
        width: number;
        height: number;
      };
      lqip?: string;
    };
  };
  crop?: {
    _type: 'sanity.imageCrop';
    bottom: number;
    left: number;
    right: number;
    top: number;
  };
  hotspot?: {
    _type: 'sanity.imageHotspot';
    height: number;
    width: number;
    x: number;
    y: number;
  };
  alt?: string;
  caption?: string;
  isGrayscale?: boolean;
}

export interface BlogAuthor {
  name: string;
  image?: BlogImage;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  excerpt?: string;
  featuredImage?: BlogImage;
  author: BlogAuthor;
  publishedAt: string;
  content?: PortableTextBlock[]; // Rich text content
  tags?: string[];
  readingTime?: number;
  isActive: boolean;
  isFeatured?: boolean;
  order?: number;
}

export interface BlogPostNavigation {
  previous: {
    _id: string;
    title: string;
    slug: {
      current: string;
    };
  } | null;
  next: {
    _id: string;
    title: string;
    slug: {
      current: string;
    };
  } | null;
}

// Functions
export async function getBlogPosts(): Promise<BlogPost[]> {
  return client.fetch(BLOG_POSTS_QUERY, {}, { next: { tags: ["blog-posts"] } });
}

export async function getBlogPostBySlug(
  slug: string,
): Promise<BlogPost | null> {
  return client.fetch(
    BLOG_POST_BY_SLUG_QUERY,
    { slug },
    { next: { tags: ["blog-posts", `blog-post-${slug}`] } },
  );
}

export async function getBlogPostNavigation(
  currentDate: string,
): Promise<BlogPostNavigation> {
  return client.fetch(
    BLOG_POST_NAVIGATION_QUERY,
    { currentDate },
    { next: { tags: ["blog-posts"] } },
  );
}

export async function getRecentBlogPosts(
  limit: number = 5,
): Promise<BlogPost[]> {
  return client.fetch(
    RECENT_BLOG_POSTS_QUERY,
    { limit },
    { next: { tags: ["blog-posts", "recent-blogs"] } },
  );
}

export async function getFirstBlogPostSlug(): Promise<{ slug: { current: string } } | null> {
  return client.fetch(
    FIRST_BLOG_POST_SLUG_QUERY,
    {},
    { next: { tags: ["blog-posts"] } },
  );
}

export async function getBlogPostsForNavigation(): Promise<BlogPost[]> {
  return client.fetch(BLOG_POSTS_NAVIGATION_QUERY, {}, { next: { tags: ["blog-posts"] } });
}
