"use client"

import { motion } from "framer-motion"
import {
  AlertTriangle,
  RefreshCcw,
} from "lucide-react"

import { Button } from "@/components/ui/button"

import {
  Card,
  CardContent,
} from "@/components/ui/card"

export default function ErrorScreen({
  error,
  reset,
}: {
  error: string
  reset: () => void
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-sidebar px-6">
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.15)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.15)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20" />

      <motion.div
        initial={{ opacity: 0, y: 35, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.45,
          ease: "easeOut",
        }}
        className="relative z-10 w-full max-w-2xl"
      >
        <Card className="overflow-hidden rounded-[2rem] border border-border/60 bg-background/70 shadow-2xl backdrop-blur-3xl">
          <CardContent className="relative flex flex-col items-center px-8 py-14 text-center md:px-14">

            {/* Error Icon */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                delay: 0.1,
                duration: 0.4,
              }}
              className="relative mb-8"
            >
              <div className="absolute inset-0 rounded-full bg-red-500/20 blur-2xl" />

              <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-red-500/20 bg-red-500/10 backdrop-blur-xl">
                <AlertTriangle className="h-11 w-11 text-red-500" />
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.15,
              }}
              className="text-4xl font-black tracking-tight md:text-5xl"
            >
              Something went wrong
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: 0.2,
              }}
              className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              We encountered an unexpected issue while processing your request.
              Please try again in a moment.
            </motion.p>

            {/* Error Box */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.25,
                }}
                className="mt-8 w-full rounded-2xl border border-border/60 bg-muted/40 p-5 text-left backdrop-blur-xl"
              >
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {error}
                </p>
              </motion.div>
            )}

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
              }}
              className="mt-10 flex flex-col gap-3 sm:flex-row"
            >
              <Button
                onClick={() => reset()}
                className="h-12 rounded-2xl px-7 text-sm font-semibold shadow-lg"
              >
                <RefreshCcw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
            </motion.div>

          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}