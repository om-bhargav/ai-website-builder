"use client"

import * as React from "react"
import { PlanCard } from "./_components/PlanCard"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

type PlanType = "BASIC" | "PRO" | "ADVANCED"

export default function PlansPage() {
  const [currentPlan, setCurrentPlan] =
    React.useState<PlanType>("BASIC")

  const [isActive, setIsActive] =
    React.useState<boolean>(true)

  const handleSelect = (plan: PlanType) => {
    setCurrentPlan(plan)
    setIsActive(true)
  }

  return (
    <div className="space-y-10">

      {/* ================= CURRENT PLAN ================= */}

      <Card className="rounded-3xl bg-primary/5 border border-primary/20 shadow-sm">
        <CardContent className="p-8 space-y-6">

          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Current Plan
            </h2>
            <p className="text-muted-foreground text-sm">
              Manage your subscription and plan settings.
            </p>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold text-foreground">
                {currentPlan}
              </p>
              <p className="text-sm text-muted-foreground">
                Status: {isActive ? "Active" : "Inactive"}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Label>Active</Label>
              <Switch
                checked={isActive}
                onCheckedChange={setIsActive}
              />
            </div>
          </div>

        </CardContent>
      </Card>

      {/* ================= AVAILABLE PLANS ================= */}

      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            Available Plans
          </h2>
          <p className="text-muted-foreground text-sm">
            Upgrade or switch your subscription.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {(["BASIC", "PRO", "ADVANCED"] as PlanType[]).map(
            (plan) => (
              <PlanCard
                key={plan}
                type={plan}
                active={plan === currentPlan}
                onSelect={() => handleSelect(plan)}
              />
            )
          )}
        </div>
      </div>
    </div>
  )
}