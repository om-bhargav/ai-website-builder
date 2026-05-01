"use client";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

type Props = {
  loading?: boolean;
  text?: string;
  className?: string;
};

export function AppSubmit({
  loading = false,
  text = "Submit",
  className = ""
}: Props) {
  return (
    <Button type="submit" disabled={loading}>
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait...
        </>
      ) : (
        text
      )}
    </Button>
  );
}