"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"
interface User{
  email: string
  name: string
  bio: string
  phone: string
  image: string
}
interface Props{
  user: User
}
export default function ProfilePhotoCard({user}:Props) {
  const image = user.image || "/avatar.png";
  return (
    <Card className="bg-background/20 backdrop-blur border border-white/10 rounded-2xl">
      <CardHeader>
        <CardTitle className="text-foreground text-lg">
          Your Photo
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">

        {/* Avatar */}
        <div className="flex items-center gap-4">
          <Image
            src={image}
            width={60}
            height={60}
            alt="avatar"
            className="rounded-full"
          />
          <div>
            <p className="text-foreground font-medium">Edit your photo</p>
            <p className="text-sm text-muted-foreground cursor-pointer">
              Delete · Update
            </p>
          </div>
        </div>

        {/* Upload Box */}
        <div className="border border-dashed border-white/20 rounded-xl p-10 text-center bg-background/5">
          <Upload className="mx-auto w-6 h-6 text-muted-foreground mb-3" />
          <p className="text-indigo-400 text-sm cursor-pointer">
            Click to upload
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            SVG, PNG, JPG or GIF (max. 800x800px)
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <Button variant="outline" className="border-white/20 text-foreground">
            Cancel
          </Button>

          <Button>
            Save
          </Button>
        </div>

      </CardContent>
    </Card>
  )
}

export function ProfilePhotoCardSkeleton() {
  return (
    <Card className="bg-background/20 backdrop-blur border border-white/10 rounded-2xl">
      <CardHeader>
        <Skeleton className="h-6 w-32 rounded-md" />
      </CardHeader>

      <CardContent className="space-y-6">

        {/* Avatar Section */}
        <div className="flex items-center gap-4">
          <Skeleton className="h-[60px] w-[60px] rounded-full" />

          <div className="space-y-2">
            <Skeleton className="h-4 w-32 rounded-md" />
            <Skeleton className="h-3 w-24 rounded-md" />
          </div>
        </div>

        {/* Upload Box */}
        <div className="border border-dashed border-white/10 rounded-xl p-10 bg-background/5 space-y-4">
          <div className="flex justify-center">
            <Skeleton className="h-6 w-6 rounded-md" />
          </div>

          <Skeleton className="h-4 w-28 mx-auto rounded-md" />
          <Skeleton className="h-3 w-48 mx-auto rounded-md" />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <Skeleton className="h-10 w-24 rounded-md" />
          <Skeleton className="h-10 w-20 rounded-md" />
        </div>

      </CardContent>
    </Card>
  )
}