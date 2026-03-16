"use client";
import * as React from "react";
import { InsightCard, InsightCardProps, InsightCardSkeleton } from "./_components/InsightCard";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import ErrorLoading from "@/components/ErrorLoading";
import { Select } from "@/components/ui/select";
import { SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
const TYPES = ["INSIGHT", "QUERY"];
export default function InsightsPage() {
  const [type, setType] = React.useState<string>("ALL");
  const { data, isLoading, isValidating } = useSWR("/api/admin/submissions", fetcher);
  const submissions = data?.submissions ?? [];
  const loading = isLoading || isValidating;
  const filteredSubmissions = React.useMemo(()=>{
    if(type==="ALL") return submissions;
    return submissions.filter((submission: InsightCardProps)=>{
      return submission.type===type;
    })
  },[type,submissions]);
  return (
    <div className="space-y-10 md:p-6">
      <div className="space-y-4">
        <div className="flex gap-5 flex-col md:flex-row justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Submitted Insights</h2>
            <p className="text-muted-foreground text-sm">Admin view of customer feedback.</p>
          </div>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger className="min-w-[100px]">
              <SelectValue placeholder="Select Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">ALL</SelectItem>
              {TYPES.map((type) => (
                <SelectItem value={type} key={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <ErrorLoading
          loading={loading}
          dataLength={filteredSubmissions.length}
          loadingCard={InsightCardSkeleton}
        >
          <div className="grid md:grid-cols-2 gap-6">
            {filteredSubmissions.map((item: InsightCardProps, index: number) => (
              <InsightCard key={index} {...(item as any)} />
            ))}
          </div>
        </ErrorLoading>
      </div>
    </div>
  );
}
