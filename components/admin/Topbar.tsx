"use client";

import * as React from "react";
import {
  Search,
  Bell,
  User,
  LogOut,
  Settings,
  CheckCheck,
  Menu,
  TextAlignJustify,
} from "lucide-react";
import dynamic from "next/dynamic";
const ThemeSwitch = dynamic(()=>import("../admin/ThemeSwitch"));
import { AppIcon } from "@/components/AppIcon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Topbar({ setOpen }: Props) {

  const notifications = [
    {
      id: 1,
      title: "New Order Received",
      description: "Order #10234 has been placed.",
      time: "2 min ago",
      unread: true,
    },
    {
      id: 2,
      title: "New User Registered",
      description: "John Doe just created an account.",
      time: "10 min ago",
      unread: true,
    },
    {
      id: 3,
      title: "Server Backup Completed",
      description: "Daily backup completed successfully.",
      time: "1 hour ago",
      unread: false,
    },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-muted-background 
    bg-sidebar backdrop-blur-xl supports-[backdrop-filter]:bg-sidebar
    shadow-[0_8px_30px_rgb(0,0,0,0.04)] "
    >
      <div className="flex h-16 items-center justify-between px-8">
        {/* LEFT */}
        <div className="flex items-center gap-8">
          <Button size={"icon-lg"} onClick={() => setOpen((prev) => !prev)} variant={"outline"}>
            <AppIcon size={25} icon={TextAlignJustify} />
          </Button>

          {/* Premium Search */}
          <div className="relative hidden lg:block group">
            <Search
              size={20}
              className="absolute z-5 left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary"
            />
            <Input
              placeholder="Search"
              className="w-96 rounded-2xl border py-5! border-border/50 
              bg-accent/40 pl-11 pr-4 
              shadow-sm backdrop-blur-sm
               
              focus-visible:ring-1 focus-visible:ring-primary
              hover:bg-input!
              focus-visible:bg-background
              "
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          {/* Animated Theme Toggle */}
          <ThemeSwitch className="scale-150" />

          {/* Notifications */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative h-10 w-10 rounded-xl 
                bg-accent/40 hover:bg-accent 
                 "
              >
                <Bell className="h-5 w-5" />

                {unreadCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1 
                  flex h-5 min-w-[20px] items-center justify-center 
                  rounded-full bg-primary text-[10px] font-semibold 
                  text-primary-foreground shadow-lg animate-pulse"
                  >
                    {unreadCount}
                  </span>
                )}
              </Button>
            </PopoverTrigger>

            <PopoverContent
              align="end"
              className="w-[420px] rounded-2xl border border-border/50 
              bg-background/80 backdrop-blur-xl p-0 shadow-2xl"
            >
              <div className="flex items-center justify-between px-5 py-4">
                <h3 className="text-sm font-semibold tracking-wide">Notifications</h3>
                <Button variant="ghost" size="sm" className="gap-1 text-xs">
                  <CheckCheck className="h-4 w-4" />
                  Mark all
                </Button>
              </div>

              <Separator />

              <ScrollArea className="h-80">
                <div className="divide-y">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="group cursor-pointer px-5 py-4 
                        hover:bg-accent/60"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{n.title}</p>
                        {n.unread && (
                          <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                        )}
                      </div>

                      <p className="mt-1 text-xs text-muted-foreground">{n.description}</p>

                      <span className="mt-2 block text-[10px] text-muted-foreground">{n.time}</span>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </PopoverContent>
          </Popover>

          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-3 rounded-2xl px-3 py-2 
                bg-accent/40 hover:bg-accent  "
              >
                <div
                  className="flex h-10 w-10 items-center justify-center 
                rounded-full bg-gradient-to-br from-primary to-primary/70 
                text-primary-foreground text-sm font-semibold 
                shadow-lg ring-2 ring-primary/20"
                >
                  A
                </div>

                <div className="hidden text-left md:block">
                  <p className="text-sm font-medium leading-none">Admin</p>
                  <p className="text-xs text-muted-foreground">admin@email.com</p>
                </div>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-60 rounded-xl">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem className="gap-2 rounded-lg">
                <User className="h-4 w-4" />
                Profile
              </DropdownMenuItem>

              <DropdownMenuItem className="gap-2 rounded-lg">
                <Settings className="h-4 w-4" />
                Settings
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem className="gap-2 rounded-lg text-destructive">
                <LogOut className="h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
