import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { razorpay } from "@/lib/razorpay";

import { ProtectedWrapper } from "@/lib/middlewares/ProtectedWrapper";

// ================= CREATE ORDER =================

export const POST = ProtectedWrapper(async (req: NextRequest, session) => {
  const body = await req.json();

  const { planId } = body;

  if (!planId) {
    return NextResponse.json(
      {
        success: false,
        message: "Plan ID is required!",
      },
      {
        status: 400,
      },
    );
  }

  const plan = await prisma.plan.findUnique({
    where: {
      id: planId,
    },
  });

  if (!plan || !plan.active) {
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

  // Create Pending Transaction
  const transaction = await prisma.transaction.create({
    data: {
      userId: session.user.id,
      title: `${plan.title} Plan`,
      description: plan.description,
      amount: plan.price,
      status: "PENDING",
    },
  });

  // Razorpay Order
  const order = await razorpay.orders.create({
    amount: plan.price * 100,
    currency: "INR",
    receipt: transaction.id,
    notes: {
      transactionId: transaction.id,
      planId: plan.id,
      userId: session.user.id,
    },
  });

  return NextResponse.json({
    success: true,
    data: {
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      plan,
    },
    message: "Order created successfully!",
  });
});
