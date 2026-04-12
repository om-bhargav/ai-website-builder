import { Button } from "@/components/ui/button";
import React from "react";
import WebsiteCard from "./_components/WebsiteCard";
import { Search } from "lucide-react";
import {Input} from "@/components/ui/input";

export default function page() {
  return (
    <div className="grid gap-5 p-4">
      <div className="flex max-md:flex-col md:items-center gap-5 justify-between">
        <h2 className="text-3xl font-semibold">Manage Websites</h2>
        <div className="flex max-md:flex-col gap-5 md:items-center">
          <div className="flex items-center gap-2">
            <Input placeholder="Search Websites" />
            <Button variant={"secondary"}>
              <Search />
            </Button>
          </div>
          <Button>+ Create Website</Button>
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {
          Array(10).fill(10).map((_,index)=><WebsiteCard key={index} index={index}/>)
        }
      </div>
    </div>
  );
}
