# Blog System Setup for Resources Page

This document explains the complete blog system implementation for the Resources page using Sanity CMS.

## Overview

The Resources page has been completely refactored to be CMS-driven using Sanity. It now supports:

- **Blog Categories** - Organize blog posts by topics
- **Rich Text Blog Posts** - Full content management with images, formatting, and links
- **Author Management** - Author information with optional images
- **SEO Optimization** - Meta tags and descriptions for each post
- **Featured Posts** - Highlight important posts
- **Navigation** - Previous/next post navigation
- **Responsive Design** - Works on desktop and mobile

## File Structure

```
├── sanity/
│   ├── schemas/
│   │   ├── blogCategory.ts          # Blog category schema
│   │   ├── blogPost.ts              # Blog post schema (with rich text)
│   │   └── resourcesPage.ts         # Updated resources page settings
│   ├── lib/
│   │   └── blogQueries.ts           # GROQ queries for blog data
│   └── structure.ts                 # Updated to include blog management
├── src/
│   ├── lib/sanity/
│   │   └── blog.ts                  # Blog data fetching functions
│   ├── components/blog/
│   │   ├── BlogCategoryButton.tsx   # Category selection button
│   │   ├── BlogPostCard.tsx         # Blog post card component
│   │   ├── RichTextRenderer.tsx     # Portable text renderer
│   │   └── index.ts                 # Blog components exports
│   └── app/(modal)/resources/
│       └── page.tsx                 # Refactored resources page
├── scripts/
│   └── populate-blog.ts             # Sample data population script
└── docs/
    └── BLOG_SYSTEM_SETUP.md         # This documentation
```

## Schema Details

### BlogCategory Schema

- **Name**: Category name (e.g., "Air Charter", "Logistics")
- **Slug**: URL-friendly identifier
- **Description**: Optional category description
- **Order**: Display order
- **Active Status**: Enable/disable categories

### BlogPost Schema

- **Title & Slug**: Post identification
- **Excerpt**: Short description for listings
- **Featured Image**: Optional hero image with alt text
- **Author**: Name and optional image
- **Published Date**: Publication timestamp
- **Category**: Reference to blog category
- **Rich Text Content**: Full blog content with:
  - Headers (H2-H5)
  - Paragraphs
  - Lists (bullet/numbered)
  - Links (internal/external)
  - Images with captions
  - Brand orange text styling
  - Blockquotes
- **Tags**: Searchable keywords
- **Reading Time**: Estimated minutes to read
- **Featured Status**: Highlight important posts
- **Active Status**: Publish/unpublish posts

## Sanity Studio Organization

In your Sanity Studio, blog management is organized under **Resources**:

```
📚 Resources
├── 🔍 SEO Settings
├── 📂 Blog Categories
└── 📝 Blog Posts
```

### Managing Categories

1. Go to **Resources → Blog Categories**
2. Click **Create** to add a new category
3. Fill in name, description, and set order
4. Toggle **Is Active** to show/hide

### Managing Blog Posts

1. Go to **Resources → Blog Posts**
2. Click **Create** to add a new post
3. Fill in all required fields:
   - Title (auto-generates slug)
   - Author information
   - Category selection
   - Rich text content
4. Add optional fields:
   - Featured image
   - Excerpt
   - Tags
   - Reading time
5. Toggle **Is Published** to make live
6. Toggle **Is Featured** for homepage display

## Rich Text Features

The blog posts support rich text editing with:

- **Headings**: H2, H3, H4, H5 styles
- **Text Formatting**: Bold, italic, code
- **Lists**: Bullet points and numbered lists
- **Links**: External links with optional new tab
- **Images**: Inline images with captions
- **Brand Styling**: Orange text highlighting
- **Blockquotes**: For emphasis

## Initial Setup

### 1. Environment Variables

Ensure you have these in your `.env.local`:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_write_token  # For the populate script
```

### 2. Populate Sample Data

Run the blog population script:

```bash
npx tsx scripts/populate-blog.ts
```

This creates:

- 3 sample blog categories
- 3 sample blog posts
- Resources page settings

### 3. Customize Content

1. Go to your Sanity Studio
2. Navigate to **Resources**
3. Add featured images to blog posts
4. Customize content, authors, and categories
5. Create additional posts as needed

## Features

### Frontend Features

- **Category Filtering**: Filter posts by category
- **Post Navigation**: Previous/next post links
- **Responsive Design**: Mobile and desktop layouts
- **Loading States**: Smooth transitions between content
- **Rich Content**: Full typography and media support

### CMS Features

- **Visual Editor**: Rich text editing with preview
- **Media Management**: Image uploads with optimization
- **SEO Tools**: Meta tags and descriptions
- **Content Scheduling**: Publish dates and status
- **Organization**: Categories and tags for content structure

## Usage Examples

### Adding a New Blog Post

1. **Create Category** (if needed):
   - Go to Resources → Blog Categories
   - Add category like "Technology Updates"

2. **Create Blog Post**:
   - Go to Resources → Blog Posts
   - Fill in title: "New AI in Logistics"
   - Select category: "Technology Updates"
   - Add author information
   - Write content using rich text editor
   - Add featured image
   - Set as published

3. **The post will automatically**:
   - Appear in the category filter
   - Show in the blog list
   - Be searchable by tags
   - Include navigation to other posts

### Customizing Appearance

The blog system uses your existing design system:

- Brand orange (`#ff6b35`) for highlights
- Michroma font for headings
- Consistent spacing and shadows
- Dynamic shapes for interactive elements

## Technical Notes

### Data Fetching

- All blog data is fetched server-side when possible
- Client-side updates for category switching
- Optimized queries with proper caching tags

### Performance

- Images are optimized through Next.js
- Lazy loading for blog content
- Efficient re-renders with React keys

### SEO

- Each blog post has individual meta tags
- Structured data for search engines
- Semantic HTML structure
- Alt text for all images

## Troubleshooting

### Common Issues

1. **No blog posts showing**:
   - Check if posts are marked as "Is Published"
   - Verify category assignments
   - Run the populate script for sample data

2. **Rich text not rendering**:
   - Ensure `@portabletext/react` is installed
   - Check RichTextRenderer component

3. **Images not loading**:
   - Verify Sanity project ID and dataset
   - Check image upload in Sanity Studio
   - Ensure proper alt text

### Support

For additional help:

1. Check Sanity Studio for content issues
2. Review browser console for errors
3. Verify environment variables
4. Test with sample data from populate script
