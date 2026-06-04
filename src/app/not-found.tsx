import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import NotFoundCountdown from "@/components/NotFoundCountdown";

export const metadata: Metadata = {
  title: "404 - Page Not Found | INEXOR",
  description: "The page you are looking for could not be found.",
};

const NotFound = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <h1 className="font-michroma text-brand-orange-500 text-6xl md:text-8xl">
        404
      </h1>
      <div className="space-y-2">
        <h2 className="font-michroma text-xl md:text-2xl">Page Not Found</h2>
        <p className="mx-auto max-w-md text-sm text-gray-400 md:text-base">
          The page you are looking for is not found. It may have been moved or no
          longer exists.
        </p>
      </div>
      <Link href="/">
        <Button className="font-michroma text-xs tracking-[1px]">
          Go to Home
        </Button>
      </Link>
      <NotFoundCountdown seconds={5} />
    </main>
  );
};

export default NotFound;
