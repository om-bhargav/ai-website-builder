import { auth, signOut } from "@/lib/AuthConfig";
import { ProtectedWrapper } from "@/lib/middlewares/ProtectedWrapper";
import {prisma} from "@/lib/prisma";
import { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

// To get the user's basic info
export const GET = ProtectedWrapper(async (req: NextRequest, session: Session)=>{
  const id = session.user.id;
  const user = await prisma.user.findUnique({
    where:{
      id
    },
    select:{
      email: true,
      name: true,
      role: true,
      status: true
    }
  });
  if(!user || user.status==="DEACTIVATED" || user.status==="SUSPENDED"){
    await signOut({redirect:true,redirectTo: "/"});
    return NextResponse.json({success: false,message: "User Not Found!"});
  }
  return NextResponse.json({success: true,data: user});
})