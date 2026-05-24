"use client";
import HeroSection from "@/components/landing/HeroSection";
import Aboutus from "@/components/landing/Aboutus";
import Contactus from "@/components/landing/Contactus";
import Features from "@/components/landing/Features";
import Pricings from "@/components/landing/Pricings";

export default function Home() {
  return (
    <div className="grid">
      <HeroSection />
      <div className="grid mx-auto max-w-[1400px] items-center">
        <Features />
        <Pricings />
        <Aboutus />
        <Contactus />
      </div>
    </div>
  );
}
