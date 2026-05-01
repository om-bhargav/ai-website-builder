"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
export default function Page() {
  const [type, setType] = useState("");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  const handleSubmit = async () => {
    if (!type || !message) {
      alert("Please fill all required fields");
      return;
    }
    try {
      setPending(true);
      const request = await fetch("/api/user/submission", {
        method: "POST",
        body: JSON.stringify({ messageType: type, message }),
      });
      const response = await request.json();
      if (!response.success) {
        throw Error(response.message);
      }
      setType("");
      setMessage("");
      toast.success(response.message);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setPending(false);
    }
  };

  return (
    <Card className="w-full h-full bg-background/10 rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Help Desk</CardTitle>
        <CardDescription>
          Submit your query, feedback, or insights. We'll get back to you soon.
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col lg:h-[calc(100vh-270px)] gap-5">
        {/* 📌 Type Selector */}
        <div className="space-y-2">
          <Label>Type</Label>
          <Select disabled={pending} value={type} onValueChange={setType}>
            <SelectTrigger className="w-full">
              <SelectValue className="uppercase" placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem className="uppercase" value="QUERY">
                Query
              </SelectItem>
              <SelectItem className="uppercase" value="FEEDBACK">
                Feedback
              </SelectItem>
              <SelectItem className="uppercase" value="INSIGHT">
                Insight
              </SelectItem>
              <SelectItem className="uppercase" value="BUG">
                Report a Bug
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 📝 Message (fills remaining space) */}
        <div className="space-y-2 flex flex-col flex-1">
          <Label>Message</Label>
          <Textarea
            disabled={pending}
            placeholder="Write your message here..."
            className="flex-1 resize-none min-h-[120px]"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        {/* 🚀 Submit */}
        <Button disabled={pending} className="w-full mt-auto" onClick={handleSubmit}>
          {pending ? <Loader2 className="animate-spin size-4" /> : "Submit"}
        </Button>
      </CardContent>
    </Card>
  );
}
