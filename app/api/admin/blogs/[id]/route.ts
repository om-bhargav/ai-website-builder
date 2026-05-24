import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { AdminWrapper, ApiParams } from "@/lib/middlewares/AdminWrapper";
import { updateBlogSchema, blogParamsSchema } from "@/lib/zod/blog";

export const GET = AdminWrapper(async (req, session, {params}) => {
  try {
    const paramsCheck = blogParamsSchema.safeParse(params);

    if (!paramsCheck.success) {
      return NextResponse.json({ success: false, message: "Invalid ID" }, { status: 400 });
    }

    const blog = await prisma.blog.findUnique({
      where: {
        id: paramsCheck.data.id,
      },
    });

    if (!blog) {
      return NextResponse.json({ success: false, message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      blog,
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to fetch blog" }, { status: 500 });
  }
});

export const PUT = AdminWrapper(async (req, session, {params}) => {
  try {
    const body = await req.json();

    const paramsCheck = blogParamsSchema.safeParse(params);
    if (!paramsCheck.success) {
      return NextResponse.json({ success: false, message: "Invalid ID" }, { status: 400 });
    }

    const parsed = updateBlogSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ success: false, errors: parsed.error.flatten() }, { status: 400 });
    }

    const updated = await prisma.blog.update({
      where: { id: paramsCheck.data.id },
      data: parsed.data,
    });

    return NextResponse.json({ success: true, blog: updated });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Update failed" }, { status: 500 });
  }
});

export const DELETE = AdminWrapper(async (req, session, {params}) => {
  try {
    const parsed = blogParamsSchema.safeParse(params);

    if (!parsed.success) {
      return NextResponse.json({ success: false, message: "Invalid ID" }, { status: 400 });
    }

    await prisma.blog.delete({
      where: { id: parsed.data.id },
    });

    return NextResponse.json({ success: true, message: "Deleted" });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Delete failed" }, { status: 500 });
  }
});
