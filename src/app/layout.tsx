import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import MotionGate from "@/components/MotionGate";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://prerit.website"),
  title: "Prerit Oberai",
  description: "Personal site and blog",
  alternates: {
    types: { "application/rss+xml": "/feed.xml" },
  },
};

export const viewport: Viewport = {
  colorScheme: "light",
};

// Hard-load half of the once-per-session entrance gate: runs before first
// paint so a returning visitor never sees the animation replay.
const motionGateScript = `try{if(sessionStorage.getItem('motion-done'))document.documentElement.classList.add('motion-done')}catch(e){}`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="antialiased">
        <script dangerouslySetInnerHTML={{ __html: motionGateScript }} />
        <a href="#content" className="skip-link">Skip to content</a>
        <div className="page-wrapper">
          <Navbar />
          <main id="content" className="page-main">{children}</main>
        </div>
        <MotionGate />
        <Analytics />
      </body>
    </html>
  );
}
