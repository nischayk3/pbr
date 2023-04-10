/**
 * @author Dinesh Kumar <dinesh.kumar@mareana.com>
 * @Mareana - Release 3.5
 * @version  1
 * @Last Modified - 13 Jan, 2023
 * @Last Changed By - Dinesh Kumar
 */

import React, { memo, useEffect, useState } from 'react';
import { childProcessStep, populateProcessStep } from "../../../../../../services/viewHierarchyServices";
import RecursiveTable from './recursiveTable';

const ProcessStepMap = memo(function ProcessStepMap({ drugName, activeTab }) {
	console.log("drugName, activeTab", drugName, activeTab);
	const [processData, setProcessData] = useState([]);
	const [steps, setSteps] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const _req = {
			data: {
				ds_name: drugName,
			},
			keyword: "ds_name"
		}

		const req = {
			ds_name: drugName,
		}

		if (activeTab === 'Process step mapping') {
			processStepDsName(_req);
			populateStep(req)
		}
	}, [activeTab])

	const processStepDsName = async (_payload) => {
		setLoading(true)
		const apiRes = await childProcessStep(_payload)
		if (apiRes.status === 200) {
			const resData = apiRes.data.map((item) => {
				return { ...item, has_child: true };
			});

			console.log("apiRes", resData);
			setProcessData(resData)
			// setInitTreeData(apiRes.data)
			// dispatch(showNotification("success", 'success msg'));
		} else if (apiRes.status === 400) {
			// dispatch(showNotification("error", 'error msg'));
		} else if (apiRes.status === 404) {
			// dispatch(showNotification("error", 'error msg'));
		} else {
			// dispatch(showNotification("error", 'error msg'));
		}
		setLoading(false)
	}

	const populateStep = async (_payload) => {
		const apiRes = await populateProcessStep(_payload)
		if (apiRes.status === 200) {
			const optionData = apiRes.data
			const options = []
			optionData && optionData.forEach((item) => {
				options.push({
					label: item,
					value: item,
				});
			})


			setSteps(options)
			// setInitTreeData(apiRes.data)
			// dispatch(showNotification("success", 'success msg'));
		} else if (apiRes.status === 400) {
			// dispatch(showNotification("error", 'error msg'));
		} else if (apiRes.status === 404) {
			// dispatch(showNotification("error", 'error msg'));
		} else {
			// dispatch(showNotification("error", 'error msg'));
		}
	}

	return (
		<RecursiveTable data={processData} steps={steps} />
	)
});

export default ProcessStepMap;
