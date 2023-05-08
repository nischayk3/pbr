/**
 * @author Dinesh
 * @Mareana - CPV Product
 * @version  2
 * @Last Modified - 20 April, 2023
 * @Last Changed By - Dinesh
 */
import {
	CheckCircleOutlined,
	CheckOutlined,
	CloseOutlined,
	DeleteOutlined,
	FullscreenExitOutlined, FullscreenOutlined, PlusOutlined
} from '@ant-design/icons';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { Alert, Button, Card, Checkbox, Collapse, List, Modal, Table, Tooltip } from "antd";
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CustomButton from "../../../../../../components/CustomButton/CustomButton";
import InputField from "../../../../../../components/InputField/InputField";
import LabelTag from "../../../../../../components/LabelTag";
import { BMS_APP_PYTHON_SERVICE } from '../../../../../../constants/apiBaseUrl';
import { showNotification } from '../../../../../../duck/actions/commonActions';
import { generateColumns } from '../../../../../../utils/TableColumns';
import ParameterTable from "./parameterTable/parameterTable";
import "./viewParameterSummary.scss";

const { Panel } = Collapse;

const ViewParamterSummary = ({ viewDataJson, setViewDataJson, leftPanelCollapsed, setLeftPanelCollapsed, rightPanelCollapsed, setRightPanelCollapsed }) => {
	const [cardTitle, setCardTitle] = useState("Create variable");
	const [variableName, setVariableName] = useState("");
	const [funName, setFunName] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [value, setValue] = useState('');
	const [expandParameter, setExpandParameter] = useState(true);
	const [expandSummary, setExpandSummary] = useState(true);
	const [selectParameter, setSelectParameter] = useState(false);
	const [selectedRowData, setSelectedRowData] = useState([]);
	const [code, setCode] = useState(``)
	const [isFunctionEvaluated, setIsFunctionEvaluated] = useState(false);
	const [counter, setCounter] = useState(1);
	const [variable, setVariable] = useState([]);
	const [functionList, setFunctionList] = useState([]);
	const [evaluateModal, setEvaluateModal] = useState(false);
	const [evaluateData, setEvaluateData] = useState([]);
	const [evaluateColumn, setEvaluateColumn] = useState([]);
	const [isLog, setIsLog] = useState(false);
	const [funSaveSuccefull, setFunSaveSuccefull] = useState(true);
	const [tableData, setTableData] = useState([]);
	const [summaryColumn, setSummaryColumn] = useState([]);


	const dispatch = useDispatch();

	useEffect(() => {
		const varJson = { ...viewDataJson }
		const variableArray = Object.keys(varJson?.data[0]?.variables);
		const funArray = Object.keys(varJson?.data[0]?.functions);
		setVariable(variableArray)
		setFunctionList(funArray)
	}, [viewDataJson])

	{
		funSaveSuccefull ? (
			setTimeout(() => {
				setFunSaveSuccefull(false)
			}, 8000)
		) : null
	}

	const addVariableName = (e, title) => {
		if (title === "Create variable") {
			setCardTitle("Select parameter")
			setVariableName("");
			setSelectParameter(true);
			setCounter(1)
		} else if (title === "Select parameter") {
			setCardTitle("Select parameter")
			setVariableName("");
		} else if (title === "Done") {
			setIsModalOpen(!isModalOpen);
		}
	};

	const handleScriptEditor = () => {
		setIsModalVisible(!isModalVisible);
	}

	const onChange = (key) => {
		console.log(key);
	};

	const handleExpand = () => {
		setExpandParameter(false)
	}

	const handleExpandExit = () => {
		setExpandParameter(true)
	}

	const handleExpandSummary = () => {
		setExpandSummary(false)
	}

	const handleExpandExitSummary = () => {
		setExpandSummary(true)
	}

	const data1 = [
		'Function 1',
		'Function 2',
		'Function 3',
		'Function 4',
		'Function 5',
	];

	const columns = [
		{
			title: "Batch",
			dataIndex: "batch",
			key: "batch",
		},
		{
			title: (
				<div className="summary-column">
					<p>FUNCTION_1</p>
					<span>
						<DeleteOutlined className="delete" />
					</span>
				</div>
			),
			dataIndex: "FUNCTION_1",
			key: "FUNCTION_1",
		},
	]

	const createVariable = () => {
		const jsonData = { ...viewDataJson };
		const paramObj = { ...selectedRowData };

		jsonData && jsonData?.data.map((ele) => {
			return ele.variables[variableName] = paramObj
		})
		setViewDataJson(jsonData)
		setIsModalOpen(!isModalOpen)
		setCardTitle("Create variable")
		setSelectedRowData([])

		setRightPanelCollapsed(false);
		setLeftPanelCollapsed(true);
	}

	const functionEvaluation = async (_reqFunction, _params) => {
		let login_response = JSON.parse(localStorage.getItem("login_details"));
		const headers = {
			'Content-Type': 'application/json',
			"x-access-token": login_response.token ? login_response.token : "",
			"resource-name": "VIEW",
		};
		try {
			const apiRes = await axios.post(BMS_APP_PYTHON_SERVICE + "/view-evaluate-v2", _reqFunction, { params: _params, headers: headers });
			if (apiRes.status === 200) {
				const resData = apiRes?.data?.data
				const evalColumn = generateColumns(resData)
				setIsFunctionEvaluated(true)
				setEvaluateColumn(evalColumn)
				setEvaluateData(resData)
			} else if (apiRes.status === 202) {

				setIsLog(true)
				setValue(apiRes?.data?.data?.logs)
				dispatch(showNotification("error", apiRes?.data?.message));
			} else if (apiRes.status === 400) {
				console.log("apiRes.message", apiRes?.data?.message);
				dispatch(showNotification("error", apiRes?.data?.message));
			} else if (apiRes.status === 404) {
				console.log("apiRes.message", apiRes?.data?.message);
				dispatch(showNotification("error", apiRes?.data?.message));
			}
		} catch (error) {
			console.log("error", error);
		}
	};

	const evaluateFunction = () => {
		const viewJson = { ...viewDataJson }

		const variable = viewJson.data.map((ele) => {
			return ele.variables
		})

		const updateVar = variable[0]

		const updatedVarObj = {}
		for (const key in updateVar) {
			updatedVarObj[key] = Object.values(updateVar[key]);
		}

		const _reqParam = {
			page: 1,
			per_page: 25,
			is_page: false,
			key: '75833b02-1cec-47b1-b435-6df113555587'
		}
		const _req = {
			functions: {
				script: code,
			},
			variables: updatedVarObj
		}

		functionEvaluation(_req, _reqParam)
	}


	const saveAsGlobal = (e) => {
		console.log(`checked = ${e.target.checked}`);
	}

	const cancelEvalateModal = () => {
		setEvaluateModal(false);
	}

	const viewEvalatedData = () => {
		setEvaluateModal(true);
	}

	/**
	 * View Summary - get data from evaluation function
	*/

	const viewSummary = async (_reqFunction, _params, script) => {
		let login_response = JSON.parse(localStorage.getItem("login_details"));
		const headers = {
			'Content-Type': 'application/json',
			"x-access-token": login_response.token ? login_response.token : "",
			"resource-name": "VIEW",
		};
		try {
			const apiRes = await axios.post(BMS_APP_PYTHON_SERVICE + "/view-summary", _reqFunction, { params: _params, headers: headers });
			if (apiRes.status === 200) {
				const data = apiRes?.data?.data
				const summaryCol = generateViewSummaryColumns(data)
				console.log("summaryCol", summaryCol, data);
				setSummaryColumn(summaryCol && summaryCol)
				setTableData(data)
				setFunSaveSuccefull(true)
				const funJson = { ...viewDataJson }
				funJson.data.map((ele) => {
					return ele.functions[funName] = script
				})
				setViewDataJson(funJson)
			} else if (apiRes.status === 400 || apiRes.status === 404) {
				dispatch(showNotification("error", apiRes.message));
			}
		} catch (error) {
			console.log("error", error);
		}
	};

	const saveFunction = () => {
		const viewJson = { ...viewDataJson }
		const variable = viewJson.data.map((ele) => {
			return ele.variables
		})
		const updateVar = variable[0]
		const updatedVariableObj = {}
		for (const key in updateVar) {
			updatedVariableObj[key] = Object.values(updateVar[key]);
		}
		const _reqParam = {
			page: 1,
			per_page: 25,
			is_page: false,
			key: '75833b02-1cec-47b1-b435-6df113555587'
		}
		const _req = {
			functions: {
				[funName]: code,
			},
			variables: updatedVariableObj
		}
		viewSummary(_req, _reqParam, code)
	}
	const generateViewSummaryColumns = (responseData) => {
		const columns = [{
			title: 'BATCH',
			dataIndex: 'batch_num',
			key: 'batch_num',
			width: 80,
		}];
		const firstRow = responseData[0];
		for (const key in firstRow) {
			if (Object.hasOwnProperty.call(firstRow, key)) {
				if (key !== 'batch_num') {
					columns.push({
						title: key.toUpperCase().replace(/_/g, " "),
						dataIndex: key,
						key: key,
						width: 130,
						render: (value) => {
							console.log("value", value);
							if (value) {
								return (
									<span className="batchChecked" >
										<CheckOutlined />
									</span >
								)
							} else {
								return (
									<span className="batchClosed">
										<CloseOutlined />
									</span>
								)
							}
						}
					})
				}
			}
		}
		return columns;
	};
	console.log("viewwww json", viewDataJson);
	return (
		<div className="view-summary__center">
			{expandParameter && (
				<Card
					title='View Summary'
					className='custom__card'
					extra={expandSummary ?
						<Tooltip title="Expand panel" mouseLeaveDelay={0}>
							<FullscreenOutlined onClick={handleExpandSummary} />
						</Tooltip> :
						<Tooltip title="Collapse panel" mouseLeaveDelay={0}>
							<FullscreenExitOutlined onClick={handleExpandExitSummary} />
						</Tooltip>
					}>
					<div className="view-summary_lable"  >
						<LabelTag lableName="View Id" lableValue="001" />
						<LabelTag lableName="View Name" lableValue="View Test" />
						<LabelTag lableName="Status" lableValue="DRFT" />
						<LabelTag lableName="Version" lableValue="1" />
					</div>
					{/* <Empty className="empty--layout" description="You will see the created fucntions here" imageStyle={{
					height: 120,
				}} image={Empty.PRESENTED_IMAGE_SIMPLE} /> */}
					<div className="view-summary__table--wrapper">
						<Table
							rowClassName={(record, index) =>
								index % 2 === 0 ? "table-row-light" : "table-row-dark"
							}
							columns={summaryColumn}
							dataSource={tableData}
							pagination={false}
							rowKey={(record) => record.uuid}
						/>
					</div>
				</Card>
			)}
			{expandSummary && (
				<Card
					title='Parameter'
					className='custom__card'
					extra={expandParameter ?
						<Tooltip title="Expand panel" mouseLeaveDelay={0}>
							<FullscreenOutlined onClick={handleExpand} />
						</Tooltip> :
						<Tooltip title="Collapse panel" mouseLeaveDelay={0}>
							<FullscreenExitOutlined onClick={handleExpandExit} />
						</Tooltip>
					}
				>
					<div className="variable-wrapper">
						<CustomButton className={cardTitle === "Done" ? "add-var_block add-var_block_bg remove_icon" : "add-var_block add-var_block_bg"} icon={<PlusOutlined />} type="dashed" onClick={(e) => addVariableName(e, cardTitle)} >{cardTitle}</CustomButton>
						<CustomButton className="custom__btn--dashed" icon={<PlusOutlined />} type="dashed" onClick={handleScriptEditor} >Create function</CustomButton>
					</div>
					<ParameterTable
						cardTitle={cardTitle}
						setCardTitle={setCardTitle}
						selectParameter={selectParameter}
						setSelectParameter={setSelectParameter}
						viewDataJson={viewDataJson}
						setViewDataJson={setViewDataJson}
						selectedRowData={selectedRowData}
						setSelectedRowData={setSelectedRowData}
						counter={counter}
						setCounter={setCounter}
					/>
				</Card>
			)}

			<Modal
				visible={isModalOpen}
				width={400}
				title="Create Variable"
				footer={null}
				onCancel={addVariableName}
			>
				<div className="variable__input--block">
					<InputField
						label="Variable name"
						placeholder="Enter Variable name"
						value={variableName}
						onChangeInput={(e) => setVariableName(e.target.value)}
					/>
				</div>
				<div className="variable__input--button">
					<Button className="custom-secondary-btn" onClick={createVariable}>
						Create
					</Button>
					<Button className='custom-primary-btn'>Cancel</Button>
				</div>
			</Modal>
			<Modal
				visible={isModalVisible}
				width={1000}
				title="Function"
				footer={null}
				onCancel={handleScriptEditor}
			>
				<div className="code-editor__wraper">
					<div className="code-editor__function--wrapper">
						<Card title='Script Editor' className='custom__card'>
							{funSaveSuccefull ? (
								<div className="function-alert">
									<p>{`Function '${funName}' created `}</p>
									<span>
										<CheckCircleOutlined />
									</span>
								</div>
							) : (
								<CodeEditor
									value={code}
									language="python"
									placeholder="Please enter the script"
									onChange={(evn) => {
										setCode(evn.target.value);
										setIsFunctionEvaluated(false);
										setIsLog(false);
									}}
									padding={15}
									style={{
										border: ".5px solid #eee",
										fontSize: 12,
										backgroundColor: "#f5f5f5",
										fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
									}}
								/>
							)}

							{isLog && (
								<div className="function__logs--wrapper">
									<p>Logs</p>
									<Alert
										message="Error: An Uncaught Error"
										description={value}
										type="error"
									/>
								</div>
							)}

							<div className="evaluate-function__wrapper">
								<>
									<Button className='custom-secondary-btn' disabled={code === ""} onClick={evaluateFunction}>Evaluate function</Button>
									{isFunctionEvaluated && (
										<Button className='custom-primary-btn' onClick={viewEvalatedData}>Display evaluated function</Button>
									)}
								</>
								<Checkbox onChange={saveAsGlobal}>Save as Global function</Checkbox>
							</div>
						</Card>
						<Card title='Function name' className='custom__card '>
							<div className="function__editor">
								<InputField
									// label="Variable name"
									placeholder="Enter function name"
									value={funName}
									onChangeInput={(e) => setFunName(e.target.value)}
								/>
								<Button className='custom-primary-btn'>Cancel</Button>
								<Button className='custom-secondary-btn' disabled={funName === ""} onClick={saveFunction}>Save</Button>
							</div>
						</Card>
					</div>
					<Card title='Available variable/function' className='custom__card '>
						<Collapse className='function__collapse--wrapper' defaultActiveKey={['1']}>
							<Panel header="Variable" key="1">
								<List
									size="small"
									dataSource={variable}
									renderItem={(item) => <List.Item>{item}</List.Item>}
								/>
							</Panel>
							<Panel header="Parameter function" key="2">
								<List
									size="small"
									dataSource={functionList}
									renderItem={(item) => <List.Item>{item}</List.Item>}
								/>
							</Panel>
							<Panel header="Global function" key="3">
								<List
									size="small"
									dataSource={data1}
									renderItem={(item) => <List.Item>{item}</List.Item>}
								/>
							</Panel>
						</Collapse>
					</Card>
				</div>
			</Modal>
			<Modal
				visible={evaluateModal}
				width={1200}
				title="Evaluate data"
				footer={null}
				onCancel={cancelEvalateModal}
			>
				<Table
					rowClassName={(record, index) =>
						index % 2 === 0 ? "table-row-light" : "table-row-dark"
					}
					columns={evaluateColumn}
					dataSource={evaluateData}
					pagination={false}
					//rowKey={(record) => record.uuid}
					//loading={loadingRaw}
					scroll={{ x: scrollX, y: 500 }}
				/>
			</Modal>
		</div >
	)
}

export default ViewParamterSummary;