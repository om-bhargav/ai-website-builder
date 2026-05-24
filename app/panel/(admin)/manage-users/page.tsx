"use client";

import { useMemo, useState } from "react";
import useSWR from "swr";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

import fetcher from "@/lib/fetcher";
import ErrorLoading from "@/components/ErrorLoading";

import UserCard from "./_components/UserCard";
import { UserCardSkeleton } from "./_components/UserCard";

type USER_STATUS = "ACTIVATED" | "DEACTIVATED" | "SUSPENDED";
type ROLE = "USER" | "ADMIN";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: ROLE;
  status: USER_STATUS;
  image?: string;
  bio?: string;
  total_websites: number;
  createdAt: string;
}

export default function Page() {
  const [search, setSearch] = useState("");

  const { data, error, isLoading, mutate } = useSWR<{ data: User[] }>(
    "/api/admin/users",
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
    }
  );

  const users = data?.data ?? [];

  // ================= FILTERED USERS =================
  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return users.filter((u) => u.role !== "ADMIN");
    }

    return users
      .filter((u) => u.role !== "ADMIN")
      .filter((u) => {
        return (
          u.name?.toLowerCase().includes(query) ||
          u.email?.toLowerCase().includes(query) ||
          u.phone?.toLowerCase().includes(query)
        );
      });
  }, [users, search]);

  return (
    <div className="grid gap-5 p-4">

      {/* HEADER */}
      <div className="flex justify-between max-md:flex-col gap-5 md:items-center">

        <h2 className="text-3xl font-semibold">
          Manage Users
        </h2>

        <div className="flex items-center gap-2">

          <Input
            placeholder="Search Users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Button variant="secondary">
            <Search />
          </Button>

        </div>

      </div>

      {/* USERS GRID */}
      <ErrorLoading
        dataLength={filteredUsers.length}
        loading={isLoading}
        error={error}
        loadingCard={UserCardSkeleton}
        loadingCols={3}
        loadingRows={3}
        loadingCount={9}
        emptyMessage={
          search
            ? "No matching users found!"
            : "No Users Found!"
        }
      >

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

          {filteredUsers.map((user, index) => (
            <UserCard
              key={user.id}
              index={index}
              user={user}
              mutate={mutate}
            />
          ))}

        </div>

      </ErrorLoading>

    </div>
  );
}