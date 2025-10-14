import { redirect } from "next/navigation";
import { getFirstBlogPostSlug } from "@/lib/sanity/blog";

// Force static generation for this page
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

const ResourcesPage = async () => {
  const firstBlogPost = await getFirstBlogPostSlug();

  if (firstBlogPost) {
    // Redirect to the first blog post
    redirect(`/resources/${firstBlogPost.slug.current}`);
  }

  // If no blog posts are available, show a message
  return (
    <div className="flex h-full items-center justify-center">
      <div className="text-center text-neutral-400">
        <h2 className="font-michroma text-xl mb-4">No Blog Posts Available</h2>
        <p className="text-sm">Please check back later for new content.</p>
      </div>
    </div>
  );
};

export default ResourcesPage;
