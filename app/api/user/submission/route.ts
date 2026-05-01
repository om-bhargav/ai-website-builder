import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/AuthConfig";
import { ProtectedWrapper } from "@/lib/middlewares/ProtectedWrapper";
import { Session } from "next-auth";

// POST create submission
export const POST = ProtectedWrapper(async (req: NextRequest, session: Session) => {
  const id = session.user.id;
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!user) {
    throw Error("Invalid User!");
  }
  const body = await req.json();
  const { message, messageType } = body;

  if (!message || !messageType) {
    return NextResponse.json(
      { success: false, message: "All fields are required" },
      { status: 400 },
    );
  }

  const submission = await prisma.submissions.create({
    data: {
      name: user.name,
      email: user.email,
      phone: user.phone ?? "Not Specified",
      city: user.city ?? "Not Specified",
      message,
      type: messageType,
    },
  });

  return NextResponse.json(
    {
      success: true,
      message: `${(messageType as string).charAt(0).toUpperCase() + messageType.slice(1).toLowerCase()} Reported Successfully!`,
      submission,
    },
    { status: 201 },
  );
});
