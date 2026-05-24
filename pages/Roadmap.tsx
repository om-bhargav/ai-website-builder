"use client";
import { useCallback, useEffect, useMemo, useState, useTransition } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  Connection,
  Edge,
  Node,
  useEdgesState,
  useNodesState,
  Handle,
  Position,
  NodeProps,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Plus, Save, Trash2, LayoutPanelTop, FileText, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import useGoBack from "@/hooks/useGoBack";
type RoadmapNodeData = {
  label: string;
  type: "website" | "section" | "page";
  undeletable?: boolean;
};

function EditableNode({ id, data, selected }: NodeProps<Node<RoadmapNodeData>>) {
  return (
    <div
      className={`
        min-w-[220px]
        rounded-2xl
        border
        bg-background
        shadow-sm
        transition-all
        ${selected ? "border-primary ring-2 ring-primary/20" : "border-border"}
      `}
    >
      <Handle type="target" position={Position.Top} />

      <div className="border-b border-border px-4 py-2">
        <div className="flex items-center justify-between gap-2">
          <span
            className={`
              text-xs font-medium uppercase tracking-wide
              ${
                data.type === "website"
                  ? "text-primary"
                  : data.type === "section"
                    ? "text-orange-500"
                    : "text-emerald-500"
              }
            `}
          >
            {data.type}
          </span>

          {data.undeletable && <span className="text-[10px] text-muted-foreground">Root</span>}
        </div>
      </div>

      <div className="p-4">
        <input
          defaultValue={data.label}
          onChange={(e) => {
            data.label = e.target.value;
          }}
          className="
            w-full
            bg-transparent
            outline-none
            text-sm
            font-medium
            text-foreground
          "
        />
      </div>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export default function Roadmap({ id }: { id: string }) {
  const router = useRouter();
  const initialNodes: Node<RoadmapNodeData>[] = [
    {
      id: "website",
      type: "editableNode",
      position: { x: 300, y: 100 },
      data: {
        label: "Website",
        type: "website",
        undeletable: true,
      },
    },
  ];
  const fetchData = async () => {
    try {
      const req = await fetch(`/api/user/roadmaps/${id}`);
      const res = await req.json();
      if (!res.success) {
        throw Error(res.message);
      }
      const roadmap = res?.data ?? {};
      setNodes(roadmap.nodes || initialNodes);
      setEdges(roadmap.edges || []);
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [locked, setLocked] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const nodeTypes = useMemo(
    () => ({
      editableNode: EditableNode,
    }),
    [],
  );

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            animated: true,
          },
          eds,
        ),
      );
    },
    [setEdges],
  );

  const addSection = () => {
    const id = crypto.randomUUID();

    const parent = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    const newNode: Node<RoadmapNodeData> = {
      id,
      type: "editableNode",
      position: {
        x: parent.position.x - 250 + Math.random() * 500,
        y: parent.position.y + 180,
      },
      data: {
        label: "New Section",
        type: "section",
      },
    };

    setNodes((nds) => [...nds, newNode]);
    setEdges((eds) => [
      ...eds,
      {
        id: `${parent.id}-${id}`,
        source: parent.id,
        target: id,
        animated: true,
      },
    ]);
  };

  const addPage = () => {
    if (!selectedNodeId) return;

    const parent = nodes.find((node) => node.id === selectedNodeId);

    if (!parent) return;

    const id = crypto.randomUUID();

    const newNode: Node<RoadmapNodeData> = {
      id,
      type: "editableNode",
      position: {
        x: parent.position.x - 150 + Math.random() * 300,
        y: parent.position.y + 180,
      },
      data: {
        label: "New Page",
        type: "page",
      },
    };

    setNodes((nds) => [...nds, newNode]);

    setEdges((eds) => [
      ...eds,
      {
        id: `${parent.id}-${id}`,
        source: parent.id,
        target: id,
        animated: true,
      },
    ]);
  };

  const deleteNode = () => {
    if (!selectedNodeId) return;

    const node = nodes.find((node) => node.id === selectedNodeId);

    if (!node || node.data.undeletable) return;

    setNodes((nds) => nds.filter((node) => node.id !== selectedNodeId));

    setEdges((eds) =>
      eds.filter((edge) => edge.source !== selectedNodeId && edge.target !== selectedNodeId),
    );

    setSelectedNodeId(null);
  };

  const saveRoadmap = async () => {
    const roadmap = {
      nodes,
      edges,
    };
    startTransition(async () => {
      try {
        const req = await fetch(`/api/user/roadmaps/${id}`, {
          method: "PATCH",
          body: JSON.stringify(roadmap),
        });
        const res = await req.json();
        if (!res.success) {
          throw Error(res.message);
        }
        toast.success(res.message);
        router.push("/panel/roadmaps");
      } catch (error: any) {
        toast.error(error.message);
      }
    });
  };
  const goBack = useGoBack();
  return (
    <div className="h-full flex-1 w-full overflow-hidden bg-muted/20">
      <div className="flex h-full flex-col gap-4 p-4">
        {/* Header */}
        <Button onClick={goBack} variant={"outline"} className="self-start">
          <ArrowLeft /> Back
        </Button>
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Website Roadmap Builder</h1>

            <p className="text-sm text-muted-foreground">
              Create website structures visually with sections & pages.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="gap-2" onClick={addSection}>
              <LayoutPanelTop size={16} />
              Add Section
            </Button>

            <Button
              variant="outline"
              className="gap-2"
              onClick={addPage}
              disabled={!selectedNodeId}
            >
              <FileText size={16} />
              Add Page
            </Button>

            <Button
              variant="destructive"
              className="gap-2"
              onClick={deleteNode}
              disabled={
                !selectedNodeId ||
                nodes.find((node) => node.id === selectedNodeId && node.data.undeletable)
                  ? true
                  : false
              }
            >
              <Trash2 size={16} />
              Delete
            </Button>

            <Button className="gap-2" disabled={pending} onClick={saveRoadmap}>
              <Save size={16} />
              Save
            </Button>
          </div>
        </div>

        {/* Main */}
        <div className="grid flex-1 grid-cols-1 gap-4 overflow-hidden lg:grid-cols-4">
          {/* Sidebar */}
          <Card className="hidden overflow-hidden border lg:flex">
            <CardContent className="flex h-full flex-col gap-4 p-4">
              <div>
                <h2 className="text-lg font-semibold">Selected Node</h2>

                <p className="text-sm text-muted-foreground">Click any node to manage it.</p>
              </div>

              {selectedNodeId ? (
                <div className="space-y-2 rounded-xl border p-3">
                  <p className="text-sm font-medium">
                    {nodes.find((n) => n.id === selectedNodeId)?.data.label}
                  </p>

                  <p className="text-xs text-muted-foreground capitalize">
                    {nodes.find((n) => n.id === selectedNodeId)?.data.type}
                  </p>
                </div>
              ) : (
                <div className="rounded-xl border border-dashed p-4 text-sm text-muted-foreground">
                  No node selected
                </div>
              )}

              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start" onClick={addSection}>
                  Add Section
                </Button>

                <Button variant="outline" className="w-full justify-start" onClick={addPage}>
                  Add Page
                </Button>

                <Button variant="destructive" className="w-full justify-start" onClick={deleteNode}>
                  Delete Selected
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Canvas */}
          <Card className="lg:col-span-3 overflow-hidden border py-0">
            <CardContent className="h-full p-0">
              <div className="h-[75vh] w-full lg:h-full">
                <ReactFlow
                  nodes={nodes}
                  edges={edges}
                  nodeTypes={nodeTypes}
                  onNodesChange={onNodesChange}
                  onEdgesChange={onEdgesChange}
                  onConnect={onConnect}
                  onNodeClick={(_, node) => setSelectedNodeId(node.id)}
                  fitView
                  colorMode="system"
                  className="bg-background"
                >
                  <MiniMap zoomable pannable />
                  <Controls />
                  <Background gap={20} size={1} />
                </ReactFlow>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
