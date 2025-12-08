"use client";

import React, { useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import { usePathname } from "next/navigation";

export default function LogoutButton() {
  const pathname = usePathname();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showButton, setShowButton] = useState(false);

  // Check web access setting on client side
  useEffect(() => {
    setShowButton(process.env.NEXT_PUBLIC_WEB_ACCESS_ENABLED === 'true');
  }, []);

  // Don't show on auth page or if web access is disabled
  if (pathname === "/auth" || !showButton) {
    return null;
  }

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      // Call logout API with a timeout to prevent hanging
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

      const response = await fetch("/api/auth/logout", {
        method: "POST",
        signal: controller.signal,
        credentials: "same-origin", // Ensure cookies are sent
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        console.warn("Logout API returned non-OK status:", response.status);
      } else {
      }
    } catch (error) {
      console.error("Logout error:", error);
      // Continue with logout even if API fails
    }

    // Clear any client-side authentication state
    try {
      // Clear localStorage/sessionStorage if any auth data is stored there
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_data');
      sessionStorage.removeItem('auth_token');
      sessionStorage.removeItem('user_data');
    } catch (error) {
      console.warn("Error clearing local storage:", error);
    }

    // Force reload to ensure all state is cleared and redirect to auth page
    window.location.href = "/auth";
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoggingOut}
      className="fixed right-6 bottom-6 z-50 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-neutral-500 bg-white text-neutral-600 shadow-lg transition-all duration-200 hover:scale-105 hover:bg-neutral-50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
      title="Logout"
      aria-label="Logout"
    >
      <LogOut size={20} />
    </button>
  );
}
