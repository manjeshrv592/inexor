import PortableTextRenderer from "@/components/ui/PortableTextRenderer";
import LazyImage from "@/components/ui/LazyImage";
import React, { Suspense } from "react";
import { getStaticAboutPageData } from "@/lib/static-generation";
import { AboutPageSkeleton } from "@/components/ui/LoadingSkeleton";
import { Metadata } from "next";
import { getAboutPageSeo } from "@/lib/sanity";

export async function generateMetadata(): Promise<Metadata> {
  const seoData = await getAboutPageSeo();

  if (!seoData?.seo) {
    return {
      title: "About Us",
      description: "Learn more about our company and mission",
    };
  }

  const { seo } = seoData;

  return {
    title: seo.metaTitle || "About Us",
    description:
      seo.metaDescription || "Learn more about our company and mission",
    keywords: seo.metaKeywords || seo.keywords,
    robots: {
      index: !seo.noIndex,
      follow: !seo.noFollow,
    },
    openGraph: {
      title: seo.metaTitle || "About Us",
      description:
        seo.metaDescription ||
        "Learn more about our company and mission",
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/about`,
      siteName: "Inexor",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.metaTitle || "About Us",
      description:
        seo.metaDescription ||
        "Learn more about our company and mission",
    },
  };
}

const AboutPageContent = async () => {
  const { aboutPage } = await getStaticAboutPageData();
  return (
    <div className="size-full grid-cols-[2fr_3fr_2fr] bg-[#222] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),inset_0_-8px_12px_-8px_rgba(0,0,0,0.6),inset_0_8px_12px_-8px_rgba(0,0,0,0.7)] xl:grid">
      <div className="relative h-[100px] xl:h-full">
        <div className="absolute inset-0 size-full overflow-hidden">
          <LazyImage
            src={aboutPage?.sidebarImage || "/img/about-us.jpg"}
            alt={aboutPage?.sidebarImage?.alt || "About Us"}
            width={600}
            height={1000}
            className={`size-full scale-[102%] object-cover ${
              aboutPage?.sidebarImage?.isGrayscale !== false ? "grayscale" : ""
            }`}
            priority={true}
            mimeType={aboutPage?.sidebarImage?.asset?.mimeType}
            lqip={aboutPage?.sidebarImage?.asset?.metadata?.lqip}
          />
          {/* <div className="absolute inset-0 z-10 bg-black/80"></div> */}
        </div>
      </div>
      <div className="col-span-2 h-[calc(100dvh-174px)] overflow-y-auto xl:h-full">
        <div className="p-5 lg:px-12">
          {/* Page Header */}
          <h3 className="font-michroma mb-2 text-center text-xl text-orange-500">
            {aboutPage?.pageTitle || "About Inexor"}
          </h3>
          {aboutPage?.pageSubtitle && (
            <p className="mb-4 text-center text-lg text-white">
              {aboutPage.pageSubtitle}
            </p>
          )}

          {/* Rich Content */}
          {aboutPage?.content && (
            <PortableTextRenderer content={aboutPage.content} />
          )}

          {/* Fallback content if no Sanity data */}
          {!aboutPage && (
            <div>
              <p className="text-brand-orange-500 mb-4">Who We Are</p>
              <p className="mb-2 text-sm text-white">
                At Inexor, we are more than just a logistics provider—we are
                your trusted partner in navigating the complexities of
                international IT hardware shipping. With a specialized focus on
                global trade compliance, we combine deep industry knowledge with
                a client-first approach to deliver seamless, secure, and
                scalable shipping solutions for businesses around the world.
              </p>
              <p className="text-sm text-white">
                Our team is made up of seasoned professionals with decades of
                experience in both IT and international logistics. We understand
                the high-value, high-risk nature of IT infrastructure
                components—and we know that getting them where they need to go,
                on time and in full compliance, is critical to your success.
              </p>

              <div className="mb-6">
                <h3 className="text-brand-orange-500 mb-2 text-lg font-semibold">
                  We follow a clear process to help you out.
                </h3>
                <p className="mb-4 text-sm text-white">
                  With a specialized focus on global trade compliance, we
                  combine deep industry knowledge with a client-first approach
                  to deliver seamless.
                </p>
                <div className="space-y-4">
                  {[
                    {
                      stepNumber: 1,
                      title: "Get a Quote",
                      description:
                        "Through True Rich Attended does no end it his mother since real had half every.",
                    },
                    {
                      stepNumber: 2,
                      title: "Book an Appointment",
                      description:
                        "Through True Rich Attended does no end it his mother since real had half every.",
                    },
                    {
                      stepNumber: 3,
                      title: "Get your Service Done",
                      description:
                        "Through True Rich Attended does no end it his mother since real had half every.",
                    },
                  ].map((step) => (
                    <div
                      key={step.stepNumber}
                      className="border-l-2 border-orange-500 pl-4"
                    >
                      <h4 className="font-semibold text-white">
                        {step.stepNumber}. {step.title}
                      </h4>
                      <p className="text-sm text-gray-300">
                        {step.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <p className="text-brand-orange-500 mt-4 mb-4">What We Do</p>
              <p className="text-sm text-white">
                Inexor offers a full spectrum of services tailored specifically
                for the global movement of IT hardware.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const AboutPage = () => {
  return (
    <Suspense fallback={<AboutPageSkeleton />}>
      <AboutPageContent />
    </Suspense>
  );
};

export default AboutPage;
