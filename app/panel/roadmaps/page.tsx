"use client";
import { Button } from "@/components/ui/button";
import ErrorLoading from "@/components/ErrorLoading";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { RoadmapCard, RoadmapCardSkeleton, Roadmap } from "./_components/RoadmapCard";
import fetcher from "@/lib/fetcher";
import useSWR from "swr";
import RoadmapModal from "./_components/RoadmapDialog";
import { createRoadmap, deleteRoadmap, updateRoadmap } from "./_components/services";
import { useTransition } from "react";
export default function page() {
  const {
    data,
    error: roadmapError,
    isLoading: roadmapsLoading,
  } = useSWR<{ data: Roadmap[] }>("/api/user/roadmaps", fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
  });
  const [pending, startTransition] = useTransition();
  const roadmaps = data?.data ?? [];
  async function handleCreate(values: any) {
    startTransition(async () => {
      try {
        await createRoadmap(values);
      } catch (error) {
        console.error(error);
      }
    });
  }

  async function handleUpdate(values: any) {
    startTransition(async () => {
      try {
        await updateRoadmap(values);
      } catch (error) {
        console.error(error);
      }
    });
  }

  async function handleDelete(id: string) {
    startTransition(async () => {
      try {
        await deleteRoadmap(id);
      } catch (error) {
        console.error(error);
      }
    });
  }
  return (
    <div className="grid gap-5 p-4">
      <div className="flex max-md:flex-col md:items-center gap-6 justify-between">
        <h2 className="text-3xl font-semibold">Manage Roadmaps</h2>
        <div className="flex max-md:flex-col gap-5 md:items-center">
          <div className="flex items-center gap-2">
            <Input placeholder="Search Roadmaps" />
            <Button variant={"secondary"}>
              <Search />
            </Button>
          </div>
          <RoadmapModal isSubmitting={pending} mode="create" onSubmit={handleCreate}>
            <Button>+ Create Roadmap</Button>
          </RoadmapModal>
        </div>
      </div>
      <ErrorLoading
        dataLength={roadmaps.length}
        loading={roadmapsLoading}
        error={roadmapError}
        loadingCard={RoadmapCardSkeleton}
        loadingCols={3}
        loadingRows={3}
        loadingCount={9}
        emptyMessage="No Roadmaps Added!"
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {roadmaps.map((roadmap, index: number) => (
            <RoadmapCard
              pending={pending}
              onUpdate={handleUpdate}
              key={roadmap.id}
              data={roadmap}
              onDelete={async () => {
                await handleDelete(roadmap.id);
              }}
              index={index}
            />
          ))}
        </div>
      </ErrorLoading>
    </div>
  );
}
