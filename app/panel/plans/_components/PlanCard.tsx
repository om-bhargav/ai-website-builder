"use client";

import { useState } from "react";

import { Card, CardContent } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";

import { Skeleton } from "@/components/ui/skeleton";

import { Check } from "lucide-react";
import toast from "react-hot-toast";

export interface Plan {
  id: string;
  title: string;
  description: string;
  price: number;
  websites: number;
  active: boolean;
}

export function PlanCard({ plan }: { plan: Plan }) {
  const [loading, setLoading] = useState(false);

  async function handlePurchase() {
    try {
      setLoading(true);

      // ================= CREATE ORDER =================

      const orderRes = await fetch("/api/plans/order", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          planId: plan.id,
        }),
      });

      const orderData = await orderRes.json();

      if (!orderRes.ok) {
        throw new Error(orderData.message);
      }

      // ================= RAZORPAY =================

      const options = {
        key: orderData.data.key,

        amount: orderData.data.amount,

        currency: orderData.data.currency,

        name: "Pagepilot",

        description: orderData.data.plan.title,

        order_id: orderData.data.orderId,

        handler: async (response: any) => {
          try {
            // ================= VERIFY =================

            const verifyRes = await fetch("/api/plans/verify", {
              method: "POST",

              headers: {
                "Content-Type": "application/json",
              },

              body: JSON.stringify({
                ...response,
                planId: plan.id,
              }),
            });

            const verifyData = await verifyRes.json();

            if (!verifyRes.ok) {
              throw new Error(verifyData.message);
            }

            toast.success("Payment Successful!");
          } catch (error) {
            console.error(error);

            toast.error("Payment Verification Failed!");
          }
        },

        theme: {
          color: "#7f22fe",
        },
      };

      const razorpay = new (window as any).Razorpay(options);

      razorpay.open();
    } catch (error) {
      console.error(error);

      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="group rounded-3xl border py-1 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <CardContent className="flex h-full flex-col p-8">
        {/* TOP */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="rounded-xl px-3 py-1">
              {plan.websites} Website
              {plan.websites > 1 ? "s" : ""}
            </Badge>

            {plan.price >= 1499 && <Badge className="rounded-xl px-3 py-1">Popular</Badge>}
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tight capitalize">{plan.title}</h2>

            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{plan.description}</p>
          </div>
        </div>

        {/* PRICE */}
        <div className="mt-8">
          <div className="flex items-end gap-1">
            <h3 className="text-5xl font-bold tracking-tight">₹{plan.price}</h3>

            <span className="pb-1 text-sm text-muted-foreground">one-time</span>
          </div>
        </div>

        {/* FEATURES */}
        <div className="mt-8 flex-1 space-y-4">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-primary/10 p-1">
              <Check className="size-4 text-primary" />
            </div>

            <p className="text-sm">
              Add {plan.websites} Website
              {plan.websites > 1 ? "s" : ""}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-full bg-primary/10 p-1">
              <Check className="size-4 text-primary" />
            </div>

            <p className="text-sm">Instant Activation</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-full bg-primary/10 p-1">
              <Check className="size-4 text-primary" />
            </div>

            <p className="text-sm">Premium Dashboard Access</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-full bg-primary/10 p-1">
              <Check className="size-4 text-primary" />
            </div>

            <p className="text-sm">Priority Support</p>
          </div>
        </div>

        {/* BUTTON */}
        <Button
          disabled={loading}
          onClick={handlePurchase}
          className="mt-10 h-12 w-full rounded-2xl text-base font-medium"
        >
          {loading ? "Processing..." : "Purchase Plan"}
        </Button>
      </CardContent>
    </Card>
  );
}

export function PlanCardSkeleton() {
  return (
    <Card className="rounded-3xl border py-1 shadow-sm">
      <CardContent className="flex h-full flex-col p-8">
        {/* TOP */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-7 w-28 rounded-xl" />

            <Skeleton className="h-7 w-20 rounded-xl" />
          </div>

          <div className="space-y-3">
            <Skeleton className="h-9 w-40 rounded-xl" />

            <Skeleton className="h-4 w-full rounded-xl" />

            <Skeleton className="h-4 w-4/5 rounded-xl" />
          </div>
        </div>

        {/* PRICE */}
        <div className="mt-8 flex items-end gap-2">
          <Skeleton className="h-14 w-36 rounded-xl" />

          <Skeleton className="mb-1 h-4 w-16 rounded-xl" />
        </div>

        {/* FEATURES */}
        <div className="mt-8 flex-1 space-y-4">
          {Array.from({
            length: 4,
          }).map((_, index) => (
            <div key={index} className="flex items-center gap-3">
              <Skeleton className="size-6 rounded-full" />

              <Skeleton className="h-4 w-40 rounded-xl" />
            </div>
          ))}
        </div>

        {/* BUTTON */}
        <Skeleton className="mt-10 h-12 w-full rounded-2xl" />
      </CardContent>
    </Card>
  );
}
