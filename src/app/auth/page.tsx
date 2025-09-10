import { Suspense } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LoginForm from "@/components/auth/LoginForm";

export const metadata = {
  title: "Sign in – INEXOR",
};

export default async function AuthPage() {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get('web_access');
  
  // Check if user is already authenticated with valid secret and session not expired
  if (authCookie?.value) {
    const [cookieSecret, expiresAtStr] = authCookie.value.split(':');
    
    if (cookieSecret === process.env.NEXT_PUBLIC_WEB_ACCESS_SECRET) {
      // Check if session has not expired
      if (expiresAtStr) {
        const expiresAt = parseInt(expiresAtStr);
        if (Date.now() <= expiresAt) {
          redirect('/');
        }
      } else {
        // Legacy cookie without timestamp, redirect anyway
        redirect('/');
      }
    }
  }

  return (
    <div className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center bg-white px-4 py-8">
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
