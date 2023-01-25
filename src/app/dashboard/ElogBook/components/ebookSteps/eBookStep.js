import { Button, Divider, Form, Steps, Tabs } from "antd";
import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import BreadCrumbWrapper from "../../../../../components/BreadCrumbWrapper";
import StatusInd from "../statusIndicator/statusInd";
import templateicon from './../../../../../assets/editornew/templateicon.png';
import "./eBookStep.scss";
import EditorNew from "./editornew/editorNew";
import EditorTemplate from "./editorTemplate/editorTemplate";
import MetaData from "./metaData/metaData";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
const { TabPane } = Tabs;
const { Step } = Steps;
const { Item } = Form;


const ServicesColor = [
	{
		id: 1,
		label: "Draft",
		class: "Draft"
	},
	{
		id: 2,
		label: "Awaiting approval",
		class: "Awaitingapproval"
	},
	{
		id: 3,
		label: "Approved",
		class: "Approved"
	},
	{
		id: 4,
		label: "Rejected",
		class: "Rejected"
	},
];

const EbookStep = () => {

	const sendDataToParentTab = (i) => {
		setCurrent(i)
	}
	const selecteddata = (index) => { // callback
		state.splice.apply(state, [2, 0].concat(index));
		setCurrent(2)
	};

	const CreateNew = (i) => {
		setCurrent(i);
	}

	const changeTab = activeKey => {
		setCurrent(activeKey)
	};
	const location = useLocation();
	const TabsData = [
		{
			key: "1",
			sticky: "Meta data",
			form_name: "Meta data",
			data: <MetaData sendDataToParentTab={sendDataToParentTab} tempName={location.formData} />

		},
		{
			key: "2",
			sticky: "Form",
			form_name: "Form",
			sercolor: "Draft",
			data: <EditorNew selecteddata={selecteddata} CreateNew={CreateNew} />

		},
		{
			key: "3",
			sticky: "New form",
			form_name: "New form",
			data: <DndProvider backend={HTML5Backend}> <EditorTemplate /></DndProvider>
		},

	];

	const [current, setCurrent] = useState("1");
	const [state, setState] = useState(TabsData)
	const [form] = Form.useForm();



	useEffect(() => {
		setState(state)
	}, [state])


	const operations = <div className="tabService">
		{ServicesColor.map((i) =>
			<StatusInd key={i.id} label={i.label} className={i.class}></StatusInd>
		)}
	</div>;

	return (
		<div className="custom-wrapper">
			<BreadCrumbWrapper />
			<div className="custom-content-layout">

				<div className="template-header">
					<p>{location.formData.Tname}<Divider type="vertical" /><img src={templateicon} alt="create" className='img' />{location.formData.Pname}</p>
				</div>
				<div className="content-layout">
					<Tabs
						activeKey={current}
						onChange={changeTab}
						style={{ display: "flex", justifyContent: "space-between" }}
						tabBarExtraContent={operations}
					>
						{state.map((i) =>

							<TabPane
								tab={
									<span className="tab-title">
										{<StatusInd className={i.sercolor} />}
										<span className="tab-name">{i.form_name}</span>
									</span>
								}
								key={i.key} >
								{i.data}
								{/* == "Meta data" ? : i.sticky == "Form" ? <EditorNew selecteddata={selecteddata} CreateNew={CreateNew} /> : i.sticky == "New form" ? <EditorTemplate /> : (<div>forms</div>)} */}
							</TabPane>
						)}

					</Tabs>

				</div>

			</div>
		</div>
	);
};


export default EbookStep