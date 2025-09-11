import type { Metadata } from "next";
import { Michroma, Raleway } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import AuthProvider from "@/components/providers/AuthProvider";
import LogoutButton from "@/components/auth/LogoutButton";

const michroma = Michroma({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-michroma",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-raleway",
});

export const metadata: Metadata = {
  title: "INEXOR - Web Access",
  description: "Secure web access portal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${michroma.variable} ${raleway.variable} bg-[#050505] text-white antialiased`}
      >
        <AuthProvider>
          <Header />
          {children}
          <LogoutButton />
        </AuthProvider>
      </body>
    </html>
  );
}
