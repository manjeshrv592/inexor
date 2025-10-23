import React from "react";
import { getResourcesPage } from "@/lib/sanity";
import { Button } from "@/components/ui/button";
import LazyImage from "@/components/ui/LazyImage";
import PagePanelBg from "@/components/ui/PagePanelBg";
import PagePanel from "@/components/ui/PagePanel";

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
              <LazyImage
                src={
                  resourcesPageData?.leftPanelBackgroundImage ||
                  "/img/left-image.jpg"
                }
                alt={
                  resourcesPageData?.leftPanelBackgroundImage?.alt || "blog bg"
                }
                fill
                className="object-cover grayscale"
                priority={true}
                mimeType={
                  resourcesPageData?.leftPanelBackgroundImage?.asset?.mimeType
                }
                lqip={
                  resourcesPageData?.leftPanelBackgroundImage?.asset?.metadata
                    ?.lqip
                }
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
