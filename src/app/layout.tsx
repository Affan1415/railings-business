import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { VoiceWidget } from "@/components/voice/VoiceWidget";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Major Home Improvements | Roofing, Windows, Siding & Gutters",
  description: "Transform your home with our expert roofing, window replacement, siding, and gutter services. Quality craftsmanship, competitive pricing, and exceptional service.",
  keywords: ["roofing", "windows", "siding", "gutters", "home improvement", "contractors"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <VoiceWidget />
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
