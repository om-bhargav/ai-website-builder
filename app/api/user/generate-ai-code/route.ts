import { prisma } from "@/lib/prisma";
import { callGeminiWithRotation } from "@/lib/gemini";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createWebsitePrompt } from "@/lib/prompts";

const bodySchema = z.object({
  type: z.enum(["website", "template"]),
  id: z.string().min(1),
  prompt: z.string().min(1),
});

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();

    const validated = bodySchema.safeParse(body);

    if (!validated.success) {
      return NextResponse.json(
        {
          success: false,
          errors: validated.error.flatten(),
        },
        { status: 400 },
      );
    }

    const { type, id, prompt } = validated.data;

    // Get source data
    const data =
      type === "website"
        ? await prisma.website.findUnique({
            where: { id },
          })
        : await prisma.template.findUnique({
            where: { id },
          });

    if (!data) {
      return NextResponse.json(
        {
          success: false,
          message: `${type} not found`,
        },
        { status: 404 },
      );
    }

    // Strong system prompt
    const aiPrompt = createWebsitePrompt(prompt, type);

    // Generate website
    const generatedCode = await callGeminiWithRotation(aiPrompt);

    // Save generated code
    if (type === "template") {
      const generatedTemplate = await prisma.template.update({
        where: {
          id: id,
        },
        data: {
          file: generatedCode,
        },
      });
      return NextResponse.json(
        {
          success: true,
          data: generatedTemplate,
        },
        { status: 200 },
      );
    } else {
      const generatedWebsite = await prisma.website.update({
        where: {
          id: id,
        },
        data: {
          file: generatedCode,
        },
      });
      return NextResponse.json(
        {
          success: true,
          data: generatedWebsite,
        },
        { status: 200 },
      );
    }
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
};
