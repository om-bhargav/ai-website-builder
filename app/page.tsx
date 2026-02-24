"use client";
import HeroSection from "@/components/landing/HeroSection";
import Navbar from "@/components/landing/Navbar";

import Footer from "@/components/landing/Footer";

// export const metadata = {
//   title: "Pagepiolet",
//   description: "This page will help you make your new website",
// };
import Loading from "@/components/Loading";
import Aboutus from "@/components/landing/Aboutus";
import Contactus from "@/components/landing/Contactus";
import Features from "@/components/landing/Features";
import Pricings from "@/components/landing/Pricings";

export default function Home() {
  return (
    <div className="grid">
      <Navbar />
      <HeroSection />
      <div className="grid mx-auto max-w-[1400px] items-center">
        <Features />
        <Pricings />
        <Aboutus />
        <Contactus />
      </div>
      <Footer />
    </div>
  );
}
