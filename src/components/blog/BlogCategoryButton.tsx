import React from "react";
import { DynamicShape } from "../ui/DynamicShape";

interface BlogCategoryButtonProps {
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}

const BlogCategoryButton: React.FC<BlogCategoryButtonProps> = ({
  children,
  isActive = false,
  onClick,
}) => {
  return (
    <div className="flex-shrink-0 cursor-pointer" onClick={onClick}>
      <DynamicShape
        fill={isActive ? "#ff6b35" : "#404040"}
        stroke="none"
        strokeWidth={0}
        padding="p-0"
      >
        <div className="font-michroma px-4 py-2 text-[10px] tracking-[1px] text-white">
          {children}
        </div>
      </DynamicShape>
    </div>
  );
};

export default BlogCategoryButton;
