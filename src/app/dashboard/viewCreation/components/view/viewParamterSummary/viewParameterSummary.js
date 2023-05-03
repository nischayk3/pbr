/**
 * @author Dinesh
 * @Mareana - CPV Product
 * @version  2
 * @Last Modified - 20 April, 2023
 * @Last Changed By - Dinesh
 */

import { DeleteOutlined, FullscreenExitOutlined, FullscreenOutlined, PlusOutlined } from '@ant-design/icons';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { Button, Card, Collapse, Input, List, Modal, Table, Tooltip } from "antd";
import React, { useState } from "react";
import CustomButton from "../../../../../../components/CustomButton/CustomButton";
import InputField from "../../../../../../components/InputField/InputField";
import LabelTag from "../../../../../../components/LabelTag";
import ParameterTable from "./parameterTable/parameterTable";
import "./viewParameterSummary.scss";
const { Panel } = Collapse;

const ViewParamterSummary = ({ viewDataJson, setViewDataJson, leftPanelCollapsed, setLeftPanelCollapsed, rightPanelCollapsed, setRightPanelCollapsed }) => {
	const [cardTitle, setCardTitle] = useState("Create variable");
	const [variableName, setVariableName] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [value, setValue] = useState('');
	const [expandParameter, setExpandParameter] = useState(true);
	const [expandSummary, setExpandSummary] = useState(true);
	const [selectParameter, setSelectParameter] = useState(false);
	const [selectedRow, setSelectedRow] = useState([]);
	const [code, setCode] = useState(
		`import banana

		class Monkey:
			# Bananas the monkey can eat.
			capacity = 10
			def eat(self, n):
				"""Make the monkey eat n bananas!"""
				self.capacity -= n * banana.size

			def feeding_frenzy(self):
				self.eat(9.25)
				return "Yum yum"`
	)

	const { TextArea } = Input;

	const addVariableName = (e, title) => {
		if (title === "Create variable") {
			setCardTitle("Select parameter")
			setVariableName("");
			setSelectParameter(true);
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

	const data = [
		'Variable 1',
		'Variable 2',
		'Variable 3',
		'Variable 4',
		'Variable 5',
	];
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

	const [tableData, setTableData] = useState([
		{
			"batch": "ABL2215",
			"FUNCTION_1": "",
		}
	]);

	const createVariable = () => {
		const jsonData = { ...viewDataJson };
		const paramObj = { ...selectedRow };

		jsonData && jsonData?.data.map((ele) => {
			return ele.variables[variableName] = paramObj
		})
		setViewDataJson(jsonData)
		setIsModalOpen(!isModalOpen)
		setCardTitle("Create variable")
		setSelectedRow([])

		setRightPanelCollapsed(false);
		setLeftPanelCollapsed(true);


	}

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
							columns={columns}
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
						cardTitle={cardTitle} setCardTitle={setCardTitle}
						selectParameter={selectParameter} setSelectParameter={setSelectParameter}
						viewDataJson={viewDataJson} setViewDataJson={setViewDataJson}
						selectedRow={selectedRow} setSelectedRow={setSelectedRow}
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
						<Card title='Script Editor' className='custom__card '>
							<CodeEditor
								value={code}
								language="python"
								placeholder="Please enter the script"
								onChange={(evn) => setCode(evn.target.value)}
								padding={15}
								style={{
									fontSize: 12,
									backgroundColor: "#f5f5f5",
									fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
								}}
							/>
							<div className="function__logs--wrapper">
								<p>Logs</p>
								<TextArea
									value={value}
									onChange={(e) => setValue(e.target.value)}
									placeholder="Logs"
									autoSize={{
										minRows: 3,
										maxRows: 10,
									}}
								/>
							</div>
							<div className="evaluate-function__wrapper">
								<Button className='custom-primary-btn'>Evaluate function</Button>
							</div>
						</Card>
						<Card title='Function name' className='custom__card '>
							<div className="function__editor">
								<InputField
									// label="Variable name"
									placeholder="Enter function name"
									value={variableName}
									onChangeInput={(e) => setVariableName(e.target.value)}
								/>
								<Button className='custom-primary-btn'>Cancel</Button>
								<Button className='custom-secondary-btn'>Save function</Button>
							</div>
						</Card>
					</div>
					<Card title='Available variable/function' className='custom__card '>
						<Collapse className='function__collapse--wrapper' defaultActiveKey={['1']}>
							<Panel header="Variable" key="1">
								<List
									size="small"
									dataSource={data}
									renderItem={(item) => <List.Item>{item}</List.Item>}
								/>
							</Panel>
							<Panel header="Function" key="2">
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
		</div >
	)
}

export default ViewParamterSummary;