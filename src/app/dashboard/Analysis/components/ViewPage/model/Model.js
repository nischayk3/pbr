import { Button, Row, Select, Col, Drawer, Steps } from "antd";
import Sider from "antd/lib/layout/Sider";
import React, { useCallback, useEffect, useState } from "react";
import { PlusOutlined, CloseOutlined, StarOutlined } from "@ant-design/icons";
import StarImg from "../../../../../../assets/icons/star.svg";
import ReactFlow, {
  addEdge,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
} from "react-flow-renderer";
import "./model.scss";
import ModalComponent from "../../../../../../components/Modal/Modal";
import panelRightImg from "../../../../../../assets/images/panel-rightIcon.svg";
import NodeDetails from "./NodeDetails";
import FeatureUnion from "./FeatureUnion";
import Transformation from "./Transformations";
import ColorSelectorNode from "./CustomNode";
import EstimatorNode from "./EstimatorNode";
import FeatureUninonNode from "./FeatureUninonNode";
import Estimator from "./Estimator";
import { getAnalyticsNodes } from "../../../../../../services/analyticsService";
const { Step } = Steps;

const Model = () => {
  const [nodesAnalytics, setNodesAnalytics] = useState([
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
      data: { label: "V467" },
      position: { x: 0, y: 80 },
    },
  ]);
  const [transformationFinal, setTransformationsFinal] = useState("");
  const [saveTransformationValues, setSaveTransformationValues] = useState({
    imputerType: "",
    transformationFinal: "",
  });
  const [imputerList, setImputerList] = useState([]);
  const [imputerType, setImputerType] = useState("");
  const [selectedImputeValue, setSelectedImputeValue] = useState("");
  const [imputerTypeList, setImputerTypeList] = useState([]);
  const [scalerList, setScalerList] = useState([]);
  const [scalerListSelected, setScalerListSelected] = useState([]);
  const [scalerAlgoValue, setScalerAlgoValue] = useState("");
  const [saveScalerAlgoValue, setSaveScalerAlgoValue] = useState("");
  const [estimatorPopupData, setEstimatorPopupData] = useState({
    algoList: [],
    regressionList: [],
    typeList: [],
  });
  const [estimatorPopupDataValues, setEstimatorPopupDataValues] = useState({
    algoValue: "",
    regressionListvalue: "",
    typeListValue: "",
    enableGrid: true,
  });
  const [savedEstimatorPopupDataValues, setSavedEstimatorPopupDataValues] =
    useState({
      algoValue: "",
      regressionListvalue: "",
      typeListValue: "",
      enableGrid: true,
    });
  const [nodes, setNodes] = useState(nodesAnalytics);
  const [nodeTypes, setNodeTypes] = useState(nodesAnalytics);
  const [edges, setEdges] = useState([]);
  const [detailsVisible, setDetailsVisible] = useState(false);
  const [type, setType] = useState("transform");
  const [selectedTargetValue, setSelectedTargetVariable] = useState("");
  const [nodeInformation, setNodeInformation] = useState();
  const [drawervisible, setDrawerVisible] = useState(false);
  const nodesNew = {
    selectorNode: (props) => (
      <ColorSelectorNode
        transformationFinal={transformationFinal}
        setTransformationsFinal={setTransformationsFinal}
        addEstimator={addEstimator}
        setImputerType={setImputerType}
        setSelectedImputeValue={setSelectedImputeValue}
        saveTransformationValues={saveTransformationValues}
        {...props}
      />
    ),
    EstimatorNode: (props) => (
      <EstimatorNode
        myProp="myProps"
        {...props}
        addEstimator={addEstimator}
        setEstimatorPopupDataValues={setEstimatorPopupDataValues}
        estimatorPopupDataValues={estimatorPopupDataValues}
        savedEstimatorPopupDataValues={savedEstimatorPopupDataValues}
      />
    ),
    FeatureUninonNode: (props) => (
      <FeatureUninonNode
        myProp="myProps"
        {...props}
        scalerAlgoValue={scalerAlgoValue}
        addEstimator={addEstimator}
        saveScalerAlgoValue={saveScalerAlgoValue}
        setScalerAlgoValue={setScalerAlgoValue}
      />
    ),
  };
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (params) => setEdges((els) => addEdge(params, els)),
    []
  );

  const onCreateClick = () => {
    setDrawerVisible(false);
    setDetailsVisible(false);
  };

  const addEstimator = (vartype) => {
    setDrawerVisible(true);
    setDetailsVisible(false);
    setType(vartype);
  };

  const getNodes = async () => {
    const reqBody = {
      batch_filter: [],
      data_filter: {
        date_range: "",
        site: "",
        unapproved_data: 1,
      },
      target_variable: "sum",
      view_disp_id: "V472",
      view_version: 1,
    };
    const Edges = [
      {
        Destination: "Scaler",
        Destination_Parameter: {
          Module: "preprocessing",
          submodule: "StandardScaler",
          type: "Scaler",
        },
        Level: 0,
        Node: "DIM_1",
        Source: "View",
        Type: "Parameter",
      },
      {
        Destination: "Imputer",
        Destination_Parameter: {
          Module: "impute",
          submodule: "SimpleImputer",
          type: "Imputer",
        },
        Level: 0,
        Node: "DIM_3",
        Source: "View",
        Type: "Parameter",
      },
      {
        Destination: "Estimator",
        Destination_Parameter: {
          Module: "ensemble",
          submodule: "RandomForestRegressor",
          type: "Regression",
        },
        Level: 0,
        Node: "DIM_2",
        Source: "View",
        Type: "Parameter",
      },
      {
        Destination: "Scaler",
        Destination_Parameter: {
          Module: "preprocessing",
          submodule: "StandardScaler",
          type: "Scaler",
        },
        Level: 3,
        Node: "Imputer",
        Source: "DIM_3",
        Type: "Imputer",
      },
      {
        Destination: "Estimator",
        Destination_Parameter: {
          Module: "ensemble",
          submodule: "RandomForestRegressor",
          type: "Regression",
        },
        Level: 4,
        Node: "Scaler",
        Source: "DIM_1",
        Type: "Scaler",
      },
      {
        Destination: "Estimator",
        Destination_Parameter: {
          Module: "ensemble",
          submodule: "RandomForestRegressor",
          type: "Regression",
        },
        Level: 4,
        Node: "Scaler",
        Source: "Imputer",
        Type: "Scaler",
      },
    ];
    const Imputers = [
      {
        module: "impute",
        submodule: "SimpleImputer",
        type: "Imputer",
      },
      {
        module: "impute",
        submodule: "KNNImputer",
        type: "Imputer",
      },
    ];
    const Scaler = [
      {
        module: "preprocessing",
        submodule: "StandardScaler",
        type: "Scaler",
      },
      {
        module: "discriminant_analysis",
        submodule: "StandardScaler",
        type: "Scaler",
      },
      {
        module: "preprocessing",
        submodule: "MinMaxScaler",
        type: "Scaler",
      },
      {
        module: "preprocessing",
        submodule: "MaxAbsScaler",
        type: "Scaler",
      },
      {
        module: "preprocessing",
        submodule: "RobustScaler",
        type: "Scaler",
      },
    ];
    const Regression = [
      {
        module: "dummy",
        submodule: "DummyRegressor",
        type: "Regression",
      },
      {
        module: "ensemble",
        submodule: "AdaBoostRegressor",
        type: "Regression",
      },
      {
        module: "ensemble",
        submodule: "BaggingRegressor",
        type: "Regression",
      },
      {
        module: "ensemble",
        submodule: "ExtraTreesRegressor",
        type: "Regression",
      },
      {
        module: "ensemble",
        submodule: "GradientBoostingRegressor",
        type: "Regression",
      },
      {
        module: "ensemble",
        submodule: "RandomForestRegressor",
        type: "Regression",
      },
      {
        module: "ensemble",
        submodule: "StackingRegressor",
        type: "Regression",
      },
      {
        module: "gaussian_process",
        submodule: "GaussianProcessRegressor",
        type: "Regression",
      },
      {
        module: "linear_model",
        submodule: "PassiveAggressiveRegressor",
        type: "Regression",
      },
      {
        module: "neighbors",
        submodule: "KNeighborsRegressor",
        type: "Regression",
      },
      {
        module: "neighbors",
        submodule: "RadiusNeighborsRegressor",
        type: "Regression",
      },
      {
        module: "neural_network",
        submodule: "MLPRegressor",
        type: "Regression",
      },
      {
        module: "svm",
        submodule: "LinearSVR",
        type: "Regression",
      },
      {
        module: "svm",
        submodule: "SVR",
        type: "Regression",
      },
      {
        module: "tree",
        submodule: "DecisionTreeRegressor",
        type: "Regression",
      },
      {
        module: "ensemble",
        submodule: "HistGradientBoostingRegressor",
        type: "Regression",
      },
      {
        module: "ensemble",
        submodule: "VotingRegressor",
        type: "Regression",
      },
      {
        module: "linear_model",
        submodule: "GammaRegressor",
        type: "Regression",
      },
      {
        module: "linear_model",
        submodule: "HuberRegressor",
        type: "Regression",
      },
      {
        module: "linear_model",
        submodule: "PoissonRegressor",
        type: "Regression",
      },
      {
        module: "linear_model",
        submodule: "QuantileRegressor",
        type: "Regression",
      },
      {
        module: "linear_model",
        submodule: "RANSACRegressor",
        type: "Regression",
      },
      {
        module: "linear_model",
        submodule: "SGDRegressor",
        type: "Regression",
      },
      {
        module: "linear_model",
        submodule: "TheilSenRegressor",
        type: "Regression",
      },
      {
        module: "linear_model",
        submodule: "TweedieRegressor",
        type: "Regression",
      },
      {
        module: "multioutput",
        submodule: "MultiOutputRegressor",
        type: "Regression",
      },
      {
        module: "multioutput",
        submodule: "RegressorChain",
        type: "Regression",
      },
      {
        module: "tree",
        submodule: "ExtraTreeRegressor",
        type: "Regression",
      },
    ];
    // const apiResponse = await getAnalyticsNodes(reqBody);
    if (Edges) {
      let parameters = [];
      let edgesConnection = [];
      let imputerConnections = [];
      let scalerConnections = [];
      let estimatorConnections = [];
      let tempScalerList = [];
      let imputerList = [];
      let tempEstAlgoList = [];
      let tempEstTypeList = [];
      let tempRegressionList = [];
      // let targetVariable = apiResponse.data?.target_variable;
      let targetVariable = "DIM_2";
      // setSelectedTargetVariable(targetVariable);
      Imputers.forEach((ele) => {
        imputerList.push(ele.submodule);
        const tempTypeList = [...imputerTypeList];
        tempTypeList.push(ele.module);
        setImputerTypeList(tempTypeList);
      });
      setImputerList(imputerList);
      Scaler.forEach((sca) => {
        tempScalerList.push(sca.submodule);
      });
      setScalerList(tempScalerList);
      Regression.forEach((regression) => {
        tempEstAlgoList.push(regression?.submodule);
        tempEstTypeList.push(regression?.type);
        tempRegressionList.push(regression?.module);
      });
      setEstimatorPopupData({
        ...estimatorPopupData,
        algoList: tempEstAlgoList,
        regressionList: [...new Set(tempRegressionList)],
        typeList: [...new Set(tempEstTypeList)],
      });
      Edges.forEach((ele, index) => {
        if (ele.Type === "Parameter") {
          parameters.push(ele);
        } else if (ele.Type === "Imputer") {
          imputerConnections.push(ele);
        } else if (ele.Type === "Scaler") {
          scalerConnections.push(ele);
        } else if (ele.Type === "Estimator") {
          estimatorConnections.push(ele);
        }
      });
      let id = 2;
      let yaxis = 30;
      const existingNodes = [...nodesAnalytics];
      parameters.forEach((element, index) => {
        if (index === 0) {
          element.id = `horizontal-2`;
          element.sourcePosition = "right";
          element.targetPosition = "left";
          element.data = {
            label: (
              <div className="node-inside">
                {console.log(targetVariable, element.Node, "nouii")}
                {String(targetVariable) === String(element.Node) && (
                  <img src={StarImg} />
                )}
                {element.Node}
              </div>
            ),
          };
          element.position = { x: 100, y: 30 };
          element.style = {
            border: "1px solid #FF4D4F",
          };
        } else {
          id = id + 1;
          yaxis = yaxis + 30;
          element.id = `horizontal-${id}`;
          element.sourcePosition = "right";
          element.targetPosition = "left";
          element.existingVariable =
            String(targetVariable) === String(element.Node) ? true : false;
          element.data = {
            label: (
              <div className="node-inside">
                {String(targetVariable) === String(element.Node) && (
                  <img src={StarImg} />
                )}
                {element.Node}
              </div>
            ),
          };
          element.position = { x: 100, y: yaxis };
          element.style = {
            border: "1px solid #FF4D4F",
          };
        }
        if (element.Source === "View") {
          edgesConnection.push(element);
        }
        existingNodes.push(element);
      });
      edgesConnection.forEach((item) => {
        item.source = "horizontal-1";
        item.target = item.id;
        item.type = "smoothstep";
        item.animated = false;
      });
      imputerConnections.forEach((imputer, index) => {
        const findObj = edgesConnection.find(
          (par) => par.Node === imputer.Source
        );
        imputer.id = `imp-${index + 1}`;
        imputer.sourcePosition = "right";
        imputer.targetPosition = "left";
        imputer.type = "selectorNode";
        imputer.style = {
          background: "#846B8A",
          padding: "8px 0px",
          width: 150,
        };
        imputer.data = JSON.parse(JSON.stringify(findObj));
        imputer.edge = {
          source: findObj.id,
          type: "smoothstep",
          animated: false,
          target: `imp-${index + 1}`,
        };
        imputer.position = { x: 200, y: 50 };
        existingNodes.push(imputer);
        edgesConnection.push(imputer.edge);
      });
      if (scalerConnections.length) {
        const tempScalerNode = {
          id: "scaler-1",
          sourcePosition: "right",
          targetPosition: "left",
          Destination: "Estimator",
          type: "FeatureUninonNode",
          style: {
            background: "#F7AF9D",
            padding: "8px 0px",
            width: 150,
            border: "none",
            borderRadius: "4px",
          },
          position: { x: 400, y: 20 },
        };
        let tempScalerSelectedValues = [];
        scalerConnections.forEach((scaler) => {
          console.log(scaler, "scaler");
          tempScalerSelectedValues.push(scaler.Source);
          if (scaler.Source === "Imputer") {
            const edge = {
              source: "imp-1",
              type: "smoothstep",
              animated: false,
              target: "scaler-1",
            };
            edgesConnection.push(edge);
          } else {
            const findObj = existingNodes.find(
              (ext) => ext.Node === scaler.Source
            );
            tempScalerNode.data = JSON.parse(JSON.stringify(findObj));
            const edge = {
              source: findObj.id,
              type: "smoothstep",
              animated: false,
              target: "scaler-1",
            };
            edgesConnection.push(edge);
          }
        });
        setScalerListSelected(tempScalerSelectedValues);
        existingNodes.push(tempScalerNode);
      }
      const tempEstNode = {
        id: "est-1",
        sourcePosition: "right",
        targetPosition: "left",
        style: {
          background: "#B3F2DD",
          border: "none",
          padding: "8px",
          borderRadius: "4px",
        },
        position: { x: 600, y: 81 },
        type: "EstimatorNode",
      };
      Edges.forEach((existing) => {
        if (existing.Destination === "Estimator") {
          tempEstNode.data = JSON.parse(JSON.stringify(existing));
          const findTempEst = existingNodes.find(
            (ele) => ele.Node === existing.Node
          );
          if (findTempEst) {
            const edge = {
              source: findTempEst.id,
              type: "smoothstep",
              animated: false,
              target: "est-1",
            };
            edgesConnection.push(edge);
          } else {
            if (scalerConnections.length) {
              const edge = {
                source: "scaler-1",
                type: "smoothstep",
                animated: false,
                target: "est-1",
              };
              edgesConnection.push(edge);
            }
          }
        }
      });
      existingNodes.push(tempEstNode);
      setEdges(edgesConnection);
      setNodesAnalytics(existingNodes);
      setNodes(existingNodes);
    }
  };

  const onNodeClick = (e, node) => {
    console.log(node, "nodeee");
    if (node.Type === "Parameter") {
      setNodeInformation(node);
      setDetailsVisible(true);
    }
  };

  useEffect(() => {
    getNodes();
  }, []);

  useEffect(() => {
    setNodeTypes(nodesNew);
  }, [drawervisible]);

  useEffect(() => {
    if (selectedTargetValue && selectedTargetValue.length >= 1) {
      const existingNodes = [...nodes];
      existingNodes.forEach((ele) => {
        if (ele.existingVariable) {
          ele.data = {
            label: <div className="node-inside">{ele.Node}</div>,
          };
        }
      });
      const findIndex = existingNodes.findIndex(
        (ele) => ele.Node === selectedTargetValue
      );
      existingNodes[findIndex].data = {
        label: (
          <div className="node-inside">
            <img src={StarImg} />
            {existingNodes[findIndex].Node}
          </div>
        ),
      };
      existingNodes[findIndex].existingVariable = true;
      setNodesAnalytics(existingNodes);
      setNodes(existingNodes);
    }
  }, [selectedTargetValue]);

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
      <div className="analysisRowContainer">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
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
            <NodeDetails
              addEstimator={addEstimator}
              nodeInformation={nodeInformation}
              setSelectedTargetVariable={setSelectedTargetVariable}
              selectedTargetValue={selectedTargetValue}
            />
          </ModalComponent>
        </ReactFlow>
        <div className="anaylsisRight">
          <div className="pbrPanel pbrRightPanel">
            <Sider
              trigger={null}
              collapsible
              collapsed={!drawervisible}
              className="drawer-d"
            >
              <span
                className="trigger"
                onClick={() => setDrawerVisible(!drawervisible)}
              >
                <img src={panelRightImg} className="panelImg" />
              </span>
              {type === "featureUnion" && drawervisible && (
                <FeatureUnion
                  onCreateClick={onCreateClick}
                  scalerList={scalerList}
                  scalerListSelected={scalerListSelected}
                  scalerAlgoValue={scalerAlgoValue}
                  setScalerAlgoValue={setScalerAlgoValue}
                  setSaveScalerAlgoValue={setSaveScalerAlgoValue}
                />
              )}
              {type === "transform" && drawervisible && (
                <Transformation
                  onCreateClick={onCreateClick}
                  imputerList={imputerList}
                  setImputerType={setImputerType}
                  imputerType={imputerType}
                  imputerTypeList={imputerTypeList}
                  transformationFinal={transformationFinal}
                  setTransformationsFinal={setTransformationsFinal}
                  selectedImputeValue={selectedImputeValue}
                  saveTransformationValues={saveTransformationValues}
                  setSaveTransformationValues={setSaveTransformationValues}
                />
              )}
              {type === "estimator" && drawervisible && (
                <Estimator
                  onCreateClick={onCreateClick}
                  estimatorPopupData={estimatorPopupData}
                  setEstimatorPopupDataValues={setEstimatorPopupDataValues}
                  estimatorPopupDataValues={estimatorPopupDataValues}
                  savedEstimatorPopupDataValues={savedEstimatorPopupDataValues}
                  setSavedEstimatorPopupDataValues={
                    setSavedEstimatorPopupDataValues
                  }
                />
              )}
            </Sider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Model;
