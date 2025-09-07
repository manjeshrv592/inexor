import React from "react";
import { PortableText, PortableTextComponents } from "next-sanity";

interface PortableTextRendererProps {
  content: any[];
  className?: string;
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-2 text-sm text-white">{children}</p>
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
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-2 list-disc pl-6 text-sm text-white">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="my-2 list-decimal pl-6 text-sm text-white">{children}</ol>
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
