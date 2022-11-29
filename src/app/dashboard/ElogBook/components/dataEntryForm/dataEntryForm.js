/**
 * @author Dinesh
 * @Mareana - CPV Product
 * @version  1
 * @Last Modified - 08 Nov, 2022
 * @Last Changed By - Dinesh
 * @Last Modified - 15-11-2022
 * @Last Changed By - Siddesh
 */
import { Card, Tabs, Button, Pagination } from "antd";
import React, { useState } from 'react';
import "./dataEntryForm.scss";
import DataFormFirst from "./dataFormFirst/dataFormFirst";
import { PlusOutlined } from "@ant-design/icons";
import BreadCrumbWrapper from "../../../../../components/BreadCrumbWrapper";
import { useDispatch, useSelector } from "react-redux";
import { showLoader, hideLoader, showNotification } from "../../../../../duck/actions/commonActions";
import { getDummyTemplate } from "../../../../../services/eLogBookService";
const DataEntryForm = () => {
	const dispatch = useDispatch()
	const selectedMolecule = useSelector(state => state.elogReducer.selectedMolecule)
	const pageSize = 1
	const [tab, setTab] = useState('BU')
	const [newFormAdded, setNewFormAdded] = useState(true)

	let templateData = useSelector(state => state.elogReducer.templateData)

	const handleChange = (page, _data, inx) => {
		dispatch(showLoader())
		try {
			templateData = [...templateData]
			setNewFormAdded(true)
			templateData[inx]['current'] = page
			templateData[inx]['maxIndex'] = page * pageSize
			templateData[inx]['minIndex'] = (page - 1) * pageSize
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


	const addBU = async (x, index_) => {
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
				templateData = [...templateData]
				if (dummyresult.Data && dummyresult.Data[0] && dummyresult.Data[0].layout) {
					templateData[index_].form_data.push({
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
				}
			}
		}
		catch (err) {
			dispatch(showNotification('error', 'Error in adding form'))
		}
		finally {
			dispatch(hideLoader())
		}
	}

	console.log(templateData)
	return (
		<div className="custom-wrapper bread-wrap">
			<div className="sub-header">
				<BreadCrumbWrapper />
			</div>
			<div className="custom-content-layout">
				<Card
					title={`[E-log Book ${templateData && templateData.length} forms]`}
					bordered={false}
				>
					<Tabs defaultActiveKey={templateData && templateData[0] && templateData[0].form_name} onChange={handleTabChange}>
						{newFormAdded && templateData && templateData.length > 0 && templateData.map((i, _idx) => (
							<Tabs.TabPane tab={i.form_name + " Form"} key={i.form_name}>
								{i.form_data && i.form_data.length > 0 && i.form_data.map((idx, index) =>
								(
									index >= i.minIndex &&
									index < i.maxIndex && (
										<DataFormFirst
											getTableData={idx.readings}
											title={i.form_name + " Form"}
											name="Batch 11081204X- Assay individual values"
											form_id={i.form_id ? i.form_id : '1'}
											form_version={i.version ? i.version : 1}
											template_disp_id={idx.template_id ? idx.template_id : 1}
											selectedMolecule={selectedMolecule ? selectedMolecule : '_'}
											status={idx.status ? idx.status : 'DRFT'}
										/>
									)
								))
								}
								<Button
									type="dashed"
									className="add-new-form"
									onClick={() => {
										addBU(i, _idx); setNewFormAdded(true)
									}}
									icon={<PlusOutlined />}
									id="editable-table-button-add-new-user"
								> Add new form
								</Button>
								<Pagination
									pageSize={pageSize}
									current={i.current}
									size="small"
									total={i.form_data ? i.form_data.length : 1}
									style={{ bottom: "0px", marginLeft: "43%" }}
									onChange={(e) => handleChange(e, i, _idx)}
									showQuickJumper
								/>
							</Tabs.TabPane>
						))}
					</Tabs>
				</Card>
			</div>
		</div >
	)
}
export default DataEntryForm;