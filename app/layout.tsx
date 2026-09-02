import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "ReTech - Buy & Sell Refurbished Devices",
  description: "Sell old tech for instant cash or buy certified refurbished devices. Free doorstep pickup & 12-month warranty.",
  keywords: "buy refurbished phones, sell old devices, certified electronics, tech trade-in",
  openGraph: {
    title: "ReTech - Certified Refurbished Devices",
    description: "Buy refurbished tech or sell your old devices instantly",
    url: defaultUrl,
    siteName: "ReTech",
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
