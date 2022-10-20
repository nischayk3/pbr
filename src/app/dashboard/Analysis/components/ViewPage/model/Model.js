import { Button, Row, Select, Col, Drawer, Steps } from "antd";
import Sider from "antd/lib/layout/Sider";
import React, { useCallback, useEffect, useRef, useState } from "react";
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
import {
  getAnalyticsNodes,
  getAnalyticsModel,
} from "../../../../../../services/analyticsService";
import { useDispatch, useSelector } from "react-redux";
import {
  hideLoader,
  showLoader,
  showNotification,
} from "../../../../../../duck/actions/commonActions";

const { Step } = Steps;

const Model = ({ finalModelJson, setFinalModelJson, editFinalJson, tableKey, modelType }) => {
  const selectedViewData = useSelector(
    (state) => state.analyticsReducer.viewData
  );
  const dispatch = useDispatch();
  const [nodesAnalytics, setNodesAnalytics] = useState([]);
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
      batch_filter: selectedViewData?.batch_filter,
      data_filter:  selectedViewData?.data_filter,
      view_disp_id: selectedViewData?.view_id,
      view_version: selectedViewData?.view_version,
      target_variable : editFinalJson?.input_data?.target_variable ? editFinalJson?.input_data?.target_variable : undefined
    };
    dispatch(showLoader());
    const apiResponse = await getAnalyticsNodes(reqBody);
    if (apiResponse.Status === 200) {
      let finalJson;
      if (editFinalJson?.pipeline_data[0].variable_mapping?.length) {
        finalJson = JSON.parse(JSON.stringify(editFinalJson?.pipeline_data[0]))
      }
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
      let targetVariable = apiResponse.data?.target_variable;
      if (finalJson?.variable_mapping?.length >=1) {
        setFinalModelJson(finalJson)
      } else {
        getModelJson(targetVariable);
      }
      setSelectedTargetVariable(targetVariable);
      apiResponse?.data?.Imputer?.forEach((ele) => {
        imputerList.push(ele.submodule);
        if (finalJson?.feature_union_mapping) {
          Object.entries(finalJson?.feature_union_mapping).forEach(([key, value]) => {
            if (value.type === "Imputer" && value.transformation === ele.submodule_key) {
              setTransformationsFinal(ele.submodule)
              setSaveTransformationValues({...saveTransformationValues, transformationFinal: ele.submodule})
            } 
          });
        }
        const tempTypeList = [...imputerTypeList];
        tempTypeList.push(ele.module);
        setImputerTypeList(tempTypeList);
      });
      setImputerList(imputerList);
      apiResponse?.data?.Scaler?.forEach((sca) => {
        tempScalerList.push(sca.submodule);
        if (finalJson?.feature_union_mapping) {
          Object.entries(finalJson?.feature_union_mapping).forEach(([key, value]) => {
           if(value.type === "Scaler" && value.transformation === sca.submodule_key) {
             setScalerAlgoValue(sca.submodule)
             setSaveScalerAlgoValue(sca.submodule)
            }
          });
        }
      });
      setScalerList([...new Set(tempScalerList)]);
      apiResponse?.data?.Edge?.forEach((ele, index) => {
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
      let existingNodes = [{
        id: "horizontal-1",
        sourcePosition: "right",
        type: "input",
        style: {
          background: "#E0EFDE",
          padding: "8px",
          border: "none",
          borderRadius: "4px",
        },
        data: { label: editFinalJson?.view_disp_id ? editFinalJson?.view_disp_id : selectedViewData?.view_id },
        position: { x: 0, y: 200 },
      },];
      parameters.forEach((element, index) => {
        if (index === 0) {
          element.id = `horizontal-2`;
          element.sourcePosition = "right";
          element.targetPosition = "left";
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
          element.position = { x: 100, y: 30 };
          element.style = {
            border:
              element?.Variable_Category === "numerical"
                ? "1px solid #4CA022"
                : "1px solid #FF4D4F",
            width: "80px",
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
            border:
              element?.Variable_Category === "numerical"
                ? "1px solid #4CA022"
                : "1px solid #FF4D4F",
            width: "80px",
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

      if (imputerConnections.length) {
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
          imputer.position = { x: 260, y: 50 };
          existingNodes.push(imputer);
          edgesConnection.push(imputer.edge);
        });
      }

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
          position: { x: 470, y: 20 },
        };
        let tempScalerSelectedValues = [];
        scalerConnections.forEach((scaler) => {
          tempScalerSelectedValues.push(scaler.Source);
          if (scaler.Source === "Imputer") {
            const findObj = existingNodes.find(
              (ext) => ext.Destination === "Scaler"
            );
            tempScalerNode.data = JSON.parse(JSON.stringify(findObj));
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
        position: { x: 700, y: 200 },
        type: "EstimatorNode",
      };
      apiResponse?.data?.Edge?.forEach((existing) => {
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
      const tempVariable = tempEstNode.data.Destination_Parameter.type === 'Regression' ? 'Regression' : 'Classification';
      modelType.current = tempVariable;
      const esttype = tempEstNode.data.Destination_Parameter.type === 'Regression' ? 'e_randomforestregressor_0' : 'e_randomforestclassifier_0';
      apiResponse?.data[`${tempVariable}`]?.forEach((regression) => {
        tempEstAlgoList.push(regression?.submodule);
        tempEstTypeList.push(regression?.type);
        tempRegressionList.push(regression?.module);
        if (finalJson?.estimator[`${esttype}`]?.model_name === regression?.submodule_key) {
          setEstimatorPopupDataValues({ ...estimatorPopupDataValues, algoValue: regression.submodule })
          setSavedEstimatorPopupDataValues({...savedEstimatorPopupDataValues, algoValue:regression.submodule})
        }
      });
      setEstimatorPopupData({
        ...estimatorPopupData,
        algoList: [...new Set(tempEstAlgoList)],
        regressionList: [...new Set(tempRegressionList)],
        typeList: [...new Set(tempEstTypeList)],
      });
      existingNodes.push(tempEstNode);
      setEdges(edgesConnection);
      setNodesAnalytics(existingNodes);
      setNodes(existingNodes);
      dispatch(hideLoader());
    } else {
      dispatch(hideLoader());
      dispatch(showNotification("error", "Unable to get model data"));
    }
  };

  const getModelJson = async (targetVariable) => {
    const reqBody = {
      batch_filter: selectedViewData?.batch_filter,
      data_filter: selectedViewData?.data_filter,
      view_disp_id: selectedViewData?.view_id,
      view_version: selectedViewData?.view_version,
      target_variable: targetVariable
    };
    dispatch(showLoader());
    const apiResponse = await getAnalyticsModel(reqBody);
    if (apiResponse.Status === 200) {
      setFinalModelJson(apiResponse.data);
      dispatch(hideLoader());
    } else {
      dispatch(hideLoader());
    }
  };

  const onNodeClick = (e, node) => {
    if (node.Type === "Parameter") {
      setNodeInformation(node);
      setDetailsVisible(true);
    }
  };

  useEffect(() => {
    getNodes();
  }, [tableKey]);

   
  useEffect(() => {
    setNodeTypes(nodesNew)
  }, [savedEstimatorPopupDataValues.algoValue])

  useEffect(() => {
    setNodeTypes(nodesNew)
  }, [saveScalerAlgoValue])

  useEffect(() => {
    setNodeTypes(nodesNew)
  }, [saveTransformationValues.transformationFinal])

  const setTargetVariable = () => {
    const existingModelJson = editFinalJson?.pipeline_data ? JSON.parse(JSON.stringify(editFinalJson?.pipeline_data[0])) : JSON.parse(JSON.stringify(finalModelJson));
    const findObj = existingModelJson?.variable_mapping?.find(
      (ele) => ele.variable_name === selectedTargetValue
    );
    let X = [];
    let Y = [];
    if (findObj) {
      existingModelJson?.variable_mapping?.forEach((model) => {
        if (model.variable_name === findObj.variable_name) {
          Y.push(model.variable_id);
        } else {
          X.push(model.variable_id);
        }
      });
      setFinalModelJson({ ...finalModelJson, X: X, Y: Y });
    }
  };

  useEffect(() => {
    if (selectedTargetValue && selectedTargetValue.length >= 1) {
      const existingNodes = [...nodes];
      existingNodes.forEach((ele) => {
        if (ele.existingVariable) {
          ele.data = {
            label: <div className="node-inside">{ele.Node}</div>,
          };
          ele.style = {
            border: "1px solid #4CA022",
            width: "80px",
          };
        }
      });
      const findIndex = existingNodes?.findIndex(
        (ele) => ele?.Node === selectedTargetValue
      );

      if (findIndex !== -1) {
        existingNodes[findIndex].data = {
          label: (
            <div className="node-inside">
              <img src={StarImg} />
              {existingNodes[findIndex]?.Node}
            </div>
          ),
        };
        existingNodes[findIndex].existingVariable = true;
        existingNodes[findIndex].style = {
          border: "1px solid #FF4D4F",
          width: "80px",
        };
      }
      setNodesAnalytics(existingNodes);
      setNodes(existingNodes);
      setTargetVariable();
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
        {nodes && nodes.length > 1 && (
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
              handleCancel={() => {
                setDetailsVisible(false);
                setNodeInformation("");
              }}
            >
              <NodeDetails
                addEstimator={addEstimator}
                nodeInformation={nodeInformation}
                setSelectedTargetVariable={setSelectedTargetVariable}
                selectedTargetValue={selectedTargetValue}
                editFinalJson={editFinalJson}
              />
            </ModalComponent>
          </ReactFlow>
        )}
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
                  finalModelJson={finalModelJson}
                  setFinalModelJson={setFinalModelJson}
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
                  finalModelJson={finalModelJson}
                  setFinalModelJson={setFinalModelJson}
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
                  finalModelJson={finalModelJson}
                  setFinalModelJson={setFinalModelJson}
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
