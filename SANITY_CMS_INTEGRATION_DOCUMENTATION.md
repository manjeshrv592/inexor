# Sanity CMS Integration Documentation

## Inexor Website

---

**Document Version:** 1.0  
**Date:** January 2025  
**Project:** Inexor Website CMS Integration  
**Technology Stack:** Next.js + Sanity.io

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Architecture Overview](#architecture-overview)
3. [Project Configuration](#project-configuration)
4. [Content Management System](#content-management-system)
5. [Data Fetching & Integration](#data-fetching--integration)
6. [Content Management Workflow](#content-management-workflow)
7. [Technical Implementation](#technical-implementation)
8. [Benefits & ROI](#benefits--roi)
9. [Maintenance & Best Practices](#maintenance--best-practices)
10. [Appendices](#appendices)

---

## Executive Summary

The Inexor website leverages a modern headless CMS architecture using **Sanity.io** for content management and **Next.js** for the frontend presentation layer. This solution provides:

- **Scalable Content Management**: Handle unlimited content types and growth
- **Real-time Updates**: Content changes are instantly live without rebuilds
- **Developer-Friendly**: Type-safe, performant, and maintainable codebase
- **Editor-Friendly**: Intuitive interface for non-technical content creators
- **Enterprise-Grade**: 99.9% uptime, global CDN, and robust security

### Key Metrics

- **Content Types**: 25+ structured content schemas
- **Performance**: Sub-200ms page load times via CDN
- **Uptime**: 99.9% SLA guarantee
- **Global Reach**: Content delivered via worldwide CDN

---

## Architecture Overview

### Headless CMS Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Content       │    │   Sanity        │    │   Next.js       │
│   Editors       │───▶│   Studio        │───▶│   Frontend      │
│                 │    │   (CMS)         │    │   (Website)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                               │                        │
                               ▼                        ▼
                       ┌─────────────────┐    ┌─────────────────┐
                       │   Sanity        │    │   Website       │
                       │   Content Lake  │    │   Visitors      │
                       │   (Cloud)       │    │                 │
                       └─────────────────┘    └─────────────────┘
```

### Technology Stack

- **Frontend**: Next.js 15.5.2 (React 19)
- **CMS**: Sanity.io v4.6.1
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript 5
- **Deployment**: Vercel (recommended)
- **CDN**: Sanity CDN for images and assets

---

## Project Configuration

### Sanity Project Details

| Configuration   | Value           |
| --------------- | --------------- |
| **Project ID**  | `cmn648mb`      |
| **Dataset**     | `production`    |
| **API Version** | `2024-01-01`    |
| **Studio Name** | "Inexor Studio" |
| **Region**      | Global CDN      |

### File Structure

```
├── sanity.config.ts          # Main Sanity configuration
├── sanity.cli.ts            # CLI configuration
├── next.config.ts           # Next.js configuration
├── sanity/
│   ├── env.ts               # Environment variables
│   ├── lib/
│   │   ├── client.ts        # Sanity client setup
│   │   ├── queries.ts       # GROQ queries
│   │   ├── blogQueries.ts   # Blog-specific queries
│   │   └── serviceQueries.ts # Service-specific queries
│   ├── schemas/             # Content type definitions (25+ schemas)
│   │   ├── index.ts         # Schema registry
│   │   ├── hero.ts          # Homepage hero
│   │   ├── blogPost.ts      # Blog posts
│   │   ├── service.ts       # Services
│   │   └── ...              # Additional content types
│   └── structure.ts         # Studio navigation structure
├── src/
│   ├── lib/
│   │   ├── sanity.ts        # Data fetching functions
│   │   └── sanity/          # Modular data fetchers
│   ├── components/
│   │   ├── sections/        # Page sections
│   │   ├── blog/           # Blog components
│   │   └── ui/             # Reusable UI components
│   └── app/
│       ├── page.tsx        # Homepage
│       └── (modal)/        # Page routes
└── scripts/                # Content population scripts
    ├── populate-blog.ts
    ├── populate-countries.ts
    └── ...
```

---

## Content Management System

### Content Types & Schemas

The Inexor website manages content through **25+ structured content types**, organized into logical categories:

#### 1. Homepage Content

| Content Type          | Purpose             | Fields                                |
| --------------------- | ------------------- | ------------------------------------- |
| `hero`                | Main hero section   | title, description, isActive          |
| `aboutSection`        | Company overview    | title, subtitle, description, images  |
| `aboutItem`           | About bullet points | content, slug, order                  |
| `whoWeServeItem`      | Target audiences    | title, description, slug, order       |
| `why` / `whyItem`     | Value propositions  | subtitle, description, content items  |
| `servicesSection`     | Services overview   | title, isActive                       |
| `serviceItem`         | Individual services | code, title, description, images      |
| `clientsSection`      | Client showcase     | logos array                           |
| `testimonialsSection` | Customer reviews    | title, subtitle, autoplay settings    |
| `testimonial`         | Individual reviews  | name, position, company, quote, image |

#### 2. Page Management

| Content Type    | Purpose                | Key Features              |
| --------------- | ---------------------- | ------------------------- |
| `homeSeo`       | Homepage SEO           | Meta tags, social sharing |
| `aboutPage`     | About page settings    | Page content, SEO         |
| `servicesPage`  | Services configuration | Page structure, metadata  |
| `faqPage`       | FAQ management         | Categories, Q&A pairs     |
| `contactPage`   | Contact information    | Forms, details, locations |
| `resourcesPage` | Blog/resources hub     | Blog settings, categories |

#### 3. Blog System

```typescript
// Blog Post Schema Structure
interface BlogPost {
  title: string;
  slug: { current: string };
  excerpt: string;
  featuredImage: {
    asset: { url: string };
    alt: string;
  };
  author: {
    name: string;
    image?: { asset: { url: string } };
  };
  publishedAt: string;
  content: PortableTextBlock[]; // Rich text content
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  isFeatured: boolean;
  isActive: boolean;
}
```

**Blog Features:**

- Rich text editor with formatting options
- Image galleries and embeds
- Author profiles with photos
- SEO optimization
- Category organization
- Featured post highlighting
- Draft/published status

#### 4. Geographic Content

| Content Type  | Purpose          | Use Case                              |
| ------------- | ---------------- | ------------------------------------- |
| `mapsSection` | Interactive maps | Global service coverage visualization |
| `country`     | Location data    | Service areas, contact information    |

### Rich Text Content (Portable Text)

Sanity's Portable Text system enables rich content creation:

```typescript
// Supported Content Types
{
  blocks: [
    "paragraph",     // Regular text with formatting
    "h1", "h2", "h3", "h4", "h5", "h6", // Headings
    "blockquote",    // Quote blocks
    "code"           // Code snippets
  ],
  marks: [
    "strong",        // Bold text
    "em",           // Italic text
    "underline",    // Underlined text
    "link"          // Internal/external links
  ],
  lists: [
    "bullet",       // Bulleted lists
    "number"        // Numbered lists
  ]
}
```

### Image Management System

#### CDN Integration

- **Automatic Optimization**: Images served via Sanity CDN
- **Responsive Delivery**: Multiple sizes generated automatically
- **Format Optimization**: WebP, AVIF when supported
- **Global Distribution**: Served from closest edge location

#### Image Schema Structure

```typescript
interface SanityImage {
  asset: {
    url: string;
    metadata: {
      dimensions: { width: number; height: number };
      lqip: string; // Low-quality image placeholder
    };
  };
  alt: string; // Accessibility text
  hotspot?: {
    // Smart cropping point
    x: number;
    y: number;
  };
}
```

#### Configuration

```typescript
// next.config.ts - Image optimization setup
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
};
```

---

## Data Fetching & Integration

### GROQ Query Language

Sanity uses GROQ (Graph-Relational Object Queries) for powerful, flexible data fetching:

#### Basic Query Examples

```javascript
// Fetch active hero content
export const HERO_QUERY = groq`*[_type == "hero" && isActive == true][0] {
  _id,
  title,
  description,
  isActive
}`;

// Fetch services with images
export const SERVICE_ITEMS_QUERY = groq`*[_type == "serviceItem" && isActive == true] | order(order asc) {
  _id,
  code,
  title,
  heading1,
  heading2,
  description,
  backgroundImage {
    asset->{
      url,
      metadata {
        dimensions
      }
    }
  },
  order,
  isActive
}`;

// Fetch blog posts with author and image
export const BLOG_POSTS_QUERY = groq`*[_type == "blogPost" && isActive == true] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  featuredImage {
    asset->{
      url,
      metadata {
        dimensions
      }
    },
    alt
  },
  author {
    name,
    image {
      asset->{
        url
      }
    }
  },
  publishedAt,
  isFeatured
}`;
```

#### Advanced Query Features

```javascript
// Query with relationships and filtering
export const FAQ_ITEMS_BY_CATEGORY_QUERY = groq`
  *[_type == "faqItem" && isActive == true && category->slug.current == $categorySlug] 
  | order(order asc) {
    _id,
    question,
    answer,
    category->{
      _id,
      name,
      slug
    },
    slug,
    order,
    isActive
  }`;

// Query with conditional content
export const TESTIMONIALS_SECTION_QUERY = groq`
  *[_type == "testimonialsSection" && isActive == true][0] {
    _id,
    title,
    subtitle,
    autoplayDuration,
    enableAutoplay,
    testimonials[]->{
      _id,
      name,
      position,
      company,
      image {
        asset->{
          url,
          metadata {
            dimensions
          }
        }
      },
      title,
      quote,
      order
    }
  }`;
```

### React Integration Patterns

#### Server-Side Data Fetching (Next.js App Router)

```typescript
// app/page.tsx - Homepage data fetching
const HomePage = async () => {
  // Parallel data fetching for optimal performance
  const [
    heroData,
    aboutData,
    aboutItems,
    whoWeServeItems,
    whyData,
    whyItems,
    servicesSection,
    serviceItems,
    testimonialsData,
  ] = await Promise.all([
    getHero(),
    getAboutSection(),
    getAboutItems(),
    getWhoWeServeItems(),
    getWhy(),
    getWhyItems(),
    getServicesSection(),
    getServiceItems(),
    getTestimonialsSection(),
  ]);

  return (
    <main>
      <Hero heroData={heroData} />
      <AboutOverview aboutData={aboutData} aboutItems={aboutItems} />
      <WhoWeServe items={whoWeServeItems} />
      <Why whyData={whyData} whyItems={whyItems} />
      <OurServices
        servicesSection={servicesSection}
        serviceItems={serviceItems}
      />
      <Testimonials testimonialsData={testimonialsData} />
    </main>
  );
};
```

#### Component Props Pattern

```typescript
// Type-safe component interfaces
interface HeroProps {
  heroData: Hero | null;
}

const Hero: React.FC<HeroProps> = ({ heroData }) => {
  // Graceful fallbacks for missing content
  const title = heroData?.title || "Welcome to Inexor";
  const description = heroData?.description || "Global logistics solutions";

  return (
    <section className="hero-section">
      <h1>{title}</h1>
      <p>{description}</p>
    </section>
  );
};

// Service component with image handling
interface ServiceItemProps {
  service: ServiceItem;
}

const ServiceCard: React.FC<ServiceItemProps> = ({ service }) => {
  return (
    <div className="service-card">
      {service.backgroundImage && (
        <Image
          src={service.backgroundImage.asset.url}
          alt={service.title}
          width={service.backgroundImage.asset.metadata.dimensions.width}
          height={service.backgroundImage.asset.metadata.dimensions.height}
          className="service-image"
        />
      )}
      <h3>{service.title}</h3>
      <p>{service.description}</p>
    </div>
  );
};
```

#### Client-Side Data Fetching (Custom Hooks)

```typescript
// Custom hook for maps data
export const useSanityMapsData = () => {
  const [mapsSection, setMapsSection] = useState<MapsSection | null>(null);
  const [serviceLocations, setServiceLocations] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [maps, countries] = await Promise.all([
          getMapsSection(),
          getCountries(),
        ]);
        setMapsSection(maps);
        setServiceLocations(countries);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { mapsSection, serviceLocations, loading, error };
};
```

### Performance Optimizations

#### Caching Strategy

```typescript
// Next.js cache tags for selective revalidation
export async function getHero(): Promise<Hero | null> {
  return client.fetch(
    HERO_QUERY,
    {},
    {
      next: {
        tags: ["hero"], // Cache tag for revalidation
        revalidate: 3600, // Revalidate every hour
      },
    },
  );
}

// Blog posts with category-specific caching
export async function getBlogPosts(): Promise<BlogPost[]> {
  return client.fetch(
    BLOG_POSTS_QUERY,
    {},
    {
      next: {
        tags: ["blog-posts", "blog"],
        revalidate: 300, // Revalidate every 5 minutes
      },
    },
  );
}
```

#### Client Configuration

```typescript
// sanity/lib/client.ts - Optimized client setup
export const client = createClient({
  projectId: "cmn648mb",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: process.env.NODE_ENV === "production", // CDN for production
  perspective: "published", // Only published content
  stega: {
    enabled: process.env.NODE_ENV === "development", // Live editing in dev
    studioUrl: "/studio",
  },
});
```

---

## Content Management Workflow

### Content Creation Process

#### 1. Accessing Sanity Studio

**Local Development:**

```bash
npm run sanity  # Launches studio at http://localhost:3333
```

**Production Studio:**

- Access via Sanity.io dashboard
- Direct studio URL for your project
- Single sign-on integration available

#### 2. Content Editor Interface

The Sanity Studio provides an organized content management interface:

```
Studio Navigation:
├── 📝 Homepage
│   ├── 🔍 SEO Settings
│   ├── 🎯 Hero Section
│   ├── ℹ️ About Section
│   ├── 👥 Who We Serve
│   ├── ⭐ Why Choose Us
│   ├── 🛠️ Services
│   ├── 🏢 Clients
│   └── 💬 Testimonials
├── 📄 Page Management
│   ├── About Page
│   ├── Services Page
│   ├── FAQ Page
│   ├── Contact Page
│   └── Resources Page
├── 📰 Blog System
│   ├── Blog Posts
│   ├── Categories
│   └── Authors
├── 🌍 Geographic Data
│   ├── Maps Configuration
│   ├── Countries
│   └── Service Locations
└── ⚙️ System Settings
    ├── Navigation
    ├── Footer
    └── Global Settings
```

#### 3. Content Types & Use Cases

**Homepage Management:**

1. **Hero Section**: Update main headline, description, call-to-action
2. **About Section**: Modify company overview, upload new images
3. **Services**: Add/edit service offerings, update descriptions
4. **Testimonials**: Add customer reviews, upload client photos
5. **Client Logos**: Showcase partners and clients

**Blog/Resources Management:**

1. **Create Posts**: Rich text editor with image uploads
2. **Author Profiles**: Staff bios with professional photos
3. **Categories**: Organize content by industry or topic
4. **SEO Optimization**: Meta descriptions and social sharing images

**Service Pages:**

1. **Service Details**: Comprehensive service descriptions
2. **Use Cases**: Real-world application examples
3. **Process Steps**: Step-by-step service workflows
4. **FAQ Integration**: Service-specific questions and answers

### Real-Time Content Updates

#### Instant Publishing

- **Live Updates**: Content changes are immediately visible on the website
- **No Rebuild Required**: Updates bypass traditional deployment cycles
- **Preview Mode**: See changes before publishing
- **Draft System**: Work on content without affecting live site

#### Collaborative Editing

- **Multi-User Support**: Multiple editors can work simultaneously
- **Real-Time Sync**: See other editors' changes in real-time
- **Role-Based Access**: Control who can edit different content types
- **Revision History**: Track all changes with automatic versioning

---

## Technical Implementation

### Environment Setup

#### Dependencies Installation

```bash
# Core Sanity packages
npm install @sanity/client next-sanity @sanity/image-url

# Sanity Studio
npm install sanity @sanity/vision

# Rich text rendering
npm install @portabletext/react @portabletext/types

# TypeScript support
npm install -D @types/node typescript
```

#### Development Scripts

```json
{
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build --turbopack",
    "start": "next start",
    "sanity": "sanity dev",
    "sanity:build": "sanity build",
    "sanity:deploy": "sanity deploy",
    "populate-countries": "tsx scripts/populate-countries.ts",
    "populate-testimonials": "tsx scripts/populate-testimonials.ts",
    "populate-faq": "tsx scripts/populate-faq.ts",
    "populate-blog": "tsx scripts/populate-blog.ts"
  }
}
```

### Environment Variables

```env
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=cmn648mb
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01

# API Token (for write operations)
SANITY_API_TOKEN=your_write_token_here

# Studio Configuration
SANITY_STUDIO_PROJECT_ID=cmn648mb
SANITY_STUDIO_DATASET=production

# Next.js Configuration
NEXT_PUBLIC_BASE_URL=https://your-domain.com
```

### Data Population Scripts

The project includes automated content population scripts for quick setup:

#### Blog Content Population

```typescript
// scripts/populate-blog.ts
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "cmn648mb",
  dataset: "production",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2024-01-01",
});

const sampleBlogPosts = [
  {
    _type: "blogPost",
    title: "Air Charter for Humanitarian Aid",
    slug: { current: "air-charter-humanitarian-aid" },
    excerpt: "Emergency logistics solutions for crisis response",
    author: { name: "Alex Carter" },
    publishedAt: "2025-01-15T10:00:00Z",
    content: [
      /* Rich text blocks */
    ],
    isFeatured: true,
    isActive: true,
  },
  // Additional posts...
];

async function populateBlogPosts() {
  for (const post of sampleBlogPosts) {
    await client.create(post);
    console.log(`Created blog post: ${post.title}`);
  }
}

populateBlogPosts().catch(console.error);
```

#### Geographic Data Population

```typescript
// scripts/populate-countries.ts
const countries = [
  {
    _type: "country",
    name: "United States",
    code: "US",
    serviceType: ["IOR", "EOR", "VAT"],
    isActive: true,
    coordinates: {
      lat: 39.8283,
      lng: -98.5795,
    },
  },
  // Additional countries...
];
```

### TypeScript Integration

#### Type Definitions

```typescript
// src/lib/sanity/types.ts
export interface Hero {
  _id: string;
  title: string;
  description: string;
  isActive: boolean;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt: string;
  featuredImage?: {
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
  };
  author: {
    name: string;
    image?: {
      asset: { url: string };
    };
  };
  publishedAt: string;
  content: PortableTextBlock[];
  isFeatured: boolean;
  isActive: boolean;
}

export interface ServiceItem {
  _id: string;
  code: string;
  title: string;
  heading1: string;
  heading2: string;
  description: string;
  backgroundImage: {
    asset: {
      url: string;
      metadata: {
        dimensions: {
          width: number;
          height: number;
        };
      };
    };
  };
  order: number;
  isActive: boolean;
}
```

#### GROQ Query Type Generation

```typescript
// Use Sanity's TypeScript generator
import { InferGetStaticPropsType } from "next";
import { SanityDocument } from "@sanity/client";

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

export async function getStaticProps() {
  const posts = await client.fetch<BlogPost[]>(BLOG_POSTS_QUERY);

  return {
    props: { posts },
    revalidate: 300, // ISR revalidation
  };
}
```

---

## Benefits & ROI

### For Content Editors

#### User Experience Benefits

- **Intuitive Interface**: No technical knowledge required
- **Visual Content Editing**: WYSIWYG experience with instant preview
- **Real-Time Collaboration**: Multiple editors can work simultaneously
- **Mobile-Friendly Studio**: Edit content from any device
- **Rich Media Support**: Easy image and video management

#### Productivity Improvements

- **Instant Publishing**: No waiting for deployments
- **Content Templates**: Consistent formatting and structure
- **Bulk Operations**: Update multiple items at once
- **Search & Filter**: Quickly find and organize content
- **Keyboard Shortcuts**: Power-user features for efficiency

#### Content Quality Features

- **Built-in SEO Tools**: Optimize content for search engines
- **Image Optimization**: Automatic resizing and format conversion
- **Link Management**: Internal/external link validation
- **Content Validation**: Required fields and formatting rules
- **Revision History**: Track changes and revert when needed

### For Developers

#### Development Experience

- **Type Safety**: Full TypeScript integration prevents runtime errors
- **Hot Reloading**: See content changes instantly during development
- **Version Control**: All schema changes tracked in Git
- **API-First**: Clean separation between content and presentation
- **Flexible Queries**: GROQ allows complex data relationships

#### Performance Benefits

- **Global CDN**: Images served from closest edge location
- **Optimized Queries**: Fetch only needed data with GROQ
- **Caching Strategy**: Multiple layers of caching for optimal speed
- **Incremental Static Regeneration**: Balance performance with fresh content
- **Bundle Size**: Minimal client-side JavaScript

#### Scalability Features

- **Serverless Architecture**: Scales automatically with traffic
- **Content Versioning**: Handle multiple environments and rollbacks
- **API Rate Limits**: Generous limits for high-traffic sites
- **Webhook Support**: Trigger builds and integrations on content changes
- **Multi-Environment**: Separate datasets for dev/staging/production

---

## Maintenance & Best Practices

### Content Guidelines

#### Writing Best Practices

- **Clear Headlines**: Use descriptive, SEO-friendly titles
- **Engaging Introductions**: Hook readers in the first paragraph
- **Scannable Content**: Use headings, bullet points, and short paragraphs
- **Call-to-Actions**: Include clear next steps for readers
- **Consistent Voice**: Maintain brand tone across all content

#### Image Guidelines

- **High Quality**: Use professional, high-resolution images
- **Proper Sizing**: Optimize images before upload (recommended: 1920x1080 max)
- **Alt Text**: Always include descriptive alt text for accessibility
- **File Naming**: Use descriptive filenames (e.g., "logistics-warehouse-operations.jpg")
- **Brand Consistency**: Maintain consistent visual style and colors

#### SEO Best Practices

- **Title Tags**: Keep under 60 characters, include primary keywords
- **Meta Descriptions**: Write compelling descriptions under 160 characters
- **URL Structure**: Use clean, descriptive URLs with keywords
- **Internal Linking**: Link to related content within your site
- **Schema Markup**: Leverage structured data for rich snippets

### Technical Maintenance

#### Regular Updates

```bash
# Update Sanity packages quarterly
npm update @sanity/client next-sanity sanity @sanity/vision

# Check for breaking changes in release notes
npm audit

# Test all functionality after updates
npm run build && npm run start
```

#### Performance Monitoring

- **Core Web Vitals**: Monitor LCP, FID, and CLS scores
- **Image Optimization**: Regular audit of image sizes and formats
- **Query Performance**: Monitor GROQ query execution times
- **CDN Analytics**: Track global content delivery performance
- **Error Tracking**: Set up monitoring for client and server errors

#### Content Audit Schedule

| Frequency       | Task                                  | Responsible      |
| --------------- | ------------------------------------- | ---------------- |
| **Weekly**      | Review published content for accuracy | Content Team     |
| **Monthly**     | SEO performance analysis              | Marketing Team   |
| **Quarterly**   | Image optimization audit              | Technical Team   |
| **Bi-annually** | Content structure review              | Content Strategy |
| **Annually**    | Security and compliance review        | Technical Team   |

#### Backup & Recovery

**Automated Backups:**

- Sanity automatically backs up all content
- Point-in-time recovery available
- Geographic redundancy included
- 99.99% data durability guarantee

**Content Export:**

```bash
# Export all content for backup
sanity dataset export production backup-$(date +%Y%m%d).tar.gz

# Import content if needed
sanity dataset import backup-20250115.tar.gz production --replace
```

### Security Best Practices

#### Access Control

- **Role-Based Permissions**: Limit editing access by content type
- **Strong Passwords**: Enforce password requirements
- **Two-Factor Authentication**: Enable 2FA for all users
- **Regular Access Review**: Audit user permissions quarterly
- **API Token Management**: Rotate tokens regularly, limit scope

#### Content Security

- **Input Validation**: Sanity validates all content automatically
- **XSS Prevention**: Built-in protection against script injection
- **Image Security**: Automatic malware scanning on uploads
- **HTTPS Enforcement**: All content delivered over encrypted connections
- **Content Moderation**: Review processes for user-generated content

### Troubleshooting Guide

#### Common Issues

**1. Images Not Loading**

```typescript
// Check image URL format
const imageUrl = urlFor(image).width(800).height(600).url();

// Verify Next.js image configuration
// next.config.ts should include cdn.sanity.io domain
```

**2. Content Not Updating**

```typescript
// Clear cache tags
import { revalidateTag } from "next/cache";
revalidateTag("hero");

// Check client configuration
// Ensure useCdn is false for real-time updates
```

**3. GROQ Query Errors**

```javascript
// Test queries in Sanity Vision tool
// Validate field names and document structure
// Check for typos in field references
```

#### Performance Optimization

**Query Optimization:**

```javascript
// Only fetch needed fields
const OPTIMIZED_QUERY = groq`*[_type == "blogPost"][0..10] {
  title,
  slug,
  excerpt,
  "imageUrl": featuredImage.asset->url
}`;

// Use projections to reduce data transfer
const MINIMAL_QUERY = groq`*[_type == "service"] {
  title,
  "slug": slug.current
}`;
```

**Caching Strategy:**

```typescript
// Implement appropriate cache durations
export async function getBlogPosts() {
  return client.fetch(
    BLOG_QUERY,
    {},
    {
      next: {
        revalidate: 300, // 5 minutes for frequently updated content
        tags: ["blog"],
      },
    },
  );
}

export async function getStaticContent() {
  return client.fetch(
    STATIC_QUERY,
    {},
    {
      next: {
        revalidate: 3600, // 1 hour for static content
        tags: ["static"],
      },
    },
  );
}
```

---

## Appendices

### Appendix A: Complete Schema List

| Schema Name           | Type     | Purpose                    | Fields Count |
| --------------------- | -------- | -------------------------- | ------------ |
| `hero`                | Document | Homepage hero section      | 4            |
| `aboutSection`        | Document | About company overview     | 7            |
| `aboutItem`           | Document | About bullet points        | 4            |
| `whoWeServeItem`      | Document | Target audience items      | 5            |
| `why`                 | Document | Why choose us section      | 4            |
| `whyItem`             | Document | Why choose us points       | 4            |
| `servicesSection`     | Document | Services overview          | 3            |
| `serviceItem`         | Document | Individual services        | 9            |
| `service`             | Document | Detailed service pages     | 15+          |
| `clientsSection`      | Document | Client logos section       | 2            |
| `clientLogo`          | Object   | Individual client logos    | 2            |
| `testimonialsSection` | Document | Testimonials configuration | 6            |
| `testimonial`         | Document | Customer reviews           | 8            |
| `blogPost`            | Document | Blog articles              | 12+          |
| `faqPage`             | Document | FAQ page settings          | 5            |
| `faqCategory`         | Document | FAQ categories             | 6            |
| `faqItem`             | Document | FAQ questions/answers      | 7            |
| `contactPage`         | Document | Contact information        | 8+           |
| `mapsSection`         | Document | Interactive maps config    | 5+           |
| `country`             | Document | Geographic locations       | 8+           |
| `processSection`      | Document | Process workflows          | 4            |
| `processStep`         | Document | Individual process steps   | 6            |
| `contentSection`      | Document | Generic content blocks     | 6            |
| `seo`                 | Object   | SEO metadata               | 8+           |
| `homeSeo`             | Document | Homepage SEO               | 10+          |

### Appendix B: GROQ Query Reference

#### Basic Syntax

```javascript
// All documents of a type
*[_type == "blogPost"]

// Filter with conditions
*[_type == "blogPost" && isActive == true]

// Sort results
*[_type == "blogPost"] | order(publishedAt desc)

// Limit results
*[_type == "blogPost"][0..9] // First 10 items

// Select specific fields
*[_type == "blogPost"] {
  title,
  slug,
  publishedAt
}
```

#### Advanced Queries

```javascript
// Join with references
*[_type == "blogPost"] {
  title,
  category->{
    name,
    slug
  }
}

// Conditional content
*[_type == "blogPost"] {
  title,
  "hasImage": defined(featuredImage),
  "imageUrl": featuredImage.asset->url
}

// Filtering with parameters
*[_type == "blogPost" && category->slug.current == $categorySlug]

// Complex filtering
*[_type == "service" &&
  isActive == true &&
  serviceType in ["IOR", "EOR"] &&
  publishedAt > "2024-01-01"
]
```

### Appendix C: Environment Configuration

#### Development Environment

```env
# .env.local
NEXT_PUBLIC_SANITY_PROJECT_ID=cmn648mb
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=your_development_token
NODE_ENV=development
```

#### Production Environment

```env
# .env.production
NEXT_PUBLIC_SANITY_PROJECT_ID=cmn648mb
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=your_production_token
NODE_ENV=production
NEXT_PUBLIC_BASE_URL=https://inexor.com
```

#### Staging Environment

```env
# .env.staging
NEXT_PUBLIC_SANITY_PROJECT_ID=cmn648mb
NEXT_PUBLIC_SANITY_DATASET=staging
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=your_staging_token
NODE_ENV=production
NEXT_PUBLIC_BASE_URL=https://staging.inexor.com
```

### Appendix D: Deployment Guide

#### Vercel Deployment (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel --prod

# Set environment variables
vercel env add NEXT_PUBLIC_SANITY_PROJECT_ID
vercel env add SANITY_API_TOKEN
```

#### Docker Deployment

```dockerfile
# Dockerfile
FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Build application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

# Copy built application
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT 3000

CMD ["node", "server.js"]
```

### Appendix E: Migration Guide

#### From WordPress to Sanity

```typescript
// WordPress to Sanity migration script
import { createClient } from "@sanity/client";
import { WP_REST_API } from "wp-rest-api";

const sanityClient = createClient({
  projectId: "cmn648mb",
  dataset: "production",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function migrateWordPressPosts() {
  const wpPosts = await WP_REST_API.get("/posts");

  for (const wpPost of wpPosts) {
    const sanityPost = {
      _type: "blogPost",
      title: wpPost.title.rendered,
      slug: { current: wpPost.slug },
      content: convertHtmlToPortableText(wpPost.content.rendered),
      publishedAt: wpPost.date,
      author: {
        name: wpPost.author_name,
      },
    };

    await sanityClient.create(sanityPost);
  }
}
```

#### From Contentful to Sanity

```typescript
// Contentful to Sanity migration
import { createClient as createContentfulClient } from "contentful";
import { createClient as createSanityClient } from "@sanity/client";

const contentfulClient = createContentfulClient({
  space: "your_space_id",
  accessToken: "your_access_token",
});

const sanityClient = createSanityClient({
  projectId: "cmn648mb",
  dataset: "production",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

async function migrateContentfulEntries() {
  const entries = await contentfulClient.getEntries({
    content_type: "blogPost",
  });

  for (const entry of entries.items) {
    const sanityEntry = {
      _type: "blogPost",
      title: entry.fields.title,
      content: convertRichTextToPortableText(entry.fields.content),
      // Map other fields...
    };

    await sanityClient.create(sanityEntry);
  }
}
```

---

**Document End**

_This documentation provides a comprehensive guide to the Sanity CMS integration for the Inexor website. For technical support or additional questions, please contact the development team._

**Contact Information:**

- **Technical Lead**: [Your Name]
- **Email**: [your.email@company.com]
- **Project Repository**: [GitHub/GitLab URL]
- **Sanity Project**: https://cmn648mb.sanity.studio/

**Last Updated**: January 2025  
**Version**: 1.0  
**Next Review Date**: April 2025
