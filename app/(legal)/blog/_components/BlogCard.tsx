"use client";

import React from "react";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";

type BlogPreviewCardProps = {
  id: string;
  title: string;

  excerpt: string;

  tags?: string[];

  coverImg?: string;

  className?: string;
};

export default function BlogPreviewCard({
  id,

  title,
  excerpt,

  tags = [],

  coverImg,

  className,
}: BlogPreviewCardProps) {
  return (
    <article
      className={cn(
        "group overflow-hidden rounded-3xl border bg-background transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
        className
      )}
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden bg-muted/30">
        {coverImg ? (
          <img
            src={coverImg}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-muted/40" />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-5 p-7">
        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 text-sm text-primary">
            {tags.map((tag, index) => (
              <span key={index}>
                {tag}
                {index !== tags.length - 1 && " •"}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h2 className="text-2xl font-bold leading-tight tracking-tight transition-colors group-hover:text-primary">
          {title}
        </h2>

        {/* Excerpt */}
        <p className="line-clamp-4 leading-7 text-muted-foreground">
          {excerpt}
        </p>

        {/* Action */}
        <div className="pt-2">
          <Link href={`/blog/${id}`}>
            <Button className="group/button float-right rounded-xl">
              View Blog

              <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/button:-translate-y-0.5 group-hover/button:translate-x-0.5" />
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}
export function BlogPreviewSkeleton() {
  return (
    <div className="overflow-hidden rounded-3xl border border-border/60 bg-background">
      <div className="h-64 animate-pulse bg-muted" />

      <div className="space-y-4 p-7">
        <div className="h-4 w-32 animate-pulse rounded bg-muted" />

        <div className="h-7 w-3/4 animate-pulse rounded bg-muted" />

        <div className="space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-muted" />

          <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
        </div>
      </div>
    </div>
  );
}
