import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const websites = await prisma.website.findMany({
      where: {
        featured: true,
        blocked: false,
        status: "PUBLISHED",
      },

      take: 6,

      orderBy: {
        updatedAt: "desc",
      },

      select: {
        id: true,
        title: true,
        description: true,
        thumbnail: true,
        featured: true,
        createdAt: true,
        updatedAt: true,
        views: true
      },
    });

    return NextResponse.json({
      success: true,
      data: websites,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}