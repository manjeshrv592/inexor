import React from "react";

export default function Loading() {
  return (
    <div className="h-full w-full p-6">
      <div className="animate-pulse space-y-4">
        <div className="h-6 w-1/3 rounded bg-neutral-800" />
        <div className="h-4 w-2/3 rounded bg-neutral-800" />
        <div className="grid grid-cols-2 gap-4 xl:grid-cols-3">
          <div className="h-24 rounded bg-neutral-800" />
          <div className="h-24 rounded bg-neutral-800" />
          <div className="h-24 rounded bg-neutral-800" />
          <div className="h-24 rounded bg-neutral-800" />
          <div className="h-24 rounded bg-neutral-800" />
          <div className="h-24 rounded bg-neutral-800" />
        </div>
      </div>
    </div>
  );
}