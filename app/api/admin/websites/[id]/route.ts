import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { AdminWrapper } from "@/lib/middlewares/AdminWrapper";
import { Session } from "next-auth";
import { z } from "zod";

export const WebsiteAdminUpdateSchema = z.object({
  featured: z.boolean().optional(),
  blocked: z.boolean().optional(),
});

type Params = {
  id: string;
};

export const PUT = AdminWrapper(async (
  req: NextRequest,
  session: Session,
  context
) => {
  try {
    const id = context.params.id;

    const body = await req.json();

    const parsed = WebsiteAdminUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request",
          errors: parsed.error.flatten(),
        },
        { status: 400 }
      );
    }

    const website = await prisma.website.findUnique({
      where: { id },
    });

    if (!website) {
      return NextResponse.json(
        { success: false, message: "Website not found" },
        { status: 404 }
      );
    }

    const updated = await prisma.website.update({
      where: { id },
      data: parsed.data, // ✅ only featured/blocked if provided
    });

    return NextResponse.json({
      success: true,
      message: "Website updated successfully",
      data: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
});

export const DELETE = AdminWrapper(async (
  req: NextRequest,
  session: Session,
  context
) => {
  try {
    const id = context.params.id;

    await prisma.website.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Website deleted",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
});