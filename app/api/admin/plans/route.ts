import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { AdminWrapper } from "@/lib/middlewares/AdminWrapper";

// ================= GET ALL PLANS =================

export const GET = AdminWrapper(async () => {
  const plans = await prisma.plan.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json({
    success: true,
    data: plans,
    message: "Plans fetched successfully!",
  });
});

// ================= CREATE PLAN =================

export const POST = AdminWrapper(async (req: NextRequest) => {
  const body = await req.json();

  const { title, description, price, websites, active } = body;

  if (!title || !description || !price || !websites) {
    return NextResponse.json(
      {
        success: false,
        message: "All fields are required!",
      },
      {
        status: 400,
      },
    );
  }

  const plan = await prisma.plan.create({
    data: {
      title,
      description,
      price: Number(price),
      websites: Number(websites),
      active: typeof active === "boolean" ? active : true,
    },
  });

  return NextResponse.json({
    success: true,
    data: plan,
    message: "Plan created successfully!",
  });
});
