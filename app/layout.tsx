import { geistMono, geistSans } from "@/lib/fonts";
import { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import Script from "next/script";

export const metadata: Metadata = {
  title: {
    template: "%s | Page Pilot", // Template for nested pages
    default: "Page Pilot", // Default title if no nested title is provided
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>{children}</Providers>
        <Script
          id="razorpay-checkout-js"
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
