import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/handlers/bcrypt";

export async function POST(req: NextRequest) {
  try {
    const { email, otp } = await req.json();

    const record = await prisma.otp.findFirst({
      where: { email },
      orderBy: { createdAt: "desc" },
    });

    if (!record) {
      return Response.json({
        success: false,
        message: "OTP not found",
      });
    }

    // ❗ expiry check
    if (new Date() > record.expiresAt) {
      await prisma.otp.delete({ where: { id: record.id } });

      return Response.json({
        success: false,
        message: "OTP expired",
      });
    }

    // ❗ OTP check
    if (record.otp !== otp) {
      return Response.json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // ✅ Create user AFTER verification
    const hashedPassword = await hashPassword(record.password!);
    await prisma.user.create({
      data: {
        email: record.email,
        name: record.name!,
        password: hashedPassword, // hash in production
      },
    });

    // ✅ delete OTP
    await prisma.otp.delete({
      where: { id: record.id },
    });

    return Response.json({
      success: true,
      message: "User created successfully",
    });

  } catch (error) {
    return Response.json({
      success: false,
      message: "Internal Server Error",
    });
  }
}