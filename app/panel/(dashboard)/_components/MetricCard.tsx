import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
export function MetricCard({ title, value, icon: Icon, trend }: any) {
  return (
    <Card className="rounded-2xl py-0 border shadow-sm hover:shadow-md transition-all">
      <CardContent className="p-6 flex items-center justify-between">
        {/* LEFT SIDE */}
        <div className="flex flex-col gap-1">
          <p className="text-sm text-muted-foreground">{title}</p>

          <p className="text-2xl font-bold tracking-tight leading-none">{value}</p>

          {trend && (
            <div className="flex items-center text-xs text-muted-foreground gap-1">
              <TrendingUp className="w-3 h-3 text-primary" />
              <span>{trend}</span>
            </div>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="shrink-0">
          <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-primary/10">
            <Icon className="w-5 h-5 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
