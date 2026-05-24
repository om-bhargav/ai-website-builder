import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ProtectedWrapper } from "@/lib/middlewares/ProtectedWrapper";
import { Session } from "next-auth";
import { z } from "zod";

type TParams = { id: string };
/* ---------------- GET WEBSITE ---------------- */
export async function GET(req: NextRequest, context: { params: Promise<TParams> }) {
  try {
    const { id } = await context.params;

    const website = await prisma.website.findUnique({
      where: {
        id,
      },
    });

    if (!website) {
      return NextResponse.json(
        {
          success: false,
          message: "Website not found",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "Website fetched successfully",
      data: website,
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

/* ---------------- UPDATE WEBSITE ---------------- */
const websiteUpdateSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  thumbnail: z.string().min(1).optional(),
  file: z.string().optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "UNDER_DEVELOPMENT"]).optional(),
});

export const PATCH = ProtectedWrapper<TParams>(async (req, session, params) => {
  try {
    const id = (await params)?.id ?? undefined;
    const body = await req.json();

    if (!id) {
      return NextResponse.json({ success: false, message: "Missing website id" }, { status: 400 });
    }

    /* ---------------- VALIDATION ---------------- */
    const parsed = websiteUpdateSchema.partial().safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    /* ---------------- OWNERSHIP CHECK ---------------- */
    const website = await prisma.website.findFirst({
      where: {
        id,
        userId: session.user.id,
      },
    });

    if (!website) {
      return NextResponse.json({ success: false, message: "Website not found" }, { status: 404 });
    }

    /* ---------------- UPDATE ---------------- */
    const updated = await prisma.website.update({
      where: { id },
      data: parsed.data, // 👈 clean partial update
    });

    return NextResponse.json({
      success: true,
      message: "Website updated successfully",
      data: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal Server Error",
      },
      { status: 500 },
    );
  }
});

/* ---------------- DELETE WEBSITE ---------------- */
export const DELETE = ProtectedWrapper<TParams>(
  async (req: NextRequest, session: Session, params) => {
    try {
      const id = (await params)?.id ?? undefined;

      const website = await prisma.website.findFirst({
        where: {
          id,
          userId: session.user.id,
        },
      });

      if (!website) {
        return NextResponse.json({ success: false, message: "Website not found" }, { status: 404 });
      }

      await prisma.website.delete({
        where: { id },
      });

      return NextResponse.json({
        success: true,
        message: "Website deleted successfully",
      });
    } catch (error: any) {
      return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
  },
);
