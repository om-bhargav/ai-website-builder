"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Clipboard, ExternalLink, Loader2, Send } from "lucide-react";
import useGoBack from "@/hooks/useGoBack";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
type Status = "DRAFT" | "UNDER_DEVELOPMENT" | "PUBLISHED";

interface Props {
  id: string;
  type: "website" | "template";
}

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export default function EditorPage({ id, type }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [prompt, setPrompt] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [status, setStatus] = useState<Status>("DRAFT");

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const goBack = useGoBack();

  const role = type === "template" ? "admin" : "user";
  const typePath = type === "template" ? "templates" : "websites";

  // =========================
  // FETCH PAGE DATA
  // =========================
  const fetchPage = async () => {
    try {
      setPageLoading(true);

      const res = await fetch(`/api/${role}/${typePath}/${id}`);

      const data = await res.json();

      if (!data.success) {
        toast.error(data.message);
        return;
      }

      const item = data.data;

      setGeneratedCode(item.file || "");
      setStatus(item.status || "DRAFT");

      // optional if you save chats in DB
      if (item.messages) {
        setMessages(item.messages);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setPageLoading(false);
    }
  };

  useEffect(() => {
    fetchPage();
  }, [id]);

  // =========================
  // GENERATE WEBSITE
  // =========================
  const sendMessage = async () => {
    if (!prompt.trim() || loading) return;

    const userPrompt = prompt;

    const updatedMessages: ChatMessage[] = [
      ...messages,
      {
        role: "user",
        content: userPrompt,
      },
    ];

    setMessages(updatedMessages);
    setPrompt("");

    try {
      setLoading(true);

      // set status developing
      await fetch(`/api/${role}/${typePath}/${id}`, {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          status: "UNDER_DEVELOPMENT",
        }),
      });

      setStatus("UNDER_DEVELOPMENT");

      // AI request
      const res = await fetch("/api/user/generate-ai-code", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          type,
          id,
          prompt: userPrompt,
          messages: updatedMessages,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message);
      }

      const file = data.data.file;

      setGeneratedCode(file);

      // save generated file + chats
      await fetch(`/api/${role}/${typePath}/${id}`, {
        method: "PATCH",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          file,
          status: "PUBLISHED",
          messages: updatedMessages,
        }),
      });

      setStatus("PUBLISHED");

      toast.success("Website generated");
    } catch (error: any) {
      toast.error(error.message);

      setStatus("DRAFT");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 h-full px-2 gap-3">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <Button onClick={goBack} className="self-start">
          <ArrowLeft />
          Back
        </Button>

        <div className="text-xs px-3 py-1 rounded-full border">
          Status: {status.replace("_", " ")}
        </div>
      </div>

      <div className="flex-1 h-full w-full grid grid-cols-1 lg:grid-cols-5 gap-3 overflow-hidden">
        {/* ================= LEFT PANEL ================= */}
        <div className="lg:col-span-2 flex flex-col border border-border/60 rounded-3xl bg-gradient-to-b from-background to-muted/20 overflow-hidden h-full shadow-xl backdrop-blur">
          {/* HEADER */}
          <div className="relative border-b px-5 py-4 bg-background/70 backdrop-blur">
            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/5 pointer-events-none" />

            <div className="relative flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold tracking-tight flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  AI Website Builder
                </h2>

                <p className="text-xs text-muted-foreground mt-1">
                  Describe your idea and generate live UI instantly
                </p>
              </div>

              {/* STATUS */}
              <div className="px-3 py-1 rounded-full border bg-muted/50 text-[11px] font-medium">
                {status.replace("_", " ")}
              </div>
            </div>
          </div>

          {/* MESSAGES */}
          <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4 scrollbar-thin">
            {pageLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="flex flex-col items-center gap-3 text-muted-foreground">
                  <Loader2 className="animate-spin" size={24} />
                  <p className="text-xs">Loading conversation...</p>
                </div>
              </div>
            ) : messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center px-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  <Send className="text-primary" size={22} />
                </div>

                <h3 className="font-medium text-sm">Start Building</h3>

                <p className="text-xs text-muted-foreground mt-2 leading-relaxed max-w-xs">
                  Try prompts like:
                  <br />
                  “Build a SaaS landing page”
                  <br />
                  “Create a modern portfolio”
                </p>
              </div>
            ) : (
              messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`
              relative max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm
              ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "bg-muted border rounded-bl-md"
              }
            `}
                  >
                    <p className="whitespace-pre-wrap leading-relaxed">{msg.content}</p>

                    <div
                      className={`
                text-[10px] mt-2 opacity-60
                ${msg.role === "user" ? "text-right" : "text-left"}
              `}
                    >
                      {msg.role === "user" ? "You" : "AI"}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* INPUT */}
          <div className="border-t bg-background/80 backdrop-blur p-3">
            <div className="flex items-end gap-2 rounded-2xl border bg-background p-2 shadow-sm">
              <Input
                value={prompt}
                disabled={loading}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Create a futuristic dashboard with charts..."
                className="border-0 shadow-none focus-visible:ring-0 bg-transparent"
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              />

              <Button
                onClick={sendMessage}
                size="sm"
                disabled={loading}
                className="rounded-xl px-4 h-9"
              >
                {loading ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
              </Button>
            </div>

            {/* SUGGESTIONS */}
            <div className="flex flex-wrap gap-2 mt-3">
              {["SaaS Landing Page", "Developer Portfolio", "AI Dashboard", "E-commerce UI"].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() => setPrompt(item)}
                    className="text-[11px] px-3 py-1 rounded-full border hover:bg-muted transition"
                  >
                    {item}
                  </button>
                ),
              )}
            </div>
          </div>
        </div>

        {/* ================= RIGHT PANEL ================= */}
        <div className="lg:col-span-3 border rounded-xl bg-background/30 overflow-hidden flex flex-col h-full">
          <Tabs defaultValue="web" className="flex flex-col h-full">
            {/* Tabs */}
            <div className="border-b p-2 flex items-center justify-between">
              <TabsList className="h-8">
                <TabsTrigger value="web" className="text-xs">
                  Web View
                </TabsTrigger>

                <TabsTrigger value="code" className="text-xs">
                  Code View
                </TabsTrigger>
              </TabsList>

              {/* PREVIEW BUTTON */}
              <Button
                size="sm"
                variant="outline"
                className="gap-1"
                disabled={!generatedCode}
                onClick={() => {
                  const newTab = window.open();

                  if (newTab) {
                    newTab.document.write(generatedCode);
                    newTab.document.close();
                  }
                }}
              >
                <ExternalLink size={14} />
                Preview in New Tab
              </Button>
            </div>

            {/* WEB VIEW */}
            <TabsContent value="web" className="flex-1 p-2">
              <Card className="h-full overflow-hidden py-0 relative">
                {/* LOADING OVERLAY */}
                {loading && (
                  <div className="absolute inset-0 z-20 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-full border-4 border-primary/20" />

                      <div className="absolute inset-0 w-14 h-14 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                    </div>

                    <div className="text-center">
                      <h3 className="text-sm font-medium">Generating {type}</h3>

                      <p className="text-xs text-muted-foreground mt-1">
                        AI is building your preview...
                      </p>
                    </div>
                  </div>
                )}

                {/* IFRAME */}
                {generatedCode ? (
                  <iframe
                    srcDoc={generatedCode}
                    title="Website Preview"
                    className="w-full h-full border-0"
                    sandbox="allow-scripts allow-forms"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-sm text-muted-foreground">Live Website Preview</p>
                  </div>
                )}
              </Card>
            </TabsContent>

            {/* CODE VIEW */}
            <TabsContent value="code" className="flex-1 overflow-y-auto p-2">
              <Card className="h-full relative p-4 overflow-y-auto">
                <Button variant={"ghost"} className="absolute top-2 right-2" size={"icon"}><Clipboard/></Button>
                <pre className="text-xs whitespace-pre-wrap">
                  <code>{generatedCode || "Generated HTML code will appear here..."}</code>
                </pre>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
