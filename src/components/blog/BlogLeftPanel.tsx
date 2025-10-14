import React from "react";
import { Button } from "@/components/ui/button";
import LazyImage from "@/components/ui/LazyImage";
import { type ResourcesPage } from "@/lib/sanity";

interface BlogLeftPanelProps {
  resourcesPageData: ResourcesPage | null;
}

const BlogLeftPanel: React.FC<BlogLeftPanelProps> = ({ resourcesPageData }) => {
  return (
    <div className="relative xl:h-full">
      <div className="relative z-10 flex size-full flex-col items-center justify-center gap-5 px-5 py-7">
        {/* Mobile button */}
        <Button
          size={"sm"}
          className="font-michroma w-20 text-[10px] tracking-[1px] xl:hidden xl:w-full"
          variant={"default"}
        >
          Blogs
        </Button>
        {/* Desktop button */}
        <Button
          className="font-michroma hidden w-20 text-[10px] tracking-[1px] lg:w-full xl:block"
          variant={"default"}
        >
          Blogs
        </Button>
      </div>
      <div className="absolute top-0 left-0 size-full">
        <LazyImage
          src={
            resourcesPageData?.leftPanelBackgroundImage ||
            "/img/left-image.jpg"
          }
          alt={resourcesPageData?.leftPanelBackgroundImage?.alt || "blog bg"}
          fill
          className="object-cover grayscale"
          priority={true}
          mimeType={resourcesPageData?.leftPanelBackgroundImage?.asset?.mimeType}
          lqip={resourcesPageData?.leftPanelBackgroundImage?.asset?.metadata?.lqip}
        />
      </div>
    </div>
  );
};

export default BlogLeftPanel;