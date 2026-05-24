"use client";

import * as React from "react";
import useSWR from "swr";
import { Receipt, IndianRupee } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { TransactionCard,TransactionCardSkeleton } from "./_components/TransactionCard";

import ErrorLoading from "@/components/ErrorLoading";
import fetcher from "@/lib/fetcher";

type TransactionStatus = "SUCCESS" | "PENDING" | "FAILED";

type TransactionType = "SUBSCRIPTION" | "REFUND" | "PURCHASE";

interface Transaction {
  id: string;
  title: string;
  amount: number;
  status: TransactionStatus;
  type: TransactionType;
  createdAt: string;
}



export default function TransactionsPage() {
  const { data, error, isLoading } = useSWR<{ data: Transaction[] }>("/api/user/transactions", fetcher, {
    revalidateOnFocus: false,
    revalidateIfStale: false,
  });

  const transactions = data?.data ?? [];

  const totalSpent = transactions
    .filter((txn) => txn.status === "SUCCESS")
    .reduce((acc, txn) => acc + txn.amount, 0);

  const successfulTransactions = transactions.filter((txn) => txn.status === "SUCCESS").length;

  const pendingTransactions = transactions.filter((txn) => txn.status === "PENDING").length;

  return (
    <div className="space-y-10 p-4">
      {/* ================= HEADER ================= */}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>

          <p className="text-muted-foreground text-sm mt-1">
            View all your payments, subscriptions and invoices.
          </p>
        </div>

        <div className="hidden md:flex items-center gap-2 rounded-2xl border bg-card px-4 py-3 shadow-sm">
          <Receipt className="size-5 text-primary" />

          <div>
            <p className="text-sm font-medium">Total Transactions</p>

            <p className="text-xs text-muted-foreground">{transactions.length} Records</p>
          </div>
        </div>
      </div>

      {/* ================= STATS ================= */}

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="rounded-3xl py-1 border shadow-sm">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Spent</p>

              <h2 className="text-3xl font-bold mt-2">₹{totalSpent}</h2>
            </div>

            <div className="p-4 rounded-2xl bg-primary/10">
              <IndianRupee className="size-6 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl py-1 border shadow-sm">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Successful</p>

              <h2 className="text-3xl font-bold mt-2">{successfulTransactions}</h2>
            </div>

            <Badge className="rounded-xl px-4 py-2 bg-green-500/10 text-green-500 border-green-500/20">
              Success
            </Badge>
          </CardContent>
        </Card>

        <Card className="rounded-3xl py-1 border shadow-sm">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Pending</p>

              <h2 className="text-3xl font-bold mt-2">{pendingTransactions}</h2>
            </div>

            <Badge className="rounded-xl px-4 py-2 bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
              Pending
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* ================= TRANSACTIONS ================= */}

      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold">Recent Transactions</h2>

          <p className="text-sm text-muted-foreground">Your latest payment activities.</p>
        </div>

        <ErrorLoading
          dataLength={transactions.length}
          loading={isLoading}
          error={error}
          loadingCard={TransactionCardSkeleton}
          loadingCols={1}
          loadingRows={3}
          loadingCount={3}
          emptyMessage="No Transactions Found!"
        >
          <div className="space-y-4">
            {transactions.map((transaction) => (
              <TransactionCard
                key={transaction.id}
                transaction={{
                  ...transaction,
                  createdAt: new Date(transaction.createdAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }),
                }}
              />
            ))}
          </div>
        </ErrorLoading>
      </div>
    </div>
  );
}
