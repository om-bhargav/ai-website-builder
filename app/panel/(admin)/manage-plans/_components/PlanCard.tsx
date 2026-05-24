"use client";

import { Globe, IndianRupee, Pencil, Trash2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";

import { Switch } from "@/components/ui/switch";

import PlanDialog from "./PlanDialog";

export interface Plan {
  id: string;
  title: string;
  description: string;
  price: number;
  websites: number;
  featured: boolean;
  active: boolean;
}

interface PlanCardProps {
  plan: Plan;
  pending?: boolean;

  onDelete: () => void;

  onToggle: (value: boolean) => void;

  onUpdate: (values: Omit<Plan, "id">) => void;
  onFeatured: (value: boolean) => void;
}

export default function PlanCard({ plan, pending, onDelete, onToggle, onUpdate,onFeatured }: PlanCardProps) {
  return (
    <Card className="group rounded-3xl border py-1 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <CardContent className="space-y-6 p-7">
        {/* TOP */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">{plan.title}</h2>

            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{plan.description}</p>
          </div>

          <Badge
            className={`rounded-xl px-3 py-1 ${
              plan.active
                ? "border-green-500/20 bg-green-500/10 text-green-500"
                : "border-red-500/20 bg-red-500/10 text-red-500"
            }`}
          >
            {plan.active ? "Active" : "Disabled"}
          </Badge>
        </div>

        {/* PRICE */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <IndianRupee className="size-5 text-primary" />

            <h3 className="text-4xl font-bold tracking-tight">{plan.price}</h3>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Globe className="size-4" />

            <span>
              {plan.websites} Website
              {plan.websites > 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-3">
          <PlanDialog mode="edit" pending={pending} initialData={plan} onSubmit={onUpdate}>
            <Button variant="outline" className="h-11 flex-1 rounded-2xl">
              <Pencil className="mr-2 size-4" />
              Edit
            </Button>
          </PlanDialog>

          <Button
            variant="destructive"
            className="h-11 rounded-2xl"
            disabled={pending}
            onClick={onDelete}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>

        {/* STATUS */}
        <div className="flex items-center justify-between rounded-2xl border p-4">
          <div>
            <p className="font-medium">Plan Status</p>

            <p className="text-sm text-muted-foreground">Toggle visibility.</p>
          </div>

          <Switch checked={plan.active} disabled={pending} onCheckedChange={onToggle} />
        </div>

        <div className="flex items-center justify-between rounded-2xl border p-4">
          <div>
            <p className="font-medium">Featured</p>
          </div>

          <Switch checked={plan.featured} disabled={pending} onCheckedChange={onFeatured} />
        </div>
      </CardContent>
    </Card>
  );
}

export function PlanCardSkeleton() {
  return (
    <Card className="rounded-3xl border py-1 shadow-sm">
      <CardContent className="space-y-6 p-7 animate-pulse">
        <div className="space-y-3">
          <div className="h-7 w-32 rounded bg-muted" />
          <div className="h-4 w-full rounded bg-muted" />
          <div className="h-4 w-3/4 rounded bg-muted" />
        </div>

        <div className="space-y-3">
          <div className="h-10 w-28 rounded bg-muted" />
          <div className="h-4 w-24 rounded bg-muted" />
        </div>

        <div className="flex gap-3">
          <div className="h-11 flex-1 rounded-2xl bg-muted" />
          <div className="h-11 w-14 rounded-2xl bg-muted" />
        </div>

        <div className="h-20 rounded-2xl bg-muted" />
      </CardContent>
    </Card>
  );
}
