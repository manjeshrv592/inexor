"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface ModalContextType {
  isModalClosing: boolean;
  setIsModalClosing: (closing: boolean) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [isModalClosing, setIsModalClosing] = useState(false);
  const router = useRouter();

  // Unified close function that triggers animation and preserves scroll position
  const closeModal = useCallback(() => {
    setIsModalClosing(true);
    // Wait for animation to complete before navigating back
    setTimeout(() => {
      router.back();
    }, 500);
  }, [router]);

  // Reset modal closing state after a short delay
  useEffect(() => {
    if (isModalClosing) {
      const timer = setTimeout(() => {
        setIsModalClosing(false);
      }, 1000); // Reset after 1 second
      
      return () => clearTimeout(timer);
    }
  }, [isModalClosing]);

  return (
    <ModalContext.Provider value={{ isModalClosing, setIsModalClosing, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};
