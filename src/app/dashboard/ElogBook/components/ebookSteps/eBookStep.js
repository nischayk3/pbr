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
const { TabPane } = Tabs;
const { Step } = Steps;
const { Item } = Form;

const Data = [
	{
		key: 1,
			MetaData: "",
			KeyData: "",
			ValueData: "",
			selectDrop: false,
			Allowedit: false
		// key: 1,
		// MetaData: "",
		// KeyData: "Data1",
		// ValueData: "Value1",
		// selectDrop: true,
		// Allowedit: false,
	},
	// {
	// 	key: 2,
	// 	MetaData: "custom mete data",
	// 	KeyData: "Data2",
	// 	ValueData: "Value2",
	// 	selectDrop: true,
	// 	Allowedit: true,
	// },
	// {
	// 	key: 3,
	// 	MetaData: "Site",
	// 	KeyData: "Site",
	// 	ValueData: "Value3",
	// 	selectDrop: true,
	// 	Allowedit: false,
	// },
]
const TabsData = [
	{
		key: 1,
		sticky: "Meta data",
		title:"Meta data",
	// 	data: <div className="form-wrapper">

	// 	{/* <div className="metadata-subheader ">
	// 		<div className="button-layout">
	// 			<div className="layout-button">
	// 				<span className="data-button">
	// 			<Button
	// 				className="custom-secondary-btn "
	// 				type="primary"
	// 				onClick={(e) => handleNext(e)}
	// 			>
	// 				Save meta data
	// 			</Button>
	// 			</span>
	// 			<Button
	// 				className="custom-secondary-btn"
	// 				type="primary"
	// 				onClick={(e) => handleNext(e)}
	// 				disabled = {state.length > 1 ? false : true}
	// 			>
	// 				Next
	// 			</Button>
	// 			</div>
				
	// 		</div>
	// 	</div> */}


	// 	{/* <div>
	// 		{current === 0 && (
	// 			<div className="main-layout">
	// 			<MetaData Alldata={state} sendDataToParent={sendDataToParent} />
	// 			</div>
	// 			// <DesignForm />
	// 		)}

	// 		{current === 1 && (
	// 			<div className="main-layout"> */}
	// 			<MetaData Alldata={state} sendDataToParent={sendDataToParent} />
	// 			{/* </div>
	// 		)}

	// 		{current < 2 && (
	// 			<div style={{ textAlign: "center" }}>

	// 			</div>
	// 		)}
	// 	</div> */}
	// </div>
	},
		{
			key: 2,
			sticky: "Form",
			title:  "Form",
			sercolor:"Awaitingapproval",
			// data: 
		},
		{
			key:3,
			sticky: "New form",
			title: "New form",
			data: <h5>In progressing...</h5>
		},
		
]

const EbookStep = () => {
	const [current, setCurrent] = useState(1);
	const [state, setState] = useState(TabsData)
	const [drive, setDrive] = useState(null);
	const [form] = Form.useForm();
	const [newform, setnewform] = useState(false)

	const location = useLocation();
	const sendDataToParent = (index) => { // callback
		setnewform(index)
		setnewform(true)
		setDrive(index);
	};
	const Sdata = (index) => { // callback
		console.log(index)
		state.splice.apply(state, [2, 0].concat(index));
		console.log(state);
	};
console.log(state);
	const handleNext = () => {
		setState(drive)
	}

	useEffect(() => {
     setState(state)
	},[state])
	const TabsData1 = [
		{
			key: "1",
			title:"Meta data",
			data: <div className="form-wrapper">

			{/* <div className="metadata-subheader ">
				<div className="button-layout">
					<div className="layout-button">
						<span className="data-button">
					<Button
						className="custom-secondary-btn "
						type="primary"
						onClick={(e) => handleNext(e)}
					>
						Save meta data
					</Button>
					</span>
					<Button
						className="custom-secondary-btn"
						type="primary"
						onClick={(e) => handleNext(e)}
						disabled = {state.length > 1 ? false : true}
					>
						Next
					</Button>
					</div>
					
				</div>
			</div> */}


			{/* <div>
				{current === 0 && (
					<div className="main-layout">
					<MetaData Alldata={state} sendDataToParent={sendDataToParent} />
					</div>
					// <DesignForm />
				)}

				{current === 1 && (
					<div className="main-layout"> */}
					<MetaData Alldata={state} sendDataToParent={sendDataToParent} />
					{/* </div>
				)}

				{current < 2 && (
					<div style={{ textAlign: "center" }}>

					</div>
				)}
			</div> */}
		</div>
		},
			{
				key: "2",
				title: <span>{newform  ? "First form name": "Form1"}</span>,
				sercolor:"Awaitingapproval",
				data: 
				// <div>
					<div className="form-wrapper">
	
				{/* <div className="metadata-subheader ">
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
					</div>
					<div className="button-layout">
						<Button
							className={newform === false ? "custom-primary-btn":"custom-secondary-btn"}
							type="primary"
							onClick={(e) => handleNext(e)}
							disabled
						>
							Save form
						</Button>
						<Button
							className={newform === false ? "pbbutton custom-primary-btn":"pbbutton custom-secondary-btn"}
							type="primary"
							onClick={(e) => handleNext(e)}
							disabled
						>
							Publish form
						</Button>
					</div>
				</div> */}
			


	
	
				<div>
					{current === 0 && (
							<h3>Step1</h3>
						// <MetaData Alldata={state} sendDataToParent={sendDataToParent} />
						// <DesignForm />
					)}
	
					{current === 1 && (
					// <ImportForm />
					newform === false ? <EditorNew sendDataToParent={sendDataToParent}  /> :	<EditorTemplate />
					)}
	
					{current < 2 && (
						<div style={{ textAlign: "center" }}>
	
						</div>
					)}
				</div>
				</div>
			// </div>
			},
			{
				key:"3",
				title: "New form",
				data: <h5>In progressing...</h5>
			}
	]


	
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
	]
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
					{/* <p>New template - [template_name_entered_by_user]</p> */}
					<p>{location.formData.Tname}<Divider type="vertical" /><img src={templateicon} alt="create" className='img' />{location.formData.Pname}</p>
				</div>
				<div className="content-layout">
					<Tabs
						defaultActiveKey="2"
						// onChange={onChange}
						style={{ display: "flex", justifyContent: "space-between" }}
						tabBarExtraContent={operations}
					>
						{ state.map((i) =>
					
						<TabPane 
						tab={
							<span className="tab-title">
							  {<StatusInd className={i.sercolor} />}
							<span className="tab-name">{i.title}</span>  
							</span>
						  }
						 key={i.key} >
							{i.sticky == "Meta data" ? <MetaData /> : i.sticky == "Form" ? <EditorNew Sdata={Sdata} /> : i.sticky == "New form" ? <EditorTemplate /> : (<div>forms</div>)}
						</TabPane>
						)}
						
					</Tabs>

				</div>

			</div>
		</div>
	);
};


export default EbookStep