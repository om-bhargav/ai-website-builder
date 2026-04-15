import { imageToBase64 } from "./base64";
import { SITE_NAME } from "./constants";
import logo from "@/public/logo.png";
type OTPTemplate = {
  otp: string;
};
export function getOtpEmailTemplate({ otp }: OTPTemplate) {
  const image = imageToBase64(logo.src);
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>Verify Your Account</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f4f6fb; font-family:Arial, sans-serif;">
    
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
      <tr>
        <td align="center">
          
          <!-- Main Container -->
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 10px 25px rgba(0,0,0,0.05);">
            <tr>

              <!-- LEFT PANEL -->
              <td width="200" style="background:linear-gradient(135deg,#4f46e5,#7c3aed); color:#ffffff; padding:30px; vertical-align:top;">
                
                ${
                  image
                    ? `<img src="${image}" alt="logo" style="width:120px; margin-bottom:20px;" />`
                    : `<div style="font-size:20px; font-weight:bold; margin-bottom:20px; letter-spacing:0.5px;">${SITE_NAME}</div>`
                }

                <div style="font-size:14px; line-height:1.7; opacity:0.9;">
                  You're just one step away from accessing your account.
                  <br/><br/>
                  Use the verification code to continue securely.
                </div>

                <div style="margin-top:30px; font-size:12px; opacity:0.7;">
                  Need help? Contact support anytime.
                </div>

              </td>

              <!-- RIGHT PANEL -->
              <td style="padding:35px 30px; text-align:center;">
                
                <div style="font-size:24px; font-weight:600; color:#111827;">
                  Verify your account
                </div>

                <div style="margin-top:12px; font-size:14px; color:#6b7280; line-height:1.6;">
                  Enter the one-time password below to complete your sign-up.
                </div>

                <!-- OTP BOX -->
                <div style="margin:35px 0;">
                  <span style="
                    display:inline-block;
                    padding:16px 32px;
                    font-size:30px;
                    letter-spacing:8px;
                    font-weight:700;
                    background:#eef2ff;
                    color:#4338ca;
                    border-radius:10px;
                    border:1px solid #e0e7ff;
                  ">
                    ${otp}
                  </span>
                </div>

                <div style="font-size:13px; color:#9ca3af;">
                  This code expires in <b>10 minutes</b>.
                </div>

                <div style="margin-top:25px; font-size:12px; color:#9ca3af; line-height:1.5;">
                  If you didn’t request this, you can safely ignore this email.
                </div>

              </td>

            </tr>
          </table>

          <!-- Footer -->
          <table width="600" cellpadding="0" cellspacing="0" style="margin-top:18px;">
            <tr>
              <td style="text-align:center; font-size:12px; color:#9ca3af; line-height:1.5;">
                © ${new Date().getFullYear()} ${SITE_NAME}. All rights reserved.
                <br/>
                Built with security and simplicity in mind.
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
