"use client";

import { Calendar, Eye, Pencil, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
export type Blog = {
  id?: string;
  title: string;
  excerpt?: string;
  coverImg?: string;
  published: boolean;
  views?: number;
  createdAt?: string;
};

export type BlogCardProps = {
  blog: Blog;
  onDelete?: (blog: Blog) => void;
};

export function BlogCard({ blog, onDelete }: BlogCardProps) {
  return (
    <Card className="group overflow-hidden transition-all py-0 hover:-translate-y-1 hover:shadow-lg">
      {/* Cover */}
      {blog.coverImg && (
        <div className="relative h-44 w-full overflow-hidden">
          <img
            src={blog.coverImg}
            alt={blog.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
      )}

      <CardContent className="p-5 space-y-3">
        {/* Top Row */}
        <div className="flex items-center justify-between">
          <Badge
            variant={blog.published ? "default" : "secondary"}
            className={
              blog.published ? "bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20" : ""
            }
          >
            {blog.published ? "Published" : "Draft"}
          </Badge>

          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Eye className="w-3 h-3" />
            {blog.views ?? 0}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold leading-snug line-clamp-2">{blog.title}</h3>

        {/* Excerpt */}
        {blog.excerpt && (
          <p className="text-sm text-muted-foreground line-clamp-2">{blog.excerpt}</p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {blog.createdAt ? new Date(blog.createdAt).toDateString() : "No date"}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition">
            <Link href={`/panel/blogs/${blog.id}`}>
              <Button size="sm" variant="secondary" className="h-7 gap-1 px-2">
                <Pencil className="w-3 h-3" />
                Edit
              </Button>
            </Link>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => onDelete?.(blog)}
              className="h-7 gap-1 px-2"
            >
              <Trash2 className="w-3 h-3" />
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function BlogCardSkeleton() {
  return (
    <Card className="overflow-hidden animate-pulse py-0">
      {/* Cover Skeleton */}
      <Skeleton className="h-44 w-full bg-gray-700" />

      <CardContent className="p-5 space-y-4">
        {/* Top Row */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-20 rounded-full bg-gray-700" />
          <Skeleton className="h-4 w-10 rounded-md bg-gray-700" />
        </div>

        {/* Title */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-3/4 rounded-md bg-gray-700" />
          <Skeleton className="h-5 w-1/2 rounded-md bg-gray-700" />
        </div>

        {/* Excerpt */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full rounded-md bg-gray-700" />
          <Skeleton className="h-4 w-5/6 rounded-md bg-gray-700" />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2">
          {/* Date */}
          <Skeleton className="h-4 w-24 rounded-md bg-gray-700" />

          {/* Actions */}
          <div className="flex gap-2">
            <Skeleton className="h-7 w-16 rounded-md bg-gray-700" />
            <Skeleton className="h-7 w-16 rounded-md bg-gray-700" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
