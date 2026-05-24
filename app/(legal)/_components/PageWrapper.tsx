import { ReactNode } from "react"
import { SITE_NAME } from "@/config"

interface PageWrapperProps {
  badge?: string
  title: string
  description: string
  children: ReactNode
}

export default function PageWrapper({
  badge,
  title,
  description,
  children,
}: PageWrapperProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background px-6 py-24">

      {/* Glow */}
      <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-primary/10 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-fuchsia-500/10 blur-[120px]" />

      {/* Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.08)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.08)_1px,transparent_1px)] bg-[size:70px_70px]" />

      <div className="relative z-10 mx-auto max-w-6xl space-y-12">

        <div className="space-y-5 text-center">
          {badge && (
            <div className="inline-flex rounded-full border border-border bg-primary/5 px-4 py-1 text-sm font-medium text-primary backdrop-blur-xl">
              {badge}
            </div>
          )}

          <h1 className="mx-auto max-w-4xl text-4xl font-black tracking-tight md:text-6xl">
            {title}
          </h1>

          <p className="mx-auto max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {description}
          </p>
        </div>

        <div className="rounded-[2rem] border border-border/60 bg-background/70 p-8 shadow-2xl backdrop-blur-3xl md:p-12">
          {children}
        </div>
      </div>
    </div>
  )
}