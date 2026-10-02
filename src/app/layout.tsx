import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

export const metadata: Metadata = {
  title: "Gaurishakti | Premium Cattle Feed & Nutrition",
  description: "Scientifically formulated premium cattle feed trusted by thousands of farmers to improve milk yield, cattle health, and farm profitability.",
  keywords: "cattle feed, dairy farming, high milk yield, animal nutrition, dairy feed, premium cattle feed, gaurishakti",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/icon.svg", sizes: "180x180", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icon.svg" />
        <meta name="google-site-verification" content="ELaME-u7g0uPt0qT_XxIGQeTPrgPHrAWTOSu1NeBpCo" />
      </head>
      <body>
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-7XLD40GJTM"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-7XLD40GJTM');
            `,
          }}
        />

        <SmoothScrollProvider>
          <Navbar />
          {children}
          <Footer />
          <FloatingWhatsApp />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
