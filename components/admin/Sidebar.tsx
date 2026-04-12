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
  Ellipsis,
  HelpingHand,
  Send,
  Map,
  MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AppIcon } from "../AppIcon";
import Image from "next/image";
import { SITE_NAME } from "@/lib/constants";
import { Button } from "../ui/button";

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
    title: "manage websites",
    icon: LucideAppWindow,
    href: "/panel/manage-websites",
  },
  {
    title: "customer insights",
    icon: Send,
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
    href: "/panel/plans",
  },
  {
    title: "Support",
    icon: HelpCircle,
    href: "/panel/help-desk",
  },
  {
    title: "Roadmaps",
    icon: Map,
    href: "/panel/roadmaps",
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/panel/settings",
  },
];

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({ open, setOpen }: Props) {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = React.useState(false);

  const isDesktopOpen = isHovered; // only hover controls desktop
  const isMobileOpen = open; // state controls mobile

  return (
    <aside
      className={cn(
        "fixed md:sticky top-0 z-50 h-screen z-100 border-r border-muted-background bg-sidebar transition-all duration-300 ease-in-out",
        "md:translate-x-0",
        open ? "translate-x-0 w-64" : "-translate-x-full md:translate-x-0 md:w-20",
      )}
    >
      <X onClick={() => setOpen(false)} className="justify-self-end md:hidden mr-5 mt-5" />
      <div className="flex md:h-full flex-col">
        {/* Logo Section */}
        <div className={`flex md:justify-center px-6 md:py-6`}>
          <div className="flex items-center gap-3">
            <div className="flex relative h-14 w-14 items-center justify-center text-primary-foreground font-semibold text-lg">
              <Image loading="eager" src={"/logo.png"} alt={"logo..."} fill priority />
            </div>
            <div className={`${!open && "md:hidden"}`}>
              <h2 className="text-lg md:text-2xl uppercase tracking-loose">{SITE_NAME}</h2>
            </div>
          </div>
        </div>
        <Button
          size={"icon"}
          className={`${open ? "hidden" : "max-md:hidden"} place-self-center`}
          variant={"ghost"}
        >
          <Ellipsis />
        </Button>
        {/* Navigation */}
        <ScrollArea className="flex-1 px-3 py-6">
          <nav className="grid gap-3">
            {menuItems.map((item, index) => (
              <Link key={index} href={item.href!}>
                <div
                  className={cn(
                    "relative flex text-md! text-accent-foreground items-center capitalize gap-3 rounded-xl px-4 py-3 text-sm font-medium",
                    pathname === item.href ? "bg-sidebar-ring" : "hover:bg-muted-foreground/20",
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
