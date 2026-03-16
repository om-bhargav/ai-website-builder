import { Card,CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
export function MetricCard({ title, value, icon: Icon, trend }: any) {
  return (
    <Card className="rounded-2xl py-0 border shadow-sm hover:shadow-md transition-all">
      <CardContent className="p-6 flex justify-between items-center">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold tracking-tight">{value}</p>
          {trend && (
            <div className="flex items-center text-xs text-muted-foreground gap-1">
              <TrendingUp className="w-3 h-3 text-primary" /> {trend}
            </div>
          )}
        </div>
        <div className="p-3 rounded-xl bg-primary/10">
          <Icon className="w-5 h-5 text-primary" />
        </div>
      </CardContent>
    </Card>
  );
}