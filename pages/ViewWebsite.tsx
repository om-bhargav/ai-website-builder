"use client";

import React, { useEffect } from "react";
import useSWR from "swr";
import { Loader2 } from "lucide-react";

const fetcher = async (url: string) => {
  const res = await fetch(url);

  const data = await res.json();

  if (!data.success) {
    throw new Error(data.message);
  }

  return data.data;
};

type Props = {
  id: string;
  type: "website" | "template";
};

export default function ViewPage({ id, type }: Props) {
  const role = type === "template" ? "admin" : "user";
  const typePath = type === "template" ? "templates" : "websites";
  const logApi = `/api/log-website-traffic?id=${id}`;
  const api = `/api/${role}/${typePath}/${id}`;

  const { data, isLoading } = useSWR(api, fetcher);
  useEffect(() => {
    if (type === "website") {
      fetch(logApi);
    }
  }, []);
  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <Loader2 className="animate-spin" size={28} />
      </div>
    );
  }

  return (
    <iframe
      srcDoc={data?.file || ""}
      title="preview"
      className="w-screen h-screen border-0"
      sandbox="allow-scripts allow-forms"
      referrerPolicy="no-referrer"
    />
  );
}
