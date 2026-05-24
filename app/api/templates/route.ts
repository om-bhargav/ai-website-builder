import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ProtectedWrapper } from "@/lib/middlewares/ProtectedWrapper";
import { Session } from "next-auth";

export const GET = ProtectedWrapper(async (
  req: NextRequest,
  session: Session,
) => {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";

    const templates = await prisma.template.findMany({
      where: {
        status: "PUBLISHED",

        title: {
          contains: search,
          mode: "insensitive",
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        description: true,
        thumbnail: true,
        status: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: templates,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to fetch templates",
      },
      { status: 500 },
    );
  }
});