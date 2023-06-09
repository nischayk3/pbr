/**
 * @author Mihir Bagga <mihir.bagga@mareana.com>
 * @Mareana - CPV Product
 * @version 2
 * @Last Modified - 17 April, 2023
 * @Last Changed By - @Mihir
 */

import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Row } from "antd";
import Sider from "antd/lib/layout/Sider";
import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, {
	addEdge, applyEdgeChanges, applyNodeChanges, Background
} from "react-flow-renderer";
import { useDispatch, useSelector } from "react-redux";
import StarImg from "../../../../../../assets/icons/star.svg";
import panelRightImg from "../../../../../../assets/images/panel-rightIcon.svg";
import ModalComponent from "../../../../../../components/Modal/Modal";
import {
	hideLoader,
	showLoader,
	showNotification
} from "../../../../../../duck/actions/commonActions";
import {
	getAnalyticsModel, getAnalyticsNodes
} from "../../../../../../services/analyticsService";
import ColorSelectorNode from "./CustomNode";
import Encoder from "./Encoder";
import EncoderNode from "./EncoderNode";
import Estimator from "./Estimator";
import EstimatorNode from "./EstimatorNode";
import FeatureUninonNode from "./FeatureUninonNode";
import FeatureUnion from "./FeatureUnion";
import "./model.scss";
import NodeDetails from "./NodeDetails";
import Transformation from "./Transformations";


