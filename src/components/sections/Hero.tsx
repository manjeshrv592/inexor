import React from "react";
import Section from "../layout/Section";
import LazyImage from "../ui/LazyImage";
import Container from "../layout/Container";
import { Button } from "../ui/button";
import ContactUsButton from "../ui/ContactUsButton";
import { Hero as HeroType } from "../../lib/sanity";

interface HeroProps {
  heroData: HeroType | null;
}

const Hero: React.FC<HeroProps> = ({ heroData }) => {
  // Fallback data for title and description when no Sanity data exists
  const title = heroData?.title || "Title";
  const description = heroData?.description || "description";
  const scheduleCallButtonText = heroData?.scheduleCallButtonText || "Schedule a Call";
  const contactButtonText = heroData?.contactButtonText || "Contact Us";
  const backgroundImage = heroData?.backgroundImage || null;
  const backgroundImageUrl = backgroundImage?.asset?.url || "/hero-bg.jpg";

  return (
    <Section className="xxl:p-0 relative h-screen p-0 sm:p-0 md:p-0 lg:p-0 xl:p-0">
      <span className="fixed top-16 right-2 z-[40] xl:top-4 xl:right-4 xl:z-[200]">
        <ContactUsButton className="font-michroma text-[10px] tracking-[1px]">
          {contactButtonText}
        </ContactUsButton>
      </span>
      <div className="absolute inset-0">
        <LazyImage
          src={backgroundImage || backgroundImageUrl}
          alt="Hero background image"
          fill
          className="object-cover"
          priority={true}
          quality={85}
        />
        {/* Vignette overlay with edge blur */}
        {/* <div
          className="absolute inset-0 opacity-80"
          style={{
            background:
              "radial-gradient(ellipse 0% 0%, rgba(0,0,0,0) 0%, rgba(0,0,0,.9) 100%)",
            backdropFilter: "blur(0px)",
            WebkitBackdropFilter: "blur(0px)",
            maskImage:
              "radial-gradient(ellipse 0% 0%, transparent 0%, black 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 0% 0%, transparent 0%, black 100%)",
          }}
        ></div> */}
        {/* Edge blur overlay */}
        {/* <div
          className="absolute inset-0"
          style={{
            backdropFilter: "blur(40px)",
            WebkitBackdropFilter: "blur(40px)",
            maskImage:
              "radial-gradient(ellipse 70% 50%, transparent 0%, transparent 50%, rgba(0,0,0,0.5) 75%, black 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 50%, transparent 0%, transparent 50%, rgba(0,0,0,0.5) 75%, black 100%)",
          }}
        ></div> */}
      </div>
      <Container className="h-full">
        <div className="relative z-10 flex size-full flex-col items-center justify-end pb-[12vh] text-center xl:pb-[8vh]">
          <div className="mb-[28vh] backdrop-blur-sm md:bg-black/10 md:p-4">
            <h1 className="font-michroma xxl:text-4xl xxxl:text-5xl mb-4 text-[22px] lg:text-3xl">
              {title}
            </h1>
            <p className="xxl:text-base xxl:max-w-2xl xxxl:text-lg xxxl:max-w-3xl mx-auto max-w-xl text-[12px] lg:text-sm">
              {description}
            </p>
          </div>
          <div className="">
            <a
              href="https://calendar.app.google/it8hbPUuhXvCG4YE8"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="font-michroma text-xs tracking-[1px]">
                {scheduleCallButtonText}
              </Button>
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default Hero;
