"use client";

import React, { useEffect, useCallback } from "react";
import PagePanelBg from "@/components/ui/PagePanelBg";
import PagePanel from "@/components/ui/PagePanel";
import { useModal } from "@/contexts/ModalContext";

interface ModalLayoutProps {
  children: React.ReactNode;
}

const ModalLayout = ({ children }: ModalLayoutProps) => {
  const { closeModal } = useModal();

  const handleClose = useCallback(() => {
    closeModal();
  }, [closeModal]);

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
      <PagePanelBg onClick={handleBackgroundClick} />
      <div className="relative">
        <PagePanel>
          {/* <CloseButton onClose={handleClose} /> */}
          {children}
        </PagePanel>
      </div>
    </>
  );
};

export default ModalLayout;
