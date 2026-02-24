import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all submissions
export async function GET() {
  try {
    const submissions = await prisma.submissions.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ success: true, submissions });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch submissions" },
      { status: 500 },
    );
  }
}

// POST create submission
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, phone, city, message } = body;

    if (!name || !email || !phone || !city || !message) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 },
      );
    }

    const submission = await prisma.submissions.create({
      data: {
        name,
        email,
        phone,
        city,
        message,
      },
    });

    return NextResponse.json({ success: true,message: "Submission Added Successfully!", submission }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Failed to create submission" },
      { status: error.message ? 404 : 500 },
    );
  }
}

// DELETE submission
export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    if (!id) throw Error("No Submission Id Provided!");
    await prisma.submissions.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Submission deleted successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to delete submission",
      },
      { status: error.message ? 404 : 500 },
    );
  }
}
