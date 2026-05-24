import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { AdminWrapper } from "@/lib/middlewares/AdminWrapper";

export const PATCH = AdminWrapper(async (req: NextRequest, session, { params }) => {
  try {
    const userId = params.id;

    const body = await req.json();

    const { role, status } = body;

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...(role && { role }),
        ...(status && { status }),
      },
    });

    return NextResponse.json({
      success: true,
      data: updatedUser,
      message: "User updated successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update user",
      },
      { status: 500 }
    );
  }
});

export const DELETE = AdminWrapper(async (req, session, { params }) => {
  try {
    await prisma.user.delete({
      where: {
        id: params.id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete user",
      },
      { status: 500 }
    );
  }
});