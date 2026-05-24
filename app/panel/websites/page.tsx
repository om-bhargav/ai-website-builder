"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import WebsiteCard, { WebsiteCardSkeleton, Website } from "./_components/WebsiteCard";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import ErrorLoading from "@/components/ErrorLoading";
import fetcher from "@/lib/fetcher";
import useSWR from "swr";
import WebsiteDialog from "./_components/WebsiteDialog";

export default function Page() {
  const [search, setSearch] = useState("");
  const {
    data,
    isLoading: loading,
    error,
    mutate,
  } = useSWR<{ data: Website[] }>("/api/user/websites", fetcher);
  const websites = data?.data ?? [];
  
  const filtered = websites.filter((w) => w.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="grid gap-5 p-4">
      {/* HEADER */}
      <div className="flex max-md:flex-col md:items-center gap-5 justify-between">
        <h2 className="text-3xl font-semibold">My Websites</h2>

        <div className="flex max-md:flex-col gap-5 md:items-center">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search Websites"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button variant="secondary">
              <Search />
            </Button>
          </div>
          <WebsiteDialog mode="create" onSuccess={mutate}>
            <Button>+ Create Website</Button>
          </WebsiteDialog>
        </div>
      </div>

      {/* GRID WITH ERRORLOADING */}
      <ErrorLoading
        loading={loading}
        dataLength={filtered.length}
        loadingCard={WebsiteCardSkeleton}
        loadingCols={3}
        error={error}
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
