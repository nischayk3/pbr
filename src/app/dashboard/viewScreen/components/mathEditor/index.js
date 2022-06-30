import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CreateVariable from "./createVariable";
import { Button, Col, Collapse, Row, Popover } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import "./style.scss";
import MathFunction from "./mathFunction";
import { MemoizedParameterTable } from "./parameterTable";
import VariableCard from "./variableCard";
import Modal from "../../../../../components/Modal/Modal";
import InputField from "../../../../../components/InputField/InputField";

let variableData = [];
const MathEditor = (props) => {

	const isLoadView = useSelector((state) => state.viewCreationReducer.isLoad);
	const selectedParameters = useSelector(
		(state) => state.viewCreationReducer.loadResponse
	);
	const [varData, setVarData] = useState(variableData);
	const [count, setCount] = useState(1);
	const [cardTitle, setCardTitle] = useState("Create Variable");
	const [rowDisable, setRowDisable] = useState(true);
	const [variableCreate, setVariableCreate] = useState(false);
	const [ischeckBox, setIscheckBox] = useState(false);
	const [createNameModal, setCreateNameModal] = useState(false);
	const [varClick, setVarClick] = useState(false);
	const [paramData, setParamData] = useState({});
	const [selectedVar, setSelectedVar] = useState("");
	const [variableName, setVariableName] = useState("");
	const [showVariable, setShowVariable] = useState(false);


	const { Panel } = Collapse;
	const {
		newBatchData,
		parentBatches,
		molBatches,
		setMolBatches,
		viewJson,
		setViewJson,
		viewSummaryBatch,
		setViewSummaryBatch,
		materialId,
	} = props;
	console.log("propsssssssss matheditor", props);
	const content = (
		<div className="script-info">
			<p className="script-help">
				All variables are dataframes with batch_num and parameter_value.
				<br />
				batch_num as index and parameter_value is the value for the variable for
				given batch.
				<br />
				<br />
				e.g:1 : isnull and fillna will fill null data with given values.
				<br />
				if V1.isnull().sum().sum() `{'>'}` 0:
				<br />
				V1.fillna(0)
				<br />
				if V2.isnull().sum().sum() `{'>'}` 0:
				<br />
				V2.fillna(0)
				<br />
				result = V1 + V2
				<br />
				<br />
				e.g:2 To replace some values of V1 with the values of V2.
				<br />
				a = V1
				<br />
				b = V2
				<br />
				a[V1 `{'>'}` 0.0235] = b[V1 `{'>'}` 0.0235] <br />
				result = a<br />
				<br />
				e.g:3: To find any power of values
				<br />
				pow(V2, 1.2)
				<br />
				<br />
				e.g: 4: To find log
				<br />
				np.log(V2)
				<br />
				<br />
				e.g: 5<br />
				np.round_(V2)
				<br />
				<br />
				e.g: add
				<br />
				V1 + V2 <br />
				<br />
				e.g: sub
				<br />
				V1 - V2
				<br />
				<br />
				e.g: multiply
				<br />
				V1 * V2
				<br />
				<br />
				e.g: divide
				<br />
				V1 / V2
				<br />
				<br />
				e.g polynomial
				<br />
				V1**2 + V1*2 + 10
			</p>
		</div>
	);
	const isNew = useSelector((state) => state.viewCreationReducer.isNew);

	useEffect(() => {
		if (isNew) {
			setVarData([]);
		}
	}, [isNew]);

	useEffect(() => {
		if (isLoadView) {
			let paramKey = [];
			// const viewJsonData = [selectedParameters];
			const viewJsonData = [...viewJson];
			console.log("......selectedParameters", selectedParameters);
			viewJsonData.forEach((element, index) => {
				paramKey.push(Object.keys(element.parameters));
			});
			let var_data = [];
			paramKey = paramKey[0];
			if (paramKey.length > 0) {
				for (let i = 0; i < paramKey.length; i++) {
					let obj = {};
					obj["variableName"] = paramKey[i];
					obj["id"] = i;
					var_data.push(obj);
				}
				variableData = [...var_data];

				if (var_data.length > 0) {
					setShowVariable(false);
				}
				const newVar_data = [...var_data]
				setTimeout(() => {
					setShowVariable(true);
					setVarData(newVar_data);
				}, 200)

			}

			if (
				viewJsonData[0] &&
				Object.keys(viewJsonData[0].parameters).length > 0
			) {
				setParamData(viewJsonData[0].parameters);
			}
		}
	}, [isLoadView]);


	const addVariable = () => {
		setCardTitle("Select parameters");
		setRowDisable(false);
		setIscheckBox(true);
	};

	const createVar = () => {
		if (varData && varData.length > 0) {
			variableData = [...varData];
		}
		variableData.push({
			variableName: variableName,
			id: count,
		});
		setCount(count + 1);
		setVarData(variableData);
		setVariableCreate(true);
		setVarClick(false);
		setCreateNameModal(false);
		setCardTitle("Create Variable");
	};

	const callbackCheckbox = (val) => {
		if (val) {
			setCardTitle("Done");
			setVarClick(true);
		}
	};

	const getParamData = (data) => {
		setParamData(data);
	};

	const editVariable = (data) => {

		setSelectedVar(data);
	};
	const deleteVariable = (param) => {
		let lastIndex;
		varData.forEach((item, i) => {
			if (item.variableName === param) {
				lastIndex = i - 1;
			}
		});
		variableData.forEach((item, i) => {
			if (item.variableName === param) {
				lastIndex = i - 1;
			}
		});
		const varArr = varData.filter((ele) => {
			return ele.variableName !== param;
		});
		const varDataArr = variableData.filter((ele) => {
			return ele.variableName !== param;
		});

		variableData = [...varDataArr];
		const newVar = [...varArr]
		setVarData(newVar);
	};

	const addVariableName = () => {
		setVariableName("");
		setCreateNameModal(!createNameModal);
	};


	return (
		<>
			<Collapse
				className="viewCreation-accordian "
				defaultActiveKey={["1"]}

			>
				<Panel
					className="viewCreation-materialsPanel"
					header={
						<span>
							Script Editor
							<Popover content={content} title={false} trigger="hover">
								<InfoCircleOutlined />
							</Popover>
						</span>
					}
					key="1"
				>
					<MathFunction data={paramData} materialId={materialId} fromWorkflowScreen={props.fromWorkflowScreen} />
					<div className="variable-wrapper">
						<CreateVariable
							addVariable={addVariable}
							title={cardTitle}
							createVar={addVariableName}
							className={"add-var_block add-var_block_bg"}
							fromWorkflowScreen={props.fromWorkflowScreen}
						/>
						{varData && (
							varData.map((item, index) => {
								return (
									<VariableCard
										id={item.id}
										// item={item}
										variableName={item.variableName}
										deleteVariable={deleteVariable}
										editVariable={editVariable}
										fromWorkflowScreen={props.fromWorkflowScreen}
									/>
								);
							})
						)}

					</div>
					<MemoizedParameterTable
						fromWorkflowScreen={props.fromWorkflowScreen}
						variableCreate={variableCreate}
						setVariableCreate={setVariableCreate}
						callbackCheckbox={callbackCheckbox}
						varClick={varClick}
						setVarClick={setVarClick}
						rowDisable={rowDisable}
						newBatchData={newBatchData}
						parentBatches={parentBatches}
						setMolBatches={setMolBatches}
						molBatches={molBatches}
						ischeckBox={ischeckBox}
						viewJson={viewJson}
						setViewJson={setViewJson}
						viewSummaryBatch={viewSummaryBatch}
						setViewSummaryBatch={setViewSummaryBatch}
						getParamData={getParamData}
						selectedData={paramData}
						selectedVar={selectedVar}
						materialId={materialId}
						variableName={variableName}
					/>
				</Panel>
			</Collapse>
			<Modal
				isModalVisible={createNameModal}
				width={400}
				title="Create Variable Name"
				handleCancel={addVariableName}
				closable={false}
			>
				<Row>
					<Col span={24} className="variable-name-popup">
						<InputField
							label="Variable name"
							placeholder="Variable name"
							value={variableName}
							onChangeInput={(e) => setVariableName(e.target.value)}
						/>
					</Col>
				</Row>
				<Row>
					<Col span={14} />
					<Col span={5} className="variable-cancel-button">
						<Button onClick={addVariableName}>Cancel</Button>
					</Col>
					<Col span={5} className="variable-name-popup">
						<Button className="custom-eval-btn" onClick={createVar}>
							Create
						</Button>
					</Col>
				</Row>
			</Modal>
		</>
	);
};

export const MemoizedMathEditor = React.memo(MathEditor);
