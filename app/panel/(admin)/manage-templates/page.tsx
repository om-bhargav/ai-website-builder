"use client";
import { Button } from "@/components/ui/button";
import TemplateCard, { Template, TemplateCardSkeleton } from "./_components/TemplateCard";
import TemplateModal from "./_components/TemplateDialog";
import { Input } from "@/components/ui/input";
import { Search, Plus } from "lucide-react";
import ErrorLoading from "@/components/ErrorLoading";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";

export default function Page() {
  const { data, isLoading: loading, error, mutate } = useSWR("/api/admin/templates",fetcher);
  const templates = data?.data ?? [];
  return (
    <div className="grid gap-5 p-4">
      {/* HEADER */}
      <div className="flex max-md:flex-col gap-5 md:items-center justify-between">
        <h2 className="text-3xl font-semibold">Manage Templates</h2>

        <div className="flex max-md:flex-col gap-5 md:items-center">
          <div className="flex items-center gap-2">
            <Input placeholder="Search Templates" />
            <Button variant="secondary">
              <Search />
            </Button>
          </div>

          {/* CREATE MODAL */}
          <TemplateModal mode="create" onSuccess={mutate}>
            <Button>
              <Plus className="w-4 h-4 mr-1" />
              Create Template
            </Button>
          </TemplateModal>
        </div>
      </div>

      {/* GRID */}
      <ErrorLoading
        loading={loading}
        error={error}
        dataLength={templates?.length}
        loadingCols={3}
        loadingRows={2}
        loadingCard={TemplateCardSkeleton}
        emptyMessage="No templates found"
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {templates.map((tpl: Template, index: number) => (
            <TemplateCard key={tpl.id} index={index} template={tpl} onRefresh={mutate} />
          ))}
        </div>
      </ErrorLoading>
    </div>
  );
}
