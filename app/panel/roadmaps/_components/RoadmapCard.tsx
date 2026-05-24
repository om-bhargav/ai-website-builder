"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import RoadmapModal from "./RoadmapDialog";
import ConfirmationDialog from "@/components/modals/ConfirmationModal";
export type Roadmap = {
  id: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
};
type RoadmapCardProps = {
  data: Roadmap;
  index: number;
  onDelete: () => void;
  pending: boolean;
  onUpdate: (values: any) => void;
};

export function RoadmapCard({ data, index, onDelete, pending, onUpdate }: RoadmapCardProps) {
  const router = useRouter();
  const onWork = () => {
    router.push(`/panel/roadmaps/${data.id}`);
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.4,
        delay: index * 0.08,
        ease: "easeOut",
      }}
      whileHover={{ scale: 1.01, y: -4, transition: { delay: 0 } }}
      whileTap={{ scale: 0.98 }}
      className="w-full max-w-md"
    >
      <Card className="rounded-2xl shadow-sm hover:shadow-md transition relative">
        {/* 📄 Content */}
        <CardHeader>
          <CardTitle className="text-xl font-semibold pr-8">{data.title}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground line-clamp-3">{data.description}</p>

          <div className="text-xs text-muted-foreground flex flex-col gap-1">
            <span>Created: {new Date(data.created_at).toLocaleDateString()}</span>
            <span>Updated: {new Date(data.updated_at).toLocaleDateString()}</span>
          </div>

          {/* ⚡ Optional Quick Actions (inline buttons) */}
          <div className="flex gap-2 pt-2">
            <Button size="sm" variant="secondary" onClick={onWork}>
              Work
            </Button>
            <RoadmapModal initialData={data} mode="edit" onSubmit={onUpdate}>
              <Button size="sm" variant="outline">
                Edit
              </Button>
            </RoadmapModal>
            <ConfirmationDialog onConfirm={onDelete}>
              <Button size="sm" variant="destructive">
                Delete
              </Button>
            </ConfirmationDialog>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function RoadmapCardSkeleton() {
  return (
    <Card className="w-full max-w-md rounded-2xl">
      <CardHeader>
        <Skeleton className="h-6 w-3/4 rounded-md bg-gray-600" />
      </CardHeader>

      <CardContent className="space-y-3">
        <Skeleton className="h-4 w-full bg-gray-600" />
        <Skeleton className="h-4 w-5/6 bg-gray-600" />
        <Skeleton className="h-4 w-2/3 bg-gray-600" />

        <div className="space-y-2 pt-2">
          <Skeleton className="h-3 w-1/2 bg-gray-600" />
          <Skeleton className="h-3 w-1/3 bg-gray-600" />
        </div>
      </CardContent>
    </Card>
  );
}
