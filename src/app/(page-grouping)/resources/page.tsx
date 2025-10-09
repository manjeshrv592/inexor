import { redirect } from "next/navigation";
import { getFirstBlogPostSlug } from "@/lib/sanity/blog";

const ResourcesPage = async () => {
  // Use lightweight query to get only the first blog post slug
  const firstBlogPost = await getFirstBlogPostSlug();

  // Redirect to the first blog post if available
  if (firstBlogPost) {
    redirect(`/resources/${firstBlogPost.slug.current}`);
  }

  // If no blog posts exist, show a message or fallback content
  return (
    <div
      className="h-full bg-[#2f2f2f] xl:grid xl:grid-cols-[150px_250px_1fr]"
      style={{
        boxShadow:
          "10px 2px 60px 0px #0000001A inset, 10px 2px 60px 0px #00000080 inset",
      }}
    >
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <h2 className="font-michroma mb-4 text-xl text-white">
            No Blog Posts Available
          </h2>
          <p className="text-gray-400">Check back later for new blog posts.</p>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage;
