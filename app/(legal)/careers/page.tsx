import PageWrapper from "../_components/PageWrapper"
import { SITE_NAME } from "@/config"

export default function CareersPage() {
  return (
    <PageWrapper
      badge="Careers"
      title={`Join the ${SITE_NAME} team`}
      description="Help us shape the future of AI-powered web development."
    >
      <div className="space-y-12">

        <section className="space-y-5">
          <h2 className="text-3xl font-bold">Why work with us?</h2>

          <p className="leading-8 text-muted-foreground">
            {SITE_NAME} is building cutting-edge AI infrastructure for modern creators.
            We value innovation, experimentation, collaboration, and ambitious ideas.
          </p>

          <p className="leading-8 text-muted-foreground">
            Our team works remotely with flexible schedules, modern tooling,
            and a strong engineering culture focused on performance and creativity.
          </p>
        </section>

        <section className="space-y-6">
          {[
            "Frontend Engineer",
            "AI Product Designer",
            "Backend Developer",
            "Growth Marketing Specialist",
          ].map((role) => (
            <div
              key={role}
              className="rounded-2xl border border-border/60 p-6"
            >
              <h3 className="text-2xl font-bold">{role}</h3>

              <p className="mt-3 leading-7 text-muted-foreground">
                We are looking for talented individuals passionate about technology,
                design systems, AI products, and scalable web experiences.
              </p>
            </div>
          ))}
        </section>
      </div>
    </PageWrapper>
  )
}