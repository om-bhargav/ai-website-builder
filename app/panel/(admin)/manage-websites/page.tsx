"use client";

import { useState } from "react";
import WebsiteCard, { Website, WebsiteCardSkeleton } from "./_components/WebsiteCard";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import fetcher from "@/lib/fetcher";
import useSWR from "swr";
import ErrorLoading from "@/components/ErrorLoading";

export default function Page() {
  const [search, setSearch] = useState("");
  const {
    data,
    isLoading: loading,
    error,
    mutate,
  } = useSWR<{ data: Website[] }>("/api/admin/websites", fetcher);
  const websites = data?.data ?? [];
  /* ---------------- SEARCH ---------------- */
  const filtered = websites.filter((w) => w.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="grid gap-5 p-4">
      {/* Header */}
      <div className="flex max-md:flex-col md:items-center gap-5 justify-between">
        <div>
          <h2 className="text-3xl font-semibold">Website Management</h2>
          <p className="text-sm text-muted-foreground">
            Control, feature, block or remove user websites
          </p>
        </div>

        <div className="flex max-md:flex-col gap-5 md:items-center">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search websites..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button variant="secondary">
              <Search size={16} />
            </Button>
          </div>
        </div>
      </div>

      {/* GRID */}
      <ErrorLoading
        loading={loading}
        dataLength={filtered.length}
        loadingCard={WebsiteCardSkeleton}
        error={error}
        loadingCols={3}
        emptyMessage="No websites found"
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((website, index) => (
            <WebsiteCard key={website.id} index={index} website={website} onRefresh={mutate} />
          ))}
        </div>
      </ErrorLoading>
    </div>
  );
}
