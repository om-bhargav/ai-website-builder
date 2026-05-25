"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Eye, Globe, Calendar, BarChart, ExternalLink, Trash2, Pencil } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import toast from "react-hot-toast";
import WebsiteDialog from "./WebsiteDialog"; // 👈 ADD THIS
import { formatDateTime } from "@/lib/date-time";
import Link from "next/link";

export type Website = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  status: "PUBLISHED" | "UNDER_DEVELOPMENT" | "DRAFT";
  views?: number;
  featured?: boolean;
  blocked?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export default function WebsiteCard({
  index,
  website,
  onRefresh,
}: {
  index: number;
  website: Website;
  onRefresh: () => void;
}) {
  const [loading, setLoading] = useState(false);

  /* ---------------- DELETE ---------------- */
  const handleDelete = async () => {
    try {
      setLoading(true);

      const res = await fetch(`/api/user/websites/${website.id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      toast.success("Website deleted");
      onRefresh?.();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.12 * index }}
      className="w-full max-w-xl"
    >
      <Card className="overflow-hidden bg-background/30 pt-0 rounded-2xl shadow-xl">
        {/* Thumbnail */}
        <div className="relative h-52 w-full overflow-hidden">
          <Image
            src={website.thumbnail}
            alt="thumbnail"
            fill
            className="object-cover hover:scale-105 transition-all duration-500"
          />

          <div className="absolute top-3 left-3 flex gap-2">
            {website.featured && <Badge className="bg-yellow-500 text-black">Featured</Badge>}

            {website.blocked && <Badge variant="destructive">Blocked</Badge>}
          </div>
        </div>

        {/* HEADER */}
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">{website.title}</CardTitle>

            <Badge
              variant={
                website.status === "PUBLISHED"
                  ? "default"
                  : website.status === "UNDER_DEVELOPMENT"
                    ? "secondary"
                    : "outline"
              }
            >
              {website.status}
            </Badge>
          </div>
        </CardHeader>

        {/* CONTENT */}
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">{website.description}</p>

          <Separator />

          {/* STATS */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Eye size={14} /> {website.views ?? 0} views
            </div>

            <div className="flex items-center gap-2">
              <Globe size={14} /> Live Site
            </div>

            <div className="flex items-center gap-2">
              <Calendar size={14} />
              {website.createdAt ? formatDateTime(website.createdAt) : "N/A"}
            </div>

            <div className="flex items-center gap-2">
              <BarChart size={14} />
              Updated {website.updatedAt ? formatDateTime(website.updatedAt) : "N/A"}
            </div>
          </div>

          <Separator />

          {/* ACTIONS */}
          <div className="grid gap-2">
          <div className="flex max-md:flex-col gap-2">
            {/* VISIT */}
            <Button className="flex-1" asChild>
              <a href={`/view/website/${website.id}`} target="_blank">
                <ExternalLink size={14} />
                Visit
              </a>
            </Button>

            {/* EDIT */}
            <WebsiteDialog mode="edit" initialData={website} onSuccess={onRefresh}>
              <Button variant="secondary" className="flex-1">
                <Pencil size={14} />
                Edit
              </Button>
            </WebsiteDialog>

            {/* DELETE */}
            <Button
              variant="destructive"
              className="flex-1"
              onClick={handleDelete}
              disabled={loading}
            >
              <Trash2 size={14} />
              Delete
            </Button>
          </div>
          <Link href={`/panel/editor/website/${website.id}`} className="grid"><Button variant={"secondary"}>Edit Website</Button></Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function WebsiteCardSkeleton() {
  return (
    <Card className="overflow-hidden bg-background/30 pt-0 rounded-2xl shadow-xl animate-pulse">
      <div className="h-52 w-full bg-muted" />

      <CardHeader>
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-5 w-24 rounded-full" />
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[80%]" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-4 w-32" />
        </div>

        <div className="flex gap-2">
          <Skeleton className="h-10 w-full rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
}
