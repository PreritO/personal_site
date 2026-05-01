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
      <body className="min-h-screen font-sans antialiased">
        <ThemeProvider>
          <div className="max-w-[720px] mx-auto px-6 sm:px-8">
            <div className="mt-10 sm:mt-16 md:mt-20">
              <Navbar />
              <main className="mt-10 sm:mt-14 md:mt-16">
                {children}
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
