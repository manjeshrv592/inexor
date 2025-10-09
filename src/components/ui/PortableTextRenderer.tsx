import React from "react";
import { PortableText, PortableTextComponents } from "next-sanity";
import { PortableTextBlock } from "@portabletext/types";
import LazyImage from "@/components/ui/LazyImage";
import ProcessSteps from "@/components/ui/ProcessSteps";

interface PortableTextRendererProps {
  content: PortableTextBlock[];
  className?: string;
}

// Define interfaces for custom blocks
interface ProcessStep {
  stepNumber: number;
  title: string;
  description: string;
}

interface ProcessStepsBlock {
  _type: "processStepsBlock";
  title: string;
  description?: string;
  steps: ProcessStep[];
  ctaButtonText?: string;
}

interface AboutImage {
  asset: {
    _ref: string;
    metadata?: {
      dimensions: {
        width: number;
        height: number;
      };
    };
  };
  alt?: string;
  caption?: string;
  isGrayscale?: boolean;
}

interface ImageTextBlock {
  _type: "imageTextBlock";
  image: AboutImage;
  text: PortableTextBlock[];
  layout: "imageLeft" | "textLeft";
  verticalAlignment: "top" | "center" | "bottom";
}

const components: PortableTextComponents = {
  types: {
    image: ({ value }: { value: AboutImage }) => {
      // Check if image exists and has asset
      if (!value || !value.asset || !value.asset._ref) {
        console.warn('Image block found but no image asset available');
        return null;
      }

      const shouldApplyGrayscale = value.isGrayscale !== false;
      const grayscaleClass = shouldApplyGrayscale ? "grayscale" : "";

      // Apply the unique clip-path shape (same as buttons/cards)
      const clipPathStyle = {
        clipPath:
          "polygon(0% 0%, calc(100% - 12px) 0%, 100% 12px, 100% 100%, 12px 100%, 0% calc(100% - 12px))",
      };

      return (
        <div className="mx-auto my-6 max-w-[800px]">
          <div className="relative w-full" style={{ aspectRatio: '16/6', ...clipPathStyle }}>
            <LazyImage
              src={value}
              alt={value.alt || "About image"}
              fill
              className={`object-cover ${grayscaleClass}`}
              sizes="(max-width: 768px) 100vw, 800px"
              quality={85}
            />
          </div>
          {value.caption && (
            <p className="mt-2 text-center text-sm text-gray-400 italic">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
    imageTextBlock: ({ value }: { value: ImageTextBlock }) => {
      // Check if image exists and has asset
      if (!value?.image || !value.image.asset || !value.image.asset._ref) {
        console.warn('ImageTextBlock found but no image asset available');
        return (
          <div className="my-8">
            <PortableText value={value.text} components={components} />
          </div>
        );
      }

      // Using LazyImage with Sanity image object directly
      const shouldApplyGrayscale = value.image.isGrayscale !== false;
      const grayscaleClass = shouldApplyGrayscale ? "grayscale" : "";

      // Apply the unique clip-path shape
      const clipPathStyle = {
        clipPath:
          "polygon(0% 0%, calc(100% - 12px) 0%, 100% 12px, 100% 100%, 12px 100%, 0% calc(100% - 12px))",
      };

      const alignmentClasses = {
        top: "items-start",
        center: "items-center",
        bottom: "items-end",
      };

      const ImageComponent = (
        <div className="relative mx-auto max-w-[600px]">
          <LazyImage
            src={value.image}
            alt={value.image.alt || "About image"}
            width={600}
            height={400}
            className={`h-auto w-full ${grayscaleClass}`}
            style={clipPathStyle}
            quality={85}
          />
          {value.image.caption && (
            <p className="mt-2 text-center text-sm text-gray-400 italic">
              {value.image.caption}
            </p>
          )}
        </div>
      );

      const TextComponent = (
        <div className="max-w-none">
          <PortableText value={value.text} components={components} />
        </div>
      );

      return (
        <div
          className={`my-8 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:gap-8 ${alignmentClasses[value.verticalAlignment]}`}
        >
          {value.layout === "imageLeft" ? (
            <>
              {ImageComponent}
              {TextComponent}
            </>
          ) : (
            <>
              {TextComponent}
              {ImageComponent}
            </>
          )}
        </div>
      );
    },
    processStepsBlock: ({ value }: { value: ProcessStepsBlock }) => {
      return (
        <ProcessSteps
          title={value.title}
          description={value.description}
          steps={value.steps}
          ctaButtonText={value.ctaButtonText}
          className="my-8"
        />
      );
    },
  },
  block: {
    normal: ({ children }) => (
      <p className="mb-2 text-[12px] text-justify text-white lg:text-[14px]">{children}</p>
    ),
    h1: ({ children }) => (
      <h1 className="mb-4 text-2xl font-bold text-white">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="mb-4 text-xl font-bold text-white">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-4 text-lg font-semibold text-white">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="mb-3 text-base font-semibold text-white">{children}</h4>
    ),
    h5: ({ children }) => (
      <h5 className="mb-2 text-sm font-semibold text-white">{children}</h5>
    ),
    h6: ({ children }) => (
      <h6 className="mb-2 text-sm font-semibold text-white">{children}</h6>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-brand-orange-500 my-6 border-l-4 pl-4 text-gray-300 italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-2 list-disc pl-6 text-[12px] text-justify text-white lg:text-[14px]">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="my-2 list-decimal pl-6 text-[12px] text-justify text-white lg:text-[14px]">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="mb-1">{children}</li>,
    number: ({ children }) => <li className="mb-1">{children}</li>,
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="rounded bg-gray-800 px-2 py-1 font-mono text-sm">
        {children}
      </code>
    ),
    link: ({ value, children }) => (
      <a
        href={value.href}
        target={value.blank ? "_blank" : "_self"}
        rel={value.blank ? "noopener noreferrer" : undefined}
        className="text-brand-orange-500 hover:underline"
      >
        {children}
      </a>
    ),
    brandOrange: ({ children }) => (
      <span className="text-brand-orange-500">{children}</span>
    ),
  },
};

const PortableTextRenderer: React.FC<PortableTextRendererProps> = ({
  content,
  className = "",
}) => {
  if (!content || content.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <PortableText value={content} components={components} />
    </div>
  );
};

export default PortableTextRenderer;
