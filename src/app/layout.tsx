import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Montserrat } from "next/font/google";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const description =
  "Join the future of premium travel curation. Apply to list your stays, tables, and experiences on the VivenIQ discovery engine.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "La Vivenzia — Become a Founding Host",
    template: "%s | La Vivenzia",
  },
  description,
  applicationName: "La Vivenzia",
  keywords: [
    "luxury travel",
    "curated stays",
    "Maharashtra travel",
    "premium experiences",
    "founding host",
    "VivenIQ",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "La Vivenzia",
    title: "La Vivenzia — Become a Founding Host",
    description,
    url: "/",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "La Vivenzia — Become a Founding Host",
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/lavivenzia_icon_clean.png",
    shortcut: "/lavivenzia_icon_clean.png",
    apple: "/lavivenzia_icon_clean.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${cinzel.variable} ${cormorant.variable} ${montserrat.variable} antialiased bg-background text-ivory min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
