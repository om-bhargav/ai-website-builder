import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ProtectedWrapper } from "@/lib/middlewares/ProtectedWrapper";

export const GET = ProtectedWrapper(async (req, session) => {
  const userId = session.user.id;
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    }
  })!;
  // ================= METRICS =================
  const [totalWebsites, totalTemplates, totalTransactions, totalRoadmaps, totalSubmissions] =
    await Promise.all([
      prisma.website.count({ where: { userId } }),
      prisma.template.count({ where: { userId } }),
      prisma.transaction.count({ where: { userId } }),
      prisma.roadmap.count({ where: { userId } }),
      prisma.submissions.count({ where: { userId } }),
    ]);

  // ================= WEBSITE STATUS =================
  const websiteStatus = await prisma.website.groupBy({
    by: ["status"],
    where: { userId },
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

  // ================= WEBSITE VIEWS =================
  const websites = await prisma.website.findMany({
    where: { userId },
    select: {
      views: true,
      createdAt: true,
    },
    orderBy: { createdAt: "asc" },
  });

  const websiteViewsWeekly = Array.from({ length: 7 }).map((_, i) => {
    const slice = websites.slice(
      i * Math.ceil(websites.length / 7),
      (i + 1) * Math.ceil(websites.length / 7),
    );

    return {
      date: `D${i + 1}`,
      value: slice.reduce((sum, w) => sum + (w.views || 0), 0),
    };
  });
  const recentWebsites = await prisma.website.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 3,
    select: {
      id: true,
      title: true,
      createdAt: true,
    },
  });

  const recentTransactions = await prisma.transaction.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 2,
    select: {
      id: true,
      title: true,
      status: true,
      createdAt: true,
    },
  });

  const recentSubmissions = await prisma.submissions.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 2,
    select: {
      id: true,
      name: true,
      type: true,
      createdAt: true,
    },
  });
  const websiteViewsMonthly = Array.from({ length: 5 }).map((_, i) => {
    const slice = websites.slice(
      i * Math.ceil(websites.length / 5),
      (i + 1) * Math.ceil(websites.length / 5),
    );

    return {
      date: `M${i + 1}`,
      value: slice.reduce((sum, w) => sum + (w.views || 0), 0),
    };
  });

  // ================= WEBSITE CREATION TREND (REPLACES USER GROWTH) =================
  const websiteCreationTrend = Array.from({ length: 6 }).map((_, i) => {
    const slice = websites.slice(
      i * Math.ceil(websites.length / 6),
      (i + 1) * Math.ceil(websites.length / 6),
    );

    return {
      date: `M${i + 1}`,
      value: slice.length, // how many websites created
    };
  });

  // ================= TRANSACTION BREAKDOWN =================
  const transactions = await prisma.transaction.groupBy({
    by: ["status"],
    where: { userId },
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

  return NextResponse.json({
    metrics: {
      totalWebsites,
      totalTemplates,
      totalTransactions,
      totalRoadmaps,
      remainingWebsites: user?.total_websites
    },
    recentActivity: [
      ...recentWebsites.map((w) => ({
        type: "WEBSITE",
        title: w.title,
        date: w.createdAt,
      })),

      ...recentTransactions.map((t) => ({
        type: "TRANSACTION",
        title: t.title,
        status: t.status,
        date: t.createdAt,
      })),

      ...recentSubmissions.map((s) => ({
        type: "SUBMISSION",
        title: s.name,
        status: s.type,
        date: s.createdAt,
      })),
    ]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5),
    transactions: transactionStats,

    websiteStatus: websiteStatusStats,

    charts: {
      websiteViews: {
        weekly: websiteViewsWeekly,
        monthly: websiteViewsMonthly,
      },

      websiteCreation: websiteCreationTrend,
    },
  });
});
