"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button1 from "@/components/buttons/Button1";
import { SITE_NAME } from "@/lib/constants";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Features", href: "#features" },
  { name: "Premium", href: "#pricing" },
  { name: "About us", href: "#aboutus" },
  { name: "Contact us", href: "#contactus" },
];

const Navbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-[#3c1d6f] px-3">
      <div className="container max-w-[1400px] flex justify-between items-center mx-auto py-4">
        
        {/* Logo */}
        <div className="text-2xl font-bold uppercase">
          {SITE_NAME}
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-7">
          <ul className="flex items-center gap-7 font-semibold text-lg">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="rounded pb-1 hover:border-b-2 border-white"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          <Button1
            onClick={() => router.push("/sign-in")}
            text="Login"
          />
        </div>

        {/* Hamburger */}
        <button
          className="lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#3c1d6f] px-5 pb-5">
          <ul className="flex flex-col gap-4 font-semibold text-lg">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-5">
            <Button1
              onClick={() => {
                setIsOpen(false);
                router.push("/sign-in");
              }}
              text="Login"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;