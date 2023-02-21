import { Button, Card, Col, Empty, Input, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
	hideLoader, showLoader,
	showNotification
} from "../../../../../../duck/actions/commonActions";
import {
	sendProductSite, sendTemplateReq
} from "../../../../../../duck/actions/eLogBook";
import "./cardArea.scss";

export default function DataEntryCardArea(props) {
	const dispatch = useDispatch();
	const selectedMolecule = useSelector(
		(state) => state.elogReducer.selectedMolecule
	);
	const history = useHistory();
	const [filterData, setFilterData] = useState([]);
	const [templateData, setTemplateData] = useState([]);
	const template_data = useSelector((state) => state.elogReducer.templateTiles);

	useEffect(() => {
		setTemplateData(template_data);
		setFilterData(template_data);
	}, [template_data]);

	const getTemplateResponse = async (record) => {
		dispatch(showLoader());
		let template_req = {
			name: record.name,
			version: record.version,
			temp_disp_id: record.template_disp_id,
			molecule: record.molecule,
		};
		dispatch(sendTemplateReq(template_req));
		dispatch(sendProductSite(record.site));
		try {
			history.push(
				`/dashboard/elog_book_data_entry/data_entry_forms?molecule=${record.molecule}&template_disp_id=${record.template_disp_id}&version=${record.version}&site=${record.site}`
			);
		} catch (err) {
			dispatch(showNotification("error", "Error"));
		} finally {
			dispatch(hideLoader());
		}
	};

	const searchTemplate = (value) => {
		if (value) {
			const filterData = templateData.filter((o) =>
				Object.keys(o).some((k) =>
					String(o[k]).toLowerCase().includes(value.toLowerCase())
				)
			);
			setFilterData(filterData);
		} else {
			setFilterData(templateData);
		}
	};

	return (
		<Card className="content-cards">
			<div className="heading_search">
				{templateData.length > 0 && selectedMolecule && (
					<span className="selected_mol">{selectedMolecule} - Templates</span>
				)}
				{templateData.length > 0 && selectedMolecule && (
					<Input.Search
						className="head-input"
						placeholder="Search a form or template"
						onSearch={searchTemplate}
					/>
				)}
			</div>
			<div className="content-card">
				<Row>
					{filterData && filterData.length && templateData ? (
						filterData.map((i, idx) => (
							<Col span={8} key={idx}>
								<div className="template-card-div">
									<br />
									<div className="template-card-head">
										<p className="template-card-heading">
											{i.template_disp_id + "_" + i.version}
										</p>
									</div>
									<div className="template-card-content">
										<div className="template-card-subheading">
											Product &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
											<span className="template-card-subheading-data">
												{i.molecule}
											</span>
										</div>
										<div className="template-card-subheading">
											Site
											&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
											<span className="template-card-subheading-data">
												{i.site}
											</span>
										</div>
										<div className="template-card-subheading">
											ID &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
											&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:
											<span className="template-card-subheading-data">
												{i.template_id}
											</span>
										</div>
									</div>
									<Button
										className="use-template"
										onClick={() => getTemplateResponse(i)}
									>
										View/Edit Data
									</Button>
								</div>
							</Col>
						))
					) : (
						<Empty
							className="empty-temp"
							description={
								<span className="empty-text ">
									Please select a product to view templates available
								</span>
							}
						/>
					)}
				</Row>
			</div>
		</Card>
	);
}
