import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";

import AnalyticsTracker from "@/components/analytics-tracker";
import { SiteShell } from "@/components/layout/site-shell";
import { GA_ID } from "@/lib/analytics";
import { siteConfig } from "@/lib/marketing";
import { getSiteUrl } from "@/lib/site-url";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: "Community-based healthcare in Yakima with support for mental health, addiction treatment, primary care, and medication management.",
  openGraph: {
    siteName: siteConfig.name,
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0F4C5C",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {GA_ID ? (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  window.gtag = gtag;
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}');
                `,
              }}
            />
          </>
        ) : null}
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} bg-[var(--site-background)] font-sans text-[var(--site-foreground)] antialiased`}
      >
        {GA_ID ? <AnalyticsTracker /> : null}
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
