"use client";

import Link from "next/link";
import React from "react";

const PagePanelBg = () => {
  return (
    <Link href={"/"}>
      <div className="fixed inset-0 z-[60] cursor-pointer bg-black"></div>
    </Link>
  );
};

export default PagePanelBg;
