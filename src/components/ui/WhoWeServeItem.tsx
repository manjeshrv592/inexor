import React from "react";

interface WhoWeServeItemProps {
  title: string;
  description?: string;
}

const WhoWeServeItem: React.FC<WhoWeServeItemProps> = ({
  title,
  description,
}) => {
  return (
    <div className="text-center">
      <h5 className="text-brand-orange-500 mb-2 text-base font-semibold lg:text-lg">
        {title}
      </h5>
      {description ? (
        <p className="text-xs lg:text-sm">{description}</p>
      ) : null}
    </div>
  );
};

export default WhoWeServeItem;
