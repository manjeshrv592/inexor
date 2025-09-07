import React from "react";
import Section from "../layout/Section";
import Image from "next/image";
import Container from "../layout/Container";
import { Button } from "../ui/button";
import ContactUsButton from "../ui/ContactUsButton";
import { Hero as HeroType } from "../../lib/sanity";
import Link from "next/link";

interface HeroProps {
  heroData: HeroType | null;
}

const Hero: React.FC<HeroProps> = ({ heroData }) => {
  // Fallback data for title and description when no Sanity data exists
  const title = heroData?.title || "Title";
  const description = heroData?.description || "description";

  return (
    <Section className="relative h-screen">
      <span className="fixed top-16 right-2 z-[40] xl:top-4 xl:right-4 xl:z-[200]">
        <ContactUsButton className="font-michroma text-[10px] tracking-[1px]" />
      </span>
      <div className="absolute inset-0">
        <Image
          src="/hero-bg.jpg"
          alt="Placeholder image"
          fill
          className="object-cover"
        />
      </div>
      <Container className="h-full">
        <div className="relative z-10 flex h-full flex-col items-center justify-center gap-4 text-center">
          <h1 className="font-michroma xxl:text-4xl xl:text-3xl">{title}</h1>
          <p className="xxl:text-base xxl:max-w-2xl max-w-xl text-sm">
            {description}
          </p>
          <Link href="/contact">
            <Button className="font-michroma text-xs tracking-[1px]">
              Schedule a Call
            </Button>
          </Link>
        </div>
      </Container>
    </Section>
  );
};

export default Hero;
