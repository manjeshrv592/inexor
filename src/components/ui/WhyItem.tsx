import React from "react";

interface WhyItemProps {
  content: string;
}

const WhyItem: React.FC<WhyItemProps> = ({ content }) => {
  return (
    <article
      className="flex items-center justify-center border-x border-x-white/50 p-3"
      style={{
        background:
          "linear-gradient(to right, rgba(0,0,0,0.05) 0%, transparent 10%, transparent 90%, rgba(255,255,255,0.05) 100%)",
      }}
    >
      {content}
    </article>
  );
};

export default WhyItem;
