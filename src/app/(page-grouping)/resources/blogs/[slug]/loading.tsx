import React from "react";

export default function Loading() {
  return (
    <div className="h-full w-full p-6">
      <div className="animate-pulse space-y-4">
        <div className="h-5 w-1/2 rounded bg-neutral-800" />
        <div className="h-4 w-1/3 rounded bg-neutral-800" />
        <div className="h-64 w-full rounded bg-neutral-800" />
        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-neutral-800" />
          <div className="h-4 w-5/6 rounded bg-neutral-800" />
          <div className="h-4 w-4/6 rounded bg-neutral-800" />
        </div>
      </div>
    </div>
  );
}