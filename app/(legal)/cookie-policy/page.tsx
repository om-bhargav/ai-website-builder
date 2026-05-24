import { SITE_NAME } from "@/config";

import { Card, CardContent } from "@/components/ui/card";

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-background px-6 py-24">
      <div className="mx-auto max-w-5xl space-y-10">
        <div className="space-y-4 text-center">
          <div className="inline-flex rounded-full border border-border bg-primary/5 px-4 py-1 text-sm font-medium text-primary">
            Legal
          </div>

          <h1 className="text-4xl font-black tracking-tight md:text-5xl">Cookie Policy</h1>

          <p className="mx-auto max-w-2xl text-muted-foreground md:text-lg">
            How {SITE_NAME} uses cookies and similar technologies.
          </p>
        </div>

        <Card className="rounded-3xl border-border/60 shadow-sm">
          <CardContent className="space-y-10 p-8 md:p-12">
            <section className="space-y-3">
              <h2 className="text-2xl font-bold">What Are Cookies?</h2>

              <p className="leading-7 text-muted-foreground">
                Cookies are small files stored on your device that help improve your browsing
                experience and remember preferences.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold">How We Use Cookies</h2>

              <p className="leading-7 text-muted-foreground">
                {SITE_NAME} uses cookies to maintain sessions, analyze traffic, personalize
                experiences, and improve platform performance.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-bold">Managing Cookies</h2>

              <p className="leading-7 text-muted-foreground">
                You may disable cookies through your browser settings, though some platform features
                may not function properly.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
