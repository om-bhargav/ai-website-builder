"use client";

import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";

import { Button } from "@/components/ui/button";

import { Switch } from "@/components/ui/switch";

import { Plan } from "./PlanCard";

interface PlanDialogProps {
  children: React.ReactNode;

  mode: "create" | "edit";

  initialData?: Plan;

  pending?: boolean;

  onSubmit: (values: Omit<Plan, "id">) => void | Promise<void>;
}

export default function PlanDialog({
  children,
  mode,
  initialData,
  pending,
  onSubmit,
}: PlanDialogProps) {
  const [open, setOpen] = React.useState(false);

  const [form, setForm] = React.useState({
    title: initialData?.title || "",

    description: initialData?.description || "",

    price: initialData?.price || 0,

    websites: initialData?.websites || 0,

    active: initialData?.active ?? true,
    featured: initialData?.featured ?? false
  });

  React.useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title,

        description: initialData.description,

        price: initialData.price,

        websites: initialData.websites,

        active: initialData.active,
        featured: initialData.featured
      });
    }
  }, [initialData]);

  async function handleSubmit() {
    await onSubmit(form);

    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="rounded-3xl sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {mode === "create" ? "Create Plan" : "Edit Plan"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 pt-4">
          {/* TITLE */}
          <div className="space-y-2">
            <Label>Plan Title</Label>

            <Input
              placeholder="Enter plan title"
              value={form.title}
              onChange={(e) =>
                setForm({
                  ...form,
                  title: e.target.value,
                })
              }
            />
          </div>

          {/* DESCRIPTION */}
          <div className="space-y-2">
            <Label>Description</Label>

            <Textarea
              placeholder="Enter plan description"
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
            />
          </div>

          {/* PRICE + WEBSITES */}
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Price</Label>

              <Input
                type="number"
                placeholder="499"
                value={form.price}
                onChange={(e) =>
                  setForm({
                    ...form,
                    price: Number(e.target.value),
                  })
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Websites</Label>

              <Input
                type="number"
                placeholder="5"
                value={form.websites}
                onChange={(e) =>
                  setForm({
                    ...form,
                    websites: Number(e.target.value),
                  })
                }
              />
            </div>
          </div>

          {/* ACTIVE */}
          <div className="flex items-center justify-between rounded-2xl border p-4">
            <div>
              <p className="font-medium">Active Plan</p>

              <p className="text-sm text-muted-foreground">Enable or disable this plan.</p>
            </div>

            <Switch
              checked={form.active}
              onCheckedChange={(value) =>
                setForm({
                  ...form,
                  active: value,
                })
              }
            />
          </div>

          {/* SUBMIT */}
          <Button onClick={handleSubmit} disabled={pending} className="h-12 w-full rounded-2xl">
            {pending
              ? mode === "create"
                ? "Creating..."
                : "Updating..."
              : mode === "create"
                ? "Create Plan"
                : "Update Plan"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
