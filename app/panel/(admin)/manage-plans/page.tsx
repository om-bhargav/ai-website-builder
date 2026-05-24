"use client";

import { Plus } from "lucide-react";

import useSWR from "swr";

import { useTransition } from "react";

import { Button } from "@/components/ui/button";

import PlanDialog from "./_components/PlanDialog";

import PlanCard, { PlanCardSkeleton, Plan } from "./_components/PlanCard";

import ErrorLoading from "@/components/ErrorLoading";

import fetcher from "@/lib/fetcher";

export default function ManagePlansPage() {
  const { data, error, isLoading, mutate } = useSWR<{ data: Plan[] }>("/api/admin/plans", fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
  });

  const [pending, startTransition] = useTransition();

  const plans = data?.data ?? [];

  async function handleCreate(values: Omit<Plan, "id">) {
    startTransition(async () => {
      try {
        const res = await fetch("/api/admin/plans", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message);
        }

        await mutate();
      } catch (error) {
        console.error(error);
      }
    });
  }

  async function handleUpdate(id: string, values: Partial<Plan>) {
    startTransition(async () => {
      try {
        const res = await fetch(`/api/admin/plans/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message);
        }

        await mutate();
      } catch (error) {
        console.error(error);
      }
    });
  }

  async function handleDelete(id: string) {
    startTransition(async () => {
      try {
        const res = await fetch(`/api/admin/plans/${id}`, {
          method: "DELETE",
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message);
        }

        await mutate();
      } catch (error) {
        console.error(error);
      }
    });
  }

  async function handleToggle(id: string, active: boolean) {
    await handleUpdate(id, {
      active,
    });
  }

  async function handleFeatured(id: string, active: boolean) {
    await handleUpdate(id, {
      featured: active,
    });
  }

  return (
    <div className="space-y-8 p-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Plans</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Create, update and manage pricing plans.
          </p>
        </div>

        <PlanDialog mode="create" onSubmit={handleCreate} pending={pending}>
          <Button className="rounded-2xl">
            <Plus className="mr-2 size-4" />
            Create Plan
          </Button>
        </PlanDialog>
      </div>

      {/* ================= PLANS ================= */}

      <ErrorLoading
        dataLength={plans.length}
        loading={isLoading}
        error={error}
        loadingCard={PlanCardSkeleton}
        loadingCols={3}
        loadingRows={2}
        loadingCount={6}
        emptyMessage="No Plans Found!"
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {plans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              pending={pending}
              onDelete={() => handleDelete(plan.id)}
              onToggle={(value) => handleToggle(plan.id, value)}
              onFeatured={(value) => handleFeatured(plan.id, value)}
              onUpdate={(values) => handleUpdate(plan.id, values)}
            />
          ))}
        </div>
      </ErrorLoading>
    </div>
  );
}
