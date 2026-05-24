import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ProtectedWrapper } from "@/lib/middlewares/ProtectedWrapper";
import { Session } from "next-auth";
import { success, z } from "zod";

/* ---------------- GET ALL USER WEBSITES ---------------- */
export const GET = ProtectedWrapper(async (req: NextRequest, session: Session) => {
  try {
    const websites = await prisma.website.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      data: websites,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
});

export const websiteSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  thumbnail: z.string().min(1, "Thumbnail is required"),
  file: z.string().optional(),
});
/* ---------------- CREATE WEBSITE ---------------- */
export const POST = ProtectedWrapper(async (req: NextRequest, session: Session) => {
  try {
    const userId = session.user.id;
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (user!.role === "USER" && user!.total_websites === 0) {
      return NextResponse.json({
        success: false,
        message: "You've reached the maximum limit of creating the websites",
      });
    }
    const body = await req.json();

    /* ---------------- ZOD VALIDATION ---------------- */
    const parsed = websiteSchema.safeParse(body);

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

    const { title, description, thumbnail, file } = parsed.data;

    /* ---------------- CREATE WEBSITE ---------------- */
    const website = await prisma.website.create({
      data: {
        title,
        description,
        thumbnail,
        file: file || null,
        userId: session.user.id,
        featured: false,
        blocked: false,
      },
    });
    if (user!.role !== "ADMIN") {
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          total_websites: {
            decrement: 1,
          },
        },
      });
    }
    return NextResponse.json({
      success: true,
      message: "Website created successfully",
      data: website,
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
