import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { AdminWrapper } from "@/lib/middlewares/AdminWrapper";

export const GET = AdminWrapper(async (req, session) => {
  const templates = await prisma.template.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return NextResponse.json({
    success: true,
    data: templates,
  });
});

import { z } from "zod";

export const createTemplateSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  thumbnail: z.string().url(),
  file: z.string().optional(), // full index.html
  status: z.enum(["DRAFT", "PUBLISHED", "UNDER_DEVELOPMENT"]).optional(),
});

export const POST = AdminWrapper(async (req, session) => {
  const body = await req.json();
  const parsed = createTemplateSchema.safeParse(body);
  const userId = session.user.id;
  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        message: "Validation failed",
        errors: parsed.error.flatten(),
      },
      { status: 400 },
    );
  }

  const data = parsed.data;

  const template = await prisma.template.create({
    data: {
      title: data.title,
      description: data.description,
      thumbnail: data.thumbnail,
      file: data?.file ?? undefined,
      userId: userId,
      status: data.status ?? "DRAFT",
    },
  });

  return NextResponse.json({
    success: true,
    message: "Template created successfully",
    data: template,
  });
});
