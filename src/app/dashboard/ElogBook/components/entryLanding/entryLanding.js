import { Col, Row } from "antd";
import React, { useState } from "react";
import illustrations from "../../../../../assets/images/undraw_fill_form_re_cwyf.png";
import BreadCrumbWrapper from "../../../../../components/BreadCrumbWrapper";
import ScreenHeader from "../../../../../components/ScreenHeader/screenHeader";
import DataEntryCardArea from "./cardArea/cardArea";
import DataEntryFormTabs from "./tabs/tabsList";

export default function FormEntryLanding() {

	const [id, setId] = useState('')

	return (
		<div className="custom-wrapper bread-wrap">
			<div className="sub-header">
				<BreadCrumbWrapper
					urlName={`/elog_book/data_entry_forms/${id}`}
					value={id ? id : "New"}
					data={id ? id : "New"} />
			</div>
			<div className="custom-content-layout">
				<ScreenHeader
					bannerbg={{
						background:
							"linear-gradient(180deg, rgba(255, 226, 124, 0.72) 0%, #FFF4F4 100%)",
					}}
					title={`Howdy ${localStorage.getItem("username")},`}
					description="Filling in some data for products today?
                    Let’s get started!"
					source={illustrations}
					sourceClass="dashboard-landing"
				/>
				<Row>
					<Col span={6}>
						<DataEntryFormTabs setId={setId} />
					</Col>
					<Col span={18}>
						<DataEntryCardArea id={id} />
					</Col>
				</Row>
			</div>
		</div>
	)

}