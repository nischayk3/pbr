import { Button, Row, Select, Col, Drawer, Steps } from "antd";
import React, { useCallback, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Background,
} from "react-flow-renderer";
import "./model.scss";
import ModalComponent from "../../../../../../components/Modal/Modal";
import NodeDetails from "./NodeDetails";
import FeatureUnion from "./FeatureUnion";
import Transformation from "./Transformations";
import Estimator from "./Estimator";
const { Step } = Steps;
const initialNodes = [
  {
    id: "horizontal-1",
    sourcePosition: "right",
    type: "input",
    style: {
      background: "#E0EFDE",
      padding: "8px",
      border: "none",
      borderRadius: "4px",
    },
    data: { label: "V8" },
    position: { x: 0, y: 80 },
  },
  {
    id: "horizontal-2",
    sourcePosition: "right",
    targetPosition: "left",
    data: { label: "LS_S0_0" },
    style: {
      border: "1px solid #FF4D4F",
    },
    position: { x: 100, y: 0 },
  },
  {
    id: "horizontal-3",
    sourcePosition: "right",
    targetPosition: "left",
    data: { label: "LS_S0_1" },
    position: { x: 100, y: 150 },
    style: {
      border: "1px solid #FF4D4F",
    },
  },
  {
    id: "horizontal-4",
    sourcePosition: "right",
    targetPosition: "left",
    type: "selectorNode",
    style: {
      width: "150px",
      background: "#846B8A",
      padding: "8px 0px",
    },
    data: { label: "Simple Imputer" },
    position: { x: 300, y: 0 },
  },
  {
    id: "horizontal-5",
    sourcePosition: "right",
    targetPosition: "left",
    data: { label: "LS_S0_2" },
    style: {
      border: "1px solid #FF4D4F",
    },
    position: { x: 100, y: 30 },
  },
  {
    id: "horizontal-6",
    sourcePosition: "right",
    targetPosition: "left",
    data: { label: "LS_S0_3" },
    style: {
      border: "1px solid #4CA022",
    },
    position: { x: 100, y: 60 },
  },
  {
    id: "horizontal-8",
    sourcePosition: "right",
    targetPosition: "left",
    data: { label: "LS_S0_4" },
    style: {
      border: "1px solid #4CA022",
    },
    position: { x: 100, y: 90 },
  },
  {
    id: "horizontal-9",
    sourcePosition: "right",
    targetPosition: "left",
    data: { label: "LS_S0_5" },
    style: {
      border: "1px solid #4CA022",
    },
    position: { x: 100, y: 120 },
  },
  {
    id: "horizontal-7",
    sourcePosition: "right",
    targetPosition: "left",
    style: { background: "#B3F2DD", border: "none" },
    data: { label: "Select Estimator" },
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
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [type, setType] = useState("");
  const [drawervisible, setDrawerVisible] = useState(false);
  const onConnect = useCallback(
    (params) => setEdges((els) => addEdge(params, els)),
    []
  );

  const onCreateClick = () => {
    setDrawerVisible(false);
    setDetailsVisible(false);
  };
  const getTitle = () => {
    let title = "";
    if (type === "featureUnion") {
      title = "Feature union - New";
    } else if (type === "transform") {
      title = "Transformation - New";
    } else if (type === "estimator") {
      title = "Estimator";
    }

    return title;
  };
  const addEstimator = (vartype) => {
    setDrawerVisible(true);
    setDetailsVisible(false);
    setType(vartype);
  };
  return (
    <div className="model-container">
      <Row className="operation-row" gutter={24}>
        <Col span="3">
          <Button
            className="custom-primary-btn"
            onClick={() => addEstimator("estimator")}
          >
            <PlusOutlined /> Add estimators
          </Button>
        </Col>
        <Col span="4">
          <Button
            className="custom-primary-btn"
            onClick={() => addEstimator("featureUnion")}
          >
            <PlusOutlined /> Create feature union
          </Button>
        </Col>
        <Col span="3" className="select-flex ml">
          View
          <Select />
        </Col>
        <Col span="3" className="select-flex">
          Show
          <Select />
        </Col>
        <Col span="11" className="title-legends">
          <dl>
            <dt className="pink"></dt>
            <dd>Categorical</dd>
            <dt className="green"></dt>
            <dd>Numerical</dd>
            <dt className="violet"></dt>
            <dd>Transformations</dd>
            <dt className="cream"></dt>
            <dd>Feature union</dd>
            <dt className="lightGreen"></dt>
            <dd>Estimator</dd>
          </dl>
        </Col>
      </Row>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        onNodeClick={() => setDetailsVisible(true)}
        // attributionPosition="top-left"
      >
        <Background variant="dots" gap={25} size={0.3} color="#313131" />
        <ModalComponent
          isModalVisible={detailsVisible}
          width="800px"
          title="Details"
          centered={true}
          handleCancel={() => setDetailsVisible(false)}
        >
          <NodeDetails addEstimator={addEstimator} />
        </ModalComponent>
      </ReactFlow>
      <Drawer
        placement="right"
        visible={drawervisible}
        closable={false}
        className="drawer-d"
        title={getTitle()}
        onClose={() => setDrawerVisible(false)}
      >
        {type === "featureUnion" && (
          <FeatureUnion onCreateClick={onCreateClick} />
        )}
        {type === "transform" && (
          <Transformation onCreateClick={onCreateClick} />
        )}
        {type === "estimator" && <Estimator />}
      </Drawer>
    </div>
  );
};

export default Model;
