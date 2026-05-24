import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { AdminWrapper } from "@/lib/middlewares/AdminWrapper";

export const GET = AdminWrapper(async () => {
  // ================= METRICS =================
  const [totalUsers, totalWebsites, totalTemplates, totalTransactions, totalSubmissions] =
    await Promise.all([
      prisma.user.count(),
      prisma.website.count(),
      prisma.template.count(),
      prisma.transaction.count(),
      prisma.submissions.count(),
    ]);

  // ================= WEBSITE STATUS =================
  const websiteStatus = await prisma.website.groupBy({
    by: ["status"],
    _count: true,
  });

  const websiteStatusStats = {
    DRAFT: 0,
    UNDER_DEVELOPMENT: 0,
    PUBLISHED: 0,
  };

  websiteStatus.forEach((s) => {
    websiteStatusStats[s.status] = s._count;
  });

  // ================= TRANSACTIONS =================
  const transactions = await prisma.transaction.groupBy({
    by: ["status"],
    _count: true,
  });

  const transactionStats = {
    SUCCESS: 0,
    PENDING: 0,
    FAILED: 0,
  };

  transactions.forEach((t) => {
    transactionStats[t.status] = t._count;
  });

  // ================= USER GROWTH (REAL DAILY GROUPING) =================
  const users = await prisma.user.findMany({
    select: { createdAt: true },
  });

  // ================= HELPERS =================
  const formatDate = (d: Date) => d.toISOString().split("T")[0];

  // group helper
  function groupByRange(dates: string[]) {
    const map = new Map<string, number>();

    dates.forEach((d) => {
      map.set(d, (map.get(d) || 0) + 1);
    });

    return Array.from(map.entries()).map(([date, value]) => ({
      date,
      value,
    }));
  }

  // ================= SORT ALL USERS =================
  const sortedDates = users.map((u) => formatDate(new Date(u.createdAt))).sort();

  // ================= WEEKLY (LAST 7 DAYS) =================
  const last7Days = sortedDates.slice(-7);
  const weekly = groupByRange(last7Days);

  // ================= MONTHLY (LAST 5 GROUPS) =================
  // simple bucket: split into 5 chunks
  const chunkSize = Math.ceil(sortedDates.length / 5);

  const monthly = Array.from({ length: 5 }).map((_, i) => {
    const slice = sortedDates.slice(i * chunkSize, (i + 1) * chunkSize);

    return {
      date: `M${i + 1}`,
      value: slice.length,
    };
  });

  // ================= FINAL OUTPUT =================
  const userGrowth = {
    weekly,
    monthly,
  };

  // ================= WEBSITE VIEWS (logTraffic BASED) =================
  const trafficLogs = await prisma.logTraffic.findMany({
    orderBy: {
      date: "asc",
    },
  });

  // helper
  const formatLabel = (date: string | Date, type: "weekly" | "monthly") => {
    const d = new Date(date);

    if (type === "weekly") {
      return d.toLocaleDateString("en-US", {
        weekday: "short", // Mon, Tue
      });
    }

    return d.toLocaleDateString("en-US", {
      month: "short", // Jan
      day: "numeric",
    });
  };

  // ================= WEEKLY =================
  const websiteViewsWeekly = trafficLogs.slice(-7).map((log) => ({
    date: formatLabel(log.date, "weekly"),
    value: log.views,
  }));

  // ================= MONTHLY =================
  const websiteViewsMonthly = trafficLogs
    .slice(-30) // last 30 days
    .reduce(
      (acc, log) => {
        const key = new Date(log.date).toLocaleDateString("en-US", {
          month: "short",
        });

        const existing = acc.find((i) => i.date === key);

        if (existing) {
          existing.value += log.views;
        } else {
          acc.push({
            date: key,
            value: log.views,
          });
        }

        return acc;
      },
      [] as { date: string; value: number }[],
    );

  return NextResponse.json({
    metrics: {
      totalUsers,
      totalWebsites,
      totalTemplates,
      totalTransactions,
      totalSubmissions,
    },

    websiteStatus: websiteStatusStats,
    transactions: transactionStats,

    charts: {
      websiteViews: {
        weekly: websiteViewsWeekly,
        monthly: websiteViewsMonthly,
      },
      userGrowth,
    },
  });
});
