import React from "react";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { PortableTextBlock } from "@portabletext/types";
import { BlogImage } from "@/lib/sanity/blog";
import { urlForFeaturedImage } from "@/../sanity/lib/image";

// Define the ImageTextBlock interface
interface ImageTextBlock {
  _type: "imageTextBlock";
  image: BlogImage;
  text: PortableTextBlock[];
  layout: "imageLeft" | "textLeft";
  verticalAlignment: "top" | "center" | "bottom";
}

interface RichTextRendererProps {
  content: PortableTextBlock[];
}

const RichTextRenderer: React.FC<RichTextRendererProps> = ({ content }) => {
  const components: PortableTextComponents = {
    types: {
      image: ({ value }: { value: BlogImage }) => {
        // Safety check: Skip rendering if image asset is missing
        if (!value?.asset) {
          console.warn("Image block: Missing image asset, skipping render");
          return null;
        }

        // Use optimized Sanity image URL with urlForFeaturedImage
        const imageUrl = urlForFeaturedImage(value, 800, 300)?.url();

        // Apply grayscale conditionally - default to true if not specified to match site style
        const shouldApplyGrayscale = value.isGrayscale !== false;
        const grayscaleClass = shouldApplyGrayscale ? "grayscale" : "";

        // Apply the unique clip-path shape (same as buttons/cards)
        const clipPathStyle = {
          clipPath:
            "polygon(0% 0%, calc(100% - 12px) 0%, 100% 12px, 100% 100%, 12px 100%, 0% calc(100% - 12px))",
        };

        return (
          <div className="mx-auto my-6 max-w-[800px]">
            <div className="relative w-full" style={{ aspectRatio: "16/6" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl || "/img/left-image.jpg"}
                alt={value.alt || "Blog image"}
                className={`h-full w-full object-cover ${grayscaleClass}`}
                style={clipPathStyle}
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
        // Safety check: Skip rendering if image asset is missing
        if (!value.image?.asset) {
          console.warn("ImageTextBlock: Missing image asset, skipping render");
          return null;
        }

        const imageUrl = value.image.asset?.url;

        // Apply grayscale conditionally - default to true if not specified
        const shouldApplyGrayscale = value.image.isGrayscale !== false;
        const grayscaleClass = shouldApplyGrayscale ? "grayscale" : "";

        // Apply the unique clip-path shape
        const clipPathStyle = {
          clipPath:
            "polygon(0% 0%, calc(100% - 12px) 0%, 100% 12px, 100% 100%, 12px 100%, 0% calc(100% - 12px))",
        };

        // Determine alignment classes
        const alignmentClasses = {
          top: "items-start",
          center: "items-center",
          bottom: "items-end",
        };

        const ImageComponent = (
          <div className="relative mx-auto max-w-[600px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageUrl}
              alt={value.image.alt || "Blog image"}
              className={`h-auto w-full ${grayscaleClass}`}
              style={clipPathStyle}
            />
            {value.image.caption && (
              <p className="mt-2 text-center text-sm text-gray-400 italic">
                {value.image.caption}
              </p>
            )}
          </div>
        );

        const TextComponent = (
          <div className="prose prose-invert max-w-none">
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
    },
    block: {
      normal: ({ children }) => (
        <p className="mb-4 text-justify text-[12px] lg:text-[14px]">
          {children}
        </p>
      ),
      h2: ({ children }) => (
        <h2 className="mt-8 mb-4 text-2xl font-bold text-white">{children}</h2>
      ),
      h3: ({ children }) => (
        <h3 className="mt-6 mb-4 text-xl font-bold text-white">{children}</h3>
      ),
      h4: ({ children }) => (
        <h4 className="mt-4 mb-4 text-lg font-bold text-white">{children}</h4>
      ),
      h5: ({ children }) => (
        <h5 className="mt-4 mb-4 text-base font-bold text-white">{children}</h5>
      ),
      blockquote: ({ children }) => (
        <blockquote className="border-brand-orange-500 my-6 border-l-4 pl-4 text-gray-300 italic">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="mb-4 list-inside list-disc space-y-2 text-justify text-[12px] lg:text-[14px]">
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className="mb-4 list-inside list-decimal space-y-2 text-justify text-[12px] lg:text-[14px]">
          {children}
        </ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => <li className="mb-1">{children}</li>,
      number: ({ children }) => <li className="mb-1">{children}</li>,
    },
    marks: {
      strong: ({ children }) => (
        <strong className="font-bold">{children}</strong>
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

  return (
    <div className="prose prose-invert max-w-none">
      <PortableText value={content} components={components} />
    </div>
  );
};

export default RichTextRenderer;
