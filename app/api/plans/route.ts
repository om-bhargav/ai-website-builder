import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const plans = await prisma.plan.findMany({
      where: {
        active: true,
      },
      select: {
        id: true,
        title: true,
        description: true,
        price: true,
        websites: true,
        active: true,
      },
      orderBy: {
        price: "asc",
      },
    });

    return NextResponse.json({
      success: true,
      data: plans,
      message: "Plans fetched successfully!",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}
