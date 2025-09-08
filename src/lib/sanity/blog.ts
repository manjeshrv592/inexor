import { PortableTextBlock } from "@portabletext/types";
import { client } from "../../../sanity/lib/client";
import {
  BLOG_POSTS_QUERY,
  BLOG_POST_BY_SLUG_QUERY,
  BLOG_POST_NAVIGATION_QUERY,
  RECENT_BLOG_POSTS_QUERY,
} from "../../../sanity/lib/blogQueries";

// Types
export interface BlogImage {
  asset: {
    url: string;
    metadata: {
      dimensions: {
        width: number;
        height: number;
      };
    };
  };
  alt?: string;
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
