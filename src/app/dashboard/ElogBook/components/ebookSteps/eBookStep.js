import { Form, Steps, Button } from "antd";
import { useState } from "react";
import BreadCrumbWrapper from "../../../../../components/BreadCrumbWrapper";
import "./eBookStep.scss";
import MetaData from "./metaData/metaData";
import DesignForm from "./designForm/designForm";

const { Step } = Steps;
const { Item } = Form;

const EbookStep = () => {
	const [current, setCurrent] = useState(0);
	const [form] = Form.useForm();
	const handleClickNext = () => {
		form
			.validateFields()
			.then(() => {
				// Here make api call of something else
				setCurrent(current + 1);
			})
			.catch((err) => console.log(err));
	};


	return (
		<div className="custom-wrapper">
			<BreadCrumbWrapper />
			<div className="custom-content-layout">

				<div className="template-header">
					<p>New template - [template_name_entered_by_user]</p>
				</div>
				<div className="content-layout">
					<div className="form-wrapper">

						<div className="metadata-subheader flex-container">
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
								// onClick={() =>  handleNext()}
								>
									Save and next
								</Button>
							</div>
						</div>


						<div>
							{current === 0 && (
								<MetaData />
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
				</div>

			</div>
		</div>
	);
};


export default EbookStep
