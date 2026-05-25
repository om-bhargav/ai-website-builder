import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { AdminWrapper } from "@/lib/middlewares/AdminWrapper";
function getDayKey(date: Date) {
  return date.toISOString().split("T")[0]; // YYYY-MM-DD
}
export function getWeeklyUserGrowth(users: { createdAt: Date }[]) {
  const map = new Map<string, number>();

  const now = new Date();

  // create last 7 days buckets
  const last7Days: string[] = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date(now);
    d.setDate(now.getDate() - (6 - i));
    return getDayKey(d);
  });

  // initialize with 0
  last7Days.forEach((d) => map.set(d, 0));

  // count users
  users.forEach((u) => {
    const key = getDayKey(new Date(u.createdAt));
    if (map.has(key)) {
      map.set(key, (map.get(key) || 0) + 1);
    }
  });

  return last7Days.map((date) => ({
    date,
    value: map.get(date) || 0,
  }));
}
export function getMonthlyUserGrowth(users: { createdAt: Date }[]) {
  const map = new Map<string, number>();

  const now = new Date();

  const last30Days: string[] = Array.from({ length: 30 }).map((_, i) => {
    const d = new Date(now);
    d.setDate(now.getDate() - (29 - i));
    return getDayKey(d);
  });

  last30Days.forEach((d) => map.set(d, 0));

  users.forEach((u) => {
    const key = getDayKey(new Date(u.createdAt));
    if (map.has(key)) {
      map.set(key, (map.get(key) || 0) + 1);
    }
  });

  return last30Days.map((date) => ({
    date,
    value: map.get(date) || 0,
  }));
}
export const GET = AdminWrapper(async () => {
  const now = new Date();

  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
  // ================= METRICS =================
  const [totalUsers, totalWebsites, totalTemplates, totalRevenue, monthRevenue] = await Promise.all(
    [
      prisma.user.count(),
      prisma.website.count(),
      prisma.template.count(),
      prisma.transaction.aggregate({ where: { status: "SUCCESS" }, _sum: { amount: true } }),
      prisma.transaction.aggregate({
        where: {
          status: "SUCCESS",
          createdAt: {
            gte: startOfMonth,
            lte: endOfMonth,
          },
        },
        _sum: {
          amount: true,
        },
      }),
    ],
  );

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
  const userGrowth = {
    weekly: getWeeklyUserGrowth(users),
    monthly: getMonthlyUserGrowth(users)
  }

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
      totalRevenue: totalRevenue._sum.amount || 0,
      monthRevenue: monthRevenue._sum.amount || 0,
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
