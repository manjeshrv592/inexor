"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getBlogPosts } from "@/lib/sanity/blog";

const ResourcesPage = () => {
  const router = useRouter();

  useEffect(() => {
    const redirectToFirstBlog = async () => {
      try {
        const posts = await getBlogPosts();
        if (posts.length > 0) {
          // Redirect to the first blog post
          router.replace(`/resources/${posts[0].slug.current}`);
        } else {
          // If no posts, stay on this page and show message
          console.log("No blog posts available");
        }
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      }
    };

    redirectToFirstBlog();
  }, [router]);

  return (
    <div className="flex h-full items-center justify-center">
      <div className="text-center text-white">
        <p>Loading resources...</p>
      </div>
    </div>
  );
};

export default ResourcesPage;
