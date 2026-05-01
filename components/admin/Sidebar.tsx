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
  FileType,
  LucideAppWindow,
  Send,
  Map,
  Headphones,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { SITE_NAME } from "@/lib/constants";
import { AuthStore } from "@/store/AuthInfo";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/panel",
    role: ["ADMIN", "USER"],
  },
  {
    title: "Manage Users",
    icon: Users,
    href: "/panel/manage-users",
    role: ["ADMIN"],
  },
  {
    title: "Manage Websites",
    icon: LucideAppWindow,
    href: "/panel/manage-websites",
    role: ["ADMIN"],
  },
  {
    title: "Customer Insights",
    icon: Send,
    href: "/panel/customer-insights",
    role: ["ADMIN"],
  },
  {
    title: "Templates",
    icon: FileType,
    href: "/panel/templates",
    role: ["ADMIN", "USER"],
  },
  {
    title: "Billings",
    icon: FileText,
    href: "/panel/plans",
    role: ["ADMIN", "USER"],
  },
  {
    title: "Support",
    icon: Headphones,
    href: "/panel/help-desk",
    role: ["USER"],
  },
  {
    title: "Roadmaps",
    icon: Map,
    href: "/panel/roadmaps",
    role: ["ADMIN", "USER"],
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/panel/settings",
    role: ["ADMIN", "USER"],
  },
];

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({ open, setOpen }: Props) {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = React.useState(false);
  const {user} = AuthStore();
  const isExpanded = open || isHovered;

  return (
    <>
      <aside
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "fixed md:sticky top-0 z-[999] h-screen flex flex-col",
          "border-r border-border",
          "bg-sidebar text-sidebar-foreground",
          "transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
          open ? "translate-x-0 w-64" : "-translate-x-full md:translate-x-0",
          isExpanded ? "md:w-64" : "md:w-[68px]",
        )}
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 50% at 50% -10%, hsl(var(--primary) / 0.08) 0%, transparent 70%)",
        }}
      >
        {/* top line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        {/* mobile close */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 md:hidden p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
        >
          <X size={16} />
        </button>

        {/* Logo */}
        <Link href={"/"}>
          <div className="flex items-center gap-3 px-4 py-5 min-h-[72px]">
            <div className="relative shrink-0 h-9 w-9 rounded-xl overflow-hidden ring-1 ring-border">
              <Image src="/logo.png" alt="logo" fill priority className="object-cover" />
            </div>

            <div
              className={cn(
                "overflow-hidden transition-all duration-300",
                isExpanded ? "w-40 opacity-100" : "w-0 opacity-0",
              )}
            >
              <span className="whitespace-nowrap font-semibold text-[15px] tracking-tight uppercase text-sidebar-foreground">
                {SITE_NAME}
              </span>
            </div>
          </div>
        </Link>

        <div className="mx-4 h-[1px] bg-border mb-3" />

        {/* NAV */}
        <ScrollArea className="flex-1 px-3">
          <nav className="flex flex-col gap-1 py-2">
            {menuItems.map((item, index) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link key={index} href={item.href}>
                  <div
                    className={cn(
                      "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 cursor-pointer",
                      "transition-all duration-200",
                      isActive
                        ? [
                            "bg-primary/10 text-primary",
                            "before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2",
                            "before:h-5 before:w-[3px] before:rounded-r-full before:bg-primary",
                          ]
                        : "text-muted-foreground hover:text-foreground hover:bg-accent",
                    )}
                    title={!isExpanded ? item.title : undefined}
                  >
                    {isActive && (
                      <span className="absolute inset-0 rounded-xl ring-1 ring-primary/20" />
                    )}

                    <span className="shrink-0 flex items-center justify-center w-5 h-5">
                      <Icon
                        size={18}
                        strokeWidth={isActive ? 2 : 1.6}
                        className={cn(
                          "transition-all duration-200",
                          isActive ? "text-primary" : "group-hover:text-foreground",
                        )}
                      />
                    </span>

                    <div
                      className={cn(
                        "flex items-center justify-between flex-1 overflow-hidden transition-all duration-300",
                        isExpanded ? "w-auto opacity-100" : "w-0 opacity-0",
                      )}
                    >
                      <span
                        className={cn(
                          "whitespace-nowrap text-[13.5px] font-medium",
                          isActive && "text-primary",
                        )}
                      >
                        {item.title}
                      </span>

                      {!isActive && (
                        <ChevronRight
                          size={13}
                          className="opacity-0 group-hover:opacity-40 -translate-x-1 group-hover:translate-x-0 transition-all duration-200 shrink-0"
                        />
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </nav>
        </ScrollArea>

        {/* bottom */}
        <div className="mt-auto mx-3 mb-4">
          <div className="h-[1px] bg-border mb-3" />

          <div
            className={cn(
              "flex items-center gap-3 rounded-xl px-2 py-2",
              "bg-accent/50 border border-border",
              "cursor-pointer hover:bg-accent transition-colors",
            )}
          >
            <div className="shrink-0 h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-[11px] font-semibold text-primary-foreground">{user?.name?.charAt(0)?.toUpperCase() ?? "A"}</span>
            </div>

            <div
              className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out",
                isExpanded ? "max-w-[180px] opacity-100 ml-2" : "max-w-0 opacity-0 ml-0",
              )}
            >
              <p className="truncate text-[12.5px] font-medium text-foreground leading-tight">
                {user?.name || "Admin User"}
              </p>

              <p className="truncate text-[11px] text-muted-foreground leading-tight">
                {user?.email || "admin@site.com"}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
