import React, { useState, useCallback } from 'react';
import TopBarItem from './TopBarItem';
import initialData from './initialdata';
import { v4 as uuidv4 } from 'uuid';
import {
	handleMoveWithinParent,
	handleMoveToDifferentParent,
	handleMoveSidebarComponentIntoParent,
	handleRemoveItemFromLayout
} from "./helpers";

import DropZone from "./DropZone";
import TrashDropZone from "./TrashDropZone";
import Row from "./Row";

import { SIDEBAR_ITEMS, SIDEBAR_ITEM, COMPONENT, COLUMN } from "./data";
import rightarrow from './rightarrow.png';
import { Button, Dropdown, Layout, Menu, Select, Tabs, Steps, Checkbox } from 'antd';
import CheckboxForm from './CheckboxForm';
import InputForm from './InputForm';
import TextForm from './TextForm';
import Tableform from './Tableform';
import RadioForm from './RadioForm';
import LineForm from './LineForm';
const { Header, Sider, Content } = Layout;
const { TabPane } = Tabs;

const TabsData1 = [
	{
		key: "1",
		title: "Text",

	},
	{
		key: "2",
		title: "Rule",

	},
	{
		key: "3",
		title: "Validation"
	}
]

function editorTemplate() {
	const initialLayout = initialData.layout;
	const initialComponents = initialData.components;
	const [layout, setLayout] = useState(initialLayout);
	const [components, setComponents] = useState(initialComponents);
	const [current, setCurrent] = useState("1");
	const [collapsed, setCollapsed] = useState(false)
	const [filterPanel, setFilterPanel] = useState([]);
	const [completedTasks, setCompletedTasks] = useState([]);
	const [inputData, setInputData] = useState({ technicalname: '', datatype: '', datatype: '', label: '', tooltip: '', id: '', width: '' })
	const [textData, setTextData] = useState({ textlabel: '', fontSize: '', fontWeight: '', id: '', mandatory: false })
	const [checkboxData, setCheckboxData] = useState({ textlabel: '', id: '' })
	const [tableData, setTableData] = useState({ id: '', datasource: '', columns: '', tableName: '', technicalName: '', description: '' })
	const [radioData, setRadioData] = useState({ id: '', textlabel: '', fieldData: [] })
	const [lineData, setLineData] = useState({ id: '', width: '', lineAlign: '' })
	const [editColumn, setEditColumn] = useState('');
	const [editRow, setEditRow] = useState('');
	const [columnData, setColumnData] = useState({ title: '', id: '' })
	const [formData, setFormData] = useState({ columns: '', rows: '' });
	console.log(radioData);
	const handleDropToTrashBin = useCallback(
		(dropZone, item) => {
			const splitItemPath = item.path.split("-");
			setLayout(handleRemoveItemFromLayout(layout, splitItemPath));
		},
		[layout]
	);

	const handleDrop = useCallback(
		(dropZone, item) => {
			console.log('dropZone', dropZone)
			console.log('item', item)

			const splitDropZonePath = dropZone.path.split("-");
			const pathToDropZone = splitDropZonePath.slice(0, -1).join("-");

			const newItem = { id: item.id, type: item.type, };
			if (item.type === COLUMN) {
				newItem.children = item.children;
			}

			// sidebar into
			if (item.type === SIDEBAR_ITEM) {
				// 1. Move sidebar item into page
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
									datasource: [

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

									],
									columns: [

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

									]
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
		console.log(row,"sdafsg");
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

	const changeTab = activeKey => {

		setCurrent(activeKey)
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
			// console.log(fields_data[foundIndex]);
			// if (event == 'technicalname' || event == 'label' || event == 'tooltip') {
			// 	fields_data[foundIndex]['KeyData'] = event
			// 	fields_data[foundIndex]['ValueData'] = ''
			// }
			// else {
			// 	fields_data[foundIndex]['KeyData'] = ''
			// 	fields_data[foundIndex]['ValueData'] = ''
			// }
		}
		setCompletedTasks(fields_data)
	}

	const filteredOrg = [];
	console.log(layout, "layout");
	const handleFilterPanel = (Id) => {
		console.log(Id);
		setRadioData({ ...radioData, id: Id?.id, textlabel: Id?.textlabel, fieldData: Id?.fieldData })
		setFormData({ ...formData, rows: Id?.datasource?.length, columns: Id?.columns?.length })
		// setSelectTable({datasource: Id?.datasource?.length, columns: Id?.columns?.length })
		setInputData({ ...inputData, id: Id?.id, technicalname: Id?.technicalname, label: Id?.label, tooltip: Id?.tooltip, datatype: Id?.datatype })
		setTextData({ ...textData, id: Id?.id, textlabel: Id?.textlabel, fontSize: Id?.fontSize, fontWeight: Id?.fontWeight })
		setCheckboxData({ ...checkboxData, id: Id?.id, textlabel: Id?.textlabel, defaultvalue: Id?.defaultvalue })
		setTableData({ ...tableData, id: Id?.id, datasource: Id?.datasource, columns: Id?.columns })
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
		var filteredArray = layout
			.filter(element => element.children.filter(i => i.children
				.filter(subElement => subElement.id === Id.id)
			))

		const filteredControlPanel = layout.map(i => i.children.map(j => j.children.filter((k) => k.id === Id.id)));
		filteredControlPanel.map((data => data.length > 0) ? setFilterPanel(filteredControlPanel) : '')


	}

	const handleSave = (e) => {
		e.preventDefault();

	}
	const handleColumnTitle = (data, col, i) => {
		console.log(data, col, i);
		const filterData = data.find((i) => i.title === col)
		setColumnData({ ...columnData, id: filterData.key, title: col })

	}

	console.log(layout);
	return (
		<div>
			<Layout>
				<Layout>
					<div className="flex-container">
						<div className='left-screen flex-grow: 8' >

							{Object.values(SIDEBAR_ITEMS).map((sideBarItem, index) => (
								<TopBarItem key={sideBarItem.id} data={sideBarItem} />
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
								<Tabs
									// defaultActiveKey='1'
									activeKey={current}
									onChange={changeTab}
									className="control-panel"
								>
									{/* {completedTasks.map((task, index) =>
										  <div
										  key={task._id}
									   >
										{task.name === "Text" ?  <h3>{task.name}</h3>  : task.name === "Input field" ? <input type="text" /> : ''   } */}




									{TabsData1.map((title) =>
										<TabPane
											className='control-panel-title'

											tab={

												<span className="tab-titles" key={title.key}>
													{title.title}
												</span>

											}
											key={title.key}
											style={{ justifyContent: "space-between" }}

										>
											{

												filterPanel.map((task) =>
													task.map(i => i.map(j =>



														<div className='tabfield'>
															{current === "1" ?
																(j.type === "Input field" ?
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
																						"")



																:

																current === "2" ?
																	<InputForm
																		current="2"
																		task={task}
																		handleFormControl={handleFormControl}
																		handleFormControlSelect={handleFormControlSelect}
																		handleSave={handleSave}
																	/> :
																	current === "3" ?

																		<InputForm
																			current="3"
																			task={task}
																			handleFormControl={handleFormControl}
																			handleFormControlSelect={handleFormControlSelect}
																			handleSave={handleSave}
																		/> : ''

															}</div>



													)))


											}
										</TabPane>

									)}

								</Tabs>
							</div>
						</div>
					</div>

				</Sider>
			</Layout>

		</div>
	);
}

export default editorTemplate;