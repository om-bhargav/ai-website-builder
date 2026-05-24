import { z } from "zod";

export const blogSchema = z.object({
  title: z.string().min(3).max(200),

  slug: z
    .string()
    .min(3)
    .max(200)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),

  content: z.string().min(10),

  excerpt: z.string().max(300).optional(),

  coverImg: z.string().url().optional().or(z.literal("")),

  tags: z.array(z.string()).default([]),

  published: z.boolean().default(false),

  views: z.number().int().nonnegative().default(0),
});
export type BlogInput = z.infer<typeof blogSchema>;

export const createBlogSchema = blogSchema
  .omit({
    views: true,
  })
  .extend({
    tags: z.array(z.string()).default([]),
    published: z.boolean().default(false),
  });
  
export const updateBlogSchema = blogSchema
  .omit({ views: true })
  .partial()
  .extend({
    tags: z.array(z.string()).optional(),
    published: z.boolean().optional(),
  });

export const blogParamsSchema = z.object({
  id: z.string().min(1),
});
