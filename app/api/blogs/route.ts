import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

import { getUser } from "@/lib/auth-helpers";

export const GET = async (req: NextRequest) => {
  try {
    const user = await getUser();

    const isAdmin = user?.role === "ADMIN";

    const { searchParams } = new URL(req.url);

    const id = searchParams.get("id");

    const page = Number(searchParams.get("page") || 1);

    const limit = Number(searchParams.get("limit") || 10);

    const skip = (page - 1) * limit;

    /* SINGLE BLOG */
    if (id) {
      const blog = await prisma.blog.findUnique({
        where: {
          id,
        },
      });

      if (!blog) {
        return NextResponse.json(
          {
            success: false,
            message: "Blog not found",
          },
          {
            status: 404,
          }
        );
      }

      /* block unpublished blogs for normal users */
      if (!isAdmin && !blog.published) {
        return NextResponse.json(
          {
            success: false,
            message: "Not authorized to view this blog",
          },
          {
            status: 403,
          }
        );
      }

      return NextResponse.json({
        success: true,
        data: blog,
        isAdmin,
      });
    }

    /* FETCH BLOGS */
    const where = isAdmin
      ? undefined
      : {
          published: true,
        };

    const [blogs, total] = await Promise.all([
      prisma.blog.findMany({
        where,

        orderBy: {
          createdAt: "desc",
        },

        skip,

        take: limit,
        select:{
          id: true,
          excerpt: true,
          title: true,
          tags: true,
          coverImg: true
        }
      }),

      prisma.blog.count({
        where,
      }),
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
      }
    );
  }
};