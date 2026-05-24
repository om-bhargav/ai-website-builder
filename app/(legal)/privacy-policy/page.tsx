import { SITE_NAME } from "@/config";

import { Card, CardContent } from "@/components/ui/card";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background px-6 py-24">
      <div className="mx-auto max-w-5xl space-y-10">
        {/* Header */}
        <div className="space-y-4 text-center">
          <div className="inline-flex rounded-full border border-border bg-primary/5 px-4 py-1 text-sm font-medium text-primary">
            Legal
          </div>

          <h1 className="text-4xl font-black tracking-tight md:text-5xl">Privacy Policy</h1>

          <p className="mx-auto max-w-2xl text-muted-foreground md:text-lg">
            Learn how {SITE_NAME} collects, uses, and protects your information.
          </p>
        </div>

        {/* Content */}
        <Card className="rounded-3xl border-border/60 shadow-sm">
          <CardContent className="space-y-10 p-8 md:p-12">
            <section className="space-y-3">
              <h2 className="text-2xl font-bold">Information We Collect</h2>

              <p className="leading-7 text-muted-foreground">
                {SITE_NAME} may collect information such as your name, email address, billing
                details, usage analytics, and website-related content when you use our platform.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold">How We Use Your Information</h2>

              <p className="leading-7 text-muted-foreground">
                We use your information to provide and improve our services, personalize your
                experience, process payments, enhance security, and communicate important updates.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold">Data Protection</h2>

              <p className="leading-7 text-muted-foreground">
                {SITE_NAME} implements modern security practices to help protect your data against
                unauthorized access, misuse, or disclosure.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold">Third-Party Services</h2>

              <p className="leading-7 text-muted-foreground">
                We may use trusted third-party services for analytics, authentication, hosting, and
                payment processing. These services may collect data according to their own privacy
                policies.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold">Your Rights</h2>

              <p className="leading-7 text-muted-foreground">
                You may request access, modification, or deletion of your personal information at
                any time by contacting our support team.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold">Changes To This Policy</h2>

              <p className="leading-7 text-muted-foreground">
                {SITE_NAME} may update this Privacy Policy occasionally. Continued use of our
                platform after updates indicates your acceptance of the revised policy.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
