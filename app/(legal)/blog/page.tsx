"use client";

import PageWrapper from "../_components/PageWrapper";

import { SITE_NAME } from "@/config";
import BlogPreviewCard from "./_components/BlogCard";
import Pagination from "@/components/Pagination";
import ErrorLoading from "@/components/ErrorLoading";
import { usePagination } from "@/hooks/usePagination";
import { BlogPreviewSkeleton } from "./_components/BlogCard";

type Blog = {
  id: string;

  title: string;

  excerpt: string;

  coverImg?: string | null;

  createdAt: string;
  tags: string[]
};

export default function BlogPage() {
  const {
    rows: blogs,

    pagination,

    loading,

    nextPage,
    prevPage,
    goToPage,
  } = usePagination<Blog>({
    url: "/api/blogs",

    limit: 6,
  });

  return (
    <PageWrapper
      badge="Blog"
      title={`Insights, updates, and news from ${SITE_NAME}`}
      description="Discover articles about AI, design systems, development, startups, and modern web experiences."
    >
      {/* Loading */}
      <ErrorLoading
        loading={loading}
        dataLength={blogs.length}
        loadingCols={2}
        loadingRows={3}
        loadingCount={6}
        loadingCard={BlogPreviewSkeleton}
      >
        <>
          {/* Blogs */}
          <div className="grid gap-8 md:grid-cols-2">
            {blogs.map((blog, idx) => (
              <BlogPreviewCard
                key={idx}
                id={blog.id}
                title={blog.title}
                excerpt={blog.excerpt}
                coverImg={blog.coverImg || undefined}
                tags={blog.tags}
              />
            ))}
          </div>

          {/* Pagination */}
          {pagination && (
            <Pagination
              page={pagination.page}
              totalPages={pagination.totalPages}
              hasPrevPage={pagination.hasPrevPage}
              hasNextPage={pagination.hasNextPage}
              onPrev={prevPage}
              onNext={nextPage}
              onPageChange={goToPage}
            />
          )}
        </>
      </ErrorLoading>
    </PageWrapper>
  );
}
