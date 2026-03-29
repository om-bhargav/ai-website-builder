"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Eye, Globe, Calendar, BarChart, ExternalLink } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

// --- Extended Model (frontend friendly) ---
// Added fields: views, createdAt, updatedAt, category, isFeatured

const dummyWebsite = {
  id: "web_01",
  title: "Portfolio Site",
  description: "A modern developer portfolio with animations and clean UI.",
  thumbnail: "https://picsum.photos/600/400",
  site_url: "https://example.com",
  status: "PUBLISHED",
  views: 12450,
  category: "Portfolio",
  isFeatured: true,
  createdAt: "2026-02-10",
  updatedAt: "2026-03-25",
};

export default function WebsiteCard({index}:{index: number}) {
  const [status, setStatus] = useState(dummyWebsite.status);

  return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4,delay: 0.15 * index }}
        className="w-full max-w-xl"
      >
        <Card className="overflow-hidden bg-background/30 pt-0 rounded-2xl shadow-xl">
          {/* Thumbnail */}
          <div className="relative h-52 overflow-hidden w-full">
            <Image
              src={dummyWebsite.thumbnail}
              alt="thumbnail"
              fill
              className="object-cover grayscale-80 duration-500 hover:grayscale-0 hover:scale-105 transition-all"
            />
            <div className="absolute top-3 left-3 flex gap-2">
              <Badge variant="secondary">{dummyWebsite.category}</Badge>
              {dummyWebsite.isFeatured && (
                <Badge className="bg-yellow-500 text-black">Featured</Badge>
              )}
            </div>
          </div>

          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">
                {dummyWebsite.title}
              </CardTitle>
              <Badge
                variant={
                  status === "PUBLISHED"
                    ? "default"
                    : status === "UNDER_DEVELOPMENT"
                    ? "secondary"
                    : "outline"
                }
              >
                {status}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {dummyWebsite.description}
            </p>

            <Separator />

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Eye size={14} /> {dummyWebsite.views} views
              </div>
              <div className="flex items-center gap-2">
                <Globe size={14} /> Live Site
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={14} /> {dummyWebsite.createdAt}
              </div>
              <div className="flex items-center gap-2">
                <BarChart size={14} /> Updated {dummyWebsite.updatedAt}
              </div>
            </div>

            <Separator />

            {/* Actions */}
            <div className="flex gap-2">
              <Button className="flex-1" asChild>
                <a href={dummyWebsite.site_url} target="_blank">
                  <ExternalLink size={14} /> Visit
                </a>
              </Button>

              <Button variant="outline" className="flex-1">
                Edit
              </Button>

              <Button variant="destructive" className="flex-1">
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
      <Card className="overflow-hidden bg-background/30 pt-0 rounded-2xl shadow-xl">
        
        {/* Thumbnail Skeleton */}
        <div className="relative h-52 w-full">
          <Skeleton className="h-full w-full" />
        </div>

        {/* Header */}
        <CardHeader>
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-5 w-24 rounded-full" />
          </div>
        </CardHeader>

        {/* Content */}
        <CardContent className="space-y-4">
          
          {/* Description */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[80%]" />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-32" />
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>

        </CardContent>
      </Card>
    </div>
  );
}