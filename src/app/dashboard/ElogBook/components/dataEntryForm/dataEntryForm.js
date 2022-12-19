/**
 * @author Mihir
 * @Mareana - CPV Product
 * @version  1
 * @Last Modified - 08 Nov, 2022
 * @Last Changed By - Mihir
 * @Last Modified - 15-11-2022
 * @Last Changed By - Mihir
 */
import { Card, Tabs, Button, Pagination, Row, Col } from "antd";
import React, { useEffect, useState } from 'react';
import panelRightImg from "../../../../../assets/images/panel-leftIcon.svg";
import "./dataEntryForm.scss";
import DataFormFirst from "./dataFormFirst/dataFormFirst";
import { PlusOutlined } from "@ant-design/icons";
import BreadCrumbWrapper from "../../../../../components/BreadCrumbWrapper";
import { useDispatch, useSelector } from "react-redux";
import { showLoader, hideLoader, showNotification } from "../../../../../duck/actions/commonActions";
import { getDummyTemplate, getTemplateData } from "../../../../../services/eLogBookService";
import Sider from "antd/lib/layout/Sider";
const DataEntryForm = () => {

	const dispatch = useDispatch()
	const selectedMolecule = useSelector(state => state.elogReducer.selectedMolecule)
	const selectedSite = useSelector(state => state.elogReducer.selectedProductSite)
	const templateReq = useSelector(state => state.elogReducer.templateReq)

	const [drawervisible, setDrawerVisible] = useState(true);
	const pageSize = 1
	const [tab, setTab] = useState('BU')
	const [templateData, setTemplateData] = useState([])
	let template_Data = useSelector(state => state.elogReducer.templateData)

	useEffect(() => {
		dispatch(showLoader())
		setTemplateData(template_Data)
		dispatch(hideLoader())

	}, [])


	const handleChange = (page, inx) => {
		dispatch(showLoader())
		try {
			let template_Data = [...templateData]
			template_Data[inx]['maxIndex'] = page * pageSize
			template_Data[inx]['minIndex'] = (page - 1) * pageSize
			template_Data[inx]['selected'] = page
			setTemplateData(template_Data)
		}
		catch (err) {
			dispatch(showNotification('error', 'Some error occured'))
		}
		finally {
			dispatch(hideLoader())
		}
	};

	const handleTabChange = (tab) => {
		setTab(tab)
	}



	const addForm = async (x, index_) => {
		dispatch(showLoader())
		let dummy_req = {
			name: x ? x.form_name : "",
			version: x ? x.version : 1,
			form_disp_id: x ? x.form_disp_id : '',
			form_id: x ? x.form_id : '',
			status: 'DRFT'
		}
		try {
			let dummyresult = await getDummyTemplate(dummy_req)
			if (dummyresult.statuscode == 200) {
				let template_Data = [...templateData]
				if (dummyresult.Data && dummyresult.Data[0] && dummyresult.Data[0].layout) {
					template_Data[index_].form_data.unshift({
						status:
							"DRFT",
						template_id
							:
							1,
						version
							:
							1,
						readings: dummyresult.Data[0].layout
					})
					setTemplateData(template_Data)
				}
			}
		}
		catch (err) {
			dispatch(showNotification('error', 'Error in adding form'))
		}
		finally {
			handleChange(2, index_)
			handleChange(1, index_)
			dispatch(hideLoader())
		}
	}

	const reloadData = async () => {
		dispatch(showLoader())
		try {
			let template_response = await getTemplateData(templateReq)
			if (template_response.statuscode == 200) {
				dispatch(showNotification('success', 'Loading...'))
				if (template_response.Data && template_response) {
					let data_dispatch = [...template_response.Data]
					data_dispatch.forEach(v => { v.minIndex = 0, v.maxIndex = 1 });
					setTemplateData(data_dispatch)
				}
			}
		}
		catch (err) {
			dispatch(showNotification('error', 'Error in reloading data'))
		}
		finally {
			dispatch(hideLoader())
		}
	}
	return (
		<div className="custom-wrapper bread-wrap">
			<div className="sub-header">
				<BreadCrumbWrapper />
			</div>
			<div className="custom-content-layout">
				<Card
					title={`E-log Book ${selectedMolecule}-${selectedSite}`}
					bordered={false}
				>
					<Tabs defaultActiveKey={templateData && templateData[0] && templateData[0].form_name} onChange={handleTabChange}>
						{templateData && templateData.length > 0 && templateData.map((i, _idx) => (
							<Tabs.TabPane tab={i.form_name} key={_idx}>
								<Row>
									<Col span={1}>
										<div className="data_entry_panel">
											<span >{!drawervisible ? <PlusOutlined onClick={() => { addForm(i, _idx) }} className="plus-outlined" /> : <Button className="create_new_record" onClick={() => { addForm(i, _idx) }} icon={<PlusOutlined />}>Create New Record</Button>}</span>

											{i.form_data && i.form_data.length > 0 && <Sider
												trigger={null}
												collapsible
												collapsed={!drawervisible}
											>
												<span
													className={drawervisible ? "trigger-panel_closed " : "trigger-panel"}
													onClick={() => setDrawerVisible(!drawervisible)}
												>
													<img src={panelRightImg} />
												</span>
												<br />
												<br />
												{/* {drawervisible && <Button className="panel_button" onClick={() => { addForm(i, _idx) }}>Create new record</Button>} */}
												<div className={!drawervisible ? "records_view" : i.form_data && i.form_data.length <= 8 ? "records_view" : "records_view_scroll"} >
													{drawervisible && i.form_data && i.form_data.length > 0 && i.form_data.map((idx, index) => (
														<div className={i.selected - 1 == index ? "record_list_selected" : "record_list"} >
															<p onClick={() => handleChange(index + 1, _idx)}> {idx.batch ? idx.batch + "_" + idx.process_step : 'New Record'}  </p>
														</div>
													))
													}
												</div>
											</Sider>
											}
										</div>
									</Col>
									{/* </div> */}
									<Col span={23}>
										<div className={drawervisible ? "data_form_first" : "data_form_first_collapsed"}
										>
											{i.form_data && i.form_data.length > 0 && i.form_data.map((idx, index) => (
												index >= i.minIndex &&
												index < i.maxIndex && (
													<DataFormFirst
														getTableData={idx.readings}
														title={i.form_name}
														name="Batch 11081204X- Assay individual values"
														form_id={i.form_id ? i.form_id : '1'}
														form_version={i.version ? i.version : 1}
														template_disp_id={idx.template_id ? idx.template_id : 1}
														selectedMolecule={selectedMolecule ? selectedMolecule : '_'}
														status={idx.status ? idx.status : 'DRFT'}
														recording_id={idx.recording_id ? idx.recording_id : null}
														size={i.form_data.length}
														setDrawerVisible={setDrawerVisible}
														drawervisible={drawervisible}
														batch={idx.batch ? idx.batch + "_" + idx.process_step : ''}
														reloadData={reloadData}
													/>
												)
											))
											}
										</div>
									</Col>
								</Row>
							</Tabs.TabPane>
						))}
					</Tabs>
				</Card>
			</div >
		</div >
	)
}
export default DataEntryForm;