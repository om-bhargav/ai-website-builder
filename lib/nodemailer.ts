import nodemailer  from "nodemailer";
import { SITE_NAME } from "./constants";

type SendMailProps = {
  to: string;
  subject: string;
  text?: string;
  html?: string;
};

export const sendMail = async ({
  to,
  subject,
  text,
  html,
}: SendMailProps) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `${SITE_NAME?.toUpperCase()} <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
      html,
    });

    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error("Email Error:", error);
    return {
      success: false,
      error,
    };
  }
};