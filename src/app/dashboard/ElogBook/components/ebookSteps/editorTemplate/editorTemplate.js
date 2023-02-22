import { Button, Layout, Steps } from 'antd';
import React, { useCallback, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Signature from '../../../../../../components/ElectronicSignature/signature';
import { COLUMN, SIDEBAR_ITEM, SIDEBAR_ITEMS } from "./data";
import DropZone from "./DropZone";
import './editorTemplate.scss';
import CheckboxForm from './forms/CheckboxForm';
import InputForm from './forms/InputForm';
import LineForm from './forms/LineForm';
import RadioForm from './forms/RadioForm';
import Tableform from './forms/Tableform';
import TextForm from './forms/TextForm';
import {
	handleMoveSidebarComponentIntoParent, handleMoveToDifferentParent, handleMoveWithinParent, handleRemoveItemFromLayout
} from "./helpers";
import initialData from './initialdata';
import PreviewModel from './preview/PreviewModel';
import rightarrow from './rightarrow.png';
import Row from "./Row";
import SaveModel from './SaveModel/saveModel';
import TopBarItem from './TopBarItem';
import TrashDropZone from "./TrashDropZone";
const { Sider, } = Layout;

const { Step } = Steps;

function editorTemplate() {
	const initialLayout = initialData.layout;
	const initialComponents = initialData.components;
	const [layout, setLayout] = useState(initialLayout);
	const [components, setComponents] = useState(initialComponents);
	const [current, setCurrent] = useState("1");
	const [collapsed, setCollapsed] = useState(true)
	const [filterPanel, setFilterPanel] = useState([]);
	const [completedTasks, setCompletedTasks] = useState([]);
	const [inputData, setInputData] = useState({ technicalname: '', datatype: '', datatype: '', label: '', tooltip: '', id: '', width: '' })
	const [textData, setTextData] = useState({ textlabel: '', fontSize: '', fontWeight: '', id: '', mandatory: false })
	const [checkboxData, setCheckboxData] = useState({ textlabel: '', id: '' })
	const [tableData, setTableData] = useState({ id: '', datasource: '', columns: '', tableName: '', technicalName: '', description: '', tableType: "Normal table" })
	const [radioData, setRadioData] = useState({ id: '', textlabel: '', fieldData: [] })
	const [lineData, setLineData] = useState({ id: '', width: '', lineAlign: '' })
	const [editColumn, setEditColumn] = useState('');
	const [editRow, setEditRow] = useState('');
	const [columnData, setColumnData] = useState({ title: '', id: '' })
	const [formData, setFormData] = useState({ columns: '', rows: '' });
	const [previewData, setPreviewData] = useState(false);
	const [saveModel, setSaveModel] = useState(false);
	const [isPublish, setIsPublish] = useState(false);
	const [status, setStatus] = useState('');
	const [approveReject, setApproveReject] = useState('')


	const handleDropToTrashBin = useCallback(
		(dropZone, item) => {
			const splitItemPath = item.path.split("-");
			setLayout(handleRemoveItemFromLayout(layout, splitItemPath));
		},
		[layout]
	);

	const handleDrop = useCallback(
		(dropZone, item) => {
			const splitDropZonePath = dropZone.path.split("-");
			const pathToDropZone = splitDropZonePath.slice(0, -1).join("-");

			const newItem = { id: item.id, type: item.type, };
			if (item.type === COLUMN) {
				newItem.children = item.children;
			}

			if (item.type === SIDEBAR_ITEM) {

				const newComponent = {
					id: uuidv4(),
					...item.component
				};

				const newItem =
					newComponent.type === "Input field" ? {
						id: newComponent.id,
						type: newComponent.type,
						technicalname: "",
						datatype: "",
						label: "",
						tooltip: "",
						width: ""
					} : newComponent.type === "Text" ?
						{
							id: newComponent.id,
							type: newComponent.type,
							textlabel: '',
							fontSize: '',
							fontWeight: ''
						} : newComponent.type === "Checkbox" ?
							{
								id: newComponent.id,
								type: newComponent.type,
								textlabel: '',
								defaultvalue: ''
							} : newComponent.type === "Table" ?
								{
									id: newComponent.id,
									type: newComponent.type,
									tableName: '',
									technicalName: '',
									description: '',
									tableType: "Normal table",
									datasource: tableData.tableType === "Normal table" ? [

										{
											"column1": "Mean1",
											"key": uuidv4(),
											"column2": "Row1",
											"column3": "Row1",
											"tableId": 25
										},
										{
											"column1": "Mean2",
											"key": uuidv4(),
											"column2": "Row2",
											"column3": "Row2",
											"tableId": 25
										},
										{
											"column1": "Mean3",
											"key": uuidv4(),
											"column2": "Row3",
											"column3": "Row3",
											"tableId": 25
										}

									] : tableData.tableType === "Nested table" ? [

										{
											"subcolumn1": "Row1",
											"key": uuidv4(),
											"subcolumn11": "Row1",
											"subcolumn12": "Row1",
											"subcolumn21": "Row1",
											"subcolumn22": "Row1",
											"subcolumn31": "Row1",
											"subcolumn32": "Row1",
											"tableId": 25
										},
										{
											"subcolumn1": "Row2",
											"key": uuidv4(),
											"subcolumn11": "Row2",
											"subcolumn12": "Row2",
											"subcolumn21": "Row2",
											"subcolumn22": "Row2",
											"subcolumn31": "Row2",
											"subcolumn32": "Row2",
											"tableId": 25
										},
										{
											"subcolumn1": "Row3",
											"key": uuidv4(),
											"subcolumn11": "Row3",
											"subcolumn12": "Row3",
											"subcolumn21": "Row3",
											"subcolumn22": "Row3",
											"subcolumn31": "Row3",
											"subcolumn32": "Row3",
											"tableId": 25
										},
									] : "",
									columns: tableData.tableType === "Normal table" ? [

										{
											"align": "",
											"dataIndex": "column1",
											"editable": true,
											"key": uuidv4(),
											"label": "",
											"name": "",
											"title": "column1",
											"type": ""
										},
										{
											"align": "",
											"dataIndex": "column2",
											"editable": true,
											"key": uuidv4(),
											"label": "",
											"name": "",
											"title": "column2",
											"type": ""
										},
										{
											"align": "",
											"dataIndex": "column3",
											"editable": true,
											"key": uuidv4(),
											"label": "",
											"name": "",
											"title": "column3",
											"type": ""
										}

									] : tableData.tableType == "Nested table" ? [

										{
											"align": "",
											"dataIndex": "column1",
											"editable": true,
											"key": uuidv4(),
											"label": "",
											"name": "",
											"title": "column1",
											"type": "",
											"children": [
												{
													"align": "",
													"dataIndex": "subcolumn1",
													"editable": true,
													"key": "168255f7-fa56-4dcf-88da-293441125be4",
													"label": "",
													"name": "",
													"title": "subcolumn1",
													"type": ""
												}
											]
										},
										{
											"align": "",
											"dataIndex": "column2",
											"editable": true,
											"key": uuidv4(),
											"label": "",
											"name": "",
											"title": "column2",
											"type": "",
											"children": [
												{
													"align": "",
													"dataIndex": "subcolumn11",
													"editable": true,
													"key": "11e92ebe-5d1e-43cb-8ebb-2bffdf4a4dc7",
													"label": "",
													"name": "",
													"title": "subcolumn11",
													"type": ""
												},
												{
													"align": "",
													"dataIndex": "subcolumn12",
													"editable": true,
													"key": "0f58d30a-22eb-4438-8311-d76af4ef161e",
													"label": "",
													"name": "",
													"title": "subcolumn12",
													"type": ""
												}
											]
										},
										{
											"align": "",
											"dataIndex": "column3",
											"editable": true,
											"key": uuidv4(),
											"label": "",
											"name": "",
											"title": "column3",
											"type": "",
											"children": [
												{
													"align": "",
													"dataIndex": "subcolumn21",
													"editable": true,
													"key": "2bc42260-b687-4d65-ac47-f59a2f4a1acc",
													"label": "",
													"name": "",
													"title": "subcolumn21",
													"type": ""
												},
												{
													"align": "",
													"dataIndex": "subcolumn22",
													"editable": true,
													"key": "08c70fc1-f95f-4efc-9c0e-c261dd6d3a98",
													"label": "",
													"name": "",
													"title": "subcolumn22",
													"type": ""
												}
											]
										},
										{
											"align": "",
											"dataIndex": "column4",
											"editable": true,
											"key": uuidv4(),
											"label": "",
											"name": "",
											"title": "column4",
											"type": "",
											"children": [
												{
													"align": "",
													"dataIndex": "subcolumn31",
													"editable": true,
													"key": uuidv4(),
													"label": "",
													"name": "",
													"title": "subcolumn31",
													"type": ""
												},
												{
													"align": "",
													"dataIndex": "subcolumn32",
													"editable": true,
													"key": uuidv4(),
													"label": "",
													"name": "",
													"title": "subcolumn32",
													"type": ""
												}
											]
										}


									] : ""
								} : newComponent.type === "Multiple choice" ?
									{
										id: newComponent.id,
										type: newComponent.type,
										textlabel: '',
										fieldData: [
											{ id: 1, value: "Hi" }
										]
									} : newComponent.type === "Line" ?
										{
											id: newComponent.id,
											type: newComponent.type,
											width: '',
											lineAlign: ''
										} : {
											id: newComponent.id,
											type: newComponent.type,
										}
				setComponents({
					...components,
					[newComponent.id]: newComponent
				});
				setLayout(
					handleMoveSidebarComponentIntoParent(
						layout,
						splitDropZonePath,
						newItem
					)
				);
				setCompletedTasks([...completedTasks, {
					id: completedTasks.length + 1, control_panel
						: '',
					control_data: '',
					name
						: ''
				}])
			}

			// move down here since sidebar items dont have path
			const splitItemPath = item.path.split("-");
			const pathToItem = splitItemPath.slice(0, -1).join("-");

			// 2. Pure move (no create)
			if (splitItemPath.length === splitDropZonePath.length) {
				// 2.a. move within parent
				if (pathToItem === pathToDropZone) {
					setLayout(
						handleMoveWithinParent(layout, splitDropZonePath, splitItemPath)
					);
					return;
				}

				// 2.b. OR move different parent
				// TODO FIX columns. item includes children
				setLayout(
					handleMoveToDifferentParent(
						layout,
						splitDropZonePath,
						splitItemPath,
						newItem
					)
				);

				return;
			}

			// 3. Move + Create
			setLayout(
				handleMoveToDifferentParent(
					layout,
					splitDropZonePath,
					splitItemPath,
					newItem
				)
			);
			return;
		},
		[layout, components]
	);
	const renderRow = (row, currentPath) => {
		return (
			<Row
				key={row.id}
				data={row}
				handleDrop={handleDrop}
				components={components}
				path={currentPath}
				handleFilterPanel={handleFilterPanel}
				handleColumnTitle={handleColumnTitle}
				layout={layout}
				setLayout={setLayout}
			/>
		);
	};

	const handleFormControl = (col, event, task) => {
		let fields_data = [...layout]
		var foundIndex =
			fields_data
				.map(element => element.children.map(i => i.children
					.findIndex(subElement => subElement.id === task.id)
				))
		setCompletedTasks(fields_data)
	}

	const handleFormControlSelect = (col, event, task) => {
		let fields_data = [...completedTasks]
		var foundIndex = fields_data.findIndex(x => x.id == task.id);
		if (foundIndex > -1) {
			switch (col) {
				case 'defaultvalue':
					fields_data[foundIndex]['defaultvalue'] = event
					break;
				case 'datatype':
					fields_data[foundIndex]['datatype'] = event
					break;
			}

		}
		setCompletedTasks(fields_data)
	}

	const filteredOrg = [];
	const handleFilterPanel = (Id) => {
		setCollapsed(false)
		setRadioData({ ...radioData, id: Id?.id, textlabel: Id?.textlabel, fieldData: Id?.fieldData })
		setFormData({ ...formData, rows: Id?.datasource?.length, columns: Id?.columns?.length })
		setInputData({ ...inputData, id: Id?.id, technicalname: Id?.technicalname, label: Id?.label, tooltip: Id?.tooltip, datatype: Id?.datatype, width: Id?.width })
		setTextData({ ...textData, id: Id?.id, textlabel: Id?.textlabel, fontSize: Id?.fontSize, fontWeight: Id?.fontWeight })
		setCheckboxData({ ...checkboxData, id: Id?.id, textlabel: Id?.textlabel, defaultvalue: Id?.defaultvalue })
		setTableData({ ...tableData, id: Id?.id, datasource: Id?.datasource, columns: Id?.columns, })
		setLineData({ ...lineData, id: Id?.id, width: Id.width, lineAlign: Id.lineAlign })
		const res = layout.map(
			item => item.children.map(
				employee => employee.children.filter(address => address.id === Id.id)
			)
		);
		layout.forEach((item) => {
			item.children.forEach((employe) => {
				employe.children.forEach((address) => {
					if (address.id === Id.id) {
						filteredOrg.push(item);
					}
				});
			});

		});

		// var filteredArray = layout
		// 	.filter(element => element.children.filter(i => i.children
		// 		.filter(subElement => subElement.id === Id.id)
		// 	))

		const filteredControlPanel = layout.map(i => i.children.map(j => j.children.filter((k) => k.id === Id.id)));
		filteredControlPanel.map((data => data.length > 0) ? setFilterPanel(filteredControlPanel) : '')
	}

	const handleColumnTitle = (data, col) => {
		const filterData = data.find((i) => i.title === col)
		setColumnData({ ...columnData, id: filterData.key, title: col })
	}

	const onClickPreview = () => {
		const tempLayoutData = JSON.parse(JSON.stringify(layout));
		tempLayoutData.forEach((row) => {
			const columnLenght = 24 / row.children.length;
			row.children.forEach((column) => {
				column.span = columnLenght;
			})

		})
		setLayout(tempLayoutData);
		setPreviewData(!previewData)
	}

	const onClickSaveForm = () => {
		setSaveModel(!saveModel);
	}

	const handleClose = () => {
		setIsPublish(false)
	};

	const PublishResponse = (res) => {
		setStatus(res.rep_stauts)
	}

	return (
		<div>
			<div className="step-subheader ">
				<div className="title-layout">
					<p>Design form</p>
				</div>
				<div className="stepper-layout">
					<Steps
						size="small"
						current={0}
					>
						<Step key={0} title="Design form" />
						<Step key={1} title="Script editor" />

					</Steps>
					<div>
						{current === 0 && (
							<div>
							</div>

						)}
						{current < 1 && (
							<div style={{ textAlign: "center" }}>
							</div>
						)}
					</div>
				</div>
				<div className="button-layout">
					<span className="data-button">
						<Button
							className={"custom-primary-btn"}
							type="primary"
							onClick={
								onClickPreview
							}>Preview</Button>
						<PreviewModel previewData={previewData} layout={layout} />
					</span>
					{/* </div> */}
					<span className="data-button">
						<Button
							className="custom-secondary-btn "
							type="primary"
							onClick={
								onClickSaveForm
							}
						// disabled
						>
							Save form
						</Button>
						<SaveModel saveModel={saveModel} layout={layout} />
					</span>
					<Button
						className="custom-secondary-btn "
						type="primary"
						onClick={() => {
							setIsPublish(true);
							setApproveReject('P');
						}}
						disabled
						style={{ marginRight: '16px' }}
					>
						Publish form
					</Button>
				</div>
			</div>
			<Layout>
				<Layout >
					<div className="flex-container">
						<div className='left-screen flex-grow: 8' >

							{Object.values(SIDEBAR_ITEMS).map((sideBarItem, index) => (
								<TopBarItem key={sideBarItem.id} data={sideBarItem} collapsed={collapsed} />
							))}
						</div>
					</div>

					<div className="pageContainer">
						<div className="page">
							{layout.map((row, index) => {
								const currentPath = `${index}`;

								return (
									<React.Fragment key={row.id}>
										<DropZone
											data={{
												path: currentPath,
												childrenCount: layout.length
											}}
											onDrop={handleDrop}
											path={currentPath}
										/>
										{renderRow(row, currentPath)}
									</React.Fragment>
								);
							})}
							{/* <div style={{ height: layout.length > 0 ? "140px" : "15px" }}> */}
							<DropZone
								data={{
									path: `${layout.length}`,
									childrenCount: layout.length
								}}
								onDrop={handleDrop}
								isLast
								layout={layout}

							/>
							{/* </div> */}
						</div>
						<TrashDropZone
							data={{
								layout
							}}
							onDrop={handleDropToTrashBin}

						/>
					</div>
				</Layout>
				<Sider
					trigger={null}
					collapsible
					collapsedWidth={12}
					collapsed={collapsed}
					theme={'light'}
					width="294"
					className="slider-layout"
				>
					<div className='flex-container slide-total'>
						<div className='slider-button flex-grow: 4' onClick={() => setCollapsed(!collapsed)}>
							<img src={rightarrow} alt="upload" className='imgstyle' />
						</div>
						<div className='slider-main flex-grow: 8'>
							<div className='slider-header'> <p className='slider-text'> Control panel</p></div>
							<div className='tab-main'>
								{
									filterPanel.map((task) =>
										task.map(i => i.map(j =>
											<div className='tabfield'>
												{j.type === "Input field" ?
													<InputForm
														current="1"
														layout={layout}
														handleFormControl={handleFormControl}
														handleFormControlSelect={handleFormControlSelect}
														inputData={inputData}
														setInputData={setInputData}
														setLayout={setLayout}
													/>
													: j.type === "Text" ?
														<TextForm
															current="1"
															layout={layout}
															task={task}
															handleFormControl={handleFormControl}
															textData={textData}
															setTextData={setTextData}
															setLayout={setLayout}
														/>
														: j.type === "Checkbox" ?
															<CheckboxForm
																current="1"
																task={task}
																layout={layout}
																setLayout={setLayout}
																checkboxData={checkboxData}
																setCheckboxData={setCheckboxData}
																handleFormControl={handleFormControl}
																handleFormControlSelect={handleFormControlSelect}
															/>
															: j.type === "Table" ?
																<Tableform
																	current="1"
																	task={task}
																	layout={layout}
																	setLayout={setLayout}
																	tableData={tableData}
																	setTableData={setTableData}
																	//  selecttable={selecttable}
																	formData={formData}
																	setFormData={setFormData}
																	editColumn={editColumn}
																	columnData={columnData}
																	setColumnData={setColumnData}
																	editRow={editRow}
																/> : j.type === "Multiple choice" ?
																	<RadioForm
																		current="1"
																		radioData={radioData}
																		setRadioData={setRadioData}
																		layout={layout}
																		setLayout={setLayout}
																	/> : j.type === "Line" ?
																		<LineForm
																			current="1"
																			lineData={lineData}
																			setLineData={setLineData}
																			layout={layout}
																			setLayout={setLayout}
																		/> :
																		""
												}</div>
										)))
								}
							</div>
						</div>
					</div>
				</Sider>
			</Layout>
			<Signature
				isPublish={isPublish}
				handleClose={handleClose}
				screenName='Elogbook Template'
				PublishResponse={PublishResponse}
				appType='ELOG_BOOK_DATA_ENTRY'
				dispId={"13"}
				version={1}
				status={approveReject}
			/>
		</div>
	);
}

export default editorTemplate;