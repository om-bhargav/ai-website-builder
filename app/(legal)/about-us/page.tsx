import PageWrapper from "../_components/PageWrapper"
import { SITE_NAME } from "@/config"

export default function AboutUsPage() {
  return (
    <PageWrapper
      badge="Company"
      title={`The story behind ${SITE_NAME}`}
      description="Building the future of AI-powered website creation and digital experiences."
    >
      <div className="space-y-12">

        <section className="space-y-5">
          <h2 className="text-3xl font-bold">Our Mission</h2>

          <p className="leading-8 text-muted-foreground">
            At {SITE_NAME}, our mission is to simplify website creation while
            empowering creators with modern AI tools. We believe every person,
            regardless of technical background, should have access to beautiful,
            scalable, and professional digital experiences.
          </p>

          <p className="leading-8 text-muted-foreground">
            Our platform combines design systems, AI workflows, responsive layouts,
            and developer-focused architecture into one seamless ecosystem.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-3">
          {[
            "Innovation",
            "Performance",
            "Accessibility",
          ].map((item) => (
            <div
              key={item}
              className="rounded-3xl border border-border/60 bg-muted/20 p-8"
            >
              <h3 className="text-2xl font-bold">{item}</h3>

              <p className="mt-4 leading-7 text-muted-foreground">
                We focus on delivering high-quality experiences that balance
                usability, scalability, and creativity.
              </p>
            </div>
          ))}
        </section>
      </div>
    </PageWrapper>
  )
}