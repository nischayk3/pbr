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
import React, { useEffect, useState } from 'react';
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
			template_Data[inx]['current'] = page
			template_Data[inx]['maxIndex'] = page * pageSize
			template_Data[inx]['minIndex'] = (page - 1) * pageSize
			setTemplateData(template_Data)
		}
		catch (err) {
			console.log(err)
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
				let template_Data = [...templateData]
				if (dummyresult.Data && dummyresult.Data[0] && dummyresult.Data[0].layout) {
					template_Data[index_].form_data.push({
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
						{templateData && templateData.length > 0 && templateData.map((i, _idx) => (
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

											addForm={() => addBU(i, _idx)}
											showDrawer={() => showDrawer()}
											size={i.form_data.length}
										/>
									)
								))
								}
								<Pagination
									pageSize={pageSize}
									current={i.current}
									total={i.form_data ? i.form_data.length : 1}
									style={{ bottom: "0px", marginLeft: "40%", marginTop: '10px' }}
									onChange={(e) => handleChange(e, _idx)}
									size="small"
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