import { Suspense } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LoginForm from "@/components/auth/LoginForm";

export const metadata = {
  title: "Sign in – INEXOR",
};

export default async function AuthPage() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get('web_access');

  if (isAuthenticated) {
    redirect('/');
  }

  return (
    <div className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center bg-white px-4 py-8">
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
