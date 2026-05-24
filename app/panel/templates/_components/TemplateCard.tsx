"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { motion } from "framer-motion";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, ExternalLink, LayoutTemplate, Sparkles, User } from "lucide-react";
import { formatDateTime } from "@/lib/date-time";
import WebsiteDialog from "./WebsiteCreateWithTemplate";

export type Template = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  status: "DRAFT" | "PUBLISHED" | "UNDER_DEVELOPMENT";
  createdAt?: string;
  category?: string;
  author?: string;
};

type Props = {
  index: number;
  template: Template;
  onUse?: (id: string) => void;
};

export default function TemplateCard({ index, template, onUse }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.12 * index }}
      className="w-full max-w-xl"
    >
      <Card className="overflow-hidden bg-background/40 pt-0 rounded-2xl shadow-xl hover:shadow-2xl transition-all">
        {/* Thumbnail */}
        <div className="relative h-52 w-full overflow-hidden">
          <Image
            src={template.thumbnail}
            alt={template.title}
            fill
            className="object-cover hover:scale-105 transition-all duration-500"
          />

          {/* Category badge */}
          {template.category && (
            <div className="absolute top-3 left-3">
              <Badge className="gap-1 bg-black/60 text-white backdrop-blur-md">
                <Sparkles size={12} />
                {template.category}
              </Badge>
            </div>
          )}
        </div>

        {/* HEADER */}
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

        {/* CONTENT */}
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">{template.description}</p>

          <Separator />

          {/* INFO */}
          <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User size={14} />
              {template.author || "Admin"}
            </div>

            <div className="flex items-center gap-2">
              <Calendar size={14} />
              {template.createdAt ? formatDateTime(template.createdAt) : "N/A"}
            </div>

            <div className="flex items-center gap-2 col-span-2">
              <LayoutTemplate size={14} />
              Ready-to-use Website Template
            </div>
          </div>

          <Separator />

          {/* ACTIONS */}
          <div className="grid md:flex gap-2">
            <WebsiteDialog templateId={template.id}>
              <Button className="md:flex-1" onClick={() => onUse?.(template.id)}>
                <Sparkles size={14} />
                Use Template
              </Button>
            </WebsiteDialog>

            <Button variant="secondary" className="md:flex-1" asChild>
              <a href={`/view/template/${template.id}`} target="_blank">
                <ExternalLink size={14} />
                Preview
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function TemplateCardSkeleton() {
  return (
    <Card className="overflow-hidden animate-pulse">
      {/* thumbnail */}
      <div className="h-52 w-full bg-muted" />

      <CardHeader>
        <div className="h-5 w-2/3 bg-muted rounded" />
        <div className="h-4 w-1/2 bg-muted rounded mt-2" />
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="h-4 w-full bg-muted rounded" />
        <div className="h-4 w-4/5 bg-muted rounded" />

        <div className="h-px bg-muted" />

        <div className="grid grid-cols-2 gap-3">
          <div className="h-4 w-20 bg-muted rounded" />
          <div className="h-4 w-24 bg-muted rounded" />
        </div>

        <div className="h-px bg-muted" />

        <div className="flex gap-2">
          <div className="h-9 w-full bg-muted rounded" />
          <div className="h-9 w-full bg-muted rounded" />
        </div>
      </CardContent>
    </Card>
  );
}
