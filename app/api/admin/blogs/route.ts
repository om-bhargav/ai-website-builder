import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { AdminWrapper } from "@/lib/middlewares/AdminWrapper";
import { createBlogSchema } from "@/lib/zod/blog";
import { z } from "zod";

const querySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
});
export const GET = AdminWrapper(async (req) => {
  try {
    const { searchParams } = new URL(req.url);

    const parsed = querySchema.safeParse({
      page: searchParams.get("page") || undefined,
      limit: searchParams.get("limit") || undefined,
    });

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid query params",
        },
        {
          status: 400,
        },
      );
    }

    const page = Number(parsed.data.page || 1);

    const limit = Number(parsed.data.limit || 10);

    const skip = (page - 1) * limit;

    const [blogs, total] = await Promise.all([
      prisma.blog.findMany({
        orderBy: {
          createdAt: "desc",
        },

        skip,

        take: limit,

        select: {
          id: true,
          title: true,
          excerpt: true,
          coverImg: true,
          published: true,
          views: true,
          createdAt: true,
        },
      }),

      prisma.blog.count(),
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      success: true,

      data: blogs,

      pagination: {
        total,
        page,
        limit,

        totalPages,

        hasNextPage: page < totalPages,

        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch blogs",
      },
      {
        status: 500,
      },
    );
  }
});

export const POST = AdminWrapper(async (req) => {
  try {
    const body = await req.json();

    const parsed = createBlogSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: parsed.error.issues?.[0]?.message || "Invalid input",
        },
        { status: 400 },
      );
    }

    const data = parsed.data;

    const blog = await prisma.blog.create({
      data: {
        ...data,
        views: 0,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Blog created successfully",
      data: blog,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Server error",
      },
      { status: 500 },
    );
  }
});
