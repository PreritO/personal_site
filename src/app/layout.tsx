import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Prerit Oberai",
  description: "Personal site and blog",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="antialiased">
        <ThemeProvider>
          <div className="page-wrapper">
            <Navbar />
            <main className="page-main">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
