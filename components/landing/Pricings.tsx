"use client";

import React from "react";
import useSWR from "swr";
import { Check } from "lucide-react";
import Link from "next/link";

const defaultPlans = [
  {
    title: "Starter",
    price: "₹149",

    description: "Perfect for creators and individuals launching their first AI-powered website.",

    features: [
      "1 AI Generated Website",
      "Modern Responsive Layouts",
      "Basic Website Hosting",
      "Live Website Preview",
      "Community Support",
    ],
  },

  {
    title: "Creator Pro",
    price: "₹499",

    description: "Built for freelancers, developers, and startups scaling faster with AI.",

    features: [
      "5 AI Website Generations",
      "Advanced Prompt Editing",
      "Templates + Website Builder",
      "Custom Domains",
      "Priority AI Generation",
      "Analytics Dashboard",
      "Priority Support",
    ],

    highlighted: true,
  },

  {
    title: "Business",
    price: "₹1599",

    description: "Enterprise-grade website generation and collaboration tools for teams.",

    features: [
      "Team Collaboration",
      "Admin Dashboard",
      "Advanced Analytics",
      "Custom Branding",
      "Dedicated Infrastructure",
      "24/7 Premium Support",
      "Early Access Features",
    ],
  },
];

type Plan = {
  id: string;
  title: string;
  description: string;
  price: number;
  featured: boolean;
};

const fetcher = async (url: string) => {
  const res = await fetch(url);

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Failed to fetch plans");
  }

  return data;
};

function Pricings() {
  const { data, isLoading } = useSWR("/api/featured-plans", fetcher);

  const fetchedPlans: Plan[] = data?.data || [];

  // use API plans if available otherwise fallback
  const plansToRender =
    fetchedPlans.length > 0
      ? fetchedPlans.map((plan, idx) => ({
          title: plan.title,
          price: `$${plan.price}`,
          description: plan.description,

          features: [
            "Premium Features Included",
            "AI Website Generation",
            "Responsive Layouts",
            "Modern UI Components",
          ],

          highlighted: idx === 1,
        }))
      : defaultPlans;

  return (
    <div id="pricing" className="container w-full mx-auto p-5">
      {/* Heading */}
      <div className="text-3xl font-semibold">
        <h2 className="flex items-center text-3xl font-bold mb-2">
          <span className="w-3 h-7 bg-gradient-to-b from-purple-500 to-indigo-500 rounded mr-2"></span>
          Pricing Plans
        </h2>

        <p className="text-sm text-muted-foreground mt-2">
          Flexible pricing designed for creators, startups, and enterprises.
        </p>
      </div>

      {/* Grid */}
      <div className="grid lg:grid-cols-3 gap-5 mt-8">
        {isLoading
          ? Array(3)
              .fill(0)
              .map((_, idx) => (
                <div key={idx} className="rounded-xl border bg-sidebar p-8 animate-pulse">
                  <div className="h-8 w-32 rounded bg-muted mb-5" />

                  <div className="h-10 w-24 rounded bg-muted mb-6" />

                  <div className="space-y-3">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <div key={i} className="h-4 w-full rounded bg-muted" />
                      ))}
                  </div>

                  <div className="h-10 rounded bg-muted mt-8" />
                </div>
              ))
          : plansToRender.map((plan, idx) => (
              <div
                key={idx}
                className={`group relative rounded-xl p-[1px] transition-transform duration-300 hover:scale-[1.01] ${
                  plan.highlighted
                    ? "bg-gradient-to-r from-primary to-purple-500"
                    : "bg-gradient-to-r from-primary/20 to-primary/5"
                }`}
              >
                <div className="flex h-full flex-col rounded-xl bg-sidebar p-8">
                  {/* Badge */}
                  {plan.highlighted && (
                    <div className="mb-4 w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      Most Popular
                    </div>
                  )}

                  {/* Title */}
                  <h3 className="mb-2 text-2xl font-semibold text-foreground">{plan.title}</h3>

                  {/* Description */}
                  <p className="mb-6 text-sm text-muted-foreground leading-7">{plan.description}</p>

                  {/* Price */}
                  <p className="mb-6 text-4xl font-bold text-foreground">{plan.price}</p>

                  {/* Features */}
                  <ul className="mb-6 flex-1 space-y-3 text-sm text-muted-foreground">
                    {plan.features.map((feature, fidx) => (
                      <li key={fidx} className="flex items-center gap-3">
                        <Check className="h-4 w-4 text-primary" />

                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Link href={"/sign-in"}>
                  <button className="mt-auto rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition hover:bg-primary/90">
                    Get Started
                  </button>
                  </Link>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default Pricings;
