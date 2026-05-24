"use client";

import Link from "next/link";
import { SITE_NAME } from "@/config";

import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react";

const footerSections = [
  {
    title: "Product",
    links: [
      {
        label: "Features",
        href: "/features",
      },
      {
        label: "Showcase",
        href: "/showcase",
      },
    ],
  },
  {
    title: "Company",
    links: [
      {
        label: "About us",
        href: "/about-us",
      },
      {
        label: "Careers",
        href: "/careers",
      },
    ],
  },
  {
    title: "Support",
    links: [
      {
        label: "Help Center",
        href: "/help-center",
      },
      {
        label: "Blog",
        href: "/blog",
      },
    ],
  },
  {
    title: "Help Center",
    links: [
      {
        label: "Contact",
        href: "/contact-us",
      },
      {
        label: "Privacy",
        href: "/privacy-policy",
      },
    ],
  },
];

const socialLinks = [
  {
    icon: Twitter,
    href: "#",
    label: "Twitter",
    className: "hover:text-blue-400",
  },
  {
    icon: Facebook,
    href: "#",
    label: "Facebook",
    className: "hover:text-blue-600",
  },
  {
    icon: Linkedin,
    href: "#",
    label: "LinkedIn",
    className: "hover:text-blue-700",
  },
  {
    icon: Instagram,
    href: "#",
    label: "Instagram",
    className: "hover:text-pink-500",
  },
  {
    icon: Github,
    href: "#",
    label: "GitHub",
    className: "hover:text-gray-800",
  },
  {
    icon: Youtube,
    href: "#",
    label: "YouTube",
    className: "hover:text-red-600",
  },
];

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
              <div className="text-2xl font-semibold uppercase">
                {SITE_NAME}
              </div>

              <div className="text-sm">
                AI POWERED WEBSITE CREATION
                <br />
                NO CODE REQUIRED!
              </div>
            </div>
          </div>

          <div className="lg:self-start uppercase max-md:hidden">
            &copy; {SITE_NAME}. All Rights Reserved.
          </div>
        </div>

        <div className="grid gap-7">

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

            {footerSections.map((section) => (
              <div
                key={section.title}
                className="grid place-items-center gap-2"
              >
                <div className="text-lg font-semibold">
                  {section.title}
                </div>

                {section.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                  >
                    {link.label}
                  </Link>
                ))}

              </div>
            ))}

          </div>

          <div className="flex gap-5 place-self-end">

            {socialLinks.map((social) => {
              const Icon = social.icon;

              return (
                <Link
                  key={social.label}
                  href={social.href}
                  className={`${social.className} transition-colors duration-200`}
                  aria-label={social.label}
                >
                  <Icon size={24} />
                </Link>
              );
            })}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;