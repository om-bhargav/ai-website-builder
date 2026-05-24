import { Card,CardHeader,CardTitle,CardContent } from "@/components/ui/card";
export function ActivityCard({ title, children }: any) {
  return (
    <Card className="rounded-2xl border shadow-sm">
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  );
}