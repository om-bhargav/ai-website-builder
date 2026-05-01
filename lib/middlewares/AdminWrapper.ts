import { auth } from "@/lib/AuthConfig";
import { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// To get the user's basic info
type MiddlewareHandler = (
  req: NextRequest,
  session: Session
) => Promise<NextResponse> | NextResponse

export function AdminWrapper(handler: MiddlewareHandler) {
  return async function (req: NextRequest) {
    try {
      // 🔐 Example: Auth check
      const session = await auth();

      if (!session) {
        return NextResponse.redirect(new URL("/login", req.url))
      }
      if(session.user.role!=="ADMIN"){
        return NextResponse.json({success: false, message: "User's not Authorized"});
      }

      return await handler(req,session);
    } catch (error) {
      console.error("Middleware Error:", error)
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      )
    }
  }
}