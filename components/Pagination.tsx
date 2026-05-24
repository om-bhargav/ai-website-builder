"use client";

import React from "react";

import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

type PaginationProps = {
  page: number;
  totalPages: number;

  hasPrevPage?: boolean;
  hasNextPage?: boolean;

  pageNumbers?: number[];

  onPrev: () => void;
  onNext: () => void;

  onPageChange: (page: number) => void;

  className?: string;
};

export default function Pagination({
  page,
  totalPages,

  hasPrevPage = false,
  hasNextPage = false,

  pageNumbers = [],

  onPrev,
  onNext,

  onPageChange,

  className = "",
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div
      className={cn(
        "mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl bg-sidebar p-4 sm:flex-row",
        className
      )}
    >
      {/* Info */}
      <div className="text-sm text-muted-foreground">
        Showing page{" "}
        <span className="font-semibold text-foreground">
          {page}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-foreground">
          {totalPages}
        </span>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2">
        {/* Prev */}
        <Button
          variant="outline"
          size="icon"
          onClick={onPrev}
          disabled={!hasPrevPage}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Pages */}
        <div className="flex items-center gap-2">
          {pageNumbers.map((num, index) => {
            const isActive = page === num;

            const isDuplicate =
              pageNumbers[index - 1] &&
              num - pageNumbers[index - 1] > 1;

            return (
              <React.Fragment key={num}>
                {isDuplicate && (
                  <div className="flex h-9 w-9 items-center justify-center text-muted-foreground">
                    <MoreHorizontal className="h-4 w-4" />
                  </div>
                )}

                <Button
                  variant={
                    isActive ? "default" : "outline"
                  }
                  size="icon"
                  onClick={() => onPageChange(num)}
                  className={cn(
                    "h-9 w-9",
                    isActive &&
                      "pointer-events-none shadow-sm"
                  )}
                >
                  {num}
                </Button>
              </React.Fragment>
            );
          })}
        </div>

        {/* Next */}
        <Button
          variant="outline"
          size="icon"
          onClick={onNext}
          disabled={!hasNextPage}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}