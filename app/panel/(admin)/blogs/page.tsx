"use client";

import * as React from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import ErrorLoading from "@/components/ErrorLoading";
import Pagination from "@/components/Pagination";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";

import {
  Blog,
  BlogCard,
  BlogCardSkeleton,
} from "./_components/BlogCard";

import { usePagination } from "@/hooks/usePagination";

const FILTERS = ["ALL", "PUBLISHED", "DRAFT"];

export default function BlogsPage() {
  const [filter, setFilter] = React.useState("ALL");

  const {
    rows: blogs,
    pagination,
    loading,

    refresh,
    nextPage,
    prevPage,
    goToPage,

    pageNumbers,
  } = usePagination<Blog>({
    url: "/api/admin/blogs",
    limit: 6,

    initialFilters: {
      status: filter,
    },
  });

  /* frontend filter */
  const filteredBlogs = React.useMemo(() => {
    if (filter === "ALL") return blogs;

    if (filter === "PUBLISHED") {
      return blogs.filter((b) => b.published);
    }

    if (filter === "DRAFT") {
      return blogs.filter((b) => !b.published);
    }

    return blogs;
  }, [filter, blogs]);

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/blogs/${id}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.message || "Delete failed");
      }

      toast.success("Blog deleted successfully");

      refresh();
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <div className="space-y-10 md:p-4">
      <div className="space-y-5">
        {/* Header */}
        <div className="flex flex-col justify-between gap-5 md:flex-row">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Blog Posts
            </h2>

            <p className="text-sm text-muted-foreground">
              All of the blogs are here.
            </p>
          </div>

          <div className="flex flex-col gap-4 md:flex-row">

            {/* Filter */}
            <Select
              value={filter}
              onValueChange={setFilter}
            >
              <SelectTrigger className="min-w-[140px] max-md:w-full">
                <SelectValue placeholder="Filter blogs" />
              </SelectTrigger>

              <SelectContent>
                {FILTERS.map((f) => (
                  <SelectItem key={f} value={f}>
                    {f}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Add */}
            <Link href="/panel/blogs/new">
              <Button className="max-md:w-full">
                + Add Blog
              </Button>
            </Link>
          </div>
        </div>

        {/* Content */}
        <ErrorLoading
          loading={loading}
          dataLength={filteredBlogs.length}
          loadingCols={3}
          loadingRows={3}
          loadingCount={6}
          loadingCard={BlogCardSkeleton}
        >
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredBlogs.map((blog, index) => (
              <BlogCard
                key={blog.id ?? index}
                blog={blog}
                onDelete={() => handleDelete(blog.id!)}
              />
            ))}
          </div>
        </ErrorLoading>

        {/* Pagination */}
        {pagination && (
          <Pagination
            page={pagination.page}
            totalPages={pagination.totalPages}
            hasPrevPage={pagination.hasPrevPage}
            hasNextPage={pagination.hasNextPage}
            pageNumbers={pageNumbers}
            onPrev={prevPage}
            onNext={nextPage}
            onPageChange={goToPage}
          />
        )}
      </div>
    </div>
  );
}