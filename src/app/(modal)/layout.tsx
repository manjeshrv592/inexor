"use client";

import React, { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import PagePanelBg from "@/components/ui/PagePanelBg";
import PagePanel from "@/components/ui/PagePanel";

interface ModalLayoutProps {
  children: React.ReactNode;
}

const ModalLayout = ({ children }: ModalLayoutProps) => {
  const router = useRouter();

  const handleClose = useCallback(() => {
    router.push('/'); // Go directly to home page
  }, [router]);

  const handleBackgroundClick = () => {
    handleClose();
  };

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleClose]);

  return (
    <>
      <PagePanelBg />
      <div
        onClick={handleBackgroundClick}
        className="fixed inset-0 z-[60] cursor-pointer"
      >
        <div onClick={(e) => e.stopPropagation()} className="relative">
          <PagePanel>
            {/* <CloseButton onClose={handleClose} /> */}
            {children}
          </PagePanel>
        </div>
      </div>
    </>
  );
};

export default ModalLayout;
