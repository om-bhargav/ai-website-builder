import crypto from "crypto";

import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { ProtectedWrapper } from "@/lib/middlewares/ProtectedWrapper";

// ================= VERIFY PAYMENT =================

export const POST = ProtectedWrapper(async (req: NextRequest, session) => {
  const body = await req.json();

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, planId } = body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !planId) {
    return NextResponse.json(
      {
        success: false,
        message: "Missing payment details!",
      },
      {
        status: 400,
      },
    );
  }

  // Verify Signature
  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");
  const isAuthentic = generatedSignature === razorpay_signature;

  if (!isAuthentic) {
    return NextResponse.json(
      {
        success: false,
        message: "Payment verification failed!",
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

  if (!plan) {
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

  // Find Pending Transaction
  const transaction = await prisma.transaction.findFirst({
    where: {
      userId: session.user.id,
      amount: plan.price,
      status: "PENDING",
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!transaction) {
    return NextResponse.json(
      {
        success: false,
        message: "Transaction not found!",
      },
      {
        status: 404,
      },
    );
  }

  // Update Transaction
  await prisma.transaction.update({
    where: {
      id: transaction.id,
    },
    data: {
      status: "SUCCESS",
      paymentId: razorpay_payment_id,
    },
  });

  // Increase User Website Limit
  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      total_websites: {
        increment: plan.websites,
      },
    },
  });

  return NextResponse.json({
    success: true,
    message: "Payment verified successfully!",
  });
});
