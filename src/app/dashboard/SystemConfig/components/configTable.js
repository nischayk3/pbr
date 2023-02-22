import { Collapse } from "antd";
import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { hideLoader, showNotification } from "../../../../duck/actions/commonActions";
import { getSystemConfig } from "../../../../services/systemConfigService";
import CustomerTable from "./dataTable/customerTable";
import DataTable from "./dataTable/dataTable";
import EsignTable from "./dataTable/esignTable";
import TimeZoneTable from "./dataTable/timeZoneTable";


const ConfigTable = () => {
	const { Panel } = Collapse;
	const dispatch = useDispatch();

	const [customerData, setCustomerData] = useState([]);
	const [emailData, setEmailData] = useState([]);
	const [esignData, setEsignData] = useState([]);
	const [timeZoneData, setTimeZoneData] = useState([]);

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
					setEsignData(esignRes.message)
				} else {
					setEsignData([])
				}

			} else if (type === 'timezone') {
				let _reqTimeZOne = {
					type: type
				}

				const timeZoneRes = await getSystemConfig(_reqTimeZOne)
				if (timeZoneRes.statuscode === 200) {
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

	return (
		<div className="config-wrap">
			<Collapse
			// defaultActiveKey={['1']}
			>
				<Panel header="System email configuration" key="1">
					<div className="table-wrap">
						<DataTable
							tableData={emailData}
						/>
					</div>

				</Panel>
				<Panel header="E-sign reasons" key="2">
					<div className="table-wrap">
						<EsignTable tableData={esignData} />
					</div>
				</Panel>
				<Panel header="Paper Batch Records timezone" key="3">
					<div className="table-wrap">
						<TimeZoneTable tableData={timeZoneData} />

					</div>
				</Panel>
				<Panel header="System session timeout" key="4">
					<div className="table-wrap">
						<CustomerTable tableData={customerData} />
					</div>
				</Panel>
			</Collapse>
		</div>
	)
}

export default ConfigTable;