import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { AdminWrapper, ApiParams } from "@/lib/middlewares/AdminWrapper";

export const PUT = AdminWrapper(async (req: NextRequest, session, { params }: ApiParams) => {
  const id = params.id;

  const existingPlan = await prisma.plan.findUnique({
    where: {
      id,
    },
  });

  if (!existingPlan) {
    return NextResponse.json(
      {
        success: false,
        message: "Plan not found!",
      },
      {
        status: 404,
      },
    );
  }

  const body = await req.json();

  const { title, description, price, websites, active, featured } = body;
  const updatedPlan = await prisma.plan.update({
    where: {
      id,
    },
    data: {
      title,
      description,
      price: price !== undefined ? Number(price) : undefined,
      websites: websites !== undefined ? Number(websites) : undefined,
      active,
      featured: featured !== undefined ? featured : undefined,
    },
  });

  return NextResponse.json({
    success: true,
    data: updatedPlan,
    message: "Plan updated successfully!",
  });
});

// ================= DELETE PLAN =================

export const DELETE = AdminWrapper(async (req: NextRequest, session, { params }: ApiParams) => {
  const id = params.id;

  const existingPlan = await prisma.plan.findUnique({
    where: {
      id,
    },
  });

  if (!existingPlan) {
    return NextResponse.json(
      {
        success: false,
        message: "Plan not found!",
      },
      {
        status: 404,
      },
    );
  }

  await prisma.plan.delete({
    where: {
      id,
    },
  });

  return NextResponse.json({
    success: true,
    message: "Plan deleted successfully!",
  });
});
