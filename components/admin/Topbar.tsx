"use client";

import * as React from "react";
import { Search, Bell, User, LogOut, Settings, CheckCheck, TextAlignJustify } from "lucide-react";
import dynamic from "next/dynamic";
const ThemeSwitch = dynamic(() => import("../admin/ThemeSwitch"));

import { AppIcon } from "@/components/AppIcon";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { AuthStore } from "@/store/AuthInfo";
import Link from "next/link";
import toast from "react-hot-toast";

interface Props {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Topbar({ setOpen }: Props) {
  const { user, resetUser } = AuthStore();

  const handleLogout = async () => {
    try {
      await signOut({
        redirect: true,
        redirectTo: "/"
      });
      resetUser(); // clear zustand
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-muted-background 
      bg-sidebar backdrop-blur-xl supports-[backdrop-filter]:bg-sidebar
      shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
    >
      <div className="flex h-16 items-center justify-between px-8">
        {/* LEFT */}
        <div className="flex items-center gap-8">
          <Button size={"icon-lg"} onClick={() => setOpen((prev) => !prev)} variant={"outline"}>
            <AppIcon size={25} icon={TextAlignJustify} />
          </Button>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-3">
          <ThemeSwitch className="scale-150" />

          {/* Notifications */}
          {/* <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative h-10 w-10 rounded-xl bg-accent/40 hover:bg-accent"
              >
                <Bell className="h-5 w-5" />

                {unreadCount > 0 && (
                  <span
                    className="absolute -top-1 -right-1 flex h-5 min-w-[20px] items-center justify-center 
                    rounded-full bg-primary text-[10px] font-semibold text-primary-foreground shadow-lg animate-pulse"
                  >
                    {unreadCount}
                  </span>
                )}
              </Button>
            </PopoverTrigger>

            <PopoverContent
              align="end"
              className="w-[420px] rounded-2xl border border-border/50 bg-background/80 backdrop-blur-xl p-0 shadow-2xl"
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
                    <div key={n.id} className="group cursor-pointer px-5 py-4 hover:bg-accent/60">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{n.title}</p>
                        {n.unread && <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />}
                      </div>

                      <p className="mt-1 text-xs text-muted-foreground">{n.description}</p>
                      <span className="mt-2 block text-[10px] text-muted-foreground">{n.time}</span>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </PopoverContent>
          </Popover> */}

          {/* PROFILE */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="flex items-center gap-3 rounded-2xl px-2 bg-transparent hover:bg-accent"
              >
                {/* Avatar */}
                {user?.image ? (
                  <img
                    src={user.image}
                    alt={user.name}
                    className="h-10 w-10 rounded-full object-cover ring-2 ring-primary/20"
                  />
                ) : (
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full 
                    bg-gradient-to-br from-primary to-primary/70 text-primary-foreground 
                    text-sm font-semibold shadow-lg ring-2 ring-primary/20"
                  >
                    {user?.name?.charAt(0).toUpperCase() || "A"}
                  </div>
                )}

                {/* <div className="hidden text-left md:block">
                  <p className="text-sm font-medium leading-none">
                    {user?.name || "Admin"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {user?.email || "admin@email.com"}
                  </p>
                </div> */}
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-60 rounded-xl">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem className="gap-2 rounded-lg">
                <Link href={"/panel/settings"} className="flex gap-2 items-center">
                  <Settings className="h-4 w-4" />
                  Settings
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={handleLogout}
                className="gap-2 rounded-lg text-destructive"
              >
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
