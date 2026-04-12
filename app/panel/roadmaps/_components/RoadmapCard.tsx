"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { motion } from "framer-motion"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreVertical, Pencil, Trash, Play } from "lucide-react"

type RoadMapProps = {
  title: string
  description: string
  created_at: string
  updated_at: string
}
type RoadmapCardProps = {
  data: RoadMapProps
  index: number

  // actions
  onEdit?: () => void
  onDelete?: () => void
  onWork?: () => void
}

export function RoadmapCard({
  data,
  index,
  onEdit,
  onDelete,
  onWork,
}: RoadmapCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.4,
        delay: index * 0.08,
        ease: "easeOut",
      }}
      whileHover={{ scale: 1.01, y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="w-full max-w-md"
    >
      <Card className="rounded-2xl shadow-sm hover:shadow-md transition relative">
        
        {/* 🔘 Top Right Menu */}
        <div className="absolute top-3 right-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical size={18} />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onWork}>
                <Play className="mr-2 h-4 w-4" />
                Work on it
              </DropdownMenuItem>

              <DropdownMenuItem onClick={onEdit}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={onDelete}
                className="text-red-500 focus:text-red-500"
              >
                <Trash className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* 📄 Content */}
        <CardHeader>
          <CardTitle className="text-xl font-semibold pr-8">
            {data.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground line-clamp-3">
            {data.description}
          </p>

          <div className="text-xs text-muted-foreground flex flex-col gap-1">
            <span>
              Created: {new Date(data.created_at).toLocaleDateString()}
            </span>
            <span>
              Updated: {new Date(data.updated_at).toLocaleDateString()}
            </span>
          </div>

          {/* ⚡ Optional Quick Actions (inline buttons) */}
          <div className="flex gap-2 pt-2">
            <Button size="sm" variant="secondary" onClick={onWork}>
              Work
            </Button>
            <Button size="sm" variant="outline" onClick={onEdit}>
              Edit
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function RoadmapCardSkeleton() {
  return (
    <Card className="w-full max-w-md rounded-2xl">
      <CardHeader>
        <Skeleton className="h-6 w-3/4 rounded-md" />
      </CardHeader>

      <CardContent className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-2/3" />

        <div className="space-y-2 pt-2">
          <Skeleton className="h-3 w-1/2" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      </CardContent>
    </Card>
  )
}