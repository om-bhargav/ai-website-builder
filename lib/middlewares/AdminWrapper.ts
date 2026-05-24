import { auth } from "@/lib/AuthConfig";
import { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export type ApiParams = {
  params: Record<string, string>;
};

type MiddlewareHandler = (
  req: NextRequest,
  session: Session,
  context: ApiParams,
) => Promise<NextResponse> | NextResponse;

export function AdminWrapper(handler: MiddlewareHandler) {
  return async function (req: NextRequest, context: any) {
    try {
      const session = await auth();

      if (!session) {
        return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
      }

      if (session.user?.role !== "ADMIN") {
        return NextResponse.json({ success: false, message: "Forbidden" }, { status: 403 });
      }

      const params = await context.params;

      return await handler(req, session, { params });
    } catch (error) {
      console.error(error);

      return NextResponse.json(
        { success: false, message: "Internal Server Error" },
        { status: 500 },
      );
    }
  };
}
