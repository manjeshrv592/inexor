import React from "react";
import { DynamicShape } from "../ui/DynamicShape";
import Image from "next/image";
import { BlogPost } from "@/lib/sanity/blog";

interface BlogPostCardProps {
  post: BlogPost;
  onClick?: () => void;
  isActive?: boolean;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({
  post,
  onClick,
  isActive = false,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <DynamicShape
      fill={isActive ? "#ff6b35" : "#404040"}
      stroke="none"
      strokeWidth={0}
      padding="p-0"
    >
      <div
        className="flex cursor-pointer font-medium text-white transition-opacity hover:opacity-90"
        onClick={onClick}
      >
        {post.featuredImage && (
          <Image
            src={post.featuredImage.asset.url}
            alt={post.featuredImage.alt || post.title}
            width={200}
            height={200}
            className="h-[64px] w-[80px] object-cover grayscale"
            style={{
              clipPath:
                "polygon(0% 0%, calc(100% - 12px) 0%, 100% 12px, 100% 100%, 12px 100%, 0% calc(100% - 12px))",
            }}
          />
        )}
        <div className="flex flex-col p-2">
          <div className="font-michroma pr-2 text-right text-[7px] tracking-[1px]">
            {formatDate(post.publishedAt)}
          </div>
          <h3 className="font-michroma text-brand-orange-500 mt-auto line-clamp-2 text-[10px]">
            {post.title}
          </h3>
        </div>
      </div>
    </DynamicShape>
  );
};

export default BlogPostCard;
