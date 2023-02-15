import { InfoCircleOutlined } from "@ant-design/icons";
import { Button, Col, Collapse, Popover, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../../../../../components/InputField/InputField";
import Modal from "../../../../../components/Modal/Modal";
import { createVariable, viewParamMap } from "../../../../../duck/actions/viewAction";
import CreateVariable from "./createVariable";
import MathFunction from "./mathFunction";
import { MemoizedParameterTable } from "./parameterTable";
import "./style.scss";
import VariableCard from "./variableCard";

const MathEditor = ({
	viewJson,
	setViewJson,
	viewSummaryBatch,
	setViewSummaryBatch,
	materialId,
	fromWorkflowScreen }) => {
	let variableData = [];

	const isLoadView = useSelector((state) => state.viewCreationReducer.isLoad);
	// const selectedParameters = useSelector(
	// 	(state) => state.viewCreationReducer.loadResponse
	// );
	const [varData, setVarData] = useState(variableData);
	const [count, setCount] = useState(1);
	const [cardTitle, setCardTitle] = useState("Create Variable");
	const [rowDisable, setRowDisable] = useState(false);
	const [variableCreate, setVariableCreate] = useState(false);
	const [ischeckBox, setIscheckBox] = useState(false);
	const [createNameModal, setCreateNameModal] = useState(false);
	const [varClick, setVarClick] = useState(false);
	const [paramData, setParamData] = useState({});
	const [selectedVar, setSelectedVar] = useState("");
	const [variableName, setVariableName] = useState("");
	//const [showVariable, setShowVariable] = useState(false);

	const { Panel } = Collapse;
	const dispatch = useDispatch();

	const content = (
		<div className="script-info">
			<h5>Introduction:</h5>
			<p>Every variable is a dataframe. Batch Num as index and Parameter Value as the column.</p>
			<h5>V1:</h5>

			<table className="table-help">
				<tr>
					<th>batch_num</th>
					<th>parameter_value</th>
				</tr>
				<tr>
					<td>ABL2258</td>
					<td>5</td>
				</tr>
				<tr>
					<td>ABL2259</td>
					<td>5</td>
				</tr>
				<tr>
					<td>ABL2261</td>
					<td>5</td>
				</tr>
				<tr>
					<td>ABL2264</td>
					<td>5</td>
				</tr>
				<tr>
					<td>ABR9486</td>
					<td>5</td>
				</tr>
				<tr>
					<td>ABR9487</td>
					<td>5</td>
				</tr>
				<tr>
					<td>ABR9491</td>
					<td>5</td>
				</tr>
				<tr>
					<td>ABR9492</td>
					<td>5</td>
				</tr>
				<tr>
					<td>ABT9563</td>
					<td>5</td>
				</tr>
				<tr>
					<td>ABT9564</td>
					<td>5</td>
				</tr>
			</table>

			<p>We can apply all the function that is related to the dataframe.</p>
			<h5>Example: 1</h5>
			<pre>
				if V1.isnull().sum().sum() > 0:
				<br />
				V1.fillna(0)
				<br />
				if V2.isnull().sum().sum() > 0:
				<br />
				V2.fillna(0)
				<br />
				result = V1 + V2
			</pre>

			<h5>Example: 2</h5>
			<pre>
				V1 + V2
			</pre>

			<h5>Notes</h5>
			<p>In one-line math function, we don’t need to assign output to result as shown in Example:2.
				<br />
				But if we have multiline then final output we have to assign to the result as shown in Example: 1.</p>

			<h5>Addition:</h5>
			<p>To add two parameters, we have to do: </p>
			<pre>V1 + V2</pre>

			<h5>Substraction:</h5>
			<p>To substract two parameters, we have to do:  </p>
			<pre>V1 - V2</pre>

			<h5>Division:</h5>
			<pre>if V2.isnull().sum().sum() > 0:
				<br />
				V2.fillna(1)
				<br />
				result = V1 / V2
				<br />
			</pre>

			<h5>Multiplication:</h5>
			<pre>if V2.isnull().sum().sum() > 0:
				<br />
				V2.fillna(1)
				<br />
				result = V1 * V2
				<br />
			</pre>

			<h5>Power:</h5>
			<h5>Example 1:</h5>
			<pre>if var_assay.isnull().sum().sum() > 0:
				<br />
				var_assay.fillna(0)
				<br />
if var_bact_endotoxin.isnull().sum().sum() > 0:
				<br />
				var_bact_endotoxin.fillna(1)
				<br />
				result = pow((var_assay / var_bact_endotoxin),2)
				<br />
			</pre>
			<h5>Example 2:</h5>
			<pre>Pow(V1, 1.2)</pre>

			<h5>Logarithmic: </h5>
			<p>We can use log from the numpy. Use numpy as np.</p>
			<pre>np.log(V1) + np.log(V2)</pre>

			<h5>Replace Values with Condition: </h5>
			<p>e.g Wherever V1>0.0235, we wants values from the V2.</p>
			<pre>a = V1
				<br />
				b = V2
				<br />
				a[V1 > 0.0235] = b[V1 > 0.0235]
				<br />
				result = a
			</pre>

			<h5>Scipy Functions:</h5>
			<h5>Example with boxcox:</h5>
			<pre>from scipy import stats
				<br />
				output = stats.boxcox(V1['parameter_value'].to_list())
				<br />
				result = pd.DataFrame()
				<br />
				result.index = V1.index.to_list()
				<br />
				result['parameter_value'] = output[0]
				<br />
			</pre>

			<h5>Example with yeojohnson:</h5>
			<pre>from scipy import stats
				<br />
				output = stats.yeojohnson(V1['parameter_value'].to_list())
				<br />
				result = pd.DataFrame()
				<br />
				result.index = V1.index.to_list()
				<br />
				result['parameter_value'] = output[0]
				<br />
			</pre>

			<h5>Datetime functions:</h5>
			<h5>Day:</h5>
			<pre>day(end, start)</pre>

			<h5>Hours:</h5>
			<h5>Example 1:</h5>
			<pre>hours(end, start)</pre>
			<h5>Example 2:</h5>
			<pre>(end.parameter_value-start.parameter_value).dt.total_seconds()/3600</pre>

			<h5>Minutes:</h5>
			<h5>Example 1:</h5>
			<pre>minutes(end, start)
			</pre>
			<h5>Example 2:</h5>
			<pre>(end.parameter_value-start.parameter_value).dt.total_seconds()/60
			</pre>

			<h5>Seconds:</h5>
			<h5>Example 1:</h5>
			<pre>seconds(end, start)
			</pre>
			<h5>Example 2:</h5>
			<pre>(end.parameter_value-start.parameter_value).dt.total_seconds()
			</pre>

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
			const viewJsonData = [...viewJson];
			viewJsonData.forEach((element) => {
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

				const newVar_data = [...var_data]
				setTimeout(() => {
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
		setRowDisable(true);
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
		/* istanbul ignore next */
		varData.forEach((item, i) => {
			if (item.variableName === param) {
				lastIndex = i - 1;
			}
		});

		variableData.forEach((item, i) => {
			/* istanbul ignore next */
			if (item.variableName === param) {
				lastIndex = i - 1;
			}
		});

		/* istanbul ignore next */
		const varArr = varData.filter((ele) => {
			return ele.variableName !== param;
		});

		/* istanbul ignore next */
		const varDataArr = variableData.filter((ele) => {
			return ele.variableName !== param;
		});

		/* istanbul ignore next */
		const parameter = { ...paramData }

		/* istanbul ignore next */

		delete parameter[param];
		/* istanbul ignore next */

		setParamData(parameter)
		/* istanbul ignore next */
		dispatch(viewParamMap(parameter));
		dispatch(createVariable(parameter));
		variableData = [...varDataArr];
		/* istanbul ignore next */

		const newVar = [...varArr]

		/* istanbul ignore next */
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
								<InfoCircleOutlined style={{ padding: "0 5px" }} />
							</Popover>
						</span>
					}
					key="1"
				>
					<MathFunction
						data={paramData}
						materialId={materialId}
						fromWorkflowScreen={fromWorkflowScreen}
					/>
					<div className="variable-wrapper">
						<CreateVariable
							addVariable={addVariable}
							title={cardTitle}
							createVar={addVariableName}
							className={"add-var_block add-var_block_bg"}
							fromWorkflowScreen={fromWorkflowScreen}
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
										fromWorkflowScreen={fromWorkflowScreen}
									/>
								);
							})
						)}

					</div>
					<MemoizedParameterTable
						fromWorkflowScreen={fromWorkflowScreen}
						variableCreate={variableCreate}
						setVariableCreate={setVariableCreate}
						callbackCheckbox={callbackCheckbox}
						varClick={varClick}
						rowDisable={rowDisable}
						ischeckBox={ischeckBox}
						viewJson={viewJson}
						setViewJson={setViewJson}
						viewSummaryBatch={viewSummaryBatch}
						setViewSummaryBatch={setViewSummaryBatch}
						getParamData={getParamData}
						selectedData={paramData}
						selectedVar={selectedVar}
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
