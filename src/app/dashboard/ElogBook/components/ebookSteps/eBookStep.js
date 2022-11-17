import { Form, Steps } from "antd";
import { useState } from "react";
import BreadCrumbWrapper from "../../../../../components/BreadCrumbWrapper";
import "./eBookStep.scss";
import MetaData from "./metaData/metaData";

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
	const description = 'This is a description.';

	return (
		<div className="custom-wrapper">
			<BreadCrumbWrapper />
			<div className="custom-content-layout">
				<div className="template-header">
					<p>New template - [template_name_entered_by_user]</p>
				</div>
				<div className="form-wrapper">
					<div className="form-left-panel">
						<Steps direction="vertical" current={current}>
							<Step key={0} title="Meta data" description='Configure basic details' />
							<Step key={1} title="Design form" description="Build the template" />
							<Step key={2} title="Script editor" description="Verify all technical names" />
						</Steps>

					</div>

					<div className="form-right-panel">
						{current === 0 && (
							<MetaData />
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
	);
};


export default EbookStep
