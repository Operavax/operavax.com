import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { Providers } from "@/components/providers/providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://operavax.com";

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: "Operavax — One Platform. Every Sector.",
    template: "%s | Operavax",
  },
  description:
    "The central hub for the Operavax ecosystem. Access forms, management dashboards, reports, payments, and more across every sector.",
  openGraph: {
    type: "website",
    siteName: "Operavax",
    title: "Operavax — One Platform. Every Sector.",
    description:
      "The central hub for the Operavax ecosystem. Access forms, management dashboards, reports, payments, and more across every sector.",
    url: APP_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Operavax — One Platform. Every Sector.",
    description:
      "The central hub for the Operavax ecosystem. Access forms, management dashboards, reports, payments, and more across every sector.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable}`}>
      <body className="font-sans antialiased">
        <Providers>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[9999] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#222] focus:shadow-md focus:ring-2 focus:ring-[#4285F4] focus:outline-none"
          >
            Skip to main content
          </a>
          {children}
          <Toaster
            position="top-right"
            richColors
            closeButton
            duration={5000}
          />
        </Providers>
      </body>
    </html>
  );
}
