import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { ProtectedWrapper } from "@/lib/middlewares/ProtectedWrapper";
import { Session } from "next-auth";
import { roadmapSchema, roadmapInternalSchema } from "@/schemas/roadmapSchema";
import { z } from "zod";

type TParams = { id: string };

export const GET = ProtectedWrapper<TParams>(async (req: NextRequest, session: Session, params) => {
  const roadmapId = (await params)?.id ?? undefined;
  const roadmap = await prisma.roadmap.findUnique({
    where: {
      id: roadmapId,
    },
  });
  if (!roadmap) {
    return NextResponse.json({ success: false, message: "Roadmap Id is Invalid!" });
  }
  return NextResponse.json(
    {
      success: true,
      data: roadmap,
      message: `Roadmap Fetched Successfully!`,
    },
    { status: 200 },
  );
});

export const PUT = ProtectedWrapper<TParams>(async (req: NextRequest, session: Session, params) => {
  const roadmapId = (await params)?.id ?? undefined;
  const roadmap = await prisma.roadmap.findUnique({
    where: {
      id: roadmapId,
    },
  });
  if (!roadmap) {
    return NextResponse.json({ success: false, message: "Roadmap Id is Invalid!" });
  }
  const body = await req.json();
  const parsedData = roadmapSchema.partial().safeParse(body);
  if (!parsedData.success) {
    return NextResponse.json({ success: false, errors: z.treeifyError(parsedData.error) });
  }
  const updatedRoadmap = await prisma.roadmap.update({
    where: {
      id: roadmapId,
    },
    data: {
      ...parsedData.data,
    },
  });
  return NextResponse.json(
    {
      success: true,
      message: `Roadmap Updated Successfully!`,
    },
    { status: 200 },
  );
});

// For roadmap internal pages
export const PATCH = ProtectedWrapper<TParams>(
  async (req: NextRequest, session: Session, params) => {
    const roadmapId = (await params)?.id ?? undefined;
    const roadmap = await prisma.roadmap.findUnique({
      where: {
        id: roadmapId,
      },
    });
    if (!roadmap) {
      return NextResponse.json({ success: false, message: "Roadmap Id is Invalid!" });
    }
    const body = await req.json();
    const parsedData = roadmapInternalSchema.partial().safeParse(body);
    if (!parsedData.success) {
      return NextResponse.json({ success: false, errors: z.treeifyError(parsedData.error) });
    }
    const updatedRoadmap = await prisma.roadmap.update({
      where: {
        id: roadmapId,
      },
      data: {
        ...parsedData.data,
      },
    });
    return NextResponse.json(
      {
        success: true,
        message: `Roadmap Updated Successfully!`,
      },
      { status: 200 },
    );
  },
);

export const DELETE = ProtectedWrapper<TParams>(
  async (req: NextRequest, session: Session, params) => {
    const roadmapId = (await params)?.id ?? undefined;
    console.log(await params);
    await prisma.roadmap.delete({
      where: {
        id: roadmapId,
      },
    });
    return NextResponse.json(
      {
        success: true,
        message: `Roadmap Deleted Successfully!`,
      },
      { status: 200 },
    );
  },
);
