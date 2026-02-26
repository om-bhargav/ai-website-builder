"use client"

import * as React from "react"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface AppIconProps extends React.SVGProps<SVGSVGElement> {
  icon: LucideIcon
  size?: number
}

export function AppIcon({
  icon: Icon,
  size = 18, // default consistent size
  className,
  ...props
}: AppIconProps) {
  return (
    <Icon
      size={size}
      strokeWidth={1.8}
      className={cn(
        className
      )}
      {...props}
    />
  )
}