"use client";
import { AuthStore } from "@/store/AuthInfo";

export default function DashboardRouter({
  admin,
  user,
}: {
  admin: React.ReactNode;
  user: React.ReactNode;
}) {
  const { user: currentUser } = AuthStore();
  const role = currentUser?.role ?? "USER";
  if (role === "ADMIN") {
    return admin;
  }

  return user;
}
