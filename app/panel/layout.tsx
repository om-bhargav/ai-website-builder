"use client";
import React, { useState } from "react";
import Sidebar from "@/components/admin/Sidebar";
import dynamic from "next/dynamic";
import {montserrat} from "@/lib/fonts";
const Topbar = dynamic(()=>import("@/components/admin/Topbar"));
export default function Layout({ children }: React.PropsWithChildren) {
  const [open,setOpen] = useState(false);
  return (
    <div className={`min-h-screen w-full flex ${montserrat.className}`}>
      <Sidebar open={open} setOpen={setOpen}/>
      <div className="flex flex-col flex-1">
        <Topbar setOpen={setOpen}/>
        <div className="flex-1 h-full p-5">
          <div className="w-full h-full md:pt-4 md:px-4 md:pb-2 max-md:py-3 max-md:px-3 rounded-xl bg-sidebar shadow-lg">{children}</div>
        </div>
      </div>
    </div>
  );
}
