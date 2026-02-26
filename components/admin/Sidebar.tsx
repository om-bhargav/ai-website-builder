"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Settings,
  FileText,
  X,
  Files,
  HelpCircle,
  FileType,
  LucideAppWindow,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AppIcon } from "../AppIcon";
import Image from "next/image";
import { SITE_NAME } from "@/lib/constants";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/panel",
  },
  {
    title: "Manage Users",
    icon: Users,
    href: "/panel/manage-users",
  },
  {
    title: "Manage Templates",
    icon: Files,
    href: "/panel/manage-templates",
  },
  {
    title: "manage websites",
    icon: LucideAppWindow,
    href: "/panel/manage-websites",
  },
  {
    title: "customer insights",
    icon: HelpCircle,
    href: "/panel/customer-insights",
  },
  {
    title: "Templates",
    icon: FileType,
    href: "/panel/templates",
  },
  {
    title: "Billings",
    icon: FileText,
    href: "/panel/billings",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/panel/settings",
  }
];

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({ open,setOpen }: Props) {
  const pathname = usePathname();

  return (
    <aside
      className={`max-md:fixed sticky top-0 transition-all ${open ? "grid w-65 max-md:left-0" : "max-md:-left-100 md:w-19"} z-100 h-screen border-r border-muted-background bg-sidebar`}
    >
      <X onClick={()=>setOpen(false)} className="justify-self-end md:hidden mr-5 mt-5"/>
      <div className="flex h-full flex-col">
        {/* Logo Section */}
        <div className={`flex justify-center px-6 py-6`}>
          <div className="flex items-center gap-3">
            <div className="flex relative h-14 w-14 items-center justify-center text-primary-foreground font-semibold text-lg">
              <Image loading="eager" src={"/logo.png"} alt={"logo..."} fill priority />
            </div>
            <div className={`${!open && "md:hidden"}`}>
              <h2 className="text-lg md:text-2xl uppercase tracking-loose">{SITE_NAME}</h2>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-3 py-6">
          <nav className="grid gap-3">
            {menuItems.map((item, index) => (
              <Link key={index} href={item.href!}>
                <div
                  className={cn(
                    "relative flex text-md! text-accent-foreground items-center capitalize gap-3 rounded-xl px-4 py-3 text-sm font-medium",
                    pathname === item.href
                      ? "bg-sidebar-ring"
                      : "hover:bg-muted-foreground/20",
                  )}
                >
                  <AppIcon size={20} icon={item.icon} />
                  {open && item.title}
                </div>
              </Link>
            ))}
          </nav>
        </ScrollArea>
      </div>
    </aside>
  );
}
