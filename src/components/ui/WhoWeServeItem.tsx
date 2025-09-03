import React from "react";

interface WhoWeServeItemProps {
  title: string;
  description: string;
}

const WhoWeServeItem: React.FC<WhoWeServeItemProps> = ({
  title,
  description,
}) => {
  return (
    <div>
      <h5 className="text-brand-orange-500 mb-2 font-semibold">{title}</h5>
      <p className="text-sm">{description}</p>
    </div>
  );
};

export default WhoWeServeItem;
