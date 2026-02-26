"use client";
import React, { useState } from "react";
import Sidebar from "@/components/admin/Sidebar";
import dynamic from "next/dynamic";
const Topbar = dynamic(()=>import("@/components/admin/Topbar"));
import {cascadiaCode} from "@/lib/fonts";
export default function layout({ children }: React.PropsWithChildren) {
  const [open,setOpen] = useState(false);
  return (
    <div className={`min-h-screen w-full flex ${cascadiaCode.className}`}>
      <Sidebar open={open} setOpen={setOpen}/>
      <div className="flex flex-col flex-1">
        <Topbar setOpen={setOpen}/>
        <div className="flex-1 h-full p-5">
          <div className="w-full h-full pt-4 px-4 pb-2 rounded-xl bg-sidebar shadow-lg">{children}</div>
        </div>
      </div>
    </div>
  );
}
