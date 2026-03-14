import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://vahomeloanpros.com';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0A1628',
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "VA Loans for Veterans | No Overlays, Direct to VA Guidelines | Cornerstone First",
    template: "%s | Cornerstone First Mortgage",
  },
  description: "They served for us. Now we serve them. Get your VA loan with no lender overlays, no 620 credit score requirement. We underwrite directly to VA guidelines. In-house VA specialists.",
  keywords: [
    "VA loan",
    "veteran home loan",
    "military mortgage",
    "VA home loan",
    "no credit score minimum",
    "VA loan no overlay",
    "VA loan eligibility",
    "VA IRRRL",
    "VA refinance",
    "veteran mortgage",
    "0 down VA loan",
    "VA funding fee",
  ],
  authors: [{ name: "Cornerstone First Mortgage", url: BASE_URL }],
  creator: "Cornerstone First Mortgage",
  publisher: "Cornerstone First Mortgage",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "VA Loans for Veterans | No Overlays | Cornerstone First",
    description: "They served for us. Now we serve them. VA loans with no lender overlays. We underwrite directly to VA guidelines.",
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    siteName: "Cornerstone First Mortgage",
    images: [
      {
        url: `${BASE_URL}/og-image.svg`,
        width: 1200,
        height: 630,
        alt: "Cornerstone First Mortgage - VA Loan Specialists",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VA Loans for Veterans | No Overlays | Cornerstone First",
    description: "VA loans with no lender overlays. Zero down payment, no PMI, no minimum credit score.",
    images: [`${BASE_URL}/og-image.svg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  verification: {
    // Add verification codes when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
  category: 'finance',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
