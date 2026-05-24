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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import toast from "react-hot-toast";
import { fileToBase64 } from "@/lib/base64";
import { ImagePlus } from "lucide-react";

type TemplateForm = {
  title: string;
  description: string;
  thumbnail: string;
  status: "DRAFT" | "PUBLISHED" | "UNDER_DEVELOPMENT";
};

type Props = {
  children: React.ReactNode;
  mode: "create" | "edit";
  initialData?: Partial<TemplateForm> & { id?: string };
  onSuccess?: () => void;
};

export default function TemplateDialog({ children, mode, initialData, onSuccess }: Props) {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState<TemplateForm>({
    title: "",
    description: "",
    thumbnail: "",
    status: "DRAFT",
  });

  /* ---------------- INIT ---------------- */
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setForm({
        title: initialData.title || "",
        description: initialData.description || "",
        thumbnail: initialData.thumbnail || "",
        status: initialData.status || "DRAFT",
      });
    }
  }, [mode, initialData]);

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async () => {
    const url =
      mode === "create" ? "/api/admin/templates" : `/api/admin/templates/${initialData?.id}`;

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

    await onSuccess?.();
    toast.success(data.message);

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Create Template" : "Edit Template"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <Input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <div className="space-y-2">
            <label className="text-sm font-medium">Thumbnail</label>

            {/* IF IMAGE EXISTS → SHOW PREVIEW ONLY */}
            {form.thumbnail ? (
              <div
                className="relative group cursor-pointer"
                onClick={() => document.getElementById("thumbInput")?.click()}
              >
                <img
                  src={form.thumbnail}
                  className="h-32 w-full object-cover rounded-lg border transition group-hover:opacity-80"
                />

                {/* hover overlay hint */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <p className="text-xs bg-black/60 text-white px-2 py-1 rounded">
                    Click to change image
                  </p>
                </div>
              </div>
            ) : (
              /* EMPTY STATE → UPLOAD UI */
              <div
                className="border rounded-xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-muted/40 transition"
                onClick={() => document.getElementById("thumbInput")?.click()}
              >
                <ImagePlus className="w-8 h-8 text-muted-foreground" />
                <p className="text-xs text-muted-foreground">Click to upload thumbnail</p>
              </div>
            )}

            {/* hidden input */}
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
          <Textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          {/* STATUS FIELD */}
          <Select
            value={form.status}
            onValueChange={(value: any) => setForm({ ...form, status: value })}
          >
            <SelectTrigger className="w-full!">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="DRAFT">Draft</SelectItem>
              <SelectItem value="PUBLISHED">Published</SelectItem>
              <SelectItem value="UNDER_DEVELOPMENT">Under Development</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={handleSubmit} className="w-full">
            {mode === "create" ? "Create" : "Update"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
