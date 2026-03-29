import { Button } from "@/components/ui/button";
import React from "react";
import UserCard from "./_components/UserCard";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function page() {
  return (
    <div className="grid gap-5 p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-semibold">Manage Users</h2>
          <div className="flex items-center gap-2">
            <Input placeholder="Search Users" />
            <Button variant={"secondary"}>
              <Search />
            </Button>
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {
          Array(10).fill(null).map((_,index)=><UserCard key={index} index={index}/>)
        }
      </div>
    </div>
  );
}
