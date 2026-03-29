"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { User, Phone, Mail, Pencil } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
interface User {
  email: string;
  name: string;
  bio: string;
  phone: string;
  image: string;
}
interface Props {
  user: User;
}
export default function PersonalInfoForm({ user }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="bg-background/50 backdrop-blur border border-white/10 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-foreground text-lg">Personal Information</CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Full Name + Phone */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="text-gray-300">Full Name</Label>
              <div className="relative mt-2">
                <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="David Jhon"
                  defaultValue={user.name}
                  className="pl-9 border-white/10 text-foreground"
                />
              </div>
            </div>

            <div>
              <Label className="text-gray-300">Phone Number</Label>
              <div className="relative mt-2">
                <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <Input
                  defaultValue={user.phone}
                  placeholder="+990 3343 7865"
                  className="pl-9 border-white/10 text-foreground"
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <div>
            <Label className="text-gray-300">Email Address</Label>
            <div className="relative mt-2">
              <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                defaultValue={user.email}
                placeholder="example@email.com"
                className="pl-9 border-white/10 text-foreground"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <Label className="text-gray-300">BIO</Label>
            <div className="relative mt-2">
              <Pencil className="absolute left-3 top-4 w-4 h-4 text-muted-foreground" />
              <Textarea
                defaultValue={user.bio}
                placeholder="Write your bio here"
                className="pl-9 pt-3 border-white/10 text-foreground min-h-[140px]"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            <Button variant="outline" className="border-white/20 text-foreground">
              Cancel
            </Button>

            <Button>Save</Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function PersonalInfoFormSkeleton() {
  return (
    <Card className="bg-background/50 backdrop-blur border border-white/10 rounded-2xl">
      <CardHeader>
        <Skeleton className="h-6 w-48 rounded-md" />
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Full Name + Phone */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24 rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-4 w-28 rounded-md" />
            <Skeleton className="h-10 w-full rounded-md" />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-32 rounded-md" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>

        {/* Bio */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-16 rounded-md" />
          <Skeleton className="h-[140px] w-full rounded-md" />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <Skeleton className="h-10 w-24 rounded-md" />
          <Skeleton className="h-10 w-20 rounded-md" />
        </div>
      </CardContent>
    </Card>
  );
}
