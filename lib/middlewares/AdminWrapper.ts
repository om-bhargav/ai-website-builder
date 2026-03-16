import { auth } from "@/lib/AuthConfig";
import { NextRequest } from "next/server";

// To get the user's basic info
export async function GET(req: NextRequest) {
  const session = await auth();
  if(!session || session.user.role!=="ADMIN"){
    throw Error("Not Authorized");
  }
  
}