"use client";

import { Button } from "@/components/ui/button";

interface CategoryButtonProps {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

const CategoryButton = ({
  children,
  isActive,
  onClick,
}: CategoryButtonProps) => {
  return (
    <Button
      className="font-michroma text-[10px] tracking-[1px]"
      size="sm"
      variant={isActive ? "default" : "outline"}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default CategoryButton;
