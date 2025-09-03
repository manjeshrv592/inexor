import React from "react";

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  children,
  className = "",
}) => {
  return (
    <h2
      className={`font-michroma xxl:text-2xl mb-8 inline-block bg-gradient-to-r from-white to-neutral-400 bg-clip-text tracking-[1px] text-transparent xl:text-xl ${className}`}
    >
      {children}
    </h2>
  );
};

export default SectionTitle;
