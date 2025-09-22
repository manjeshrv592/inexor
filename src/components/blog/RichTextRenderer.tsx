import React from "react";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { PortableTextBlock } from "@portabletext/types";
import Image from "next/image";
import { urlForBlogImage } from "../../../sanity/lib/image";
import { BlogImage } from "@/lib/sanity/blog";

interface RichTextRendererProps {
  content: PortableTextBlock[];
}

const RichTextRenderer: React.FC<RichTextRendererProps> = ({ content }) => {
  const components: PortableTextComponents = {
    types: {
      image: ({
        value,
      }: {
        value: BlogImage;
      }) => {
        // Use Sanity image builder to respect crop/hotspot data
        const imageUrl = urlForBlogImage(value, 800, 600).url();
        const dimensions = value.asset.metadata?.dimensions || { width: 800, height: 600 };
        
        // Apply grayscale conditionally - default to true if not specified to match site style
        const shouldApplyGrayscale = value.isGrayscale !== false;
        const grayscaleClass = shouldApplyGrayscale ? "grayscale" : "";
        
        // Apply the unique clip-path shape (same as buttons/cards)
        const clipPathStyle = {
          clipPath: "polygon(0% 0%, calc(100% - 12px) 0%, 100% 12px, 100% 100%, 12px 100%, 0% calc(100% - 12px))"
        };
        
        return (
          <div className="my-6">
            <Image
              src={imageUrl}
              alt={value.alt || "Blog image"}
              width={dimensions.width}
              height={dimensions.height}
              className={`h-auto w-full ${grayscaleClass}`}
              style={clipPathStyle}
            />
            {value.caption && (
              <p className="mt-2 text-center text-sm text-gray-400 italic">
                {value.caption}
              </p>
            )}
          </div>
        );
      },
    },
    block: {
      normal: ({ children }) => <p className="mb-4">{children}</p>,
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
        <ul className="mb-4 list-inside list-disc space-y-2">{children}</ul>
      ),
      number: ({ children }) => (
        <ol className="mb-4 list-inside list-decimal space-y-2">{children}</ol>
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
