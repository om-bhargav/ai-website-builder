"use client";
import React, { useState } from "react";
import Sidebar from "@/components/admin/Sidebar";
import dynamic from "next/dynamic";
import { montserrat } from "@/lib/fonts";
const Topbar = dynamic(() => import("@/components/admin/Topbar"));
export default function Layout({ children }: React.PropsWithChildren) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`h-screen w-full flex ${montserrat.className}`}>
      <Sidebar open={open} setOpen={setOpen} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar setOpen={setOpen} />

        <div className="flex-1 overflow-y-auto p-5 pb-2">
          <div className="h-full overflow-y-auto rounded-xl bg-sidebar shadow-lg p-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
