import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
