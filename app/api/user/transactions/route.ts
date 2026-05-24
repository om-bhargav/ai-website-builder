import { ProtectedWrapper } from "@/lib/middlewares/ProtectedWrapper";
import { prisma } from "@/lib/prisma";
import { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// To get the user's Transactions
export const GET = ProtectedWrapper(async (req: NextRequest, session: Session) => {
  const id = session.user.id;
  const transactions = await prisma.transaction.findMany({
    where: {
      userId: id,
    },
    orderBy:{
      updatedAt: "desc"
    }
  });
  return NextResponse.json({
    success: true,
    data: transactions,
    message: "Transactions Fetched Successfully!",
  });
});
