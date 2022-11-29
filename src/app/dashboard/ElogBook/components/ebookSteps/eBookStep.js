import { Form, Steps, Button } from "antd";
import { useState } from "react";
import BreadCrumbWrapper from "../../../../../components/BreadCrumbWrapper";
import "./eBookStep.scss";
import MetaData from "./metaData/metaData";
import DesignForm from "./designForm/designForm";
import EditorTemplate from "./editorTemplate/editorTemplate";
import { Tabs } from 'antd';
const { TabPane } = Tabs;
const { Step } = Steps;
const { Item } = Form;

const Data = [
	{
		key: 1,
		MetaData: "custom mete data",
		KeyData: "Data1",
		ValueData: "Value1",
		selectDrop: true,
		Allowedit: false,
	},
	{
		key: 2,
		MetaData: "custom mete data",
		KeyData: "Data2",
		ValueData: "Value2",
		selectDrop: true,
		Allowedit: true,
	},
	{
		key: 3,
		MetaData: "Site",
		KeyData: "Site",
		ValueData: "Value3",
		selectDrop: true,
		Allowedit: false,
	},
]

const EbookStep = () => {
	const [current, setCurrent] = useState(0);
	const [state, setState] = useState(Data)
	const [drive, setDrive] = useState(null);
	const [form] = Form.useForm();

	const sendDataToParent = (index) => { // callback
		setDrive(index);
	};

	const handleNext = () => {
		setState(drive)
	}
	return (
		<div className="custom-wrapper">
			<BreadCrumbWrapper />
			<div className="custom-content-layout">
				{/* <EditorTemplate /> */}

				<div className="template-header">
					<p>New template - [template_name_entered_by_user]</p>
				</div>
				<div className="content-layout">
					<Tabs
						defaultActiveKey="1"
						// onChange={onChange}
						style={{ display: "flex", justifyContent: "space-between" }}
					>
						<TabPane tab="First form name" key="1" >
							<div className="form-wrapper">

								<div className="metadata-subheader ">
									<div className="title-layout">
										<p>Meta Data</p>
									</div>
									<div className="stepper-layout">
										<Steps
											size="small"
											current={current}
										>
											<Step key={0} title="Meta data" />
											<Step key={1} title="Design form" />
											<Step key={2} title="Script editor" />

										</Steps>
									</div>
									<div className="button-layout">
										<Button
											className="custom-secondary-btn"
											type="primary"
											onClick={(e) => handleNext(e)}
										>
											Save and next
										</Button>
									</div>
								</div>


								<div>
									{current === 0 && (
										<MetaData Alldata={state} sendDataToParent={sendDataToParent} />
										// <DesignForm />
									)}

									{current === 1 && (
										<h3>Step2</h3>
									)}

									{current < 2 && (
										<div style={{ textAlign: "center" }}>

										</div>
									)}
								</div>
							</div>
						</TabPane>
						<TabPane tab="New form" key="2">
							In progressing...
						</TabPane>
					</Tabs>

				</div>

			</div>
		</div>
	);
};


export default EbookStep
