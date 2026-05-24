"use client";

import { useState } from "react";

import { motion } from "framer-motion";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Skeleton } from "@/components/ui/skeleton";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Mail, Phone, Shield, Activity, Globe, FileText, Crown } from "lucide-react";
import { formatDateTime } from "@/lib/date-time";
import { cn } from "@/lib/utils";
// --- TYPES ---

type ROLE = "USER" | "ADMIN";
type USER_STATUS = "ACTIVATED" | "DEACTIVATED" | "SUSPENDED";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: ROLE;
  status: USER_STATUS;
  image?: string;
  bio?: string;
  total_websites: number;
  createdAt: string;
}

export default function AdvancedUserCard({
  user,
  index,
  mutate,
}: {
  user: User;
  index: number;
  mutate: () => void;
}) {
  const [loading, setLoading] = useState(false);

  // ================= UPDATE USER =================

  async function updateUser(data: Partial<User>) {
    try {
      setLoading(true);

      const res = await fetch(`/api/admin/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message);
      }

      // refresh list
      await mutate();
    } catch (error) {
      console.error(error);
      alert("Failed to update user");
    } finally {
      setLoading(false);
    }
  }

  // ================= HANDLERS =================

  const toggleAdmin = () => {
    updateUser({
      role: user.role === "ADMIN" ? "USER" : "ADMIN",
    });
  };

  const toggleUserStatus = () => {
    updateUser({
      status: user.status === "ACTIVATED" ? "SUSPENDED" : "ACTIVATED",
    });
  };
  const updateStatus = (status: USER_STATUS) => {
    updateUser({ status });
  };
  return (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.15 * index }}
      className="w-full max-w-lg"
    >
      <Card className="rounded-2xl shadow-2xl border bg-background/30 text-foreground">
        {/* HEADER */}
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user.image} />
            <AvatarFallback>{user.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <CardTitle className="text-xl font-semibold">{user.name}</CardTitle>

            <p className="text-sm break-all text-muted-foreground flex items-center gap-1">
              <Mail size={14} /> {user.email}
            </p>

            <Badge variant={user.role === "ADMIN" ? "default" : "secondary"}>{user.role}</Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* STATUS */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Activity size={14} /> Status
            </span>

            <Badge
              variant={
                user.status === "ACTIVATED"
                  ? "default"
                  : user.status === "SUSPENDED"
                    ? "destructive"
                    : "secondary"
              }
            >
              {user.status}
            </Badge>
          </div>

          {/* BIO */}
          <p className="text-sm text-muted-foreground">{user.bio}</p>

          {/* INFO */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Phone size={14} /> {user.phone || "Not Provided"}
            </div>

            <div className="flex items-center gap-2">
              <Shield size={14} /> Verified
            </div>

            <div className="flex items-center gap-2">
              <Globe size={14} /> {user.total_websites} Sites
            </div>

            <div className="flex items-center gap-2">
              <FileText size={14} /> User
            </div>
          </div>

          {/* STATUS CONTROL */}
          <div>
            <p className="text-sm font-medium mb-1">Update Status</p>

            <Select
              value={user.status}
              onValueChange={(v) => updateStatus(v as USER_STATUS)}
              disabled={loading}
            >
              <SelectTrigger className="w-full uppercase">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem className="uppercase" value="ACTIVATED">
                  Activated
                </SelectItem>

                <SelectItem className="uppercase" value="DEACTIVATED">
                  Deactivated
                </SelectItem>

                <SelectItem className="uppercase" value="SUSPENDED">
                  Suspended
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* ACTIONS */}
          <div className="space-y-3">
            <Button
              onClick={toggleAdmin}
              disabled={loading}
              className="w-full flex items-center gap-2 justify-center"
              variant={user.role === "ADMIN" ? "secondary" : "default"}
            >
              <Crown size={16} />
              {user.role === "ADMIN" ? "Revoke Admin" : "Make Admin"}
            </Button>

            <Button
              onClick={toggleUserStatus}
              disabled={loading}
              variant={user.status === "ACTIVATED" ? "destructive" : "default"}
              className={cn("w-full", user.status !== "ACTIVATED" ? "bg-green-600!" : "")}
            >
              {user.status === "ACTIVATED" ? "Suspend User" : "Activate User"}
            </Button>
          </div>

          {/* FOOTER */}
          <div className="text-xs text-right text-muted-foreground pt-2 border-t">
            Joined: {formatDateTime(user.createdAt)}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function UserCardSkeleton() {
  return (
    <div
      className="w-full max-w-lg"
      style={{
        animationDelay: `${0.15}s`,
      }}
    >
      <Card className="rounded-2xl border shadow-2xl bg-background/30">
        {/* HEADER */}
        <CardHeader className="flex flex-row items-center gap-4">
          <Skeleton className="h-16 w-16 rounded-full" />

          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-40 rounded-lg" />

            <Skeleton className="h-4 w-52 rounded-lg" />

            <Skeleton className="h-6 w-20 rounded-lg" />
          </div>
        </CardHeader>

        <CardContent className="space-y-5">
          {/* STATUS */}
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-24 rounded-lg" />

            <Skeleton className="h-6 w-24 rounded-lg" />
          </div>

          {/* BIO */}
          <Skeleton className="h-4 w-full rounded-lg" />
          <Skeleton className="h-4 w-5/6 rounded-lg" />

          {/* INFO GRID */}
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-24 rounded-lg" />
              </div>
            ))}
          </div>

          {/* SELECT */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-32 rounded-lg" />
            <Skeleton className="h-10 w-full rounded-xl" />
          </div>

          {/* BUTTONS */}
          <div className="space-y-3">
            <Skeleton className="h-11 w-full rounded-xl" />

            <Skeleton className="h-11 w-full rounded-xl" />
          </div>

          {/* FOOTER */}
          <Skeleton className="h-3 w-40 ml-auto rounded-lg" />
        </CardContent>
      </Card>
    </div>
  );
}
