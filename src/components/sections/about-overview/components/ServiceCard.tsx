import React from "react";

interface ServiceCardProps {
  children: React.ReactNode;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ children }) => {
  return (
    <article className="flex items-center justify-center border-x border-y border-x-white/10 border-y-white/60 bg-white/10 p-2 text-center xl:p-4">
      {children}
    </article>
  );
};

export default ServiceCard;
