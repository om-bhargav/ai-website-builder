"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import TemplateCard, { TemplateCardSkeleton, Template } from "./_components/TemplateCard";
import ErrorLoading from "@/components/ErrorLoading";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";

export default function Page() {
  const [search, setSearch] = useState("");

  const {
    data,
    isLoading: loading,
    error,
    mutate,
  } = useSWR(`/api/templates?search=${encodeURIComponent(search)}`, fetcher);

  const templates = data?.data || [];

  const handleSearch = () => {
    mutate(); // revalidate with updated search state
  };

  return (
    <div className="grid gap-5 p-4">
      {/* HEADER */}
      <div className="flex max-md:flex-col gap-5 md:items-center justify-between">
        <h2 className="text-3xl font-semibold">Choose a Template</h2>

        <div className="flex max-md:flex-col gap-5 md:items-center">
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search Templates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />

            <Button variant="secondary" onClick={handleSearch}>
              <Search size={18} />
            </Button>
          </div>
        </div>
      </div>

      {/* GRID */}

      <ErrorLoading
        loading={loading}
        error={undefined} // pass real error state if you have it
        dataLength={templates.length}
        loadingCard={TemplateCardSkeleton}
        loadingCols={3}
        loadingRows={2}
        emptyMessage="No templates found"
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {templates.map((tpl: Template, index: number) => (
            <TemplateCard key={tpl.id} index={index} template={tpl} />
          ))}
        </div>
      </ErrorLoading>
    </div>
  );
}
