import React from "react";
import { getResourcesPage } from "@/lib/sanity";
import { Button } from "@/components/ui/button";
import PagePanelBg from "@/components/ui/PagePanelBg";
import PagePanel from "@/components/ui/PagePanel";
import { urlForFeaturedImage } from "@/../sanity/lib/image";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const resourcesPageData = await getResourcesPage();
  return (
    <>
      <PagePanelBg />
      <PagePanel>
        <div
          className="h-full bg-[#222] xl:grid xl:h-full xl:grid-cols-[150px_250px_1fr]"
          style={{
            boxShadow:
              "10px 2px 60px 0px #0000001A inset, 10px 2px 60px 0px #00000080 inset",
          }}
        >
          {/* Left Panel */}
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={
                  resourcesPageData?.leftPanelBackgroundImage
                    ? urlForFeaturedImage(resourcesPageData.leftPanelBackgroundImage, 150, 600).url()
                    : "/img/left-image.jpg"
                }
                alt={
                  resourcesPageData?.leftPanelBackgroundImage?.alt || "blog bg"
                }
                className="h-full w-full object-cover grayscale"
              />
              {/* <div className="absolute inset-0 bg-black/80">&nbsp;</div> */}
            </div>
          </div>
          {children}
        </div>
      </PagePanel>
    </>
  );
};

export default layout;
