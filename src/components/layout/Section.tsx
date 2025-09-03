import React from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(
          "xxl:py-24 py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20",
          className,
        )}
        {...props}
      >
        {children}
      </section>
    );
  },
) as React.ForwardRefExoticComponent<
  SectionProps & React.RefAttributes<HTMLElement>
>;

Section.displayName = "Section";

export default Section;
