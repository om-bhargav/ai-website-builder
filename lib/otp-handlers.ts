import { prisma } from "@/lib/prisma";
import { getOtpEmailTemplate } from "@/lib/templates";

export async function sendOtp(email: string) {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

  // ❗ delete old OTPs for this email (important)
  await prisma.otp.deleteMany({
    where: { email },
  });

  // ✅ store new OTP
  await prisma.otp.create({
    data: {
      email,
      otp,
      expiresAt,
    },
  });

  // send email
  const html = getOtpEmailTemplate({
    otp
  });

  console.log("Sending OTP:", otp);

  return { success: true };
}

export async function verifyOtp(email: string, userOtp: string) {
  const record = await prisma.otp.findFirst({
    where: { email },
    orderBy: { createdAt: "desc" }, // latest OTP
  });

  if (!record) {
    return { success: false, message: "OTP not found" };
  }

  // check expiry
  if (new Date() > record.expiresAt) {
    await prisma.otp.delete({ where: { id: record.id } });
    return { success: false, message: "OTP expired" };
  }

  // check match
  if (record.otp !== userOtp) {
    return { success: false, message: "Invalid OTP" };
  }

  // success → delete OTP
  await prisma.otp.delete({ where: { id: record.id } });

  return { success: true, message: "OTP verified" };
}