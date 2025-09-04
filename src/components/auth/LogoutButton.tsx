"use client";

import React from "react";
import { LogOut } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Check if we should show the button based on current pathname
  const isVisible =
    !pathname.startsWith("/auth") && !pathname.startsWith("/studio");

  if (!isVisible) {
    return null;
  }

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);

    try {
      await fetch("/api/auth/logout", {
        method: "POST",
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Redirect to login page regardless of API response
      router.push("/auth");
    }
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
