"use client";

import React from "react";
import useSWR from "swr";
import Image from "next/image";

import PageWrapper from "../_components/PageWrapper";

import { SITE_NAME } from "@/config";

import fetcher from "@/lib/fetcher";
import Link from "next/link";

type Website = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  views: number;
};

export default function ShowcasePage() {
  const { data, isLoading } = useSWR(
    "/api/featured-websites",
    fetcher
  );

  const websites: Website[] = data?.data || [];

  return (
    <PageWrapper
      badge="Showcase"
      title="Projects built using our platform"
      description={`Explore what creators and businesses are building with ${SITE_NAME}.`}
    >
      <div className="space-y-12">
        {/* Intro */}
        <section className="space-y-5">
          <h2 className="text-3xl font-bold">
            Designed for modern brands
          </h2>

          <p className="leading-8 text-muted-foreground">
            Thousands of creators, agencies, developers, and businesses use{" "}
            {SITE_NAME} to launch high-performance websites. From startup
            landing pages to premium portfolio experiences, our ecosystem
            supports every stage of digital growth.
          </p>

          <p className="leading-8 text-muted-foreground">
            Every showcased project demonstrates the flexibility of our
            AI-powered website generation engine and component system.
          </p>
        </section>

        {/* Showcase Grid */}
        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {isLoading
            ? Array(6)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="overflow-hidden rounded-3xl border border-border/60 bg-background animate-pulse"
                  >
                    <div className="h-52 bg-muted/40" />

                    <div className="space-y-3 p-6">
                      <div className="h-6 w-40 rounded bg-muted" />

                      <div className="space-y-2">
                        <div className="h-4 w-full rounded bg-muted" />
                        <div className="h-4 w-[80%] rounded bg-muted" />
                      </div>
                    </div>
                  </div>
                ))
            : websites.length === 0
            ? (
                <div className="col-span-full text-center py-20">
                  <p className="text-muted-foreground">
                    No featured websites found.
                  </p>
                </div>
              )
            : websites.map((website) => (
                <Link
                  key={website.id}
                  href={`/view/website/${website.id}`}
                  className="group overflow-hidden rounded-3xl border bg-sidebar transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                >
                  {/* Thumbnail */}
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={website.thumbnail}
                      alt={website.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="space-y-3 p-6">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="line-clamp-1 text-xl font-bold">
                        {website.title}
                      </h3>

                      <div className="text-xs text-muted-foreground">
                        {website.views} views
                      </div>
                    </div>

                    <p className="line-clamp-3 text-sm leading-7 text-muted-foreground">
                      {website.description}
                    </p>
                  </div>
                </Link>
              ))}
        </section>
      </div>
    </PageWrapper>
  );
}