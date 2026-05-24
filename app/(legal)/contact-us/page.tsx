import PageWrapper from "../_components/PageWrapper"
import { SITE_NAME } from "@/config"

export default function ContactPage() {
  return (
    <PageWrapper
      badge="Contact"
      title="Get in touch"
      description={`Contact the ${SITE_NAME} team for support, partnerships, or inquiries.`}
    >
      <div className="grid gap-8 md:grid-cols-2">

        <div className="space-y-6 rounded-3xl border border-border/60 bg-muted/20 p-8">
          <h2 className="text-3xl font-bold">Contact Information</h2>

          <p className="leading-8 text-muted-foreground">
            Reach out to our support and operations team for any assistance regarding
            the platform, partnerships, enterprise solutions, or technical issues.
          </p>

          <div className="space-y-5 text-muted-foreground">
            <div>
              <h3 className="font-semibold text-foreground">Email</h3>
              <p>support@yourdomain.com</p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground">Business Hours</h3>
              <p>Monday - Friday • 9:00 AM - 6:00 PM</p>
            </div>

            <div>
              <h3 className="font-semibold text-foreground">Support</h3>
              <p>24/7 platform monitoring and support assistance.</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-border/60 bg-background p-8">
          <div className="flex h-full min-h-[320px] items-center justify-center rounded-2xl border border-dashed border-border text-center text-muted-foreground">
            Contact form or interactive support section.
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}