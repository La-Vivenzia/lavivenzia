import type { Metadata } from "next";
import { Cinzel, Cormorant_Garamond, Montserrat } from "next/font/google";
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

export const metadata: Metadata = {
  title: "La Vivenzia — Become a Founding Host",
  description: "Join the future of premium travel curation. Apply to list your stays, tables, and experiences on the VivenIQ discovery engine.",
  icons: {
    icon: "/lavivenzia_icon.png",
    shortcut: "/lavivenzia_icon.png",
    apple: "/lavivenzia_icon.png",
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
        className={`${cinzel.variable} ${cormorant.variable} ${montserrat.variable} antialiased bg-[#0d0d0d] text-[#fcfbf9] min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
