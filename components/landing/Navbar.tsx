"use client";

import Button1 from "@/components/buttons/Button1";
import { SITE_NAME } from "@/config";
import { AuthStore } from "@/store/AuthInfo";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
  const [scrolled, setScrolled] = useState(false);

  const { user } = AuthStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 z-[999] w-full transition-all duration-300 ${
        scrolled ? "bg-black/40 backdrop-blur-2xl border-b border-white/10" : "bg-transparent"
      }`}
    >
      {/* Glow */}
      {/* <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-violet-500/15 blur-[120px] rounded-full" />
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-fuchsia-500/10 blur-[120px] rounded-full" />
      </div> */}

      <div className="max-w-[1400px] flex justify-between items-center mx-auto py-4 px-8">
        {/* Logo */}
        <div
          onClick={() => router.push("/")}
          className="text-2xl font-black uppercase tracking-tight cursor-pointer text-white"
        >
          {SITE_NAME}
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-7">
          <ul className="flex items-center gap-2">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="rounded-xl px-4 py-2 text-sm font-medium text-zinc-300 transition-all duration-200 hover:bg-white/10 hover:text-white"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          {!user && (
            <Button1 onClick={() => router.push("/sign-in")} className="rounded-xl" text="Login" />
          )}
        </div>

        {/* Hamburger */}
        <button
          className="lg:hidden flex items-center justify-center h-11 w-11 rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[64px] z-[998] px-4">
          {/* Backdrop layer */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-xl" />

          {/* Menu Card */}
          <div className="relative mx-auto max-w-[500px] rounded-3xl border border-white/10 bg-white/[0.04] shadow-2xl backdrop-blur-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
              <p className="text-sm font-medium text-zinc-300">Navigation</p>
              <button
                onClick={() => setIsOpen(false)}
                className="h-9 w-9 flex items-center justify-center rounded-xl bg-white/5 border border-white/10"
              >
                <X size={18} />
              </button>
            </div>

            {/* Links */}
            <ul className="flex flex-col p-3 gap-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between rounded-2xl px-4 py-4 text-sm font-medium text-zinc-300
                         bg-white/[0.02] border border-white/5
                         hover:bg-white/10 hover:text-white transition-all active:scale-[0.98]"
                  >
                    <span>{link.name}</span>
                    <span className="text-zinc-500">→</span>
                  </a>
                </li>
              ))}
            </ul>

            {/* Bottom Action */}
            {!user && (
              <div className="p-4 border-t border-white/10">
                <Button1
                  onClick={() => {
                    setIsOpen(false);
                    router.push("/sign-in");
                  }}
                  className="w-full rounded-2xl py-3 text-base font-medium shadow-[0_0_30px_rgba(139,92,246,0.25)]"
                  text="Login"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
