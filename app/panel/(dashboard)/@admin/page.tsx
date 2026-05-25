"use client";

import * as React from "react";
import useSWR from "swr";
import { motion } from "framer-motion";

import fetcher from "@/lib/fetcher";

import { MetricCard } from "../_components/MetricCard";
import { ActivityCard } from "../_components/ActivityCard";
import { AnalyticChart } from "../_components/ActivityChart";

import {
  Users,
  Globe,
  LayoutTemplate,
  CreditCard,
  FileText,
  Shield,
  IndianRupee,
} from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";

// ================= TYPES =================

type AnalyticsResponse = {
  metrics: {
    totalUsers: number;
    totalWebsites: number;
    totalTemplates: number;
    monthRevenue: number;
    totalRevenue: number;
  };

  transactions: {
    SUCCESS: number;
    PENDING: number;
    FAILED: number;
  };

  websiteStatus: {
    DRAFT: number;
    UNDER_DEVELOPMENT: number;
    PUBLISHED: number;
  };

  charts: {
    websiteViews: {
      weekly: { date: string; value: number }[];
      monthly: { date: string; value: number }[];
    };
    userGrowth: {
      weekly: { date: string; value: number }[];
      monthly: { date: string; value: number }[];
    };
  };
};

// ================= SKELETONS =================

function MetricSkeleton() {
  return <Skeleton className="h-24 w-full rounded-2xl bg-gray-700" />;
}

function ChartSkeleton() {
  return <Skeleton className="h-[320px] w-full rounded-2xl bg-gray-700" />;
}

// ================= PAGE =================

export default function Dashboard() {
  const { data, isLoading } = useSWR<AnalyticsResponse>(
    "/api/admin/analytics",
    fetcher,
    { revalidateOnFocus: false }
  );

  const metrics = data?.metrics;

  return (
    <div className="w-full min-h-screen text-foreground p-6 space-y-8">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-muted-foreground">
          Visual insights from your system data
        </p>
      </motion.div>

      {/* ================= METRICS ================= */}
      <div className="grid md:grid-cols-3 xl:grid-cols-6 gap-6">
        {isLoading || !metrics ? (
          Array.from({ length: 6 }).map((_, i) => (
            <MetricSkeleton key={i} />
          ))
        ) : (
          <>
            <MetricCard title="Total Revenue" value={`₹${metrics.totalRevenue}`} icon={IndianRupee} />
            <MetricCard title="This month's Revenue" value={`₹${metrics.monthRevenue}`} icon={IndianRupee} />
            <MetricCard title="Users" value={metrics.totalUsers} icon={Users} />
            <MetricCard title="Websites" value={metrics.totalWebsites} icon={Globe} />
            <MetricCard title="Templates" value={metrics.totalTemplates} icon={LayoutTemplate} />
            <MetricCard title="Admins" value={1} icon={Shield} />
          </>
        )}
      </div>

      {/* ================= STATUS ================= */}
      <div className="grid lg:grid-cols-2 gap-6">
        <ActivityCard title="Website Status">
          {isLoading ? (
            <ChartSkeleton />
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Draft</span>
                <span>{data?.websiteStatus.DRAFT}</span>
              </div>
              <div className="flex justify-between">
                <span>Development</span>
                <span>{data?.websiteStatus.UNDER_DEVELOPMENT}</span>
              </div>
              <div className="flex justify-between">
                <span>Published</span>
                <span>{data?.websiteStatus.PUBLISHED}</span>
              </div>
            </div>
          )}
        </ActivityCard>

        <ActivityCard title="Transactions">
          {isLoading ? (
            <ChartSkeleton />
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Success</span>
                <span>{data?.transactions.SUCCESS}</span>
              </div>
              <div className="flex justify-between">
                <span>Pending</span>
                <span>{data?.transactions.PENDING}</span>
              </div>
              <div className="flex justify-between">
                <span>Failed</span>
                <span>{data?.transactions.FAILED}</span>
              </div>
            </div>
          )}
        </ActivityCard>
      </div>

      {/* ================= CHARTS ================= */}
      <div className="grid lg:grid-cols-2 gap-6">
        {isLoading || !data ? (
          <>
            <ChartSkeleton />
            <ChartSkeleton />
          </>
        ) : (
          <>
            <AnalyticChart
              title="Website Views"
              weeklyData={data.charts.websiteViews.weekly}
              monthlyData={data.charts.websiteViews.monthly}
            />

            <AnalyticChart
              title="User Growth"
              weeklyData={data.charts.userGrowth.weekly}
              monthlyData={data.charts.userGrowth.monthly}
            />
          </>
        )}
      </div>
    </div>
  );
}