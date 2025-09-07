"use client";

import React from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./button";

interface CloseButtonProps {
  className?: string;
  onClose?: () => void;
}

const CloseButton = ({ className, onClose }: CloseButtonProps) => {
  const router = useRouter();

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      router.back();
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleClose}
      className={`absolute top-4 right-4 z-10 h-8 w-8 rounded-full bg-black/10 hover:bg-black/20 ${className}`}
      aria-label="Close modal"
    >
      <X className="h-4 w-4" />
    </Button>
  );
};

export default CloseButton;
