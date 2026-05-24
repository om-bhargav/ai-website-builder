import { auth } from "@/lib/AuthConfig";
import { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

type RouteContext<TParams extends Record<string, string> = {}> = {
  params: Promise<TParams>;
};

type MiddlewareHandler<TParams extends Record<string, string> = {}> = (
  req: NextRequest,
  session: Session,
  params: TParams,
) => Promise<NextResponse> | NextResponse;

export function ProtectedWrapper<
  TParams extends Record<string, string> = {}
>(handler: MiddlewareHandler<TParams>) {
  return async function (
    req: NextRequest,
    context: RouteContext<TParams>,
  ) {
    try {
      const session = await auth();

      if (!session) {
        return NextResponse.json(
          {
            success: false,
            message: "Unauthorized",
          },
          { status: 401 },
        );
      }

      const params = await context.params;

      return await handler(req, session, params);
    } catch (error) {
      console.error("Middleware Error:", error);

      return NextResponse.json(
        {
          success: false,
          message: "Internal Server Error",
        },
        { status: 500 },
      );
    }
  };
}