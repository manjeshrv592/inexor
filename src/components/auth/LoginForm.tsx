"use client";

import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginInput } from "@/lib/validations/auth";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

type LoginStep = "credentials" | "otp";

export default function LoginForm() {
  const search = useSearchParams();
  const redirect = search.get("redirect") || "/";
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<LoginStep>("credentials");
  const [isLoading, setIsLoading] = useState(false);
  const [otpToken, setOtpToken] = useState<string>("");
  const [otpEmail, setOtpEmail] = useState<string>("");
  const [otp, setOtp] = useState("");

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });

  const requestOTP = async (values: LoginInput) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/auth/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send OTP");
      }

      setOtpToken(data.token);
      setOtpEmail(process.env.EMAIL_RECEIVER || "");
      setStep("otp");
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: otpToken, otp }),
        credentials: "same-origin",
      });

      if (response.ok) {
        // Set flag to reset home page scroll position
        sessionStorage.setItem('resetHomeScroll', 'true');
        
        // Decode the redirect URL and ensure it's a local path
        const decodedRedirect = decodeURIComponent(redirect);
        const redirectUrl = new URL(decodedRedirect, window.location.origin);

        // Only allow same-origin redirects for security
        if (redirectUrl.origin === window.location.origin) {
          window.location.href = redirectUrl.pathname + redirectUrl.search;
        } else {
          window.location.href = "/";
        }
      } else {
        const data = await response.json();
        setError(data?.message || "Invalid OTP");
      }
    } catch (err) {
      console.error("OTP verification error:", err);
      setError("An error occurred during OTP verification");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCredentialsSubmit = async (values: LoginInput) => {
    setError(null);
    try {
      setIsLoading(true);

      // First, verify credentials and request OTP in one step
      const res = await fetch("/api/auth/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
        credentials: "same-origin",
      });

      const data = await res.json();

      if (res.ok) {
        // Check if user was authenticated directly (OTP bypassed)
        if (data.authenticated) {
          // Set flag to reset home page scroll position
          sessionStorage.setItem('resetHomeScroll', 'true');
          
          // Direct authentication successful - redirect to dashboard
          const decodedRedirect = decodeURIComponent(redirect);
          const redirectUrl = new URL(decodedRedirect, window.location.origin);

          // Only allow same-origin redirects for security
          if (redirectUrl.origin === window.location.origin) {
            window.location.href = redirectUrl.pathname + redirectUrl.search;
          } else {
            window.location.href = "/";
          }
        } else {
          // OTP was sent successfully - proceed to OTP step
          setOtpToken(data.token);
          setOtpEmail(process.env.EMAIL_RECEIVER || "");
          setStep("otp");
        }
      } else {
        setError(data?.message || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred during login");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6) {
      verifyOTP();
    }
  };

  if (step === "otp") {
    return (
      <Card className="relative z-[9999] w-full max-w-sm rounded-none border-neutral-800 bg-neutral-800 text-white">
        <CardHeader className="space-y-2 text-center">
          <CardTitle>Verify Your Identity</CardTitle>
          <CardDescription className="text-sm text-neutral-400">
            We&apos;ve sent a 6-digit code to{" "}
            <span className="font-medium">{otpEmail}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleOtpSubmit} className="space-y-6">
            <div className="flex justify-center gap-2">
              <div className="grid grid-cols-6 gap-2">
                {Array(6)
                  .fill(0)
                  .map((_, index) => (
                    <Input
                      key={index}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={otp[index] || ""}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const newOtp = otp.split("");
                        newOtp[index] = e.target.value.slice(-1); // Only take the last character
                        const newOtpStr = newOtp.join("").slice(0, 6);
                        setOtp(newOtpStr);

                        // Auto-focus next input if there's a value and we're not on the last input
                        if (e.target.value && index < 5) {
                          const inputs = document.querySelectorAll(
                            'input[type="text"]',
                          ) as NodeListOf<HTMLInputElement>;
                          if (inputs[index + 1]) inputs[index + 1].focus();
                        }
                      }}
                      onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === "Backspace" && !otp[index] && index > 0) {
                          // Move to previous input on backspace if current is empty
                          const inputs = document.querySelectorAll(
                            'input[type="text"]',
                          ) as NodeListOf<HTMLInputElement>;
                          if (inputs[index - 1]) inputs[index - 1].focus();
                        }
                      }}
                      className="h-12 w-12 text-center text-lg"
                    />
                  ))}
              </div>
            </div>

            {error && (
              <p
                className="text-destructive text-center text-sm font-medium"
                role="alert"
              >
                {error}
              </p>
            )}

            <Button
              type="submit"
              className="font-michroma w-full text-xs"
              disabled={otp.length !== 6 || isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Verifying...
                </span>
              ) : (
                "Verify OTP"
              )}
            </Button>

            <div className="text-muted-foreground text-center text-sm">
              <p className="text-neutral-400">Didn&apos;t receive a code?</p>
              <button
                type="button"
                onClick={() => {
                  const values = form.getValues();
                  requestOTP(values);
                }}
                className="cursor-pointer font-medium text-white hover:underline"
                disabled={isLoading}
              >
                Resend OTP
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="relative z-[9999] w-full max-w-sm rounded-none border-neutral-800 bg-neutral-800 text-white">
      <CardHeader>
        <CardTitle>INEXOR – Sign&nbsp;In</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleCredentialsSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-neutral-400">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="your@email.com"
                      autoComplete="email"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-neutral-400">Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      autoComplete="current-password"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && (
              <p className="text-destructive text-sm font-medium" role="alert">
                {error}
              </p>
            )}
            <Button
              type="submit"
              className="font-michroma w-full text-xs"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Verifying...
                </span>
              ) : (
                "Continue"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
