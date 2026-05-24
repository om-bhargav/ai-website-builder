"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LayoutTemplate, Calendar, User, ExternalLink, Trash2 } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import TemplateModal from "./TemplateDialog";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { formatDateTime } from "@/lib/date-time";

export type Template = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  status: "DRAFT" | "PUBLISHED" | "UNDER_DEVELOPMENT";
  createdAt?: string;
  file?: string;
};

export default function TemplateCard({
  index,
  template,
  onRefresh,
}: {
  index: number;
  template: Template;
  onRefresh: () => void;
}) {
  /* ---------------- DELETE ---------------- */
  const handleDelete = async () => {
    const res = await fetch(`/api/admin/templates/${template.id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!data.success) {
      toast.error(data.message);
      return;
    }

    toast.success("Template deleted");
    onRefresh();
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
            src={template.thumbnail}
            alt="template"
            fill
            className="object-cover grayscale hover:grayscale-0 duration-500 hover:scale-105 transition-all"
          />
        </div>

        {/* Header */}
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">{template.title}</CardTitle>

            <Badge
              variant={
                template.status === "PUBLISHED"
                  ? "default"
                  : template.status === "UNDER_DEVELOPMENT"
                    ? "secondary"
                    : "outline"
              }
            >
              {template.status}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Description */}
          <p className="text-sm text-muted-foreground">{template.description}</p>

          <Separator />

          {/* Info */}
          <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User size={14} /> Admin
            </div>

            <div className="flex items-center gap-2">
              <Calendar size={14} />
              {template.createdAt ? formatDateTime(template.createdAt) : "N/A"}
            </div>

            <div className="flex items-center gap-2">
              <LayoutTemplate size={14} /> Template
            </div>
          </div>

          <Separator />

          {/* Actions */}
          <div className="grid gap-2">
            <div className="grid md:flex gap-2">
              {/* Preview */}
              <Button className="md:flex-1" asChild>
                <a href={`/view/template/${template.id}`} target="_blank">
                  <ExternalLink size={14} />
                  Preview
                </a>
              </Button>

              {/* EDIT */}
              <TemplateModal mode="edit" initialData={template} onSuccess={onRefresh}>
                <Button variant="secondary" className="md:flex-1">
                  Edit
                </Button>
              </TemplateModal>

              {/* DELETE */}
              <Button variant="destructive" className="md:flex-1" onClick={handleDelete}>
                <Trash2 size={14} />
                Delete
              </Button>
            </div>
            <Link href={`/panel/editor/template/${template.id}`} className="grid">
              <Button variant={"secondary"} className="w-full">
                Edit Template
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function TemplateCardSkeleton() {
  return (
    <div
      className="w-full max-w-xl"
      style={{
        animationDelay: `0.5s`,
      }}
    >
      <Card className="overflow-hidden bg-background/30 pt-0 rounded-2xl shadow-xl">
        {/* Thumbnail */}
        <div className="relative h-52 w-full overflow-hidden">
          <Skeleton className="h-full w-full" />
        </div>

        {/* Header */}
        <CardHeader>
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-5 w-24 rounded-full" />
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Description */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[85%]" />
          </div>

          <Separator />

          {/* Info */}
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-32" />
          </div>

          <Separator />

          {/* Buttons */}
          <div className="grid md:flex gap-2">
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
