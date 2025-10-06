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
    <div className="text-center">
      <h5 className="text-brand-orange-500 mb-2 text-sm font-semibold xl:min-h-[40px]">
        {title}
      </h5>
      <p className="text-xs lg:text-sm">{description}</p>
    </div>
  );
};

export default WhoWeServeItem;
