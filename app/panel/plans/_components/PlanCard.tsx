"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type PlanType = "BASIC" | "PRO" | "ADVANCED"

interface PlanCardProps {
  type: PlanType
  active?: boolean
  onSelect?: () => void
}

export function PlanCard({ type, active, onSelect }: PlanCardProps) {
  const isPro = type === "PRO"
  const isAdvanced = type === "ADVANCED"

  return (
    <Card
      className={cn(
        "rounded-3xl border shadow-sm transition-all hover:shadow-md",
        active
          ? "border-primary bg-primary/5"
          : "border-border bg-card"
      )}
    >
      <CardHeader className="flex items-center justify-between pb-2">
        <h3 className="text-xl font-bold text-foreground">
          {type}
        </h3>

        {active && (
          <Badge className="bg-primary text-primary-foreground">
            Active
          </Badge>
        )}
      </CardHeader>

      <CardContent className="space-y-4">

        <div className="space-y-2 text-sm text-muted-foreground">
          {type === "BASIC" && (
            <>
              <p>✔ 1 Website</p>
              <p>✔ Limited Templates</p>
              <p>✔ Email Support</p>
            </>
          )}

          {isPro && (
            <>
              <p>✔ 5 Websites</p>
              <p>✔ Premium Templates</p>
              <p>✔ Priority Support</p>
            </>
          )}

          {isAdvanced && (
            <>
              <p>✔ Unlimited Websites</p>
              <p>✔ All Templates</p>
              <p>✔ Dedicated Support</p>
              <p>✔ Advanced Analytics</p>
            </>
          )}
        </div>

        {!active && (
          <Button
            onClick={onSelect}
            className="w-full rounded-xl"
          >
            Choose Plan
          </Button>
        )}
      </CardContent>
    </Card>
  )
}