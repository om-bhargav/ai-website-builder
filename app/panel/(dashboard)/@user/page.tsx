"use client";

import * as React from "react";
import useSWR from "swr";
import { motion } from "framer-motion";

import { Globe, LayoutTemplate, CreditCard, Map, MessageSquare, IndianRupee } from "lucide-react";

import fetcher from "@/lib/fetcher";

import { MetricCard } from "../_components/MetricCard";
import { ActivityCard } from "../_components/ActivityCard";
import { AnalyticChart } from "../_components/ActivityChart";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// ================= TYPES =================
type AnalyticsResponse = {
  metrics: {
    totalWebsites: number;
    totalMoneySpent: number;
    totalTransactions: number;
    totalRoadmaps: number;
    remainingWebsites: number;
  };
  recentActivity: {
    type: "WEBSITE" | "TRANSACTION" | "SUBMISSION";
    title: string;
    date: string;
    status?: string;
  }[];
  transactions: {
    SUCCESS: number;
    PENDING: number;
    FAILED: number;
  };

  charts: {
    websiteViews: {
      weekly: { date: string; value: number }[];
      monthly: { date: string; value: number }[];
    };

    websiteCreation: {
      weekly: { date: string; value: number }[];
      monthly: { date: string; value: number }[];
    };
  };
};
// ================= SKELETON =================

function MetricSkeleton() {
  return <Skeleton className="h-24 w-full rounded-2xl bg-gray-600" />;
}

function ChartSkeleton() {
  return <Skeleton className="h-[320px] w-full rounded-2xl bg-gray-600" />;
}

// ================= PAGE =================

export default function UserDashboard() {
  const { data, isLoading } = useSWR<AnalyticsResponse>("/api/user/analytics", fetcher, {
    revalidateOnFocus: false,
  });

  const metrics = data?.metrics;

  return (
    <div className="w-full min-h-screen p-6 space-y-8">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-3xl font-bold tracking-tight">My Dashboard</h1>
        <p className="text-muted-foreground">Overview of your websites, activity, and usage.</p>
      </motion.div>

      {/* ================= METRICS ================= */}
      <div className="grid md:grid-cols-3 xl:grid-cols-5 gap-6">
        {isLoading || !metrics ? (
          <>
            {Array.from({ length: 5 }).map((_, i) => (
              <MetricSkeleton key={i} />
            ))}
          </>
        ) : (
          <>
            <MetricCard title="Websites" value={metrics.totalWebsites} icon={Globe} />
            <MetricCard title="Money Spent" value={metrics.totalMoneySpent} icon={IndianRupee} />
            <MetricCard title="Transactions" value={metrics.totalTransactions} icon={CreditCard} />
            <MetricCard title="Roadmaps" value={metrics.totalRoadmaps} icon={Map} />
            <MetricCard title="Remaining Websites" value={metrics.remainingWebsites} icon={Map} />
          </>
        )}
      </div>

      {/* ================= ACTIVITY ================= */}
      <div className="grid lg:grid-cols-2 gap-6">
        <ActivityCard title="Recent Activity">
          {isLoading ? (
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full rounded-xl bg-gray-700" />
              ))}
            </div>
          ) : (
            data?.recentActivity?.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>
                      {item.type === "WEBSITE" ? "W" : item.type === "TRANSACTION" ? "T" : "S"}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(item.date).toLocaleString()}
                    </p>
                  </div>
                </div>

                <Badge variant="secondary">{item.type}</Badge>
              </div>
            ))
          )}
        </ActivityCard>

        <ActivityCard title="Transactions Overview">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="h-6 w-full rounded-xl bg-gray-700" />
              <Skeleton className="h-6 w-full rounded-xl bg-gray-700" />
              <Skeleton className="h-6 w-full rounded-xl bg-gray-700" />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm">Success</span>
                <Badge>{data?.transactions?.SUCCESS}</Badge>
              </div>

              <div className="flex justify-between">
                <span className="text-sm">Pending</span>
                <Badge variant="secondary">{data?.transactions?.PENDING}</Badge>
              </div>

              <div className="flex justify-between">
                <span className="text-sm">Failed</span>
                <Badge variant="destructive">{data?.transactions?.FAILED}</Badge>
              </div>
            </div>
          )}
        </ActivityCard>
      </div>

      {/* ================= ANALYTICS ================= */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tight">Analytics Overview</h2>

        {isLoading || !data ? (
          <div className="grid lg:grid-cols-2 gap-6">
            <ChartSkeleton />
            <ChartSkeleton />
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            <AnalyticChart
              title="Website Views Trend"
              weeklyData={data?.charts?.websiteViews?.weekly}
              monthlyData={data?.charts?.websiteViews?.monthly}
            />

            <AnalyticChart
              title="Website Creation Trend"
              weeklyData={data?.charts?.websiteCreation?.weekly}
              monthlyData={data?.charts?.websiteCreation?.monthly}
            />
          </div>
        )}
      </div>
    </div>
  );
}
