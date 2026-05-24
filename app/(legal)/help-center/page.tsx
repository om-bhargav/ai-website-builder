import PageWrapper from "../_components/PageWrapper"
import { SITE_NAME } from "@/config"

export default function HelpCenterPage() {
  return (
    <PageWrapper
      badge="Support"
      title="Help Center"
      description={`Find answers, guides, tutorials, and support resources for ${SITE_NAME}.`}
    >
      <div className="space-y-10">
        {[
          "Getting Started",
          "Billing & Plans",
          "Website Deployment",
          "Templates & Customization",
          "Account Management",
          "Security & Privacy",
        ].map((item) => (
          <section
            key={item}
            className="space-y-4 rounded-3xl border border-border/60 bg-muted/20 p-8"
          >
            <h2 className="text-2xl font-bold">{item}</h2>

            <p className="leading-8 text-muted-foreground">
              Learn everything related to {item.toLowerCase()} with detailed
              explanations, workflows, troubleshooting guides, and best practices.
              Our help center is continuously updated to improve your experience.
            </p>
          </section>
        ))}
      </div>
    </PageWrapper>
  )
}