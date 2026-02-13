import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar, Footer } from "@/components/marketing";
import { VoiceWidget } from "@/components/voice/VoiceWidget";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Major Home Improvements | Roofing, Windows, Siding & Gutters",
  description:
    "Transform your home with expert craftsmanship. Premium roofing, windows, siding, and gutter services in Massachusetts and Connecticut. Get a free instant quote today!",
  keywords: [
    "home improvement",
    "roofing",
    "windows",
    "siding",
    "gutters",
    "Massachusetts",
    "Connecticut",
    "roof replacement",
    "window installation",
  ],
  authors: [{ name: "Major Home Improvements" }],
  openGraph: {
    title: "Major Home Improvements | Expert Home Improvement Services",
    description:
      "Premium roofing, windows, siding, and gutter services. Get a free instant quote!",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <VoiceWidget />
        <Toaster />
      </body>
    </html>
  );
}
