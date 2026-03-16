"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { MetricCard } from "./_components/MetricCard";
import { ActivityCard } from "./_components/ActivityCard";
import {
  Users,
  Globe,
  LayoutTemplate,
  CreditCard,
  FileText,
  TrendingUp,
  Shield,
} from "lucide-react";
import { AnalyticChart } from "./_components/ActivityChart";
export default function Dashboard() {
  // Mocked aggregated metrics (replace with Prisma counts)
  const metrics = {
    totalUsers: 124,
    totalWebsites: 58,
    totalTemplates: 210,
    activePlans: 37,
    totalSubmissions: 842,
    admins: 3,
  };
    const weeklySubmissions = [
    { date: "Mon", value: 40 },
    { date: "Tue", value: 55 },
    { date: "Wed", value: 48 },
    { date: "Thu", value: 70 },
    { date: "Fri", value: 66 },
    { date: "Sat", value: 80 },
    { date: "Sun", value: 60 },
  ]

  const monthlySubmissions = [
    { date: "Jan", value: 210 },
    { date: "Feb", value: 320 },
    { date: "Mar", value: 280 },
    { date: "Apr", value: 400 },
    { date: "May", value: 370 },
  ]

  return (
    <div className="w-full min-h-screen text-foreground p-6 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex  justify-between items-center"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-muted-foreground">Visual insights from your Prisma data models.</p>
        </div>
        <Button size={"sm"}>Generate Report</Button>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid md:grid-cols-3 xl:grid-cols-6 gap-6">
        <MetricCard title="Users" value={metrics.totalUsers} icon={Users} trend="+8% this month" />
        <MetricCard title="Websites" value={metrics.totalWebsites} icon={Globe} />
        <MetricCard title="Templates" value={metrics.totalTemplates} icon={LayoutTemplate} />
        <MetricCard title="Active Plans" value={metrics.activePlans} icon={CreditCard} />
        <MetricCard title="Submissions" value={metrics.totalSubmissions} icon={FileText} />
        <MetricCard title="Admins" value={metrics.admins} icon={Shield} />
      </div>

      {/* Secondary Section */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <ActivityCard title="Recent Users">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">User {i + 1}</p>
                  <p className="text-xs text-muted-foreground">user{i + 1}@mail.com</p>
                </div>
              </div>
              <Badge variant="secondary">USER</Badge>
            </div>
          ))}
        </ActivityCard>

        {/* Website Status Breakdown */}
        <ActivityCard title="Website Status">
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm">Draft</span>
              <Badge variant="secondary">12</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Under Development</span>
              <Badge variant="outline">18</Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Published</span>
              <Badge>28</Badge>
            </div>
          </div>
        </ActivityCard>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <AnalyticChart monthlyData={monthlySubmissions} weeklyData={weeklySubmissions} title="Submissions"/>           
        <AnalyticChart monthlyData={monthlySubmissions} weeklyData={weeklySubmissions} title="Submissions"/>           
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        
        <AnalyticChart monthlyData={monthlySubmissions} weeklyData={weeklySubmissions} title="Submissions"/>           
        <AnalyticChart monthlyData={monthlySubmissions} weeklyData={weeklySubmissions} title="Submissions"/>           
      </div>

      <Separator />
    </div>
  );
}
