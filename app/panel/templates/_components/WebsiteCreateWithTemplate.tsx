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

import { ImagePlus, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

type WebsiteForm = {
  title: string;
  description: string;
  thumbnail: string;
};

type Template = {
  id: string;
  title: string;
  file?: string;
};

type Props = {
  children: React.ReactNode;

  templateId: string;

  onSuccess?: () => void;
};

export default function WebsiteDialog({ children, templateId, onSuccess }: Props) {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState<WebsiteForm>({
    title: "",
    description: "",
    thumbnail: "",
  });

  const [template, setTemplate] = useState<Template | null>(null);

  const [loading, setLoading] = useState(false);
  const [templateLoading, setTemplateLoading] = useState(false);
  const router = useRouter();
  /* ---------------- FETCH TEMPLATE ---------------- */
  useEffect(() => {
    if (!open || !templateId) return;

    const fetchTemplate = async () => {
      try {
        setTemplateLoading(true);

        const res = await fetch(`/api/admin/templates/${templateId}`);

        const data = await res.json();

        if (!data.success) {
          toast.error(data.message);
          return;
        }

        setTemplate(data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setTemplateLoading(false);
      }
    };

    fetchTemplate();
  }, [open, templateId]);

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async () => {
    try {
      if (!template?.file) {
        toast.error("Template file not found");
        return;
      }

      setLoading(true);

      const res = await fetch("/api/user/websites", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          ...form,

          file: template.file,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      toast.success(data.message);

      await onSuccess?.();

      setOpen(false);
      if (data?.data) {
        router.push(`/panel/editor/website/${data.data.id}`);
      }
      // reset form
      setForm({
        title: "",
        description: "",
        thumbnail: "",
      });
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Website</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* TEMPLATE */}
          <div className="rounded-xl border bg-muted/40 p-4">
            {templateLoading ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading template...
              </div>
            ) : (
              <div>
                <p className="mb-1 text-xs text-muted-foreground">Selected Template</p>

                <p className="font-medium">{template?.title || "Template"}</p>
              </div>
            )}
          </div>

          {/* TITLE */}
          <Input
            placeholder="Website Title"
            value={form.title}
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value,
              })
            }
          />

          {/* THUMBNAIL */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Thumbnail</label>

            {form.thumbnail ? (
              <div
                className="relative cursor-pointer group"
                onClick={() => document.getElementById("thumbInput")?.click()}
              >
                <img
                  src={form.thumbnail}
                  className="h-36 w-full rounded-xl border object-cover transition group-hover:opacity-80"
                />

                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
                  <p className="rounded bg-black/60 px-2 py-1 text-xs text-white">
                    Click to change image
                  </p>
                </div>
              </div>
            ) : (
              <div
                className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border p-6 transition hover:bg-muted/40"
                onClick={() => document.getElementById("thumbInput")?.click()}
              >
                <ImagePlus className="h-8 w-8 text-muted-foreground" />

                <p className="text-xs text-muted-foreground">Click to upload thumbnail</p>
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

                setForm({
                  ...form,
                  thumbnail: base64,
                });
              }}
            />
          </div>

          {/* DESCRIPTION */}
          <Textarea
            placeholder="Website Description"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
          />

          {/* SUBMIT */}
          <Button onClick={handleSubmit} disabled={loading || templateLoading} className="w-full">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Website
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
