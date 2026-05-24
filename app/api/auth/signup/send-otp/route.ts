import { SITE_NAME } from "@/config";
import { sendMail } from "@/lib/nodemailer";
import { prisma } from "@/lib/prisma";
import { getOtpEmailTemplate } from "@/lib/templates";
import { signupSchema } from "@/lib/zod";
import { NextRequest } from "next/server";
import { z } from "zod";
import { NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsedData = signupSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json({
        success: false,
        errors: z.treeifyError(parsedData.error),
      });
    }

    const { email, name, password } = parsedData.data;

    // ✅ Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({
        success: false,
        message: "User already exists",
      });
    }

    // ✅ Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // ❗ delete old OTPs
    await prisma.otp.deleteMany({
      where: { email },
    });

    // ✅ Store OTP + user data
    await prisma.otp.create({
      data: {
        email,
        otp,
        name,
        password, // ⚠️ hash this in production
        expiresAt,
      },
    });

    // ✅ Send email
    const html = await getOtpEmailTemplate({
      otp,
    });
    await sendMail({
      to: email,
      subject: `Otp For Verification - ${SITE_NAME}`,
      html: html,
    });

    return NextResponse.json({
      success: true,
      message: "OTP sent to email",
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Internal Server Error",
    });
  }
}
