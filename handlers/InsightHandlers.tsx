"use client";
import React from "react";
import toast from "react-hot-toast";
const insights = [
  {
    name: "Aarav Sharma",
    pno: "9876543210",
    city: "Mumbai",
    msg: "Looking for more details about your services.",
    email: "aarav.sharma@example.com",
  },
  {
    name: "Priya Verma",
    pno: "9123456789",
    city: "Delhi",
    msg: "Please contact me regarding pricing.",
    email: "priya.verma@example.com",
  },
  {
    name: "Rohan Mehta",
    pno: "9988776655",
    city: "Ahmedabad",
    msg: "Interested in collaboration opportunities.",
    email: "rohan.mehta@example.com",
  },
  {
    name: "Neha Kapoor",
    pno: "9090909090",
    city: "Bengaluru",
    msg: "Need support with account setup.",
    email: "neha.kapoor@example.com",
  },
  {
    name: "Kunal Singh",
    pno: "9012345678",
    city: "Pune",
    msg: "Requesting a demo session.",
    email: "kunal.singh@example.com",
  },
];

const createInsight = (e: any, value: string) => {};

export { createInsight };

const ListInsights = async () => {
  return insights;
};

export { ListInsights };
