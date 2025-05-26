import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "@/components/toaster";

const inter = Inter({
  subsets: ["latin"],
  display: "swap", // Improves font loading performance
  variable: "--font-inter", // CSS variable for better theme integration
});

export const metadata: Metadata = {
  title: {
    default: "Admin Dashboard",
    template: "%s | Admin Dashboard", // Dynamic title template for child pages
  },
  description: "Admin dashboard for managing users and withdrawals",
  generator: "v0.dev",
  applicationName: "Admin Dashboard",
  keywords: ["admin", "dashboard", "users", "withdrawals", "management"],
  authors: [{ name: "Your Name", url: "https://yourwebsite.com" }], // Update with your details
  openGraph: {
    title: "Admin Dashboard",
    description: "Admin dashboard for managing users and withdrawals",
    url: "https://yourwebsite.com", // Update with your website URL
    siteName: "Admin Dashboard",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg", // Add an Open Graph image in your public folder
        width: 1200,
        height: 630,
        alt: "Admin Dashboard Preview",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico", // Add a favicon in your public folder
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1f1f1f" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${inter.variable}`}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}