"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { roadmapSchema, RoadmapInput } from "@/schemas/roadmapSchema";

export type Roadmap = {
  id: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
};

interface RoadmapModalProps extends React.PropsWithChildren {
  mode: "create" | "edit";
  initialData?: Roadmap | null;
  onSubmit: (data: any) => void;
  isSubmitting?: boolean;
}

export default function RoadmapModal({
  mode,
  initialData,
  onSubmit,
  isSubmitting,
  children,
}: RoadmapModalProps) {
  const [open, setOpen] = useState(false);

  const form = useForm<RoadmapInput>({
    resolver: zodResolver(roadmapSchema),
    defaultValues: {
      id: "",
      title: "",
      description: "",
    },
  });

  useEffect(() => {
    if (!open) return;

    if (mode === "edit" && initialData) {
      form.reset({
        id: initialData.id,
        title: initialData.title,
        description: initialData.description,
      });
    } else {
      form.reset({
        id: "",
        title: "",
        description: "",
      });
    }
  }, [open, mode, initialData, form]);

  const handleSubmit = async (values: RoadmapInput) => {
    await onSubmit(values);
    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-xl rounded-3xl p-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="p-6"
        >
          <DialogHeader className="mb-6">
            <DialogTitle>{mode === "create" ? "Create Roadmap" : "Update Roadmap"}</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter roadmap title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea rows={5} placeholder="Enter roadmap description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {mode === "edit" && initialData && (
                <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground bg-muted/40 p-4 rounded-2xl">
                  <div>
                    <p className="font-medium">Created At</p>
                    <p>{new Date(initialData.created_at).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="font-medium">Updated At</p>
                    <p>{new Date(initialData.updated_at).toLocaleString()}</p>
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting
                    ? mode === "create"
                      ? "Creating..."
                      : "Updating..."
                    : mode === "create"
                      ? "Create"
                      : "Update"}
                </Button>
              </div>
            </form>
          </Form>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
