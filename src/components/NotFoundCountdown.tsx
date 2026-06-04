"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface NotFoundCountdownProps {
  /** Seconds to count down from before redirecting home. */
  seconds?: number;
}

/**
 * Client-only countdown that ticks from `seconds` down to 0 and then
 * redirects the user to the home page. Kept as a small standalone client
 * component so the rest of the 404 page can stay statically generated.
 */
const NotFoundCountdown = ({ seconds = 5 }: NotFoundCountdownProps) => {
  const router = useRouter();
  const [count, setCount] = useState(seconds);

  useEffect(() => {
    if (count <= 0) {
      router.push("/");
      return;
    }

    const timer = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [count, router]);

  return (
    <p className="text-sm text-gray-400">
      Redirecting to home in{" "}
      <span className="text-brand-orange-500 font-semibold">{count}</span>{" "}
      second{count === 1 ? "" : "s"}...
    </p>
  );
};

export default NotFoundCountdown;
