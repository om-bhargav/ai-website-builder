import { SITE_NAME } from "@/config"

import {
  Card,
  CardContent,
} from "@/components/ui/card"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background px-6 py-24">
      <div className="mx-auto max-w-5xl space-y-10">

        {/* Header */}
        <div className="space-y-4 text-center">
          <div className="inline-flex rounded-full border border-border bg-primary/5 px-4 py-1 text-sm font-medium text-primary">
            Legal
          </div>

          <h1 className="text-4xl font-black tracking-tight md:text-5xl">
            Terms of Service
          </h1>

          <p className="mx-auto max-w-2xl text-muted-foreground md:text-lg">
            The rules and conditions for using {SITE_NAME}.
          </p>
        </div>

        <Card className="rounded-3xl border-border/60 shadow-sm">
          <CardContent className="space-y-10 p-8 md:p-12">

            <section className="space-y-3">
              <h2 className="text-2xl font-bold">Acceptance of Terms</h2>

              <p className="leading-7 text-muted-foreground">
                By accessing or using {SITE_NAME}, you agree to comply with these
                Terms of Service and all applicable laws and regulations.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold">User Responsibilities</h2>

              <p className="leading-7 text-muted-foreground">
                Users are responsible for maintaining account security and ensuring
                that any content uploaded or generated through the platform does not
                violate applicable laws.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold">Subscriptions & Billing</h2>

              <p className="leading-7 text-muted-foreground">
                Paid plans may include recurring billing. Users can manage or cancel
                subscriptions from their dashboard billing settings.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold">Intellectual Property</h2>

              <p className="leading-7 text-muted-foreground">
                All platform branding, designs, software, and assets associated with
                {SITE_NAME} remain protected intellectual property.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold">Termination</h2>

              <p className="leading-7 text-muted-foreground">
                We reserve the right to suspend or terminate accounts that violate
                these terms or misuse the platform.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold">Limitation of Liability</h2>

              <p className="leading-7 text-muted-foreground">
                {SITE_NAME} is provided on an "as is" basis without warranties of
                any kind. We are not liable for damages arising from the use or
                inability to use the platform.
              </p>
            </section>

          </CardContent>
        </Card>
      </div>
    </div>
  )
}