import type { Metadata } from "next";
import { Space_Grotesk, Syne, Inter } from "next/font/google";
import "./globals.css";
import { CustomCursor } from "@/components/ui/CustomCursor";
import SmoothScroll from "@/components/providers/SmoothScroll";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "TITAN KINETIC | Elite Human Expansion",
  description: "The technical standard in performance supplementation. Engineered for dominance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${syne.variable} ${inter.variable} min-h-screen bg-background text-foreground font-inter selection:bg-primary selection:text-background antialiased`}
      >
        <SmoothScroll>
          <CustomCursor />
          {children}
        </SmoothScroll>
        
        {/* SVG Noise Overlay */}
        <svg className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.03] mix-blend-overlay">
          <filter id="noiseFilter">
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.6" 
              stitchTiles="stitch" 
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </body>
    </html>
  );
}
