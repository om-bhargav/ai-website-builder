"use client";

import { useRef, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { motion } from "framer-motion";
import { Upload, Loader2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface User {
  email: string;
  name: string;
  bio: string;
  phone: string;
  image: string;
}

interface Props {
  user: User;
  updateProfile: any;
}

export default function ProfilePhotoCard({ user, updateProfile }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);

  const [preview, setPreview] = useState<string>(user.image || "/avatar.png");
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const changed = !!file;

  const handlePick = () => {
    fileRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];

    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const handleCancel = () => {
    setFile(null);
    setPreview(user.image || "/avatar.png");

    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };

  const handleDelete = async () => {
    setFile(null);
    setPreview("/avatar.png");
    await updateProfile({
      removeImage: true
    });

    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };

  const handleSubmit = async () => {
    try {
      setSaving(true);
      await updateProfile({
        image: file
      });
    } catch (error) {
      console.error(error);
    } finally {
      setFile(null);
      setSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35 }}
    >
      <Card className="bg-background/30 backdrop-blur border border-white/10 rounded-2xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-foreground">Your Photo</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <input
            ref={fileRef}
            type="file"
            hidden
            accept="image/png,image/jpeg,image/jpg,image/gif"
            onChange={handleFileChange}
          />

          <div className="flex items-center gap-3">
            <Image
              src={preview}
              width={52}
              height={52}
              alt="avatar"
              className="rounded-full object-cover h-[52px] w-[52px]"
            />

            <div className="leading-tight">
              <p className="text-sm font-medium text-foreground">Edit your photo</p>

              <div className="flex gap-2 text-xs text-muted-foreground">
                <button type="button" onClick={handleDelete} className="hover:text-red-400">
                  Delete
                </button>

                <span>·</span>

                <button type="button" onClick={handlePick} className="hover:text-indigo-400">
                  Update
                </button>
              </div>
            </div>
          </div>

          <div
            onClick={handlePick}
            className="border border-dashed border-white/20 rounded-xl p-6 text-center bg-background/5 cursor-pointer hover:bg-background/10 transition"
          >
            <Upload className="mx-auto w-5 h-5 text-muted-foreground mb-2" />

            <p className="text-sm text-indigo-400">Click to upload</p>

            <p className="text-[11px] text-muted-foreground mt-1">PNG, JPG, GIF (max 800x800)</p>
          </div>

          {changed && (
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                className="h-9 px-4 border-white/20"
                onClick={handleCancel}
                disabled={saving}
              >
                Cancel
              </Button>

              <Button type="button" className="h-9 px-4" onClick={handleSubmit} disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save"
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
export function ProfilePhotoCardSkeleton() {
  return (
    <Card className="bg-background/30 backdrop-blur border border-white/10 rounded-2xl">
      <CardHeader className="pb-3">
        <Skeleton className="h-5 w-28 rounded-md" />
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Avatar */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-[52px] w-[52px] rounded-full" />

          <div className="space-y-2">
            <Skeleton className="h-4 w-28 rounded-md" />
            <Skeleton className="h-3 w-20 rounded-md" />
          </div>
        </div>

        {/* Upload Box */}
        <div className="border border-dashed border-white/10 rounded-xl p-6 bg-background/5 space-y-3">
          <div className="flex justify-center">
            <Skeleton className="h-5 w-5 rounded-md" />
          </div>

          <Skeleton className="h-4 w-24 mx-auto rounded-md" />
          <Skeleton className="h-3 w-36 mx-auto rounded-md" />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <Skeleton className="h-9 w-20 rounded-md" />
          <Skeleton className="h-9 w-20 rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
}
