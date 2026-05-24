"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Eye, Globe, Calendar, BarChart, Star, Trash2, Ban } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import { formatDateTime } from "@/lib/date-time";

export type Website = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  status: "PUBLISHED" | "UNDER_DEVELOPMENT" | "DRAFT" | "BLOCKED";
  views?: number;
  featured?: boolean;
  blocked?: boolean;
  createdAt?: string;
  updatedAt?: string;
  category?: string;
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
  const [featured, setFeatured] = useState(website.featured ?? false);
  const [blocked, setBlocked] = useState(website.blocked ?? false);

  /* ---------------- UPDATE WEBSITE ---------------- */
  const updateWebsite = async (payload: Partial<Website>) => {
    try {
      setLoading(true);

      const res = await fetch(`/api/admin/websites/${website.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message);
      onRefresh();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- DELETE ---------------- */
  const handleDelete = async () => {
    try {
      setLoading(true);

      const res = await fetch(`/api/admin/websites/${website.id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      toast.success("Website deleted");
      onRefresh();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- TOGGLE FEATURE ---------------- */
  const toggleFeature = async () => {
    const newValue = !featured;
    setFeatured(newValue);

    await updateWebsite({
      featured: newValue,
    });
  };

  /* ---------------- TOGGLE BLOCK ---------------- */
  const toggleBlock = async () => {
    const newValue = !blocked;
    setBlocked(newValue);

    await updateWebsite({
      blocked: newValue,
      status: newValue ? "BLOCKED" : "PUBLISHED",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.12 * index }}
      className="w-full max-w-xl"
    >
      <Card className="overflow-hidden bg-background/30 pt-0 rounded-2xl shadow-xl hover:shadow-2xl transition-all">
        {/* Thumbnail */}
        <div className="relative h-52 overflow-hidden w-full">
          <Image
            src={website.thumbnail}
            alt="thumbnail"
            fill
            className="object-cover grayscale hover:grayscale-0 hover:scale-105 transition-all duration-500"
          />

          <div className="absolute top-3 left-3 flex gap-2">
            {website.category && <Badge variant="secondary">{website.category}</Badge>}

            {featured && (
              <Badge className="bg-yellow-500 text-black gap-1">
                <Star size={12} />
                Featured
              </Badge>
            )}

            {blocked && <Badge variant="destructive">Blocked</Badge>}
          </div>
        </div>

        {/* Header */}
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">{website.title}</CardTitle>

            <Badge
              variant={
                website.status === "PUBLISHED"
                  ? "default"
                  : website.status === "BLOCKED"
                    ? "destructive"
                    : "secondary"
              }
            >
              {website.status}
            </Badge>
          </div>
        </CardHeader>

        {/* Content */}
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground line-clamp-1">{website.description}</p>

          <Separator />

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Eye size={14} /> {website.views ?? 0} views
            </div>
            <div className="flex items-center gap-2">
              <Globe size={14} /> Live Site
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={14} /> {website.createdAt ? formatDateTime(website.createdAt) : "N/A"}
            </div>
            <div className="flex items-center gap-2">
              <BarChart size={14} /> Updated{" "}
              {website.updatedAt ? formatDateTime(website.updatedAt) : "N/A"}
            </div>
          </div>

          <Separator />

          {/* Admin Actions */}
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              className="w-full gap-1"
              onClick={toggleFeature}
              disabled={loading}
            >
              <Star size={14} />
              {featured ? "Unfeature" : "Feature"}
            </Button>

            <Button
              variant="secondary"
              className="w-full gap-1"
              onClick={toggleBlock}
              disabled={loading}
            >
              <Ban size={14} />
              {blocked ? "Unblock" : "Block"}
            </Button>

            <Button className="w-full gap-1" asChild>
              <a href={`/view/website/${website.id}`} target="_blank">
                <Eye size={14} />
                View
              </a>
            </Button>

            <Button
              variant="destructive"
              className="w-full gap-1"
              onClick={handleDelete}
              disabled={loading}
            >
              <Trash2 size={14} />
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function WebsiteCardSkeleton() {
  return (
    <div className="w-full max-w-xl">
      <div className="overflow-hidden bg-background/30 rounded-2xl shadow-xl animate-pulse">
        {/* Thumbnail */}
        <div className="h-52 w-full bg-muted" />

        {/* Header */}
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="h-5 w-40 bg-muted rounded" />
            <div className="h-5 w-24 bg-muted rounded-full" />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <div className="h-3 w-full bg-muted rounded" />
            <div className="h-3 w-4/5 bg-muted rounded" />
          </div>

          <div className="border-t my-3" />

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="h-4 w-24 bg-muted rounded" />
            <div className="h-4 w-20 bg-muted rounded" />
            <div className="h-4 w-28 bg-muted rounded" />
            <div className="h-4 w-32 bg-muted rounded" />
          </div>

          <div className="border-t my-3" />

          {/* Actions */}
          <div className="grid grid-cols-2 gap-2">
            <div className="h-9 bg-muted rounded" />
            <div className="h-9 bg-muted rounded" />
            <div className="h-9 bg-muted rounded" />
            <div className="h-9 bg-muted rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}
