"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { LayoutTemplate, Calendar, User, ExternalLink } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const dummyTemplate = {
  id: "tmp_01",
  title: "SaaS Landing Page",
  description: "High-converting SaaS landing template with modern UI.",
  thumbnail: "https://picsum.photos/600/400",
  status: "DRAFT",
  createdAt: "2026-03-10",
  author: "Om Hacker",
};

export default function TemplateCard({index}:{index: number}) {
  const [status, setStatus] = useState(dummyTemplate.status);
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 * index }}
      className="w-full max-w-xl"
    >
      <Card className="overflow-hidden bg-background/50 pt-0 rounded-2xl shadow-xl">
        
        {/* Thumbnail */}
        <div className="relative h-52 w-full overflow-hidden">
          <Image
            src={dummyTemplate.thumbnail}
            alt="template"
            fill
            className="object-cover grayscale hover:grayscale-0 duration-500 hover:scale-105 transition-all"
          />
        </div>

        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">
              {dummyTemplate.title}
            </CardTitle>

            <Badge
              variant={
                status === "PUBLISHED"
                  ? "default"
                  : status === "UNDER_DEVELOPMENT"
                  ? "secondary"
                  : "outline"
              }
            >
              {status}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          
          {/* Description */}
          <p className="text-sm text-muted-foreground">
            {dummyTemplate.description}
          </p>

          <Separator />

          {/* Info */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <User size={14} /> {dummyTemplate.author}
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={14} /> {dummyTemplate.createdAt}
            </div>
            <div className="flex items-center gap-2">
              <LayoutTemplate size={14} /> Template
            </div>
          </div>

          <Separator />

          {/* Actions */}
          <div className="flex gap-2">
            <Button className="flex-1">
              <ExternalLink size={14} /> Preview
            </Button>

            <Button variant="secondary" className="flex-1">
              Edit
            </Button>

            <Button variant="destructive" className="flex-1">
              Delete
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}