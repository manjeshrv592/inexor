import React from "react";

export default function Loading() {
  return (
    <div className="h-full w-full p-6">
      <div className="animate-pulse space-y-4">
        <div className="h-6 w-1/3 rounded bg-neutral-800" />
        <div className="h-4 w-2/3 rounded bg-neutral-800" />
        <div className="h-4 w-1/2 rounded bg-neutral-800" />
        <div className="h-48 w-full rounded bg-neutral-800" />
      </div>
    </div>
  );
}