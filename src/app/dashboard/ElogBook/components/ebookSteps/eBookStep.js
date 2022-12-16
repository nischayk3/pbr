import { Button, Divider, Form, Steps, Tabs } from "antd";
import { useState } from "react";
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

const EbookStep = () => {
	const [current, setCurrent] = useState(1);
	const [state, setState] = useState(Data)
	const [drive, setDrive] = useState(null);
	const [form] = Form.useForm();
	const [newform, setnewform] = useState(false)

	const location = useLocation();
	const sendDataToParent = (index) => { // callback
		setnewform(index)
		setnewform(true)
		setDrive(index);
	};

	const handleNext = () => {
		setState(drive)
	}

	const TabsData1 = [
		{
			key: "1",
			title: "Meta data",
			data: <div className="form-wrapper">

<<<<<<< HEAD
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


			<div>
				{current === 0 && (
					<div className="main-layout">
					<MetaData Alldata={state} sendDataToParent={sendDataToParent} />
					</div>
					// <DesignForm />
				)}

				{current === 1 && (
					<div className="main-layout">
					<MetaData Alldata={state} sendDataToParent={sendDataToParent} />
					</div>
				)}

				{current < 2 && (
					<div style={{ textAlign: "center" }}>

					</div>
				)}
			</div>
		</div>
		},
			{
				key: "2",
				title: <span>{newform  ? "First form name": "Form1"}</span>,
				sercolor:"Awaitingapproval",
				data: 
				// <div>
					<div className="form-wrapper">
	
=======
>>>>>>> f617a3e939b42c5e3e7d97597e07973fb019efed
				<div className="metadata-subheader ">
					<div className="button-layout">
<<<<<<< HEAD
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
=======
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
							>
								Next
							</Button>
						</div>

>>>>>>> f617a3e939b42c5e3e7d97597e07973fb019efed
					</div>
				</div>


				<div>
					{current === 0 && (
						<div className="main-layout">
							<MetaData Alldata={state} sendDataToParent={sendDataToParent} />
						</div>
						// <DesignForm />
					)}

					{current === 1 && (
						<div className="main-layout">
							<MetaData Alldata={state} sendDataToParent={sendDataToParent} />
						</div>
					)}

					{current < 2 && (
						<div style={{ textAlign: "center" }}>

						</div>
					)}
				</div>
			</div>
		},
		{
			key: "2",
			title: <span>{newform ? "First form name" : "Form1"}</span>,
			sercolor: "Awaitingapproval",
			data:
				// <div>
				<div className="form-wrapper">

					<div className="metadata-subheader ">
						<div className="title-layout">
							<p>Design form</p>
						</div>
						<div className="stepper-layout">
							<Steps
								size="small"
								current={0}
							>
								{/* <Step key={0} title="Meta data" /> */}
								<Step key={0} title="Design form" />
								<Step key={1} title="Script editor" />

							</Steps>
						</div>
						<div className="button-layout">
							<Button
								className={newform === false ? "custom-primary-btn" : "custom-secondary-btn"}
								type="primary"
								onClick={(e) => handleNext(e)}
							>
								Save form
							</Button>
							<Button
								className={newform === false ? "pbbutton custom-primary-btn" : "pbbutton custom-secondary-btn"}
								type="primary"
								onClick={(e) => handleNext(e)}
							>
								Publish form
							</Button>
						</div>
					</div>





					<div>
						{current === 0 && (
							<h3>Step1</h3>
							// <MetaData Alldata={state} sendDataToParent={sendDataToParent} />
							// <DesignForm />
						)}

						{current === 1 && (
							// <ImportForm />
							newform === false ? <EditorNew sendDataToParent={sendDataToParent} /> : <EditorTemplate />
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
			key: "3",
			title: "New form",
			data: <h5>In progressing...</h5>
		}
	]


	const TabsData = [
		{
			key: "1",
			title: "Meta data",
			data: <div className="form-wrapper">

<<<<<<< HEAD
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
					>
						Next
					</Button>
=======
				<div className="metadata-subheader ">
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
							>
								Next
							</Button>
						</div>

>>>>>>> f617a3e939b42c5e3e7d97597e07973fb019efed
					</div>
				</div>


				<div>
					{current === 0 && (
						<div className="main-layout">
							<MetaData Alldata={state} sendDataToParent={sendDataToParent} />
						</div>
						// <DesignForm />
					)}

					{current === 1 && (
						<div className="main-layout">
							<MetaData Alldata={state} sendDataToParent={sendDataToParent} />
						</div>
					)}

					{current < 2 && (
						<div style={{ textAlign: "center" }}>

						</div>
					)}
				</div>
<<<<<<< HEAD
			</div> */}


			<div>
				{current === 0 && (
					<div className="main-layout">
					<MetaData Alldata={state} sendDataToParent={sendDataToParent} />
					</div>
					// <DesignForm />
				)}

				{current === 1 && (
					<div className="main-layout">
					<MetaData Alldata={state} sendDataToParent={sendDataToParent} />
					</div>
				)}

				{current < 2 && (
					<div style={{ textAlign: "center" }}>

					</div>
				)}
			</div>
		</div>
=======
			</div>
>>>>>>> f617a3e939b42c5e3e7d97597e07973fb019efed
		},
		{
			key:"2",
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
						{TabsData1.map((i) =>

							<TabPane
								tab={
									<span className="tab-title">
										{<StatusInd className={i.sercolor} />}
										<span className="tab-name">{i.title}</span>
									</span>
								}
								key={i.key} >
								{i.data}
							</TabPane>
						)}

					</Tabs>

				</div>

			</div>
		</div>
	);
};


export default EbookStep
