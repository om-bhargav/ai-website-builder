"use client";

import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Phone, User, MapPin } from "lucide-react";

export interface InsightCardProps {
  name: string;
  email: string;
  phone: string;
  city: string;
  message: string;
  date: string;
  type: string;
}

export function InsightCard({ name, email, phone, city, message, date, type }: InsightCardProps) {
  return (
    <Card className="rounded-2xl border border-border/60 shadow-sm hover:shadow-xl transition-all bg-background/20 duration-300">
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-full bg-primary/10">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-lg uppercase text-foreground">{name}</h3>
            <p className="text-xs text-muted-foreground">{date}</p>
          </div>
        </div>

        <Badge variant={type === "QUERY" ? "destructive" : "default"}>{type}</Badge>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Message */}
        <div className="bg-foreground/10 p-4 rounded-xl">
          <p className="text-sm text-muted-foreground line-clamp-4 leading-relaxed">{message}</p>
        </div>

        {/* Contact Info */}
        <div className="grid gap-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Mail className="w-4 h-4" />
            <span>{email}</span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <Phone className="w-4 h-4" />
            <span>{phone}</span>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{city}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <Button asChild size="sm" className="flex-1 rounded-xl py-4!">
            <a href={`mailto:${email}`}>
              <Mail className="w-4 h-4 mr-2" />
              Email
            </a>
          </Button>

          <Button asChild size="sm" variant="secondary" className="flex-1 rounded-xl py-4!">
            <a href={`tel:${phone}`}>
              <Phone className="w-4 h-4 mr-2" />
              Call
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}


export function InsightCardSkeleton() {
  return (
    <Card className="rounded-2xl border border-border/60 shadow-sm bg-background/20 w-full">
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>

        <Skeleton className="h-6 w-16 rounded-full" />
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Message */}
        <Skeleton className="h-16 w-full rounded-xl" />

        {/* Contact Info */}
        <div className="space-y-2">
          <Skeleton className="h-3 w-48" />
          <Skeleton className="h-3 w-40" />
          <Skeleton className="h-3 w-32" />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <Skeleton className="h-9 flex-1 rounded-xl" />
          <Skeleton className="h-9 flex-1 rounded-xl" />
        </div>
      </CardContent>
    </Card>
  )
}