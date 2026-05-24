import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { AdminWrapper } from "@/lib/middlewares/AdminWrapper";
import { z } from "zod";
type Params = {
  id: string;
};

export async function GET(req: Request, context: { params: Promise<Params> }) {
  try {
    const { id } = await context.params;

    const template = await prisma.template.findUnique({
      where: {
        id,
      },
    });

    if (!template) {
      return NextResponse.json(
        {
          success: false,
          message: "Template not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Template fetched successfully",
      data: template,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 },
    );
  }
}

export const updateTemplateSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  thumbnail: z.string().url().optional(),
  file: z.string().optional(), // index.html
  status: z.enum(["DRAFT", "PUBLISHED", "UNDER_DEVELOPMENT"]).optional(),
});
export const PATCH = AdminWrapper(async (req, session, { params }) => {
  const body = await req.json();

  // ✅ Validate with Zod
  const parsed = updateTemplateSchema.safeParse(body);

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

  // 🧠 Only update provided fields (safe + clean)
  const template = await prisma.template.update({
    where: {
      id: params.id,
    },
    data: {
      ...(data.title && { title: data.title }),
      ...(data.description && { description: data.description }),
      ...(data.thumbnail && { thumbnail: data.thumbnail }),
      ...(data.file && { file: data.file }),
      ...(data.status && { status: data.status }),
    },
  });

  return NextResponse.json({
    success: true,
    message: "Template updated successfully",
    data: template,
  });
});

export const DELETE = AdminWrapper(async (req, session, { params }) => {
  await prisma.template.delete({
    where: {
      id: params.id,
    },
  });

  return NextResponse.json({
    success: true,
    message: "Template deleted successfully",
  });
});
