import AutoScrollContainer from "@/components/ui/AutoScrollContainer";
import ProcessSteps from "@/components/ui/ProcessSteps";
import ContentSection from "@/components/ui/ContentSection";
import Image from "next/image";
import React from "react";
import { getAboutPageData } from "@/lib/sanity/aboutPage";

const AboutPage = async () => {
  const { aboutPage, processSection, processSteps, contentSections } =
    await getAboutPageData();
  return (
    <div className="size-full grid-cols-[2fr_3fr_2fr] bg-[#2f2f2f] shadow-[inset_0_1px_0_rgba(255,255,255,0.06),inset_0_-8px_12px_-8px_rgba(0,0,0,0.6),inset_0_8px_12px_-8px_rgba(0,0,0,0.7)] xl:grid">
      <div className="relative h-44 xl:h-full">
        <div className="absolute size-full bg-black">
          <Image
            src="/img/about-us.jpg"
            alt="faq bg"
            fill
            className="object-cover opacity-40 grayscale"
          />
        </div>
      </div>
      <div className="xxl:h-[calc(100vh-128px)] col-span-2 h-[calc(100vh-118.14px)] xl:h-[calc(100vh-112px)]">
        <AutoScrollContainer>
          <div className="p-5 xl:p-12">
            {/* Page Header */}
            <h3 className="font-michroma mb-2 text-center text-xl text-orange-500">
              {aboutPage?.pageTitle || "About Inexor"}
            </h3>
            {aboutPage?.pageSubtitle && (
              <p className="mb-4 text-center text-lg text-white">
                {aboutPage.pageSubtitle}
              </p>
            )}

            {/* Content Sections */}
            {contentSections.map((section, index) => (
              <ContentSection
                key={index}
                sectionTitle={section.sectionTitle}
                titleStyle={section.titleStyle}
                content={section.content || []}
              />
            ))}

            {/* Process Section */}
            {processSteps.length > 0 && (
              <ProcessSteps
                title={
                  processSection?.title ||
                  "We follow a clear process to help you out."
                }
                description={
                  processSection?.description ||
                  "With a specialized focus on global trade compliance, we combine deep industry knowledge with a client-first approach to deliver seamless."
                }
                buttonText={processSection?.buttonText || "Contact Us"}
                steps={processSteps}
              />
            )}

            {/* Fallback content if no Sanity data */}
            {!aboutPage &&
              contentSections.length === 0 &&
              processSteps.length === 0 && (
                <div>
                  <p className="text-brand-orange-500 mb-4">Who We Are</p>
                  <p className="mb-2 text-sm text-white">
                    At Inexor, we are more than just a logistics provider—we are
                    your trusted partner in navigating the complexities of
                    international IT hardware shipping. With a specialized focus
                    on global trade compliance, we combine deep industry
                    knowledge with a client-first approach to deliver seamless,
                    secure, and scalable shipping solutions for businesses
                    around the world.
                  </p>
                  <p className="text-sm text-white">
                    Our team is made up of seasoned professionals with decades
                    of experience in both IT and international logistics. We
                    understand the high-value, high-risk nature of IT
                    infrastructure components—and we know that getting them
                    where they need to go, on time and in full compliance, is
                    critical to your success.
                  </p>

                  <ProcessSteps
                    title="We follow a clear process to help you out."
                    description="With a specialized focus on global trade compliance, we combine deep industry knowledge with a client-first approach to deliver seamless."
                    buttonText="Contact Us"
                    steps={[
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
                    ]}
                  />

                  <p className="text-brand-orange-500 mt-4 mb-4">What We Do</p>
                  <p className="text-sm text-white">
                    Inexor offers a full spectrum of services tailored
                    specifically for the global movement of IT hardware.
                  </p>
                </div>
              )}
          </div>
        </AutoScrollContainer>
      </div>
    </div>
  );
};

export default AboutPage;
