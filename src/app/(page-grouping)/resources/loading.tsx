import React from "react";

export default function Loading() {
  return (
    <div
      className="h-full bg-[#222] xl:grid xl:h-full xl:grid-cols-[150px_250px_1fr]"
      style={{ boxShadow: "10px 2px 60px 0px #0000001A inset, 10px 2px 60px 0px #00000080 inset" }}
    >
      {/* Left Panel placeholder */}
      <div className="relative xl:h-full">
        <div className="relative z-10 flex size-full flex-col items-center justify-center gap-5 px-5 py-7">
          <div className="animate-pulse h-10 w-24 rounded bg-neutral-800" />
          <div className="animate-pulse hidden h-10 w-24 rounded bg-neutral-800 xl:block" />
        </div>
        <div className="absolute inset-0 bg-neutral-900" />
      </div>

      {/* Middle Panel placeholder */}
      <div className="hidden xl:block">
        <div className="h-full w-full p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 w-2/3 rounded bg-neutral-800" />
            <div className="h-4 w-1/2 rounded bg-neutral-800" />
            <div className="h-32 w-full rounded bg-neutral-800" />
          </div>
        </div>
      </div>

      {/* Content placeholder */}
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 w-1/3 rounded bg-neutral-800" />
          <div className="h-4 w-2/3 rounded bg-neutral-800" />
          <div className="h-48 w-full rounded bg-neutral-800" />
        </div>
      </div>
    </div>
  );
}