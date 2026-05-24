import {
  ArrowDownLeft,
  ArrowUpRight,
  CreditCard,
  Receipt,
  XCircle,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

type TransactionStatus =
  | "SUCCESS"
  | "PENDING"
  | "FAILED";

interface Transaction {
  id: string;
  title: string;
  description?: string | null;
  amount: number;
  status: TransactionStatus;
  paymentId?: string | null;
  invoiceUrl?: string | null;
  createdAt: string;
}

interface TransactionCardProps {
  transaction: Transaction;
}

function getStatusColor(status: TransactionStatus) {
  switch (status) {
    case "SUCCESS":
      return "bg-green-500/10 text-green-500 border-green-500/20";

    case "PENDING":
      return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";

    case "FAILED":
      return "bg-red-500/10 text-red-500 border-red-500/20";

    default:
      return "";
  }
}

function getStatusIcon(status: TransactionStatus) {
  switch (status) {
    case "SUCCESS":
      return (
        <div className="flex items-center justify-center rounded-2xl bg-green-500/10 p-3">
          <ArrowDownLeft className="size-6 text-green-500" />
        </div>
      );

    case "PENDING":
      return (
        <div className="flex items-center justify-center rounded-2xl bg-yellow-500/10 p-3">
          <CreditCard className="size-6 text-yellow-500" />
        </div>
      );

    case "FAILED":
      return (
        <div className="flex items-center justify-center rounded-2xl bg-red-500/10 p-3">
          <XCircle className="size-6 text-red-500" />
        </div>
      );

    default:
      return (
        <div className="flex items-center justify-center rounded-2xl bg-primary/10 p-3">
          <Receipt className="size-6 text-primary" />
        </div>
      );
  }
}

export function TransactionCard({
  transaction,
}: TransactionCardProps) {
  return (
    <Card className="group rounded-3xl border py-1 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <CardContent className="p-6">

        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

          {/* LEFT */}
          <div className="flex items-start gap-4">

            <div className="transition-transform duration-300 group-hover:scale-105">
              {getStatusIcon(transaction.status)}
            </div>

            <div className="space-y-2">

              <div>
                <h3 className="text-lg font-semibold tracking-tight">
                  {transaction.title}
                </h3>

                {transaction.description && (
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                    {transaction.description}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">

                <span className="font-medium">
                  #{transaction.id.slice(0, 10)}
                </span>

                <Separator
                  orientation="vertical"
                  className="h-4"
                />

                <span>
                  {transaction.createdAt}
                </span>

                {transaction.paymentId && (
                  <>
                    <Separator
                      orientation="vertical"
                      className="h-4"
                    />

                    <span className="truncate max-w-[150px]">
                      {transaction.paymentId}
                    </span>
                  </>
                )}

              </div>

            </div>

          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-4">

            <div className="text-right">

              <p className="text-2xl font-bold tracking-tight">
                ₹{transaction.amount}
              </p>

              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Transaction
              </p>

            </div>

            <Badge
              className={`rounded-xl border px-4 py-2 font-medium ${getStatusColor(
                transaction.status
              )}`}
            >
              {transaction.status}
            </Badge>

          </div>

        </div>

      </CardContent>
    </Card>
  );
}

export function TransactionCardSkeleton() {
  return (
    <Card className="rounded-3xl border py-1 shadow-sm">
      <CardContent className="p-6">

        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between animate-pulse">

          <div className="flex items-start gap-4 flex-1">

            <div className="size-14 rounded-2xl bg-muted" />

            <div className="space-y-3 flex-1">

              <div className="h-5 w-52 rounded bg-muted" />

              <div className="h-4 w-72 rounded bg-muted" />

              <div className="flex gap-3">
                <div className="h-4 w-24 rounded bg-muted" />
                <div className="h-4 w-20 rounded bg-muted" />
              </div>

            </div>

          </div>

          <div className="flex items-center gap-4">

            <div className="space-y-2">
              <div className="h-6 w-24 rounded bg-muted" />
              <div className="h-4 w-20 rounded bg-muted" />
            </div>

            <div className="h-10 w-28 rounded-xl bg-muted" />

          </div>

        </div>

      </CardContent>
    </Card>
  );
}