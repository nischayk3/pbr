import React, { useCallback } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
} from "react-flow-renderer";
import "./model.scss";

const initialNodes = [
  {
    id: "horizontal-1",
    sourcePosition: "right",
    type: "input",
    data: { label: "Input" },
    position: { x: 0, y: 80 },
  },
  {
    id: "horizontal-2",
    sourcePosition: "right",
    targetPosition: "left",
    data: { label: "A Node" },
    position: { x: 100, y: 0 },
  },
  {
    id: "horizontal-3",
    sourcePosition: "right",
    targetPosition: "left",
    data: { label: "Node 3" },
    position: { x: 100, y: 150 },
  },
  {
    id: "horizontal-4",
    sourcePosition: "right",
    targetPosition: "left",
    type: "selectorNode",
    style: {
      width: "150px",
      background: "#846B8A",
      // padding: "10px 0px",
    },
    data: { label: "Node 4" },
    position: { x: 300, y: 0 },
  },
  {
    id: "horizontal-5",
    sourcePosition: "right",
    targetPosition: "left",
    data: { label: "Node 5" },
    position: { x: 100, y: 30 },
  },
  {
    id: "horizontal-6",
    sourcePosition: "right",
    targetPosition: "left",
    data: { label: "Node 6" },
    position: { x: 100, y: 60 },
  },
  {
    id: "horizontal-8",
    sourcePosition: "right",
    targetPosition: "left",
    data: { label: "Node 8" },
    position: { x: 100, y: 90 },
  },
  {
    id: "horizontal-9",
    sourcePosition: "right",
    targetPosition: "left",
    data: { label: "Node 9" },
    position: { x: 100, y: 120 },
  },
  {
    id: "horizontal-7",
    sourcePosition: "right",
    targetPosition: "left",
    data: { label: "final" },
    position: { x: 550, y: 80 },
  },
];

const initialEdges = [
  {
    id: "horizontal-e1-2",
    source: "horizontal-1",
    type: "smoothstep",
    target: "horizontal-2",
    animated: true,
  },
  {
    id: "horizontal-e1-3",
    source: "horizontal-1",
    type: "smoothstep",
    target: "horizontal-3",
    animated: true,
  },
  {
    id: "horizontal-e1-4",
    source: "horizontal-2",
    type: "smoothstep",
    target: "horizontal-4",
    animated: true,
  },
  {
    id: "horizontal-e1-5",
    source: "horizontal-1",
    type: "smoothstep",
    target: "horizontal-5",
    animated: true,
  },
  {
    id: "horizontal-e5-7",
    source: "horizontal-5",
    type: "smoothstep",
    target: "horizontal-7",
    animated: true,
  },
  {
    id: "horizontal-e1-6",
    source: "horizontal-1",
    type: "smoothstep",
    target: "horizontal-6",
    animated: true,
  },
  {
    id: "horizontal-e6-7",
    source: "horizontal-6",
    type: "smoothstep",
    target: "horizontal-7",
    animated: true,
  },
  {
    id: "horizontal-e3-7",
    source: "horizontal-3",
    type: "smoothstep",
    target: "horizontal-7",
    animated: true,
  },
  {
    id: "horizontal-e4-7",
    source: "horizontal-4",
    type: "smoothstep",
    target: "horizontal-7",
    animated: true,
  },
  {
    id: "horizontal-e1-8",
    source: "horizontal-1",
    type: "smoothstep",
    target: "horizontal-8",
    animated: true,
  },
  {
    id: "horizontal-e1-9",
    source: "horizontal-1",
    type: "smoothstep",
    target: "horizontal-9",
    animated: true,
  },
  {
    id: "horizontal-e9-7",
    source: "horizontal-9",
    type: "smoothstep",
    target: "horizontal-7",
    animated: true,
  },
  {
    id: "horizontal-e8-7",
    source: "horizontal-8",
    type: "smoothstep",
    target: "horizontal-7",
    animated: true,
  },
];

const Model = () => {
  const [nodes, _, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect = useCallback(
    (params) => setEdges((els) => addEdge(params, els)),
    []
  );

  return (
    <div className="model-container">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        attributionPosition="bottom-left"
      ></ReactFlow>
    </div>
  );
};

export default Model;
