import React from "react";
import Section from "../layout/Section";
import Image from "next/image";
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
  const backgroundImageUrl =
    heroData?.backgroundImage?.asset?.url || "/hero-bg.jpg";

  return (
    <Section className="relative h-screen">
      <span className="fixed top-16 right-2 z-[40] xl:top-4 xl:right-4 xl:z-[200]">
        <ContactUsButton className="font-michroma text-[10px] tracking-[1px]" />
      </span>
      <div className="absolute inset-0">
        <Image
          src={backgroundImageUrl}
          alt="Hero background image"
          fill
          className="object-cover"
        />
        {/* Vignette overlay with edge blur */}
        <div
          className="absolute inset-0 opacity-40"
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
        ></div>
        {/* Edge blur overlay */}
        <div
          className="absolute inset-0"
          style={{
            backdropFilter: "blur(40px)",
            WebkitBackdropFilter: "blur(40px)",
            maskImage:
              "radial-gradient(ellipse 70% 50%, transparent 0%, transparent 50%, rgba(0,0,0,0.5) 75%, black 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 50%, transparent 0%, transparent 50%, rgba(0,0,0,0.5) 75%, black 100%)",
          }}
        ></div>
      </div>
      <Container className="h-full">
        <div className="relative z-10 flex h-full flex-col items-center justify-center pt-40 text-center">
          <h1 className="font-michroma xxl:text-4xl xl:text-3xl">{title}</h1>
          <p className="xxl:text-base xxl:max-w-2xl mt-3 mb-40 max-w-xl text-sm">
            {description}
          </p>
          <a
            href="https://calendar.app.google/it8hbPUuhXvCG4YE8"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="font-michroma tracking-[1px]" size={"sm"}>
              Schedule a Call
            </Button>
          </a>
        </div>
      </Container>
    </Section>
  );
};

export default Hero;
