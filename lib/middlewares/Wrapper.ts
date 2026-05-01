import { auth } from "@/lib/AuthConfig";
import { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// To get the user's basic info
type MiddlewareHandler = (
  req: NextRequest
) => Promise<NextResponse> | NextResponse

export function AdminWrapper(handler: MiddlewareHandler) {
  return async function (req: NextRequest) {
    try {
      return await handler(req);
    } catch (error) {
      console.error("Middleware Error:", error)
      return NextResponse.json(
        { message: "Internal Server Error" },
        { status: 500 }
      )
    }
  }
}