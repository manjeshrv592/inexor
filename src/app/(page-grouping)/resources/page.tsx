import { redirect } from "next/navigation";
import { getBlogPostsForNavigation } from "@/lib/sanity/blog";

const ResourcesPage = async () => {
  const blogPosts = await getBlogPostsForNavigation();

  if (blogPosts.length > 0) {
    // Redirect to the first blog post
    redirect(`/resources/${blogPosts[0].slug.current}`);
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
