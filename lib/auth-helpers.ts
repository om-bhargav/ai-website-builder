import { auth } from "@/lib/AuthConfig";
import { prisma } from "@/lib/prisma";

export async function getUser() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });

    return user;
  } catch (error) {
    console.error("getUser error:", error);
    return null;
  }
}