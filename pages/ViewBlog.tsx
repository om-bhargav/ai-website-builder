"use client";

import Image from "next/image";

import useSWR from "swr";

import { notFound } from "next/navigation";

import fetcher from "@/lib/fetcher";

import { CalendarDays, Eye, Clock3 } from "lucide-react";

type Blog = {
  id: string;

  title: string;

  excerpt: string;

  content: string;

  coverImg?: string | null;

  views?: number;

  createdAt: string;

  published?: boolean;
};

export default function ViewBlog({ id }: { id: string }) {
  const { data, isLoading } = useSWR(`/api/blogs?id=${id}`, fetcher);
  const { data: _ } = useSWR(id ? `/api/log-blog-traffic?id=${id}` : null, fetcher);
  const blog: Blog | undefined = data?.data;

  if (!isLoading && !blog) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-5xl px-5 pb-14 pt-24">
      {/* Loading */}
      {isLoading && <BlogSkeleton />}
      {/* Blog */}
      {!isLoading && blog && (
        <article className="space-y-10">
          {/* Header */}
          <div className="space-y-5">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-6xl">
                {blog.title}
              </h1>

              <p className="max-w-3xl text-lg leading-8 text-muted-foreground">{blog.excerpt}</p>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />

                <span>{new Date(blog.createdAt).toLocaleDateString()}</span>
              </div>

              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />

                <span>{blog.views || 0} views</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock3 className="h-4 w-4" />

                <span>5 min read</span>
              </div>
            </div>
          </div>

          {/* Cover Image */}
          {blog.coverImg && (
            <div className="relative h-[420px] overflow-hidden rounded-3xl border">
              <Image src={blog.coverImg} alt={blog.title} fill className="object-cover" />
            </div>
          )}

          {/* Content */}
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <article
              className="
        prose
        prose-neutral
        dark:prose-invert
        max-w-none
                  
        prose-headings:font-bold
        prose-h1:text-4xl
        prose-h2:text-2xl
                  
        prose-p:text-muted-foreground
        prose-li:text-muted-foreground
                  
        prose-blockquote:border-l-primary
        prose-blockquote:text-muted-foreground
                  
        prose-img:rounded-2xl
      "
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>
        </article>
      )}
    </main>
  );
}

function BlogSkeleton() {
  return (
    <div className="space-y-8 w-full">
      <div className="h-12 w-3/4 animate-pulse rounded bg-muted" />

      <div className="flex gap-4">
        <div className="h-5 w-32 animate-pulse rounded bg-muted" />
        <div className="h-5 w-24 animate-pulse rounded bg-muted" />
      </div>

      <div className="h-[420px] animate-pulse rounded-3xl bg-muted" />

      <div className="space-y-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="h-5 w-full animate-pulse rounded bg-muted" />
        ))}
      </div>
    </div>
  );
}
