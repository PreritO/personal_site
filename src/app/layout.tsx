import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";

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
    <html lang="en" suppressHydrationWarning className="dark">
      <body className="min-h-screen font-sans antialiased">
        <ThemeProvider>
          <div className="max-w-[650px] mx-auto px-8">
            <div className="mt-48">
              <Navbar />
              <main className="mt-32">
                {children}
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
