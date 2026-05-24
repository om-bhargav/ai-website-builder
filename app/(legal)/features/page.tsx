import PageWrapper from "../_components/PageWrapper"
import { SITE_NAME } from "@/config"

export default function FeaturesPage() {
  return (
    <PageWrapper
      badge="Platform"
      title={`Everything you need to build with ${SITE_NAME}`}
      description="Powerful AI website creation tools designed for creators, startups, businesses, and agencies."
    >
      <div className="space-y-14">

        <section className="space-y-6">
          <h2 className="text-3xl font-bold">AI Website Generation</h2>

          <p className="leading-8 text-muted-foreground">
            {SITE_NAME} helps users instantly generate modern websites using advanced AI systems.
            From layouts and typography to color palettes and responsive components,
            every detail is intelligently crafted to reduce development time and improve creativity.
            Whether you are building portfolios, SaaS products, landing pages, blogs,
            agency websites, or ecommerce experiences, our AI adapts to your requirements.
          </p>

          <p className="leading-8 text-muted-foreground">
            Our generation engine focuses on performance, accessibility, SEO optimization,
            responsiveness, and scalable architecture. Every generated page is structured
            to align with modern frontend standards.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          {[
            "Responsive layouts for every device",
            "Built-in SEO optimization",
            "Lightning-fast performance",
            "Custom animations and interactions",
            "Premium templates and sections",
            "Dashboard analytics and management",
            "Authentication and security support",
            "Modern deployment workflows",
          ].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-border/60 bg-muted/30 p-6"
            >
              <h3 className="text-lg font-semibold">{item}</h3>

              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                {SITE_NAME} provides enterprise-grade implementations for this feature,
                ensuring reliability, scalability, and ease of use.
              </p>
            </div>
          ))}
        </section>
      </div>
    </PageWrapper>
  )
}