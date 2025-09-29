import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/sanity/blog";
import { getResourcesPage } from "@/lib/sanity";
import PortableTextRenderer from "@/components/ui/PortableTextRenderer";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BlogListClient } from "@/components/blog";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const BlogPostPage = async ({ params }: BlogPostPageProps) => {
  const { slug } = await params;
  const [blogPost, allBlogPosts, resourcesPageData] = await Promise.all([
    getBlogPostBySlug(slug),
    getBlogPosts(),
    getResourcesPage(),
  ]);

  if (!blogPost) {
    notFound();
  }

  // Find current index for navigation
  const currentIndex = allBlogPosts.findIndex(
    (post) => post.slug.current === slug,
  );
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < allBlogPosts.length - 1;
  const prevPost = hasPrev ? allBlogPosts[currentIndex - 1] : null;
  const nextPost = hasNext ? allBlogPosts[currentIndex + 1] : null;

  return (
    <div
      className="h-full bg-[#2f2f2f] lg:grid lg:h-full lg:grid-cols-[150px_250px_1fr]"
      style={{
        boxShadow:
          "10px 2px 60px 0px #0000001A inset, 10px 2px 60px 0px #00000080 inset",
      }}
    >
      {/* Left Panel */}
      <div className="relative h-[55px] lg:h-full">
        <div className="relative z-10 flex size-full flex-col items-center justify-center gap-5 px-2">
          <Button
            className="font-michroma text-[10px] tracking-[1px] lg:w-full"
            variant={"default"}
          >
            Blogs
          </Button>
        </div>
        <div className="absolute top-0 left-0 size-full">
          <Image
            src={
              resourcesPageData?.leftPanelBackgroundImage?.asset?.url ||
              "/img/left-image.jpg"
            }
            alt={resourcesPageData?.leftPanelBackgroundImage?.alt || "blog bg"}
            fill
            className="object-cover grayscale"
          />
          {/* <div className="absolute inset-0 bg-black/80">&nbsp;</div> */}
        </div>
      </div>

      <BlogListClient
        allBlogPosts={allBlogPosts}
        currentSlug={slug}
        blogSectionTitle={resourcesPageData?.blogSectionTitle || "LATEST BLOGS"}
      />

      {/* Right Panel - Blog Content */}
      <div className="h-[calc(100vh-290px)] overflow-y-auto bg-neutral-900 lg:h-full">
        <div className="text-sm text-neutral-100">
          {/* Title */}
          <h3 className="font-michroma my-4 text-center text-xl text-white">
            {blogPost.title}
          </h3>

          {/* Featured Image */}
          <div className="relative h-[200px]">
            <div className="absolute top-0 left-0 size-full bg-black">
              <Image
                src={blogPost.featuredImage?.asset.url || "/img/left-image.jpg"}
                alt={blogPost.featuredImage?.alt || blogPost.title}
                fill
                className="object-cover grayscale"
              />
            </div>
          </div>

          {/* Author and Date */}
          <div className="mb-4 flex items-center justify-between border-b-2 border-neutral-200 px-2 py-4">
            <div className="flex items-center gap-2 lg:gap-4">
              {blogPost.author && (
                <>
                  <span className="inline-block size-10 overflow-hidden rounded-full bg-neutral-700">
                    {blogPost.author.image ? (
                      <Image
                        src={
                          blogPost.author.image.asset.url ||
                          "/img/left-image.jpg"
                        }
                        alt={blogPost.author.name}
                        width={40}
                        height={40}
                        className="size-full object-cover"
                      />
                    ) : (
                      <div className="flex size-full items-center justify-center text-sm text-white">
                        {blogPost.author.name.charAt(0)}
                      </div>
                    )}
                  </span>
                  <span className="font-michroma text-xs">
                    {blogPost.author.name.toUpperCase()}
                  </span>
                </>
              )}
            </div>
            <div className="text-brand-orange-500 flex flex-col items-end gap-2 text-[10px] lg:flex-row lg:items-center lg:gap-4">
              <span className="font-michroma">
                {new Date(blogPost.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              {blogPost.readingTime && (
                <span className="font-michroma">
                  {blogPost.readingTime} min read
                </span>
              )}
            </div>
          </div>

          {/* Blog Content */}
          <div className="px-2">
            {blogPost.content && (
              <PortableTextRenderer content={blogPost.content} />
            )}
          </div>

          {/* Navigation Footer */}
          <footer className="mt-8 flex flex-col justify-between gap-4 border-t-2 border-neutral-300 px-2 pt-6 pb-4 md:flex-row">
            <div>
              {hasPrev && prevPost ? (
                <>
                  <Link href={`/resources/${prevPost.slug.current}`}>
                    <Button
                      className="font-michroma text-[10px] tracking-[1px]"
                      variant={"outline"}
                      size={"sm"}
                    >
                      <span className="flex gap-2">
                        <ArrowLeft size={16} /> Prev Blog
                      </span>
                    </Button>
                  </Link>
                  <p className="mt-2 text-xs">{prevPost.title}</p>
                </>
              ) : (
                <div></div>
              )}
            </div>
            <div className="md:flex md:flex-col md:items-end">
              {hasNext && nextPost ? (
                <>
                  <Link href={`/resources/${nextPost.slug.current}`}>
                    <Button
                      className="font-michroma text-[10px] tracking-[1px]"
                      variant={"outline"}
                      size={"sm"}
                    >
                      <span className="flex gap-2">
                        Next Blog <ArrowRight size={16} />
                      </span>
                    </Button>
                  </Link>
                  <p className="mt-2 text-xs">{nextPost.title}</p>
                </>
              ) : (
                <div></div>
              )}
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;
