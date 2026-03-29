"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, Shield, Activity, Globe, FileText, Crown } from "lucide-react";

// --- Types ---

type ROLE = "USER" | "ADMIN";
type USER_STATUS = "ACTIVATED" | "DEACTIVATED" | "SUSPENDED";

// --- Dummy Data ---

const dummyUser = {
  id: "usr_01",
  name: "Om Hacker",
  email: "om@example.com",
  phone: "+91 9876543210",
  role: "USER" as ROLE,
  status: "ACTIVATED" as USER_STATUS,
  emailVerified: true,
  bio: "Full-stack dev building scalable products 🚀",
  image: "https://i.pravatar.cc/150?img=12",
  websites: 4,
  templates: 9,
  plan: "PRO",
  createdAt: "2026-03-01",
};

export default function AdvancedUserCard({index}:{index: number}) {
  const [status, setStatus] = useState<USER_STATUS>(dummyUser.status);
  const [role, setRole] = useState<ROLE>(dummyUser.role);
  const [verified, setVerified] = useState(dummyUser.emailVerified);

  const toggleAdmin = () => { 
    setRole((prev) => (prev === "ADMIN" ? "USER" : "ADMIN"));
  };

  return (
      <motion.div
        initial={{ opacity:0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4,delay: 0.15 * index }}
        className="w-full max-w-lg"
      >
        <Card className="rounded-2xl shadow-2xl border bg-background/30 text-foreground">
          {/* Header */}
          <CardHeader className="flex flex-row items-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Avatar className="h-16 w-16">
                <AvatarImage src={dummyUser.image} />
                <AvatarFallback>OM</AvatarFallback>
              </Avatar>
            </motion.div>

            <div className="flex-1">
              <CardTitle className="text-xl font-semibold">
                {dummyUser.name}
              </CardTitle>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Mail size={14} /> {dummyUser.email}
              </p>
            </div>

            <Badge variant={role === "ADMIN" ? "default" : "secondary"}>
              {role}
            </Badge>
          </CardHeader>

          <CardContent className="space-y-5">
            {/* Status */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Activity size={14} /> Status
              </span>
              <Badge
                variant={
                  status === "ACTIVATED"
                    ? "default"
                    : status === "SUSPENDED"
                    ? "destructive"
                    : "secondary"
                }
              >
                {status}
              </Badge>
            </div>

            {/* Bio */}
            <p className="text-sm text-muted-foreground">{dummyUser.bio}</p>

            <Separator />

            {/* Info */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Phone size={14} /> {dummyUser.phone}
              </div>
              <div className="flex items-center gap-2">
                <Shield size={14} /> Verified
                {verified ? (
                  <span className="flex items-center gap-1 text-green-500">
                    ✓
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-red-500">
                    ✕
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Globe size={14} /> {dummyUser.websites} Sites
              </div>
              <div className="flex items-center gap-2">
                <FileText size={14} /> {dummyUser.templates} Templates
              </div>
            </div>

            <Separator />

            {/* Status Control */}
            <div>
              <p className="text-sm font-medium mb-1">Update Status</p>
              <Select value={status} onValueChange={(v) => setStatus(v as USER_STATUS)}>
                <SelectTrigger className="w-full uppercase">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem className="uppercase" value="ACTIVATED">Activated</SelectItem>
                  <SelectItem className="uppercase" value="DEACTIVATED">Deactivated</SelectItem>
                  <SelectItem className="uppercase" value="SUSPENDED">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Make Admin Button */}
            <motion.div className="space-y-3">
              <Button
                onClick={toggleAdmin}
                className="w-full flex items-center gap-2 justify-center text-base font-medium"
                variant={role === "ADMIN" ? "secondary" : "default"}
              >
                <Crown size={16} />
                {role === "ADMIN" ? "Revoke Admin" : "Make Admin"}
              </Button>
              <Button variant="destructive" className="w-full">
                Suspend User
              </Button>
            </motion.div>

            <div className="text-xs text-right text-muted-foreground pt-2 border-t">
              Joined: {dummyUser.createdAt}
            </div>
          </CardContent>
        </Card>
      </motion.div>
  );
}
