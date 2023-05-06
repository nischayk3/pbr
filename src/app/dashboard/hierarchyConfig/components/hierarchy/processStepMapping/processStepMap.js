/**
 * @author Dinesh Kumar <dinesh.kumar@mareana.com>
 * @Mareana - Release 3.5
 * @version  1
 * @Last Modified - 13 Jan, 2023
 * @Last Changed By - Dinesh Kumar
 */

import React, { memo, useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { showNotification } from '../../../../../../duck/actions/commonActions';
import { childProcessStep, getProcessFoldermapping, populateProcessStep } from "../../../../../../services/viewHierarchyServices";
import RecursiveTable from './recursiveTable';
const ProcessStepMap = memo(function ProcessStepMap({ drugName, activeTab, finalJson, setFinalJson, isLoad }) {
	const [processData, setProcessData] = useState([]);
	const [steps, setSteps] = useState([]);
	const dispatch = useDispatch();

	useEffect(() => {
		const _req = {
			data: {
				ds_name: drugName,
			},
			keyword: "ds_name",
			main_json: {},
		}

		const req = {
			ds_name: drugName,
		}

		if (activeTab === 'Process step mapping') {
			if (isLoad) {
				populateStep(req)
				getProcessMap(req);
			} else {
				processStepDsName(_req);
				populateStep(req)
			}
		}
	}, [activeTab])

	const processStepDsName = async (_payload) => {
		const apiRes = await childProcessStep(_payload)
		if (apiRes.status === 200) {
			setFinalJson(apiRes.data)
			setProcessData(apiRes.data.children)
		} else if (apiRes.status === 400) {
			setFinalJson({})
			setProcessData([])
			dispatch(showNotification("error", apiRes.message));
		} else if (apiRes.status === 404) {
			setFinalJson({})
			setProcessData([])
			dispatch(showNotification("error", apiRes.message));
		} else {
			setFinalJson({})
			setProcessData([])
		}
	}

	const getProcessMap = async (_payload) => {
		const apiRes = await getProcessFoldermapping(_payload)
		if (apiRes.status === 200) {
			setFinalJson(apiRes?.data?.process_folders_mapping)
			setProcessData(apiRes?.data?.process_folders_mapping?.children)
		} else if (apiRes.status === 400) {
			setFinalJson({})
			setProcessData([])
			dispatch(showNotification("error", apiRes.message));
		} else if (apiRes.status === 404) {
			setFinalJson({})
			setProcessData([])
			const _req = {
				data: {
					ds_name: drugName,
				},
				keyword: "ds_name",
				main_json: {},
			}
			processStepDsName(_req);
		} else {
			setFinalJson({})
			setProcessData([])
		}
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
		} else if (apiRes.status === 400) {
			setSteps([])
			dispatch(showNotification("error", apiRes.message));
		} else if (apiRes.status === 404) {
			setSteps([])
			dispatch(showNotification("error", apiRes.message));
		} else {
			setSteps([])
		}
	}

	return (
		<RecursiveTable data={processData} steps={steps} finalJson={finalJson} setFinalJson={setFinalJson} />
	)
});

export default ProcessStepMap;
