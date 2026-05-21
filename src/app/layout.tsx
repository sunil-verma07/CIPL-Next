import type { Metadata } from "next";
import { Geist_Mono, Inter, Jost } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import AppShell from "@/components/layout/AppShell";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
});

export const metadata: Metadata = {
  title: "Crediple",
  description: "Crediple — trust-first platform",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // Default class is "dark"; ThemeProvider respects an explicit stored choice on mount.
    <html
      lang="en"
      className={`${geistMono.variable} ${inter.variable} ${jost.variable} dark h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col"
        style={{ background: "var(--background)", color: "var(--foreground)" }}
      >
        <ThemeProvider>
          <AppShell>
            {children}
          </AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