const Model = ({ finalModelJson, setFinalModelJson, editFinalJson, tableKey, modelType, encoderData, setEncoderData, setNodeMapping, catMapping }) => {
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
	const [target_category, setTarget_category] = useState("");
	const [selectedImputeValue, setSelectedImputeValue] = useState("");
	const [imputerTypeList, setImputerTypeList] = useState([]);
	const [scalerList, setScalerList] = useState([]);
	const [scalerNodeList, setScalerNOdeList] = useState([]);
	const [scalerListSelected, setScalerListSelected] = useState([]);
	const [scalerAlgoValue, setScalerAlgoValue] = useState("");
	const [saveScalerAlgoValue, setSaveScalerAlgoValue] = useState("");

	const [estimatorPopupData, setEstimatorPopupData] = useState({
		algoList: [],
		regressionList: [],
		typeList: [],
	});
	const [estimatorPopupDataValues, setEstimatorPopupDataValues] = useState({
		algoValue: [],
		regressionListvalue: [],
		typeListValue: "",
		enableGrid: false,
		hyperparameters: {}
	});
	const [savedEstimatorPopupDataValues, setSavedEstimatorPopupDataValues] =
		useState({
			algoValue: [],
			regressionListvalue: [],
			typeListValue: "",
			enableGrid: false,
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
		EncoderNode: (props) => (
			<EncoderNode
				myProp="myProps"
				{...props}
				encoderData={encoderData}
				setEncoderData={setEncoderData}
				addEstimator={addEstimator}
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

	const getNodes = async (tv) => {
		const reqBody = {
			batch_filter: selectedViewData?.batch_filter,
			data_filter: selectedViewData?.data_filter,
			view_disp_id: selectedViewData?.view_id,
			view_version: selectedViewData?.view_version,
			target_variable: tv ? tv : undefined
		};
		dispatch(showLoader());
		const apiResponse = await getAnalyticsNodes(reqBody);
		if (apiResponse?.Status === 200) {
			let finalJson;
			if (editFinalJson?.pipeline_data[0].variable_mapping?.length) {
				finalJson = JSON.parse(JSON.stringify(editFinalJson?.pipeline_data[0]))
			}
			let parameters = [];
			let edgesConnection = [];
			let imputerConnections = [];
			let scalerConnections = [];
			let estimatorConnections = [];
			let encoderConnections = [];
			let tempScalerList = [];
			let imputerList = [];
			let tempEstAlgoList = [];
			let tempEstTypeList = [];
			let tempRegressionList = [];
			let targetVariable = apiResponse.data?.target_variable;
			let getJson;
			if (finalJson?.variable_mapping?.length >= 1) {
				finalJson.target_variable = targetVariable
				setFinalModelJson(finalJson)
			} else {
				getJson = await getModelJson(apiResponse.data);
			}
			setTarget_category(apiResponse.data?.target_variable_category)
			setSelectedTargetVariable(targetVariable);
			apiResponse?.data?.Imputer?.forEach((ele) => {
				imputerList.push(ele.submodule);
				if (finalJson?.feature_union_mapping) {
					Object.entries(finalJson?.feature_union_mapping).forEach(([key, value]) => {
						if (value.type === "Imputer" && value.transformation === ele.submodule_key) {
							setTransformationsFinal(ele.submodule)
							setSaveTransformationValues({ ...saveTransformationValues, transformationFinal: ele.submodule })
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
						if (value.type === "Scaler" && value.transformation === sca.submodule_key) {
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
				} else if (ele.Type === "Encoder") {
					encoderConnections.push(ele);
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
					imputer.position = { x: encoderConnections.length ? 230 : 260, y: 50 };
					existingNodes.push(imputer);
					edgesConnection.push(imputer.edge);
				});
			}
			if (encoderConnections.length) {
				let yEncoderAxis = 50;
				let resArr = [];
				let tempImpArr = [];
				encoderConnections.forEach((encoderele) => {
					if (encoderele.Source === 'Imputer') {
						tempImpArr.push(encoderele.Variable_name)
					}
				})
				encoderConnections.forEach((ele) => {
					ele.variableParamNum = [];
					if (ele.Source === 'Imputer') {
						ele.parameterListNum = tempImpArr
					} else {
						ele.parameterListNum = [ele.Variable_name]
					}
				})
				encoderConnections.filter(function (item) {
					let i = resArr.findIndex(x => (x.Source == item.Source));
					if (i <= -1) {
						resArr.push(item);
					}
					return null;
				});
				getJson?.data?.variable_mapping?.forEach((variableList) => {
					resArr?.forEach((item) => {
						item?.parameterListNum?.forEach((param) => {
							if (param === variableList?.variable_name) {
								item.variableParamNum.push(variableList?.variable_id)
							}
						})
					})
				})
				let tempSelectedArr = [];
				resArr.forEach((encoder, index) => {
					const findEncObj = edgesConnection.find(
						(par) => par?.Node === encoder?.Source
					);
					const imputerObj = imputerConnections.find((imp) => imp?.Destination === encoder?.Type)
					yEncoderAxis = yEncoderAxis + 50;
					encoder.id = `enco-${index + 1}`;
					encoder.sourcePosition = "right";
					encoder.targetPosition = "left";
					encoder.type = "EncoderNode";
					encoder.style = {
						background: "#377771",
						padding: "8px 0px",
						width: 150,
						borderRadius: "4px",
					};
					if (findEncObj) {
						encoder.data = JSON.parse(JSON.stringify(findEncObj));
						encoder.edge = {
							source: findEncObj.id,
							type: "smoothstep",
							animated: false,
							target: `enco-${index + 1}`,
						};
					} else if (imputerObj) {
						encoder.data = JSON.parse(JSON.stringify(imputerObj));
						encoder.edge = {
							source: imputerObj.id,
							type: "smoothstep",
							animated: false,
							target: `enco-${index + 1}`,
						};
					}
					encoder.data.id = encoder.id
					encoder.position = { x: 420, y: yEncoderAxis };
					if (finalJson?.feature_union_mapping) {
						Object.entries(finalJson?.feature_union_mapping).forEach(([key, value]) => {
							if (encoder?.id === value?.id) {
								encoder.data.Destination_Parameter.submodule = value?.transformation?.replace('t_', '').toUpperCase();
							}
						})
					}
					const obj = {
						id: encoder?.id,
						parameters: {},
						transformation: encoder?.data?.Destination_Parameter?.submodule_key,
						type: "Encoder",
						variable_list: encoder?.variableParamNum,
					}
					tempSelectedArr.push(obj)
					existingNodes.push(encoder);
					edgesConnection.push(encoder.edge);
				});
				setEncoderData({ ...encoderData, selectedObjs: tempSelectedArr, encoderValueData: resArr, encoderDropDownData: apiResponse?.data?.Encoder });
			}
			if (scalerConnections.length) {
				let encoderID;
				let findObjScaler = {
					id: ''
				};
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
					position: { x: encoderConnections.length ? 620 : 470, y: 20 },
				};
				scalerConnections.forEach((scaler) => {
					if (scaler.Source === "Imputer") {
						const findObj = existingNodes.find(
							(ext) => ext.Destination === "Scaler"
						);
						if (findObj) {
							tempScalerNode.data = JSON.parse(JSON.stringify(findObj));
						}
						const edge = {
							source: "imp-1",
							type: "smoothstep",
							animated: false,
							target: "scaler-1",
						};
						edgesConnection.push(edge);
					} else {
						findObjScaler = existingNodes.find(
							(ext) => (ext.id !== encoderID && ext?.Node === scaler?.Source)
						);
						encoderID = findObjScaler?.id
						if (findObjScaler) {
							tempScalerNode.data = JSON.parse(JSON.stringify(findObjScaler));
						}
						const edge = {
							source: findObjScaler?.id,
							type: "smoothstep",
							animated: false,
							target: "scaler-1",
						};
						edgesConnection.push(edge);
					}
				});
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
				position: { x: encoderConnections.length ? 800 : 700, y: 200 },
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
			let hyperParameters_obj = {}
			let all_estimator = finalJson?.estimator
			let all_estimator_keys = Object.keys(all_estimator ? all_estimator : {})
			let algo_array = []
			let regression_estimator_type = ""
			apiResponse?.data?.all_estimator?.forEach((regression) => {
				tempEstAlgoList.push(regression);
				tempEstTypeList.push(regression?.estimator_type);

			})

			if (finalJson?.hyperParams) {
				hyperParameters_obj = { ...finalJson.hyperParams }
			}

			all_estimator_keys && all_estimator_keys.map((i) => {
				apiResponse?.data?.all_estimator?.forEach((regression) => {
					if (finalJson?.estimator[i]?.model_name === regression?.model_name) {
						regression_estimator_type = regression.estimator_type
						algo_array.push(regression.display_name)
					}
				})
			});
			setEstimatorPopupDataValues({ ...estimatorPopupDataValues, algoValue: algo_array, typeListValue: regression_estimator_type, hyperparameters: hyperParameters_obj })
			setSavedEstimatorPopupDataValues({ ...estimatorPopupDataValues, algoValue: algo_array, typeListValue: regression_estimator_type, hyperparameters: hyperParameters_obj })

			apiResponse?.data?.all_metric?.forEach((metric) => {
				tempRegressionList.push(metric);
			})
			let regression_list_value = []
			if (finalJson?.metrics?.metric_name) {
				let regresiion_list_val = finalJson.metrics.metric_name
				if (typeof (regresiion_list_val) == 'string') {
					regression_list_value.push(regresiion_list_val)
				}
				else {
					regression_list_value = regresiion_list_val
				}

			}
			setEstimatorPopupDataValues((prev) => {
				return {
					...prev,
					regressionListvalue: regression_list_value
				}
			})
			setSavedEstimatorPopupDataValues((prev) => {
				return {
					...prev,
					regressionListvalue: regression_list_value
				}
			})
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

	const getModelJson = async (data) => {
		const reqBody = {
			batch_filter: selectedViewData?.batch_filter,
			data_filter: selectedViewData?.data_filter,
			view_disp_id: selectedViewData?.view_id,
			view_version: selectedViewData?.view_version,
			target_variable: data?.target_variable
		};
		dispatch(showLoader());
		const apiResponse = await getAnalyticsModel(reqBody);
		if (apiResponse?.Status === 200) {
			let all_estimator = data?.estimator
			let hyperParameters_obj = {}
			let all_estimator_keys = Object.keys(all_estimator ? all_estimator : {})
			let algo_array = []
			let regression_estimator_type = ""
			if (data?.hyperParams) {
				hyperParameters_obj = { ...data.hyperParams }
			}
			all_estimator_keys && all_estimator_keys.map((i) => {
				apiResponse?.data?.all_estimator?.forEach((regression) => {
					if (finalJson?.estimator[i]?.model_name === regression?.model_name) {
						regression_estimator_type = regression.estimator_type
						algo_array.push(regression.display_name)
					}
				})
			});
			setEstimatorPopupDataValues({ ...estimatorPopupDataValues, algoValue: algo_array, typeListValue: regression_estimator_type, hyperparameters: hyperParameters_obj })
			setSavedEstimatorPopupDataValues({ ...estimatorPopupDataValues, algoValue: algo_array, typeListValue: regression_estimator_type, hyperparameters: hyperParameters_obj })

			let regression_list_value = []
			if (apiResponse?.data?.metrics?.metric_name) {
				let regresiion_list_val = apiResponse.data.metrics.metric_name
				if (typeof (regresiion_list_val) == 'string') {
					regression_list_value.push(regresiion_list_val)
				}
				else {
					regression_list_value = regresiion_list_val
				}

			}
			setEstimatorPopupDataValues((prev) => {
				return {
					...prev,
					regressionListvalue: regression_list_value
				}
			})
			setSavedEstimatorPopupDataValues((prev) => {
				return {
					...prev,
					regressionListvalue: regression_list_value
				}
			})
			setFinalModelJson(apiResponse.data);
			dispatch(hideLoader());
		} else {
			dispatch(hideLoader());
		}

		return apiResponse;
	};

	const onNodeClick = (e, node) => {
		if (node.Type === "Parameter") {
			setNodeInformation(node);
			setDetailsVisible(true);
		}
	};

	useEffect(() => {
		if (tableKey === "3") {
			getNodes(editFinalJson?.input_data?.target_variable);
		}
	}, [tableKey]);

	useEffect(() => {
		let tempNodeList = [];
		nodes?.forEach((ele) => {
			if (ele.Type === "Parameter") {
				tempNodeList.push(ele.Node)
			}
		})
		setScalerNOdeList(tempNodeList)
	}, [nodes])

	useEffect(() => {
		nodes?.forEach((ele) => {
			if (ele.data?.id === encoderData.encoderId) {
				ele.data.Destination_Parameter.submodule = encoderData?.savedValue
			};
			setNodeTypes(nodesNew)
		})
	}, [encoderData.savedValue]);

	useEffect(() => {
		setNodeTypes(nodesNew)
	}, [savedEstimatorPopupDataValues])

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
						<PlusOutlined /> Add Estimators
					</Button>
				</Col>
				<Col span="4">
					<Button
						className="custom-primary-btn"
						onClick={() => addEstimator("featureUnion")}
					>
						<PlusOutlined /> Create Feature Union
					</Button>
				</Col>
				{/* <Col span="3" className="select-flex ml">
					View
					<Select />
				</Col>
				<Col span="3" className="select-flex">
					Show
					<Select />
				</Col> */}
				<Col span="7" className="title-legends">
					<dl>
						<dt className="violet"></dt>
						<dd>Transformations</dd>
						<dt className="cream"></dt>
						<dd>Feature union</dd>
						<dt className="lightGreen"></dt>
						<dd>Estimator</dd>
						{/* <dt className="pink"></dt>
						<dd>Categorical</dd>
						<dt className="green"></dt>
						<dd>Numerical</dd> */}

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
						zoomOnPinch={false}
						zoomOnScroll={false}
						preventScrolling={false}
					// attributionPosition="top-left"
					>
						<Background variant="dots" gap={25} size={0.3} color="#313131" />
						<ModalComponent
							isModalVisible={detailsVisible}
							width="800px"
							title="Transformation"
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
								getNodes={getNodes}
								setNodeMapping={setNodeMapping}
								catMapping={catMapping}
							/>
						</ModalComponent>
					</ReactFlow>
				)}
				{nodes && nodes.length > 1 && <div className="anaylsisRight">
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
									setScalerListSelected={setScalerListSelected}
									scalerNodeList={scalerNodeList}
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
									target_category={target_category}
								/>
							)}
							{type === 'encoder' && drawervisible &&
								<Encoder
									onCreateClick={onCreateClick}
									encoderData={encoderData}
									setEncoderData={setEncoderData}
									finalModelJson={finalModelJson}
									setFinalModelJson={setFinalModelJson}
								/>
							}
						</Sider>
					</div>
				</div>}
			</div>
		</div>
	);
};

export default Model;