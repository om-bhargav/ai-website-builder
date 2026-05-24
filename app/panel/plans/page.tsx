"use client";

import useSWR from "swr";

import { Badge } from "@/components/ui/badge";

import ErrorLoading from "@/components/ErrorLoading";

import fetcher from "@/lib/fetcher";

import {
  PlanCard,
  PlanCardSkeleton,
  Plan,
} from "./_components/PlanCard";

export default function PlansPage() {

  const {
    data,
    error,
    isLoading,
  } = useSWR<{ data: Plan[] }>(
    "/api/plans",
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
    }
  );

  const plans = data?.data ?? [];

  return (
    <div className="space-y-8 p-4">

      {/* HEADER */}
      <div className="space-y-2">

        <Badge className="rounded-xl px-3 py-1">
          Pricing
        </Badge>

        <h1 className="text-4xl font-bold tracking-tight">
          Choose Your Plan
        </h1>

        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Purchase additional website
          slots for your account. After
          successful payment, your website
          limit will automatically increase
          based on the selected plan.
        </p>

      </div>

      {/* PLANS */}
      <ErrorLoading
        dataLength={plans.length}
        loading={isLoading}
        error={error}
        loadingCard={PlanCardSkeleton}
        loadingCols={3}
        loadingRows={1}
        loadingCount={3}
        emptyMessage="No Plans Available!"
      >

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

          {plans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
            />
          ))}

        </div>

      </ErrorLoading>

    </div>
  );
}