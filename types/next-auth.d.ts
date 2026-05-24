import { DefaultSession } from "next-auth"
import { JWT as DefaultJWT } from "next-auth/jwt"

export type AppRole = "USER" | "ADMIN"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      role: AppRole
    } & DefaultSession["user"]
  }

  interface User {
    id: string
    role: AppRole
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string
    role: AppRole
  }
}


import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

// 1. Extend the built-in Session and User types
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "USER" | "ADMIN";
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    role: "USER" | "ADMIN";
  }
}

// 2. Extend the built-in JWT type
declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    role: "USER" | "ADMIN";
  }
}