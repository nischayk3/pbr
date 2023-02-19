import { Collapse, Table } from "antd";
import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { hideLoader, showNotification } from "../../../../duck/actions/commonActions";
import { getSystemConfig } from "../../../../services/systemConfigService";
import { tableColumns } from "../../../../utils/TableColumns";
import "./style.scss";

const ConfigTable = () => {
	const { Panel } = Collapse;
	const dispatch = useDispatch();

	const [customerData, setCustomerData] = useState([]);
	const [customerColumns, setCustomerColumns] = useState([]);
	const [emailData, setEmailData] = useState([]);
	const [emailsColumns, setEmailsColumns] = useState([]);
	const [esignData, setEsignData] = useState([]);
	const [esignColumns, setEsignColumns] = useState([]);
	const [timeZoneData, setTimeZoneData] = useState([]);
	const [timeZoneColumns, setTimeZoneColumns] = useState();

	useEffect(() => {
		getSystemConfigData('customer');
		getSystemConfigData('emails');
		getSystemConfigData('esign_reasons');
		getSystemConfigData('timezone');
	}, [])

	const getSystemConfigData = async (type) => {
		try {

			if (type === 'customer') {
				let _reqCustomer = {
					type: type
				}

				const customerRes = await getSystemConfig(_reqCustomer)

				if (customerRes.statuscode === 200) {

					const customerCol = tableColumns(customerRes.message)

					setCustomerColumns(customerCol)
					setCustomerData(customerRes.message)
				} else {
					setCustomerData([])
				}

			} else if (type === 'emails') {
				let _reqEmails = {
					type: type
				}

				const emailsRes = await getSystemConfig(_reqEmails)

				if (emailsRes.statuscode === 200) {
					const emailsCol = tableColumns(emailsRes.message)
					setEmailsColumns(emailsCol)
					setEmailData(emailsRes.message)
				} else {
					setEmailData([])
				}

			} else if (type === 'esign_reasons') {
				let _reqEsign = {
					type: type
				}

				const esignRes = await getSystemConfig(_reqEsign)

				if (esignRes.statuscode === 200) {
					const esignCol = tableColumns(esignRes.message)
					setEsignColumns(esignCol)
					setEsignData(esignRes.message)
				} else {
					setEsignData([])
				}

			} else if (type === 'timezone') {
				let _reqTimeZOne = {
					type: type
				}

				const timeZoneRes = await getSystemConfig(_reqTimeZOne)
				console.log("timeZoneRes", timeZoneRes);
				if (timeZoneRes.statuscode === 200) {
					console.log("timeZoneRes", timeZoneRes);
					const timeZoneCol = tableColumns(timeZoneRes.message)
					console.log("timeZoneCol", timeZoneCol);
					setTimeZoneColumns(timeZoneCol)
					setTimeZoneData(timeZoneRes.message)
				} else {
					setTimeZoneData([])
				}

			}

		} catch (error) {
			/* istanbul ignore next */
			dispatch(hideLoader());
			/* istanbul ignore next */
			dispatch(showNotification("error", error));
		}
	}

	console.log("logggg", timeZoneColumns);
	console.log("log1111", timeZoneData);

	return (
		<div className="config-wrap">
			<Collapse
			// defaultActiveKey={['1']}
			>
				<Panel header="Data sources" key="1">
					<div className="table-wrap">
						<div className="table-head">
							<p>Please double-click the fields to edit them</p>
						</div>

						<Table
							columns={emailsColumns}
							dataSource={emailData}
							bordered={false} className="config-table"
						/>
					</div>

				</Panel>
				<Panel header="E-sign reasons" key="2">
					<div className="table-wrap">
						<div className="table-head">
							<p>Please double-click the fields to edit them</p>
						</div>

						<Table
							columns={esignColumns}
							dataSource={esignData}
							bordered={false} className="config-table"
						/>
					</div>
				</Panel>
				<Panel header="Product types" key="3">
					<div className="table-wrap">
						<div className="table-head">
							<p>Please double-click the fields to edit them</p>
						</div>

						<Table
							columns={customerColumns}
							dataSource={customerData}
							rowKey={(record) => record.domain}
							bordered={false} className="config-table"
						/>
					</div>
				</Panel>
				<Panel header="System session timeout" key="4">
					<div className="table-wrap">
						<div className="table-head">
							<p>Please double-click the fields to edit them</p>
						</div>

						<Table
							columns={timeZoneColumns}
							dataSource={timeZoneData}
							rowKey={(record) => record.domain}
							bordered={false} className="config-table"
						/>
					</div>
				</Panel>
			</Collapse>
		</div>
	)
}

export default ConfigTable;