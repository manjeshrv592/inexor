"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "./Container";
import { Button } from "../ui/button";
import {
  FaFacebookF,
  FaSquareXTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa6";
import { FaTiktok } from "react-icons/fa6";
import { motion } from "framer-motion";
import { Footer as FooterType } from "@/lib/sanity";

interface FooterProps {
  footerData: FooterType | null;
}

const Footer = ({ footerData }: FooterProps) => {
  // Helper function to get the appropriate icon for each platform
  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case "facebook":
        return <FaFacebookF />;
      case "twitter":
        return <FaSquareXTwitter />;
      case "linkedin":
        return <FaLinkedinIn />;
      case "instagram":
        return <FaInstagram />;
      case "youtube":
        return <FaYoutube />;
      case "tiktok":
        return <FaTiktok />;
      default:
        return <FaFacebookF />; // Default fallback
    }
  };

  // Render social links dynamically
  const renderSocialLinks = () => {
    if (!footerData?.socialLinks) {
      // Fallback to default social links if no data
      return (
        <>
          <Link
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:bg-brand-orange-500 active:bg-brand-orange-600 inline-block cursor-pointer bg-white px-3 py-1 text-xs text-neutral-700 duration-300 [clip-path:polygon(0%_0%,6px_0%,calc(100%-6px)_0%,100%_6px,100%_100%,calc(100%-6px)_100%,6px_100%,0%_calc(100%-6px))] hover:text-white"
          >
            <FaFacebookF />
          </Link>
          <Link
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:bg-brand-orange-500 active:bg-brand-orange-600 inline-block cursor-pointer bg-white px-3 py-1 text-xs text-neutral-700 duration-300 [clip-path:polygon(0%_0%,6px_0%,calc(100%-6px)_0%,100%_6px,100%_100%,calc(100%-6px)_100%,6px_100%,0%_calc(100%-6px))] hover:text-white"
          >
            <FaSquareXTwitter />
          </Link>
          <Link
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:bg-brand-orange-500 active:bg-brand-orange-600 inline-block cursor-pointer bg-white px-3 py-1 text-xs text-neutral-700 duration-300 [clip-path:polygon(0%_0%,6px_0%,calc(100%-6px)_0%,100%_6px,100%_100%,calc(100%-6px)_100%,6px_100%,0%_calc(100%-6px))] hover:text-white"
          >
            <FaLinkedinIn />
          </Link>
          <Link
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:bg-brand-orange-500 active:bg-brand-orange-600 inline-block cursor-pointer bg-white px-3 py-1 text-xs text-neutral-700 duration-300 [clip-path:polygon(0%_0%,6px_0%,calc(100%-6px)_0%,100%_6px,100%_100%,calc(100%-6px)_100%,6px_100%,0%_calc(100%-6px))] hover:text-white"
          >
            <FaInstagram />
          </Link>
        </>
      );
    }

    return footerData.socialLinks
      .filter((link) => link.isActive)
      .map((link, index) => (
        <Link
          key={index}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:bg-brand-orange-500 active:bg-brand-orange-600 inline-block cursor-pointer bg-white px-3 py-1 text-xs text-neutral-700 duration-300 [clip-path:polygon(0%_0%,6px_0%,calc(100%-6px)_0%,100%_6px,100%_100%,calc(100%-6px)_100%,6px_100%,0%_calc(100%-6px))] hover:text-white"
        >
          {getSocialIcon(link.platform)}
        </Link>
      ));
  };
  return (
    <footer className="bg-neutral-800 py-12 text-white [box-shadow:inset_0_2px_2px_rgba(0,0,0,0.2)]">
      <Container>
        <div className="xxl:grid-cols-[3fr_2fr] grid items-center gap-8 xl:grid-cols-2 xl:gap-0">
          <div className="text-center">
            <h4 className="font-michroma xxl:text-2xl mb-4 bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent md:text-xl">
              {footerData?.heading ||
                "Ready to Witness Global Shipping Become Seamless?"}
            </h4>
            <p className="font-michroma mt-4 text-[10px] text-neutral-300">
              {footerData?.copyrightText ||
                "© 2025 INEXOR, All right reserved"}
            </p>
          </div>

          <div className="flex flex-col gap-8 lg:hidden">
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: "auto" }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{
                height: {
                  type: "tween",
                  ease: [0.22, 1, 0.36, 1],
                  duration: 0.9,
                },
              }}
              style={{ willChange: "height" }}
              className="overflow-hidden"
            >
              <div className="flex h-full flex-col justify-center px-8 py-2">
                <div className="mb-4 flex flex-1 items-center">
                  <Image
                    src={footerData?.logo?.asset?.url || "/img/x-logo.svg"}
                    alt="Company Logo"
                    width={300}
                    height={100}
                    className="mx-auto max-h-[128px] w-auto"
                  />
                </div>
                <div className="flex justify-between text-xs">
                  <Link
                    href="/privacy-policy"
                    className="hover:text-brand-orange-500 shrink-0 cursor-pointer duration-300"
                  >
                    Privacy Policy
                  </Link>
                  <span> | </span>
                  <Link
                    href="/terms-conditions"
                    className="hover:text-brand-orange-500 shrink-0 cursor-pointer duration-300"
                  >
                    Terms & Conditions
                  </Link>
                </div>
              </div>
            </motion.div>
            <div className="">
              <div className="flex h-full flex-col items-center justify-center gap-4">
                <div className="flex justify-center gap-4">
                  {renderSocialLinks()}
                </div>
                <div className="text-center">
                  {footerData?.ctaButtonLink ? (
                    <Link href={footerData.ctaButtonLink}>
                      <Button
                        variant={"outline"}
                        size={"sm"}
                        className="font-michroma text-xs tracking-[1px]"
                      >
                        {footerData?.ctaButtonText || "Schedule a Call"}
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      variant={"outline"}
                      size={"sm"}
                      className="font-michroma text-xs tracking-[1px]"
                    >
                      {footerData?.ctaButtonText || "Schedule a Call"}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex">
            <motion.div
              initial={{ width: "0%" }}
              whileInView={{ width: "50%" }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{
                width: {
                  type: "tween",
                  ease: [0.22, 1, 0.36, 1],
                  duration: 0.9,
                },
              }}
              className="w-1/2 overflow-hidden"
            >
              <div className="flex h-full flex-col justify-center px-8 py-2">
                <div className="mb-2 flex flex-1 items-center">
                  <Image
                    src={footerData?.logo?.asset?.url || "/img/x-logo.svg"}
                    className="mx-auto max-w-[128px]"
                    alt="Company Logo"
                    width={300}
                    height={100}
                  />
                </div>
                <div className="flex justify-between text-xs">
                  <Link
                    href="/privacy-policy"
                    className="hover:text-brand-orange-500 shrink-0 cursor-pointer duration-300"
                  >
                    Privacy Policy
                  </Link>
                  <span> | </span>
                  <Link
                    href="/terms-conditions"
                    className="hover:text-brand-orange-500 shrink-0 cursor-pointer duration-300"
                  >
                    Terms & Conditions
                  </Link>
                </div>
              </div>
            </motion.div>
            <div className="w-1/2">
              <div className="flex h-full flex-col items-center justify-center gap-4">
                <div className="text-center">
                  {footerData?.ctaButtonLink ? (
                    <Link href={footerData.ctaButtonLink}>
                      <Button
                        variant={"outline"}
                        size={"sm"}
                        className="font-michroma text-xs tracking-[1px]"
                      >
                        {footerData?.ctaButtonText || "Schedule a Call"}
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      variant={"outline"}
                      size={"sm"}
                      className="font-michroma text-xs tracking-[1px]"
                    >
                      {footerData?.ctaButtonText || "Schedule a Call"}
                    </Button>
                  )}
                </div>
                <div className="flex justify-center gap-4">
                  {renderSocialLinks()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
