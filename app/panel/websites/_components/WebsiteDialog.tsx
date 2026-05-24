"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { fileToBase64 } from "@/lib/base64";
import { ImagePlus } from "lucide-react";

type WebsiteForm = {
  title: string;
  description: string;
  thumbnail: string;
};

type Props = {
  children: React.ReactNode;
  mode: "create" | "edit";
  initialData?: Partial<WebsiteForm> & { id?: string };
  onSuccess?: () => void;
};

export default function WebsiteDialog({
  children,
  mode,
  initialData,
  onSuccess,
}: Props) {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState<WebsiteForm>({
    title: "",
    description: "",
    thumbnail: "",
  });

  /* ---------------- INIT ---------------- */
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setForm({
        title: initialData.title || "",
        description: initialData.description || "",
        thumbnail: initialData.thumbnail || "",
      });
    }
  }, [mode, initialData]);

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async () => {
    const url =
      mode === "create"
        ? "/api/user/websites"
        : `/api/user/websites/${initialData?.id}`;

    const method = mode === "create" ? "POST" : "PATCH";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!data.success) {
      toast.error(data.message);
      return;
    }

    toast.success(data.message);

    await onSuccess?.();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create Website" : "Edit Website"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3">

          {/* TITLE */}
          <Input
            placeholder="Website Title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
          />

          {/* THUMBNAIL UPLOAD */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Thumbnail</label>

            {form.thumbnail ? (
              <div
                className="relative group cursor-pointer"
                onClick={() =>
                  document.getElementById("thumbInput")?.click()
                }
              >
                <img
                  src={form.thumbnail}
                  className="h-32 w-full object-cover rounded-lg border transition group-hover:opacity-80"
                />

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <p className="text-xs bg-black/60 text-white px-2 py-1 rounded">
                    Click to change image
                  </p>
                </div>
              </div>
            ) : (
              <div
                className="border rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-muted/40 transition"
                onClick={() =>
                  document.getElementById("thumbInput")?.click()
                }
              >
                <ImagePlus className="w-8 h-8 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">
                  Click to upload thumbnail
                </p>
              </div>
            )}

            <input
              id="thumbInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                const base64 = await fileToBase64(file);
                setForm({ ...form, thumbnail: base64 });
              }}
            />
          </div>

          {/* DESCRIPTION */}
          <Textarea
            placeholder="Website Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          {/* SUBMIT */}
          <Button onClick={handleSubmit} className="w-full">
            {mode === "create" ? "Create Website" : "Update Website"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}