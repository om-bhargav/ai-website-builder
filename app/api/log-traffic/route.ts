import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const date = new Date();
    date.setHours(0, 0, 0, 0);

    // Check if record exists
    const traffic = await prisma.logTraffic.upsert({
      where: { date },
      update: {
        views: {
          increment: 1,
        },
      },
      create: {
        date,
        views: 1,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Traffic logged successfully",
      data: traffic,
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
