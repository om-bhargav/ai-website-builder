import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { ProtectedWrapper } from "@/lib/middlewares/ProtectedWrapper";
import { Session } from "next-auth";
import { roadmapSchema } from "@/schemas/roadmapSchema";
import {z} from "zod";
// To fetch Roadmaps for user
export const GET = ProtectedWrapper(async (req: NextRequest, session: Session) => {
  const id = session.user.id;
  const roadmaps = await prisma.roadmap.findMany({
    where: {
      userId: id,
    },
    select:{
      title: true,
      description: true,
      created_at: true,
      updated_at: true,
      id: true,
    }
  });

  return NextResponse.json(
    {
      success: true,
      data: roadmaps,
    },
    { status: 201 },
  );
});

// To add roadmap to user route
export const POST = ProtectedWrapper(async (req: NextRequest, session: Session) => {
  const id = session.user.id;

  const body = await req.json();
  
  const parsedData = roadmapSchema.safeParse(body);

  if (!parsedData.success) {
    return NextResponse.json(
      { success: false, errors: z.treeifyError(parsedData.error) },
      { status: 400 },
    );
  }
  const {title,description} = parsedData.data;

  const roadmap = await prisma.roadmap.create({
    data: {
        title: title,
        description: description,
        userId: id
    },
  });

  return NextResponse.json(
    {
      success: true,
      message: `Roadmap Reported Successfully!`,
    },
    { status: 201 },
  );
});
