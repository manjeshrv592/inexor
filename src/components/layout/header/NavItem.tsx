"use client";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItemProps {
  href: string;
  children: React.ReactNode;
  hasDropdown?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({
  href,
  children,
  hasDropdown = false,
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li>
      <Link
        href={href}
        className={`font-michroma hover:text-brand-orange-500 xxl:text-xs flex cursor-pointer items-center gap-1 border-none bg-transparent text-[10px] duration-300 xl:rotate-180 xl:[writing-mode:vertical-rl] ${
          isActive ? "text-brand-orange-500" : "text-white"
        }`}
      >
        <span>{children}</span>
        {hasDropdown && <ChevronDown className="mr-1 xl:rotate-90" size={16} />}
      </Link>
    </li>
  );
};

export default NavItem;
