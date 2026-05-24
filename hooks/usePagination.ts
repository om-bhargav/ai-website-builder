"use client";

import useSWR from "swr";
import { useMemo, useState } from "react";
import axios from "axios";

type Pagination = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
};

type ApiResponse<T> = {
  success: boolean;
  data: T[];
  pagination: Pagination;
};

type UsePaginationOptions<T> = {
  url: string;
  limit?: number;
  initialPage?: number;
  initialSearch?: string;
  initialFilters?: Record<string, any>;
  enabled?: boolean;
  refreshInterval?: number;
  transform?: (data: any) => T[];
};

const fetcher = async <T>(url: string): Promise<ApiResponse<T>> => {
  const res = await axios.get(url);

  return res.data;
};

export function usePagination<T>({
  url,
  limit = 10,
  initialPage = 1,
  initialSearch = "",
  initialFilters = {},
  enabled = true,
  refreshInterval,
  transform,
}: UsePaginationOptions<T>) {
  const [page, setPage] = useState(initialPage);

  const [search, setSearch] = useState(initialSearch);

  const [filters, setFilters] = useState<Record<string, any>>(initialFilters);

  const query = useMemo(() => {
    const params = new URLSearchParams();

    params.append("page", String(page));

    params.append("limit", String(limit));

    if (search) {
      params.append("search", search);
    }

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.append(key, String(value));
      }
    });

    return `${url}?${params.toString()}`;
  }, [url, page, limit, search, filters]);

  const { data, error, isLoading, mutate, isValidating } = useSWR<ApiResponse<T>>(
    enabled ? query : null,
    fetcher,
    {
      refreshInterval,
      revalidateOnFocus: false,
      keepPreviousData: true,
    },
  );

  const rows = useMemo(() => {
    if (!data?.data) return [];

    return transform ? transform(data.data) : data.data;
  }, [data, transform]);

  const pagination = data?.pagination;

  const nextPage = () => {
    if (pagination?.hasNextPage) {
      setPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (pagination?.hasPrevPage) {
      setPage((prev) => prev - 1);
    }
  };

  const goToPage = (num: number) => {
    if (!pagination) return;

    if (num < 1 || num > pagination.totalPages) return;

    setPage(num);
  };

  const pageNumbers = useMemo(() => {
    if (!pagination) return [];

    const total = pagination.totalPages;

    const current = pagination.page;

    if (total <= 5) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    if (current <= 3) {
      return [1, 2, 3, 4, total];
    }

    if (current >= total - 2) {
      return [1, total - 3, total - 2, total - 1, total];
    }

    return [1, current - 1, current, current + 1, total];
  }, [pagination]);

  return {
    rows,
    pagination,

    loading: isLoading || isValidating,
    error,

    page,
    search,
    filters,

    setPage,
    setSearch,
    setFilters,

    refresh: mutate,

    nextPage,
    prevPage,
    goToPage,

    pageNumbers,
  };
}
