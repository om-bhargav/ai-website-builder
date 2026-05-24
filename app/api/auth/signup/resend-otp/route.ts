import { SITE_NAME } from "@/config";
import { sendMail } from "@/lib/nodemailer";
import { prisma } from "@/lib/prisma";
import { getOtpEmailTemplate } from "@/lib/templates";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return Response.json({
        success: false,
        message: "Email is required",
      });
    }

    // Check if OTP record exists
    const existingOtpRecord = await prisma.otp.findFirst({
      where: { email },
    });

    if (!existingOtpRecord) {
      return Response.json({
        success: false,
        message: "No signup request found. Please sign up again.",
      });
    }

    // Generate new OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // Delete old OTPs
    await prisma.otp.deleteMany({
      where: { email },
    });

    // Create new OTP
    await prisma.otp.create({
      data: {
        email,
        otp,
        name: existingOtpRecord.name,
        password: existingOtpRecord.password,
        expiresAt,
      },
    });

    // Send email
    const html = await getOtpEmailTemplate({ otp });

    await sendMail({
      to: email,
      subject: `Resend OTP - ${SITE_NAME}`,
      html,
    });

    return Response.json({
      success: true,
      message: "OTP resent successfully",
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: "Internal Server Error",
    });
  }
}