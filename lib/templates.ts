import { SITE_NAME } from "./constants";
import logo from "@/public/logo.png";
type OTPTemplate = {
  otp: string;
};
export function getOtpEmailTemplate({ otp }: OTPTemplate) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>OTP Verification</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f4f6fb; font-family:Arial, sans-serif;">
    
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
      <tr>
        <td align="center">
          
          <!-- Main Container -->
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:10px; overflow:hidden;">
            <tr>

              <!-- LEFT PANEL (Branding) -->
              <td width="200" style="background:linear-gradient(135deg,#4f46e5,#7c3aed); color:#ffffff; padding:30px; vertical-align:top;">
                
                ${
                  logo.src
                    ? `<img src="${logo.src}" alt="logo" style="width:120px; margin-bottom:20px;" />`
                    : `<div style="font-size:20px; font-weight:bold; margin-bottom:20px;">${SITE_NAME}</div>`
                }

                <div style="font-size:14px; line-height:1.6; opacity:0.9;">
                  Secure authentication for your account.  
                  Please use the OTP to continue.
                </div>

              </td>

              <!-- RIGHT PANEL (Content) -->
              <td style="padding:30px; text-align:center;">
                
                <div style="font-size:22px; font-weight:bold; color:#111827;">
                  OTP Verification
                </div>

                <div style="margin-top:10px; font-size:14px; color:#6b7280;">
                  Enter the code below to verify your account.
                </div>

                <!-- OTP BOX -->
                <div style="margin:30px 0;">
                  <span style="
                    display:inline-block;
                    padding:14px 28px;
                    font-size:28px;
                    letter-spacing:6px;
                    font-weight:bold;
                    background:#eef2ff;
                    color:#4338ca;
                    border-radius:8px;
                  ">
                    ${otp}
                  </span>
                </div>

                <div style="font-size:13px; color:#9ca3af;">
                  This code will expire in 10 minutes.
                </div>

                <div style="margin-top:25px; font-size:12px; color:#9ca3af;">
                  If you didn’t request this, you can safely ignore this email.
                </div>

              </td>

            </tr>
          </table>

          <!-- Footer -->
          <table width="600" cellpadding="0" cellspacing="0" style="margin-top:15px;">
            <tr>
              <td style="text-align:center; font-size:12px; color:#9ca3af;">
                © ${new Date().getFullYear()} ${SITE_NAME}. All rights reserved.
              </td>
            </tr>
          </table>

        </td>
      </tr>
    </table>

  </body>
  </html>
  `;
}
