import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DynamicShape } from "@/components/ui/DynamicShape";
import Image from "next/image";
import { getBlogPostBySlug, getBlogPosts, type BlogPost } from "@/lib/sanity/blog";
import { getResourcesPage } from "@/lib/sanity";
import { RichTextRenderer } from "@/components/blog";
import AutoScrollContainer from "@/components/ui/AutoScrollContainer";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
  const currentIndex = allBlogPosts.findIndex(post => post.slug.current === slug);
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
          <div className="absolute inset-0 bg-black/80">&nbsp;</div>
        </div>
      </div>

      {/* Middle Panel - Blog List */}
      <div className="p-5 lg:hidden lg:h-full lg:flex-col lg:p-1 lg:pt-12">
        <h3 className="font-michroma mb-5 hidden text-center text-xs tracking-[1px] lg:block">
          {resourcesPageData?.blogSectionTitle || "LATEST BLOGS"}
        </h3>

        {/* Mobile list */}
        <div
          className="flex flex-nowrap gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {allBlogPosts.map((post: BlogPost, index: number) => (
            <div key={post._id} className="flex-shrink-0">
              <DynamicShape
                fill={index === currentIndex ? "#2a2a2a" : "#404040"}
                stroke="none"
                strokeWidth={0}
                className="flex flex-col items-center justify-center p-2"
              >
                <Link
                  href={`/resources/${post.slug.current}`}
                  className={`font-michroma block px-4 py-2 text-[10px] tracking-[1px] hover:text-brand-orange-500 ${
                    index === currentIndex ? "text-brand-orange-500" : ""
                  }`}
                >
                  {post.title}
                </Link>
              </DynamicShape>
            </div>
          ))}
        </div>
      </div>

      {/* Middle Panel - Blog List - Desktop */}
      <div className="xxl:h-[calc(100vh-128px)] hidden lg:flex lg:h-[calc(100vh-112px)] lg:flex-1 lg:flex-col lg:justify-center lg:p-1">
        <h3 className="font-michroma mb-5 hidden text-center text-xs tracking-[1px] lg:block">
          {resourcesPageData?.blogSectionTitle || "LATEST BLOGS"}
        </h3>
        <DynamicShape
          fill="transparent"
          stroke="#1a1a1a"
          strokeWidth={1}
          padding="p-2 pr-1 py-4"
          className=""
        >
          <div className="pr-1">
            <div className="space-y-2">
              {allBlogPosts.map((post: BlogPost, index: number) => (
                <DynamicShape
                  key={post._id}
                  fill={index === currentIndex ? "#2a2a2a" : "#404040"}
                  stroke="none"
                  strokeWidth={0}
                  padding="p-0"
                >
                  <Link
                    href={`/resources/${post.slug.current}`}
                    className={`flex cursor-pointer font-medium text-white transition-opacity hover:opacity-90 ${
                      index === currentIndex ? "opacity-100" : "opacity-70"
                    }`}
                  >
                    <Image
                      src={
                        post.featuredImage?.asset.url || "/img/left-image.jpg"
                      }
                      alt={post.featuredImage?.alt || post.title}
                      width={200}
                      height={200}
                      className="xxl:h-[64px] xxl:w-[80px] h-[48px] w-[64px] object-cover grayscale"
                      style={{
                        clipPath:
                          "polygon(0% 0%, calc(100% - 12px) 0%, 100% 12px, 100% 100%, 12px 100%, 0% calc(100% - 12px))",
                      }}
                    />
                    <div className="flex w-full flex-col p-2">
                      <div className="font-michroma xxl:text-[7px] w-full pr-2 text-right text-[5px] tracking-[1px]">
                        {new Date(post.publishedAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </div>
                      <div className="font-michroma xxl:text-[10px] line-clamp-2 text-left text-[8px] leading-tight tracking-[1px]">
                        {post.title}
                      </div>
                    </div>
                  </Link>
                </DynamicShape>
              ))}
            </div>
          </div>
        </DynamicShape>
      </div>

      {/* Right Panel - Blog Content */}
      <div className="xxl:h-[calc(100vh-128px)] h-[calc(100vh-80px)] bg-neutral-900 py-4 pr-0 pb-64 pl-2 lg:h-[calc(100vh-112px)] lg:pb-0">
        <AutoScrollContainer>
          <div className="pr-2">
            <div className="text-sm text-neutral-100">
              {/* Title */}
              <h3 className="font-michroma mb-4 text-center text-xl text-white">
                {blogPost.title}
              </h3>

              {/* Featured Image */}
              <div className="relative h-[200px] mb-6">
                <div className="absolute top-0 left-0 size-full bg-black">
                  <Image
                    src={
                      blogPost.featuredImage?.asset.url ||
                      "/img/left-image.jpg"
                    }
                    alt={
                      blogPost.featuredImage?.alt ||
                      blogPost.title
                    }
                    fill
                    className="object-cover grayscale"
                  />
                </div>
              </div>

              {/* Author and Date */}
              <div className="mb-12 flex items-center justify-between border-b-2 border-neutral-200 px-6 py-4">
                <div className="flex items-center gap-2 lg:gap-4">
                  {blogPost.author && (
                    <>
                      <span className="inline-block size-10 overflow-hidden rounded-full bg-neutral-700">
                        {blogPost.author.image ? (
                          <Image
                            src={blogPost.author.image.asset.url || "/img/left-image.jpg"}
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
                    {new Date(
                      blogPost.publishedAt,
                    ).toLocaleDateString("en-US", {
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
              <div className="px-12">
                {blogPost.content && (
                  <RichTextRenderer content={blogPost.content} />
                )}
              </div>

              {/* Navigation Footer */}
              <footer className="mt-8 flex flex-col justify-between gap-4 border-t-2 border-neutral-300 pt-6 pb-4 md:flex-row">
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
        </AutoScrollContainer>
      </div>
    </div>
  );
};

export default BlogPostPage;
