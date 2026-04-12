import { Button } from "@/components/ui/button";
import React from "react";
// import WebsiteCard from "./_components/WebsiteCard";
import { Search } from "lucide-react";
import {Input} from "@/components/ui/input";
import { RoadmapCard } from "./_components/RoadmapCard";
export const sampleRoadmap = {
  id: "rm_1",
  title: "Frontend Developer Roadmap",
  description:
    "Learn HTML, CSS, JavaScript, then move to React, Tailwind, and advanced concepts like performance optimization and animations.",
  created_at: "2026-04-01T10:00:00.000Z",
  updated_at: "2026-04-10T15:30:00.000Z",
}
export default function page() {
  return (
    <div className="grid gap-5 p-4">
      <div className="flex max-md:flex-col md:items-center gap-5 justify-between">
        <h2 className="text-3xl font-semibold">Manage Roadmaps</h2>
        <div className="flex max-md:flex-col gap-5 md:items-center">
          <div className="flex items-center gap-2">
            <Input placeholder="Search Roadmaps" />
            <Button variant={"secondary"}>
              <Search />
            </Button>
          </div>
          <Button>+ Create Roadmap</Button>
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {
          Array(10).fill(10).map((_,index)=><RoadmapCard data={sampleRoadmap}  key={index} index={index}/>)
        }
      </div>
    </div>
  );
}
