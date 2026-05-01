"use client";

import React, { useState } from "react";
import { ReactFlow, ReactFlowProvider, Background, Controls, MiniMap } from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Save } from "lucide-react";

export default function Page() {
  return (
    <ReactFlowProvider>
      <Roadmap />
    </ReactFlowProvider>
  );
}

function Roadmap() {
  const [nodes, setNodes] = useState([
    {
      id: "1",
      position: { x: 100, y: 100 },
      data: { label: "Start" },
    },
  ]);

  const [edges, setEdges] = useState([]);

  const addNode = () => {
    setNodes((prev) => [
      ...prev,
      {
        id: `${prev.length + 1}`,
        position: {
          x: Math.random() * 400,
          y: Math.random() * 400,
        },
        data: { label: `Step ${prev.length + 1}` },
      },
    ]);
  };

  return (
    <div className="w-full h-full flex flex-col gap-4 p-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <h1 className="text-2xl font-semibold">Roadmap Builder</h1>

        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" onClick={addNode}>
            <Plus size={16} />
            Add Node
          </Button>

          <Button className="gap-2">
            <Save size={16} />
            Save
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-4 overflow-hidden">
        {/* Sidebar */}
        <Card className="hidden py-0 lg:flex flex-col">
          <CardContent className="p-4 space-y-3">
            <h2 className="font-medium text-lg">Tools</h2>

            <Button variant="outline" className="w-full justify-start">
              Add Step
            </Button>

            <Button variant="outline" className="w-full justify-start">
              Add Decision
            </Button>

            <Button variant="outline" className="w-full justify-start">
              Add Milestone
            </Button>
          </CardContent>
        </Card>

        {/* Canvas */}
        <div className="lg:col-span-3 h-full w-full">
          <Card className="h-full py-0 overflow-hidden">
            <CardContent className="p-0 h-full">
              <div className="h-[70vh] md:h-[75vh] lg:h-full w-full">
                <ReactFlow
                  nodes={nodes}
                  edges={edges}
                  fitView
                  colorMode="system"
                  className="bg-background"
                >
                  <MiniMap />
                  <Controls />
                  <Background gap={12} size={1} />
                </ReactFlow>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
