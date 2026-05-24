"use client"
import React from "react"
import { FileX2, FolderOpen, Inbox, Loader2 } from "lucide-react"
import {motion} from "framer-motion";
interface Props extends React.PropsWithChildren {
  loading: boolean
  error?: {message?: string}
  emptyMessage?: string
  dataLength?: number
  className?: string
  loadingCard?: React.ComponentType
  loadingCols?: number
  loadingRows?: number
  loadingCount?: number
}

export default function ErrorLoading({
  className,
  children,
  loading,
  error,
  emptyMessage = "No data found",
  dataLength,
  loadingCard,
  loadingCols = 2,
  loadingRows = 2,
  loadingCount,
}: Props) {
  const errorMessage = error?.message ? error.message : "Something went wrong"

  return (
    <div className={`min-h-[150px] ${className ?? ""}`}>
      {loading ? (
        <SectionLoader
          rows={loadingRows}
          cols={loadingCols}
          count={loadingCount}
          LoadingCard={loadingCard}
        />
      ) : error ? (
        <ErrorSection text={errorMessage} />
      ) : dataLength === 0 ? (
        <EmptySection text={emptyMessage} />
      ) : (
        children
      )}
    </div>
  )
}

function ErrorSection({ text }: { text: string }) {
  return (
    <div className="text-center py-10">
      <h3 className="text-red-500 text-sm font-medium">{text}</h3>
    </div>
  )
}



function EmptySection({ text }: { text: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="w-full flex flex-col items-center justify-center text-center
                 rounded-3xl
                 px-10 py-14 shadow-sm"
    >
      {/* Icon wrapper */}
      <div className="relative mb-5">
        <div className="absolute inset-0 rounded-2xl bg-primary/10 blur-xl" />
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border bg-background shadow-md">
          <FolderOpen className="h-8 w-8 text-muted-foreground" />
        </div>
      </div>

      {/* Text */}
      <h3 className="text-base font-semibold tracking-tight text-foreground">
        Nothing to show here
      </h3>

      <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
        {text}
      </p>
    </motion.div>
  );
}

interface SectionLoaderProps {
  LoadingCard?: React.ComponentType
  count?: number
  rows?: number
  cols?: number
  className?: string
}

function SectionLoader({
  LoadingCard,
  count,
  rows = 2,
  cols = 2,
  className,
}: SectionLoaderProps) {
  if (!LoadingCard) {
    return (
      <div className="flex items-center justify-center min-h-[200px]">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  const totalItems = count ?? rows * cols

  return (
    <div
      className={`grid max-md:grid-cols-1! gap-6 ${className ?? ""}`}
      style={{
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
      }}
    >
      {Array.from({ length: totalItems }).map((_, i) => (
        <LoadingCard key={i} />
      ))}
    </div>
  )
}