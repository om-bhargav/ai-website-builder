"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SITE_NAME } from "@/config";
import { cn } from "@/lib/utils";
import { AuthStore } from "@/store/AuthInfo";
import {
  BookOpen,
  ChevronRight,
  CreditCard,
  FileType,
  Headphones,
  LayoutDashboard,
  LucideAppWindow,
  LucideBookTemplate,
  LucideLayoutTemplate,
  LucidePackage,
  LucideWebhook,
  Map,
  Package2,
  Send,
  Settings,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
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
    title: "Websites",
    icon: LucideWebhook,
    href: "/panel/websites",
    role: ["USER"],
  },
  {
    title: "Manage Templates",
    icon: LucideLayoutTemplate,
    href: "/panel/manage-templates",
    role: ["ADMIN"],
  },
  {
    title: "Manage Plans",
    icon: LucidePackage,
    href: "/panel/manage-plans",
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
    role: ["USER"],
  },
  { title: "Transactions", icon: CreditCard, href: "/panel/transactions", role: ["USER"] },
  {
    title: "Plans",
    icon: Package2,
    href: "/panel/plans",
    role: ["USER"],
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
    role: ["USER"],
  },
  {
    title: "Blogs",
    icon: BookOpen,
    href: "/panel/blogs",
    role: ["ADMIN"],
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/panel/settings",
    role: ["USER"],
  },
];

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Sidebar({ open, setOpen }: Props) {
  const pathname = usePathname();
  const [isHovered, setIsHovered] = React.useState(false);
  const { user } = AuthStore();
  const isExpanded = open || isHovered;

  return (
    <>
      <aside
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "fixed md:sticky top-0 z-[999] h-screen  flex flex-col",
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

        <div className="flex items-center gap-3 px-4  min-h-[64px]">
          <div className="relative shrink-0 h-9 w-10 rounded-xl overflow-hidden ring-1 ring-border">
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
        <div className="h-[1px] bg-border mb-3" />

        {/* NAV */}
        <ScrollArea className="flex-1 px-3 overflow-y-auto">
          <nav className="flex flex-col gap-1 py-2">
            {menuItems
              .filter((item) => item.role.includes(user?.role ?? "USER"))
              .map((item, index) => {
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
        <div className="mt-auto px-2 pb-3">
          <div className="mb-3 h-px bg-border/70" />

          <div
            className={cn(
              "group relative overflow-hidden rounded-2xl border border-border/60",
              "bg-background/80 backdrop-blur-xl",
              "transition-all duration-300",
              "hover:bg-accent/40 hover:border-primary/20",
              isExpanded ? "px-3 py-3" : "px-2 py-2",
            )}
          >
            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            <div
              className={cn("relative flex items-center", isExpanded ? "gap-3" : "justify-center")}
            >
              {/* Avatar */}
              <Avatar
                className={cn(
                  "border border-border shadow-sm transition-all duration-300",
                  isExpanded ? "h-10 w-10" : "h-9 w-9",
                )}
              >
                <AvatarFallback className="bg-primary text-xs font-semibold text-primary-foreground">
                  {user?.name?.charAt(0)?.toUpperCase() ?? "A"}
                </AvatarFallback>
              </Avatar>

              {/* Expanded Content */}
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300 ease-in-out",
                  isExpanded ? "max-w-[140px] opacity-100" : "max-w-0 opacity-0",
                )}
              >
                <div className="flex items-center gap-2">
                  <p className="truncate text-sm font-medium text-foreground">
                    {user?.name || "Admin"}
                  </p>

                  <Badge variant="secondary" className="h-4 rounded px-1 text-[9px]">
                    {user?.role || "ADMIN"}
                  </Badge>
                </div>

                <p className="truncate text-[11px] text-muted-foreground">
                  {user?.email || "admin@site.com"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
