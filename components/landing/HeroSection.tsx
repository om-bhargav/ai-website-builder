"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, WandSparkles, Play, Check } from "lucide-react";

import { Particles } from "@/components/ui/particles";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { AuthStore } from "@/store/AuthInfo";

const features = ["AI Generated Layouts", "Modern Animations", "SEO Optimized", "One Click Deploy"];

export default function MyHeader() {
  const { user } = AuthStore();
  const router = useRouter();

  return (
    <section className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(120,119,198,0.22),transparent_40%)]" />

      <div className="absolute top-0 left-1/2 h-[250px] w-[250px] md:h-[500px] md:w-[500px] -translate-x-1/2 rounded-full bg-violet-500/20 blur-[120px]" />

      <div className="absolute bottom-0 right-0 h-[220px] w-[220px] md:h-[400px] md:w-[400px] rounded-full bg-pink-500/20 blur-[120px]" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:50px_50px] md:bg-[size:70px_70px]" />

      {/* Particles */}
      <div className="hidden sm:block">
        <Particles className="absolute inset-0" quantity={120} ease={80} color="#ffffff" refresh />
      </div>

      <div className="container max-w-[1400px] relative z-10 mx-auto flex min-h-screen items-center px-4 sm:px-6 py-16 sm:py-24">
        <div className="grid w-full items-center gap-10 lg:grid-cols-2 grid-cols-1">
          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center text-center lg:items-start lg:text-left"
          >
            <Badge className="mb-5 sm:mb-6 rounded-full border border-white/10 bg-white/5 px-4 sm:px-5 py-2 text-xs sm:text-sm backdrop-blur-xl">
              <Sparkles className="mr-2 h-4 w-4 text-violet-300" />
              Next Generation AI Builder
            </Badge>

            <h1 className="max-w-3xl text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight">
              Design Websites
              <span className="block bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-300 bg-clip-text text-transparent">
                That Feel Alive
              </span>
            </h1>

            <p className="mt-5 sm:mt-7 max-w-2xl text-base sm:text-lg md:text-xl leading-relaxed text-zinc-400">
              Create stunning modern websites with AI generated layouts, premium interactions,
              responsive sections, and production-ready pages in minutes.
            </p>

            {/* Buttons */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
              <Button
                size="lg"
                onClick={() => router.push(user ? "/panel" : "/sign-up")}
                className="group h-12 sm:h-14 rounded-2xl px-6 sm:px-8 text-sm sm:text-base font-medium shadow-[0_0_40px_rgba(139,92,246,0.35)] w-full sm:w-auto"
              >
                {user ? "Open Dashboard" : "Start Building"}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => router.push("/showcase")}
                className="h-12 sm:h-14 rounded-2xl border-white/10 bg-white/5 px-6 sm:px-8 text-white backdrop-blur-xl hover:bg-white/10 w-full sm:w-auto"
              >
                <Play className="mr-2 h-4 w-4" />
                Live Preview
              </Button>
            </div>

            {/* Features */}
            <div className="mt-8 sm:mt-10 grid gap-3 sm:grid-cols-2 w-full">
              {features.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 backdrop-blur-xl"
                >
                  <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-violet-500/20">
                    <Check className="h-4 w-4 text-violet-300" />
                  </div>
                  <span className="text-xs sm:text-sm text-zinc-300">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative mx-auto w-full max-w-xl"
          >
            {/* Floating Cards (hidden on mobile) */}
            <div className="hidden lg:block">
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute -left-10 top-10 z-50 rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-violet-500/20 p-3">
                    <Sparkles className="h-5 w-5 text-violet-300" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">AI Generated UI</p>
                    <p className="text-xs text-zinc-400">Built instantly</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 18, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute -right-6 bottom-10 z-50 rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-cyan-500/20 p-3">
                    <WandSparkles className="h-5 w-5 text-cyan-300" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Smart Components</p>
                    <p className="text-xs text-zinc-400">Interactive by default</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Main Card */}
            <Card className="overflow-hidden rounded-[24px] sm:rounded-[32px] border border-white/10 bg-white/[0.04] shadow-2xl backdrop-blur-2xl">
              <CardHeader className="border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-red-400" />
                  <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-yellow-400" />
                  <div className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-green-400" />
                </div>
              </CardHeader>

              <CardContent className="space-y-6 p-4 sm:p-6">
                {/* Navbar skeleton */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                  <div className="h-4 w-20 sm:w-24 rounded-full bg-white/10" />
                  <div className="flex gap-2">
                    <div className="h-4 w-10 sm:w-12 rounded-full bg-white/10" />
                    <div className="h-4 w-10 sm:w-12 rounded-full bg-white/10" />
                    <div className="h-4 w-10 sm:w-12 rounded-full bg-white/10" />
                  </div>
                </div>

                {/* Hero preview */}
                <div className="rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-500/20 to-transparent p-5 sm:p-8">
                  <div className="h-4 w-20 sm:w-24 rounded-full bg-violet-300/30" />
                  <div className="mt-5 space-y-3">
                    <div className="h-6 sm:h-8 w-full rounded-full bg-white/10" />
                    <div className="h-6 sm:h-8 w-2/3 rounded-full bg-white/10" />
                  </div>
                  <div className="mt-6 h-20 sm:h-24 rounded-2xl bg-white/[0.04]" />
                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <div className="h-10 sm:h-12 w-full sm:w-32 rounded-2xl bg-violet-400/40" />
                    <div className="h-10 sm:h-12 w-full sm:w-32 rounded-2xl bg-white/10" />
                  </div>
                </div>

                {/* Bottom grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                    >
                      <div className="h-5 w-10 rounded-full bg-white/10" />
                      <div className="mt-4 h-12 sm:h-16 rounded-xl bg-white/[0.04]" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
