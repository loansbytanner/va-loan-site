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
  title: "VA Loans for Veterans | No Overlays, Direct to VA Guidelines | Cornerstone First",
  description: "They served for us. Now we serve them. Get your VA loan with no lender overlays, no 620 credit score requirement. We underwrite directly to VA guidelines. In-house VA specialists.",
  keywords: ["VA loan", "veteran home loan", "military mortgage", "VA home loan", "no credit score minimum", "VA loan no overlay"],
  authors: [{ name: "Cornerstone First Mortgage" }],
  openGraph: {
    title: "VA Loans for Veterans | No Overlays | Cornerstone First",
    description: "They served for us. Now we serve them. VA loans with no lender overlays. We underwrite directly to VA guidelines.",
    type: "website",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
