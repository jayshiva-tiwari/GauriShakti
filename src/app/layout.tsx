import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

export const metadata: Metadata = {
  title: "Premium Cattle Feed | Highest Milk Yield Guarantee",
  description: "Scientifically formulated premium cattle feed trusted by thousands of farmers to improve milk yield, cattle health, and farm profitability.",
  keywords: "cattle feed, dairy farming, high milk yield, animal nutrition, dairy feed, premium cattle feed",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
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
