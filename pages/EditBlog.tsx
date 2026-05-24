"use client";

import React, { useEffect, useTransition } from "react";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import toast from "react-hot-toast";
import { fileToBase64 } from "@/lib/base64";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ImagePlus, Trash2, ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import SimpleEditor from "@/components/SimpleEditor";
import useGoBack from "@/hooks/useGoBack";
import { z } from "zod";

export const blogSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long")
    .max(200, "Title cannot exceed 200 characters"),

  slug: z
    .string()
    .min(3, "Slug must be at least 3 characters long")
    .max(200, "Slug cannot exceed 200 characters")
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug can only contain lowercase letters, numbers, and hyphens (no spaces or special characters)",
    ),

  content: z.string().min(300, "Content must be at least 300 characters to ensure quality content"),

  excerpt: z.string().max(40, "Excerpt cannot exceed 40 characters").optional(),

  coverImg: z.string("Cover image is Must"),

  tags: z
    .array(z.string())
    .min(1, "At least one tag is required")
    .max(10, "You cannot add more than 10 tags"),
  published: z.boolean().default(false).optional(),
});
type BlogForm = z.infer<typeof blogSchema>;

export default function BlogEditorPage({id}:{id: string}) {
  const router = useRouter();
  const handleGoBack = useGoBack();

  const isNew = id === "new";

  const { data } = useSWR(isNew ? null : `/api/admin/blogs/${id}`, fetcher);

  const blog = data?.blog;
  const isLoadingData = !isNew && !blog;

  const [isPending, startTransition] = useTransition();
  const [uploading, setUploading] = React.useState(false);
  const [tagInput, setTagInput] = React.useState("");
  // FORM
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<BlogForm>({
    resolver: zodResolver(blogSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      coverImg: "",
      published: false,
    },
  });

  const values = watch();
  // hydrate
  useEffect(() => {
    if (blog) {
      reset(blog);
    }
  }, [blog, reset]);

  // auto slug
  useEffect(() => {
    if (isNew && values.title) {
      setValue(
        "slug",
        values.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, ""),
        { shouldValidate: true },
      );
    }
  }, [values.title, isNew, setValue]);

  // IMAGE UPLOAD
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Only images allowed");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Max size 2MB");
      return;
    }

    try {
      setUploading(true);
      const base64 = await fileToBase64(file);

      setValue("coverImg", base64, { shouldValidate: true });

      toast.success("Image uploaded");
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  // SAVE
  const onSubmit = (data: BlogForm) => {
    startTransition(async () => {
      try {
        const res = await fetch(isNew ? "/api/admin/blogs" : `/api/admin/blogs/${id}`, {
          method: isNew ? "POST" : "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        const result = await res.json();

        if (!res.ok || !result.success) {
          toast.error(result.message || "Save failed");
          return;
        }

        toast.success("Blog saved");
        router.push("/panel/blogs");
      } catch {
        toast.error("Server error");
      }
    });
  };

  const coverImg = watch("coverImg");

  const isDisabled = !isValid || isPending || uploading || isLoadingData;
  return (
    <div className="w-full p-6 space-y-8 flex flex-col">
      {/* BACK */}
      <div className="flex items-center gap-4">
        <Button onClick={handleGoBack} variant="outline">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
      </div>

      {/* TITLE */}
      <h1 className="text-3xl font-bold">{isNew ? "Create Blog" : "Edit Blog"}</h1>
      {/* FORM */}
      {/* FORM */}
      <div
        className={`flex flex-col lg:flex-row gap-8 ${
          isLoadingData ? "opacity-60 pointer-events-none" : ""
        }`}
      >
        {/* LEFT */}
        <div className="flex-1 flex flex-col gap-5">
          {/* TITLE */}
          <div className="flex flex-col gap-1">
            <Input {...register("title")} placeholder="Title" />
            {errors.title && <p className="text-xs text-red-500">{errors.title.message}</p>}
          </div>

          {/* SLUG */}
          <div className="flex flex-col gap-1">
            <Input {...register("slug")} placeholder="Slug" />
            {errors.slug && <p className="text-xs text-red-500">{errors.slug.message}</p>}
          </div>

          {/* EXCERPT */}
          <div className="flex flex-col gap-1">
            <Textarea {...register("excerpt")} placeholder="Excerpt" />
            {errors.excerpt && <p className="text-xs text-red-500">{errors.excerpt.message}</p>}
          </div>

          {/* TAGS */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">Tags</label>

            {/* INPUT */}
            <div className="flex gap-2">
              <Input
                value={tagInput}
                placeholder="Add tag"
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();

                    const trimmed = tagInput.trim().toLowerCase();

                    if (!trimmed) return;

                    const currentTags = values.tags || [];

                    if (currentTags.includes(trimmed)) {
                      toast.error("Tag already exists");
                      return;
                    }

                    setValue("tags", [...currentTags, trimmed], {
                      shouldValidate: true,
                    });

                    setTagInput("");
                  }
                }}
              />

              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  const trimmed = tagInput.trim().toLowerCase();

                  if (!trimmed) return;

                  const currentTags = values.tags || [];

                  if (currentTags.includes(trimmed)) {
                    toast.error("Tag already exists");
                    return;
                  }

                  setValue("tags", [...currentTags, trimmed], {
                    shouldValidate: true,
                  });

                  setTagInput("");
                }}
              >
                Add
              </Button>
            </div>

            {/* TAG LIST */}
            <div className="flex flex-wrap gap-2">
              {values.tags?.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 rounded-full border bg-muted px-3 py-1 text-xs"
                >
                  <span>{tag}</span>

                  <button
                    type="button"
                    onClick={() => {
                      setValue(
                        "tags",
                        values.tags.filter((t) => t !== tag),
                        {
                          shouldValidate: true,
                        },
                      );
                    }}
                    className="text-muted-foreground hover:text-red-500 transition"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>

            {errors.tags && <p className="text-xs text-red-500">{errors.tags.message as string}</p>}
          </div>

          {/* CONTENT */}
          <div className="flex flex-col gap-1">
            <SimpleEditor
              content={values.content}
              onChange={(val) =>
                setValue("content", val, {
                  shouldValidate: true,
                  shouldDirty: true,
                })
              }
            />

            {errors.content && <p className="text-xs text-red-500">{errors.content.message}</p>}
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-full lg:w-[320px] flex flex-col gap-6">
          {/* IMAGE */}
          <div className="flex flex-col gap-2">
            <label className="text-sm text-muted-foreground">Cover Image</label>

            <label className="h-40 w-full rounded-2xl border bg-muted/40 hover:bg-muted transition flex items-center justify-center cursor-pointer overflow-hidden">
              {coverImg ? (
                <img src={coverImg} className="w-full h-full object-cover" alt="cover" />
              ) : (
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <ImagePlus className="w-7 h-7" />
                  <span className="text-xs">Upload Image</span>
                </div>
              )}

              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>

            {errors.coverImg && <p className="text-xs text-red-500">{errors.coverImg.message}</p>}
          </div>

          {/* REMOVE */}
          {coverImg && (
            <button
              type="button"
              onClick={() =>
                setValue("coverImg", "", {
                  shouldValidate: true,
                })
              }
              className="text-xs text-red-500 flex items-center gap-2"
            >
              <Trash2 className="w-3 h-3" />
              Remove image
            </button>
          )}

          {/* PUBLISHED */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between rounded-xl border bg-card p-4">
              <span className="text-sm font-medium">Published</span>

              <Switch
                checked={values.published}
                onCheckedChange={(v) =>
                  setValue("published", v, {
                    shouldValidate: true,
                  })
                }
              />
            </div>

            {errors.published && <p className="text-xs text-red-500">{errors.published.message}</p>}
          </div>

          {/* SAVE */}
          <Button
            onClick={handleSubmit(onSubmit)}
            disabled={isDisabled}
            className="h-11 rounded-xl"
          >
            {isPending ? "Saving..." : "Save Blog"}
          </Button>
        </div>
      </div>
    </div>
  );
}
