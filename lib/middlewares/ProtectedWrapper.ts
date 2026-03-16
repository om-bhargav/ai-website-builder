import { auth } from "@/lib/AuthConfig";
import { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// To get the user's basic info
type MiddlewareHandler = (
  req: NextRequest,
  session: Session
) => Promise<NextResponse> | NextResponse

export function ProtectedWrapper(handler: MiddlewareHandler) {
  return async function (req: NextRequest) {
    try {
      // 🔐 Example: Auth check
      const session = await auth();

      if (!session) {
        return NextResponse.redirect(new URL("/login", req.url))
      }

      // You can attach custom data here if needed

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