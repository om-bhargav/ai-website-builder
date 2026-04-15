import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { signupSchema } from "@/lib/zod";
import { getOtpEmailTemplate } from "@/lib/templates";
import {z} from "zod";
import { sendMail } from "@/lib/nodemailer";
import { SITE_NAME } from "@/lib/constants";
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsedData = signupSchema.safeParse(body);

    if (!parsedData.success) {
      return Response.json({
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
      return Response.json({
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
    const html = getOtpEmailTemplate({
      otp
    });
    sendMail({
        to: email,
        subject: `Otp For Verification - ${SITE_NAME}`,
        html: html
    });

    return Response.json({
      success: true,
      message: "OTP sent to email",
    });

  } catch (error: any) {
    return Response.json({
      success: false,
      message: "Internal Server Error",
    });
  }
}