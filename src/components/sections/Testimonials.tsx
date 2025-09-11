import React from "react";
import Section from "../layout/Section";
import Container from "../layout/Container";
import SectionTitle from "../ui/SectionTitle";
import TestimonialCarousel from "./testimonial-carousel/TestimonialCarousel";
import { TestimonialsSection } from "@/lib/sanity";

interface TestimonialsProps {
  testimonialsData: TestimonialsSection | null;
}

const Testimonials: React.FC<TestimonialsProps> = ({ testimonialsData }) => {
  // Fallback values if no Sanity data
  const title = testimonialsData?.title || "WHAT OUR CLIENTS SAY";
  const subtitle = testimonialsData?.subtitle || "Hear From Those Who Trust Us";
  const testimonials = testimonialsData?.testimonials || [];
  const autoplayDuration = testimonialsData?.autoplayDuration || 5;
  const enableAutoplay = testimonialsData?.enableAutoplay ?? true;

  // If no testimonials data, don't render the section
  if (!testimonialsData || testimonials.length === 0) {
    return null;
  }

  return (
    <Section className="xxl:pl-20 lg:pl-20">
      <Container>
        <div className="text-center">
          <SectionTitle>{title}</SectionTitle>
        </div>
        <h3 className="mb-4 text-center text-lg">{subtitle}</h3>
        <TestimonialCarousel
          testimonials={testimonials}
          autoplayDuration={autoplayDuration}
          enableAutoplay={enableAutoplay}
        />
      </Container>
    </Section>
  );
};

export default Testimonials;
