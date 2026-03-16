"use client"
import React from "react"
import { Loader2 } from "lucide-react"

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
    <div className="text-center py-10 text-muted-foreground text-sm font-medium">
      {text}
    </div>
  )
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