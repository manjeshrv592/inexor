import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getFirstBlogPostSlug } from "@/lib/sanity/blog";

export const metadata: Metadata = {
  title: "Resources",
  description: "Explore our resources and insights",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Resources",
    description: "Explore our resources and insights",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/resources`,
    siteName: "Inexor",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Resources",
    description: "Explore our resources and insights",
  },
};

export default async function ResourcesPage() {
  const firstBlogPost = await getFirstBlogPostSlug();
  const firstBlogSlug = firstBlogPost?.slug?.current;

  if (firstBlogSlug) {
    redirect(`/resources/blogs/${firstBlogSlug}`);
  }

  return (
    <div className="flex-1 p-8">
      <h1 className="text-3xl font-bold mb-6">Resources</h1>
      <p className="text-lg text-gray-600">
        Welcome to our resources section. Here you&apos;ll find valuable insights, articles, and tools to help you succeed.
      </p>
    </div>
  );
}
