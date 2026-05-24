"use client";

import React from "react";
import useSWR from "swr";
import { useParams } from "next/navigation";
import { Loader2, ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";

const fetcher = async (url: string) => {
  const res = await fetch(url);

  const data = await res.json();

  if (!data.success) {
    throw new Error(data.message);
  }

  return data.data;
};

type Website = {
  id: string;
  title: string;
  file?: string;
};

export default function WebsitePreviewPage({
  id,
  type,
}: {
  id: string;
  type: "website" | "template";
}) {
  const role = type === "template" ? "admin" : "user";
  const typePath = type === "template" ? "templates" : "websites";
  const {
    data: website,
    isLoading,
    error,
  } = useSWR<Website>(id ? `/api/${role}/${typePath}/${id}` : null, fetcher);

  // =========================
  // LOADING
  // =========================
  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  // =========================
  // ERROR
  // =========================
  if (error || !website) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <p className="text-muted-foreground">{error?.message || "Website not found"}</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex flex-col bg-background">
      {/* HEADER */}
      <div className="h-14 border-b flex items-center justify-between px-4 shrink-0">
        <div>
          <h1 className="font-semibold text-sm">{website.title}</h1>

          <p className="text-xs text-muted-foreground">Live Preview</p>
        </div>

        <Button
          size="sm"
          onClick={() => {
            const newTab = window.open();

            if (newTab) {
              newTab.document.write(website.file || "");
              newTab.document.close();
            }
          }}
        >
          <ExternalLink size={14} />
          Open in New Tab
        </Button>
      </div>

      {/* WEBSITE */}
      <div className="flex-1 overflow-hidden">
        {website.file ? (
          <iframe
            srcDoc={website.file}
            title={website.title}
            className="w-full h-full border-0"
            sandbox="allow-scripts allow-same-origin"
          />
        ) : (
          <div className="h-full flex items-center justify-center">
            <p className="text-muted-foreground text-sm">No generated website found</p>
          </div>
        )}
      </div>
    </div>
  );
}
