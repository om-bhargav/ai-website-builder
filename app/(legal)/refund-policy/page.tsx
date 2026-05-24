import { SITE_NAME } from "@/config";

import { Card, CardContent } from "@/components/ui/card";

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-background px-6 py-24">
      <div className="mx-auto max-w-5xl space-y-10">
        <div className="space-y-4 text-center">
          <div className="inline-flex rounded-full border border-border bg-primary/5 px-4 py-1 text-sm font-medium text-primary">
            Legal
          </div>

          <h1 className="text-4xl font-black tracking-tight md:text-5xl">Refund Policy</h1>

          <p className="mx-auto max-w-2xl text-muted-foreground md:text-lg">
            Understanding refunds and cancellations on {SITE_NAME}.
          </p>
        </div>

        <Card className="rounded-3xl border-border/60 shadow-sm">
          <CardContent className="space-y-10 p-8 md:p-12">
            <section className="space-y-3">
              <h2 className="text-2xl font-bold">Eligibility</h2>

              <p className="leading-7 text-muted-foreground">
                Refund requests may be considered within a limited period after purchase depending
                on the nature of the subscription or service.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold">Non-Refundable Services</h2>

              <p className="leading-7 text-muted-foreground">
                Certain digital products, premium templates, and completed services may not be
                eligible for refunds.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold">Cancellation</h2>

              <p className="leading-7 text-muted-foreground">
                Users can cancel subscriptions anytime from their dashboard. Access to premium
                features may continue until the billing cycle ends.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
