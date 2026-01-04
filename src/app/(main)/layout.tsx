// src/app/(main)/layout.tsx

import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google"; // Fontları da premium yapalım
import "@/app/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";

// 1. FONT AYARLARI (Premium His İçin)
// Başlıklar için serif font (Playfair Display)
const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

// Düz yazılar için sans-serif font (Lato)
const lato = Lato({ 
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-sans",
  display: "swap",
});

// 2. SEO VE METADATA AYARLARI
export const metadata: Metadata = {
  metadataBase: new URL("https://qmer.us"), // Kendi domainin (Önemli!)
  title: {
    default: "QMER | Premium Mediterranean Skincare",
    template: "%s | QMER Global Cosmetics" // Alt sayfalarda: "About | QMER..." yazar
  },
  description: "Experience the pure touch of the Mediterranean. QMER offers 100% organic, scientifically formulated skincare products for visible results.",
  keywords: ["skincare", "organic cosmetics", "mediterranean", "anti-aging", "natural beauty", "QMER", "ORWEY-M"],
  authors: [{ name: "QMER LLC" }],
  creator: "QMER LLC",
  
  // Sosyal Medya Paylaşım Kartları (OpenGraph)
  openGraph: {
    title: "QMER | Nature's Secret, Refined.",
    description: "Discover premium organic skincare sourced directly from the Mediterranean.",
    url: "https://qmer.us",
    siteName: "QMER Global Cosmetics",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/mediterranean-bg.jpg", // WhatsApp'ta bu resim çıkacak
        width: 1200,
        height: 630,
        alt: "QMER Mediterranean Skincare",
      },
    ],
  },
  
  // Twitter Kartları
  twitter: {
    card: "summary_large_image",
    title: "QMER | Premium Skincare",
    description: "Scientific & Organic skincare from the Mediterranean.",
    images: ["/mediterranean-bg.jpg"],
  },
  
  // Tarayıcı İkonları
  icons: {
    icon: "/favicon.ico", // Bunu birazdan ayarlayacağız
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${playfair.variable} ${lato.variable} font-sans antialiased bg-[#FDFCF8] text-stone-900`}>
        <GoogleAnalytics />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}