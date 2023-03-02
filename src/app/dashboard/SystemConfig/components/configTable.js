import { Collapse } from "antd";
import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { showNotification } from "../../../../duck/actions/commonActions";
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
	const [customerDataLoading, setCustomerDataLoading] = useState(false);
	const [emailDataLoading, setEmailDataLoading] = useState(false);
	const [esignDataLoading, setEsignDataLoading] = useState(false);
	const [timeZoneDataLoading, setTimeZoneDataLoading] = useState(false);

	useEffect(() => {
		getSystemConfigData('customer');
		getSystemConfigData('emails');
		getSystemConfigData('esign_reasons');
		getSystemConfigData('timezone');
	}, [])

	const getSystemConfigData = async (type) => {
		try {
			if (type === 'customer') {
				setCustomerDataLoading(true)
				let _reqCustomer = {
					type: type
				}
				const customerRes = await getSystemConfig(_reqCustomer)
				if (customerRes?.statuscode === 200) {
					setCustomerDataLoading(false)
					setCustomerData(customerRes.message)
				} else {
					setCustomerDataLoading(false)
					setCustomerData([])
				}

			} else if (type === 'emails') {
				setEmailDataLoading(true)
				let _reqEmails = {
					type: type
				}

				const emailsRes = await getSystemConfig(_reqEmails)
				if (emailsRes?.statuscode === 200) {
					setEmailDataLoading(false)
					setEmailData(emailsRes.message)
				} else {
					setEmailDataLoading(false)
					setEmailData([])
				}

			} else if (type === 'esign_reasons') {
				setEsignDataLoading(true)
				let _reqEsign = {
					type: type
				}

				const esignRes = await getSystemConfig(_reqEsign)
				if (esignRes?.statuscode === 200) {
					setEsignDataLoading(false)
					setEsignData(esignRes.message)
				} else {
					setEsignDataLoading(false)
					setEsignData([])
				}

			} else if (type === 'timezone') {
				setTimeZoneDataLoading(true)
				let _reqTimeZOne = {
					type: type
				}

				const timeZoneRes = await getSystemConfig(_reqTimeZOne)
				if (timeZoneRes?.statuscode === 200) {
					setTimeZoneDataLoading(false)
					setTimeZoneData(timeZoneRes.message)
				} else {
					setTimeZoneDataLoading(false)
					setTimeZoneData([])
				}

			}

		} catch (error) {
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
							emailDataLoading={emailDataLoading}
						/>
					</div>

				</Panel>
				<Panel header="E-sign reasons" key="2">
					<div className="table-wrap">
						<EsignTable
							tableData={esignData}
							esignDataLoading={esignDataLoading}
						/>
					</div>
				</Panel>
				<Panel header="Paper Batch Records timezone" key="3">
					<div className="table-wrap">
						<TimeZoneTable
							tableData={timeZoneData}
							timeZoneDataLoading={timeZoneDataLoading}
						/>

					</div>
				</Panel>
				<Panel header="System session timeout" key="4">
					<div className="table-wrap">
						<CustomerTable
							tableData={customerData}
							customerDataLoading={customerDataLoading}
						/>
					</div>
				</Panel>
			</Collapse>
		</div>
	)
}

export default ConfigTable;