import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter, Jost } from "next/font/google";
import "./globals.css";
import { ThemeProvider, ThemeScript } from "@/context/ThemeContext";
import AppShell from "@/components/layout/AppShell";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});

const SITE_URL = "https://crediple.com";
const OG_IMAGE = `${SITE_URL}/og-image.png`; 

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Crediple — Scalable Digital Systems",
    template: "%s | Crediple",
  },

  description:
    "Crediple builds intelligent platforms, automation systems, and enterprise-ready digital infrastructure for teams that want to move fast.",

  alternates: {
    canonical: "/",
  },

  keywords: [
    "digital systems",
    "automation",
    "SaaS platforms",
    "workflow automation",
    "enterprise software",
    "Crediple",
  ],

  authors: [{ name: "Crediple", url: SITE_URL }],
  creator: "Crediple",
  publisher: "Crediple",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Crediple",
    title: "Crediple — Scalable Digital Systems",
    description:
      "We build intelligent platforms, automation systems, and enterprise-ready digital infrastructure.",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Crediple",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Crediple — Scalable Digital Systems",
    description:
      "Intelligent platforms, automation systems, and enterprise-ready digital infrastructure.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],

    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],

    shortcut: ["/favicon.ico"],
  },

  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#020617",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistMono.variable} ${inter.variable} ${jost.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body
        className="min-h-full flex flex-col"
        style={{ background: "var(--background)", color: "var(--foreground)" }}
      >
        <ThemeProvider>
          <AppShell>{children}</AppShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
