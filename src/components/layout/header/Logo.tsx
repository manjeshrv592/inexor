"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useModal } from "@/contexts/ModalContext";

const Logo = () => {
  const pathname = usePathname();
  const { closeModal } = useModal();

  const handleLogoClick = (e: React.MouseEvent) => {
    // If we're on a modal page, use the modal close animation
    if (pathname !== "/") {
      e.preventDefault();
      closeModal();
    }
    // Otherwise, let the Link handle normal navigation
  };

  return (
    <div className="border-b border-neutral-800 bg-[#050505] p-3 pb-6 lg:border-none lg:bg-transparent lg:p-1 lg:pt-4">
      <Link href="/" className="block" onClick={handleLogoClick}>
        <Image
          src="/logo.svg"
          alt="Inexor logo"
          height={10}
          width={10}
          className="mx-auto h-auto w-20 xl:w-full"
          priority
        />
      </Link>
    </div>
  );
};

export default Logo;
