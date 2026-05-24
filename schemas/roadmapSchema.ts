import { z } from "zod";

export const roadmapSchema = z.object({
  id: z.string().optional(),
  title: z.string().trim().min(1, "Title is required").max(100, "Title too long"),

  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description too long"),
});

export type RoadmapInput = z.infer<typeof roadmapSchema>;

export const roadmapInternalSchema = z.object({
  nodes: z.any(),
  edges: z.any(),
});

export type RoadmapStructure = z.infer<typeof roadmapInternalSchema>;