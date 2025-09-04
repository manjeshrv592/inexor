import { Suspense } from "react";
import LoginForm from "@/components/auth/LoginForm";

export const metadata = {
  title: "Sign in – INEXOR",
};

export default function AuthPage() {
  return (
    <div className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center bg-white px-4 py-8">
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
