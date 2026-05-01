import { ProtectedWrapper } from "@/lib/middlewares/ProtectedWrapper";
import { prisma } from "@/lib/prisma";
import { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { ProfileInfo, personalInfoSchema } from "@/schemas/ProfileSchema";
import { fileToBase64 } from "@/lib/base64";

// To get the user's profile info
export const GET = ProtectedWrapper(async (req: NextRequest, session: Session) => {
  const id = session.user.id;
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      email: true,
      name: true,
      bio: true,
      phone: true,
      image: true,
    },
  });
  if (!user) {
    throw Error("User Not Exist!");
  }
  return NextResponse.json({ success: true, data: user });
});

// To update the user's profile info
export const PUT = ProtectedWrapper(async (req: NextRequest, session: Session) => {
  try {
    const id = session.user.id;

    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return NextResponse.json({ success: false, message: "User does not exist" }, { status: 404 });
    }

    const formData = await req.formData();

    const submittedValues: Record<string, string> = {};
    const allowedFields = ["name", "phone", "email", "city", "country", "bio"];

    for (const field of allowedFields) {
      const value = formData.get(field);

      if (value !== null) {
        submittedValues[field] = String(value);
      }
    }

    const image = formData.get("image") as File | null;
    const removeImage = formData.get("removeImage") === "true";

    const validated = personalInfoSchema.partial().safeParse(submittedValues);

    if (!validated.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: validated.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    let finalImage = existingUser.image;

    if (image && image.size > 0) {
      finalImage = await fileToBase64(image);
    }

    if (removeImage) {
      finalImage = null;
    }

    const updateData: Record<string, any> = {
      ...validated.data,
    };

    if (image || removeImage) {
      updateData.image = finalImage;
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "No fields provided for update",
        },
        { status: 400 },
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        email: true,
        name: true,
        bio: true,
        phone: true,
        city: true,
        country: true,
        image: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("[PROFILE_UPDATE_ERROR]", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
});
