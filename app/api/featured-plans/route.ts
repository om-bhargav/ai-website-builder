import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const plans = await prisma.plan.findMany({
      where: {
        featured: true,
      },

      orderBy: {
        createdAt: "desc",
      },

      take: 6,

      select: {
        id: true,
        title: true,
        description: true,
        price: true,
        featured: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: plans,
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