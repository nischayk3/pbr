/**
 * @author Mihir
 * @Mareana - CPV Product
 * @version  1
 * @Last Modified - 22 Dec, 2022
 * @Last Changed By - Mihir
 */

import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row, Tabs } from "antd";
import Sider from "antd/lib/layout/Sider";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import panelRightImg from "../../../../../assets/images/panel-leftIcon.svg";
import BreadCrumbWrapper from "../../../../../components/BreadCrumbWrapper";
import {
	hideLoader, showLoader, showNotification
} from "../../../../../duck/actions/commonActions";
import {
	sendProductSite,
	sendSelectedMolecule, sendTemplateReq
} from "../../../../../duck/actions/eLogBook";
import {
	getDummyTemplate,
	getTemplateData
} from "../../../../../services/eLogBookService";
import "./dataEntryForm.scss";
import DataFormFirst from "./dataRecords/dataRecords";

const DataEntryForm = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const pageSize = 1;


	const selectedMolecule = useSelector(
		(state) => state.elogReducer.selectedMolecule
	);
	const selectedSite = useSelector(
		(state) => state.elogReducer.selectedProductSite
	);

	const location = useLocation();
	const templateReq = useSelector((state) => state.elogReducer.templateReq);
	const [drawervisible, setDrawerVisible] = useState(true);
	const [templateData, setTemplateData] = useState([]);
	const [disableScreen, setDisableScreen] = useState(false);
	const [publishScreen, setPublishScreen] = useState(false);
	const [templateId, setTemplateId] = useState('');


	let template_Data = useSelector((state) => state.elogReducer.templateData);

	useEffect(() => {
		dispatch(showLoader());
		setTemplateData(template_Data);
		dispatch(hideLoader());
	}, []);

	const unloadUrl = async (params) => {
		dispatch(showLoader());
		let template_req = {
			name: params.name,
			version: params.version,
			temp_disp_id: params.template_disp_id,
			molecule: params.molecule,
		};
		setTemplateId(params.template_disp_id.replace(/[^0-9]/g, ''))
		if (params.recording_id) {
			template_req["recording_id"] = params.recording_id;
		}
		dispatch(sendSelectedMolecule(params.molecule));

		dispatch(sendTemplateReq(template_req));
		dispatch(sendProductSite(params.site));
		try {
			let template_response = await getTemplateData(template_req);
			if (template_response.statuscode == 200) {
				dispatch(showNotification("success", "Loaded"));
				if (template_response.Data && template_response) {
					let data_dispatch = [...template_response.Data];
					data_dispatch.forEach((v) => {
						(v.minIndex = 0), (v.maxIndex = 1);
					});
					setTemplateData(data_dispatch);
				}
			} else {
				dispatch(showNotification("error", template_response.detail));
			}
		} catch (err) {
			dispatch(showNotification("error", "Error in loading data"));
		} finally {
			dispatch(hideLoader());
		}
	};

	useEffect(() => {
		const params = queryString.parse(location.search);
		if (Object.keys(params).length > 0) {
			unloadUrl(params);
			if (params.recording_id) {
				setDisableScreen(true);
			}
			if (params.publish) {
				setPublishScreen(true);
			}
		}
	}, []);


	const handleChange = (page, inx) => {
		dispatch(showLoader());
		try {
			let template_Data = [...templateData];
			template_Data[inx]["maxIndex"] = page * pageSize;
			template_Data[inx]["minIndex"] = (page - 1) * pageSize;
			template_Data[inx]["selected"] = page;
			setTemplateData(template_Data);
		} catch (err) {
			dispatch(showNotification("error", "Some error occured"));
		} finally {
			dispatch(hideLoader());
		}
	};

	const addForm = async (x, index_) => {
		dispatch(showLoader());
		let dummy_req = {
			name: x ? x.form_name : "",
			version: x ? x.version : 1,
			form_disp_id: x ? x.form_disp_id : "",
			form_id: x ? x.form_id : "",
			status: "DRFT",
		};
		try {
			let dummyresult = await getDummyTemplate(dummy_req);
			if (dummyresult.statuscode == 200) {
				let template_Data = [...templateData];
				if (
					dummyresult.Data &&
					dummyresult.Data[0] &&
					dummyresult.Data[0].layout
				) {
					template_Data[index_].form_data.unshift({
						status: "DRFT",
						template_id: parseInt(templateId),
						version: 1,
						readings: dummyresult.Data[0].layout,
					});
					setTemplateData(template_Data);
				}
			}
			else {
				dispatch(showNotification("error", "Error in adding form"));
			}
		} catch (err) {
			dispatch(showNotification("error", "Error in adding form"));
		} finally {
			handleChange(2, index_)
			setTimeout(() => { handleChange(1, index_) }, 100)
		}
	};

	const reloadData = async () => {
		dispatch(showLoader());
		try {
			let template_response = await getTemplateData(templateReq);
			if (template_response.statuscode == 200) {
				dispatch(showNotification("success", "Loading"));
				if (template_response.Data && template_response) {
					let data_dispatch = [...template_response.Data];
					data_dispatch.forEach((v) => {
						(v.minIndex = 0), (v.maxIndex = 1);
					});
					setTemplateData(data_dispatch);
				}
			}
		} catch (err) {
			dispatch(showNotification("error", "Error in reloading data"));
		} finally {
			dispatch(hideLoader());
		}
	};


	return (
		<div className="custom-wrapper bread-wrap">
			<div className="sub-header">
				<BreadCrumbWrapper />
			</div>
			<div className="content_tabs">
				<Card
					title={
						<span>
							<ArrowLeftOutlined
								onClick={() => history.push("/dashboard/elog_book_data_entry")}
								className="arrow_icon"
							/>
							E-log Book {selectedMolecule}-{selectedSite}
						</span>
					}
					bordered={false}
				>
					<Tabs
						defaultActiveKey={
							templateData && templateData[0] && templateData[0].form_name
						}
					>
						{templateData &&
							templateData.length > 0 &&
							templateData.map((i, _idx) => (
								<Tabs.TabPane tab={i.form_name} key={_idx}>
									<Row>
										<Col span={1}>
											<div className="data_entry_panel">
												<span>
													{!disableScreen &&
														(!drawervisible ? (
															<PlusOutlined
																onClick={() => {
																	addForm(i, _idx);
																}}
																className="plus-outlined"
															/>
														) : (
															<Button
																className="create_new_record"
																onClick={() => {
																	addForm(i, _idx);
																}}
																icon={<PlusOutlined />}
															>
																Create New Record
															</Button>
														))}
												</span>
												{i.form_data &&
													!disableScreen &&
													i.form_data.length > 0 && (
														<Sider
															trigger={null}
															collapsible
															collapsed={!drawervisible}
														>
															<div
																className={
																	!drawervisible
																		? "records_view"
																		: i.form_data && i.form_data.length <= 8
																			? "records_view"
																			: "records_view_scroll"
																}
															>
																{drawervisible &&
																	i.form_data &&
																	i.form_data.length > 0 &&
																	i.form_data.map((idx, index) => (
																		<div
																			className={
																				i.selected - 1 == index
																					? "record_list_selected"
																					: "record_list"
																			}
																		>
																			<p
																				onClick={() =>
																					handleChange(index + 1, _idx)
																				}
																			>
																				{" "}
																				{idx.record_name
																					? idx.record_name
																					: "New Record"}{" "}
																			</p>
																		</div>
																	))}
															</div>
															<span
																className={
																	drawervisible
																		? "trigger-panel_closed "
																		: "trigger-panel"
																}
																onClick={() => setDrawerVisible(!drawervisible)}
															>
																<img src={panelRightImg} />
															</span>
														</Sider>
													)}
											</div>
										</Col>
										<Col span={disableScreen ? 24 : 23}>
											<div
												className={
													disableScreen
														? "data_form_first_collapsed"
														: drawervisible
															? "data_form_first"
															: "data_form_first_collapsed"
												}
											>
												{templateData && i.form_data &&
													i.form_data.length > 0 &&
													i.form_data.map(
														(idx, index) =>
															index >= i.minIndex &&
															index < i.maxIndex && (
																<DataFormFirst
																	getTableData={idx.readings}
																	title={i.form_name}
																	name="Batch 11081204X- Assay individual values"
																	form_id={i.form_id ? i.form_id : "1"}
																	form_version={i.version ? i.version : 1}
																	template_disp_id={
																		idx.template_id ? idx.template_id : parseInt(templateId)
																	}
																	selectedMolecule={
																		selectedMolecule ? selectedMolecule : "_"
																	}
																	status={idx.status ? idx.status : "DRFT"}
																	recording_id={
																		idx.recording_id ? idx.recording_id : null
																	}
																	size={i.form_data.length}
																	setDrawerVisible={setDrawerVisible}
																	drawervisible={drawervisible}
																	batch={idx.record_name ? idx.record_name : ""}
																	reloadData={reloadData}
																	disableScreen={disableScreen}
																	site={selectedSite}
																	publishScreen={publishScreen}
																/>
															)
													)}
											</div>
										</Col>
									</Row>
								</Tabs.TabPane>
							))}
					</Tabs>
				</Card>
			</div>
		</div>
	);
};
export default DataEntryForm;
