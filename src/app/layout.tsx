import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: {
    default: "Travel Sync | Find Travel Partners & Plan Trips Together",
    template: "%s | Travel Sync",
  },
  description:
    "Travel Sync & Meetup is a social travel platform to find travel partners, create travel plans, match with travelers, manage profiles, and explore the world together.",
  keywords: [
    "travel sync",
    "travel companion",
    "travel meetup",
    "trip planning",
    "find travel partners",
    "solo travel",
    "group travel",
    "travel community",
  ],
  authors: [{ name: "Travel Sync Team" }],
  creator: "Travel Sync",
  publisher: "Travel Sync",

  openGraph: {
    title: "Travel Sync | Find Travel Partners & Plan Trips Together",
    description:
      "Join Travel Sync to match with travelers, create travel plans, explore destinations, and travel together safely.",
    url: "https://travelsync.vercel.app",
    siteName: "Travel Sync",
    images: [
      {
        url: "https://travelsync.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Travel Sync Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Travel Buddy | Find Travel Partners & Plan Trips Together",
    description:
      "Plan trips, find travel buddies, and explore destinations together with Travel Buddy.",
    images: ["https://travelbuddy.vercel.app/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
