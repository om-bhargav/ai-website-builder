"use client";
import React from "react";
import { SITE_NAME } from "@/lib/constants";
import {Twitter,Facebook,Linkedin,Instagram,Github,Youtube} from "lucide-react";
const Footer = () => {
  return (
    <div className="px-3 border-t flex justify-between mt-5">
      <div className="container max-w-[1400px] flex flex-col items-center lg:flex-row justify-between mx-auto py-4 gap-5">
        <div className="flex gap-9 items-center flex-col items-center">
          <div className="flex max-md:justify-between gap-3 items-center">
            <div>
              <img src="/logo.png" className="h-20 object-cover" />
            </div>
            <div>
              <div className="text-2xl font-semibold uppercase">{SITE_NAME}</div>
              <div className="text-sm">
                AI POWERED WEBSITE CREATION
                <br />
                NO CODE REQUIRED!
              </div>
            </div>
          </div>
          <div className="lg:self-start max-md:hidden">&copy; {SITE_NAME}. All Rights Reserved.</div>
        </div>
        <div className="grid gap-7">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="grid place-items-center gap-2">
              <div className="text-lg font-semibold">Product</div>
              <a href="">Features</a>
              <a href="">Showcase</a>
            </div>
            <div className="grid place-items-center gap-2">
              <div className="text-lg font-semibold">Company</div>
              <a href="">About us</a>
              <a href="">Careers</a>
            </div>
            <div className="grid place-items-center gap-2">
              <div className="text-lg font-semibold">Support</div>
              <a href="">Help Center</a>
              <a href="">Blog</a>
            </div>
            <div className="grid place-items-center gap-2">
              <div className="text-lg font-semibold">Help Center</div>
              <a href="">Contact</a>
              <a href="">Privacy</a>
            </div>
          </div>
          <div className="flex gap-5 place-self-end">
            <a
              href="#"
              className="hover:text-blue-400 transition-colors duration-200"
              aria-label="Twitter"
            >
              <Twitter size={24} />
            </a>
            <a
              href="#"
              className="hover:text-blue-600 transition-colors duration-200"
              aria-label="Facebook"
            >
              <Facebook size={24} />
            </a>
            <a
              href="#"
              className="hover:text-blue-700 transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="#"
              className="hover:text-pink-500 transition-colors duration-200"
              aria-label="Instagram"
            >
              <Instagram size={24} />
            </a>
            <a
              href="#"
              className="hover:text-gray-800 transition-colors duration-200"
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
            <a
              href="#"
              className="hover:text-red-600 transition-colors duration-200"
              aria-label="YouTube"
            >
              <Youtube size={24} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
