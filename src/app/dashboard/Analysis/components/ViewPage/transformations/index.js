import { Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { hideLoader, showLoader, showNotification } from "../../../../../../duck/actions/commonActions";
import { getAnalyticsTransformation } from '../../../../../../services/analyticsService';
import TransformationList from "./transformationList/TransformationList";
import "./transformationStyles.scss";
const { TabPane } = Tabs;

/* istanbul ignore next */
const Transformation = ({ finalModelJson, editFinalJson, tableKey }) => {
	const dispatch = useDispatch();
	const [transformationData, setTransformationData] = useState([]);
	const [transformationTableKey, setTransformationTableKey] = useState("1");

	const getTransformationList = async (type) => {
		const req = {
			data: editFinalJson?.pipeline_data[0]?.variable_mapping?.length >= 1 ? editFinalJson?.pipeline_data[0] : finalModelJson,
			type: type
		}
		dispatch(showLoader());
		const apiResponse = await getAnalyticsTransformation(req);
		if (apiResponse.statuscode === 200) {
			setTransformationData(apiResponse.message)
			dispatch(hideLoader());
		} else {
			dispatch(hideLoader());
			dispatch(showNotification('error', 'Unable to get transformations'))
		}
	}

	const tabChange = (key) => {
		setTransformationTableKey(key);
	};

	useEffect(() => {
		getTransformationList('transformation')
	}, [tableKey])


	return (
		<div className="trans-container">
			<Tabs tabPosition="left" onChange={tabChange}>
				<TabPane tab="Transformations" key="1">
					<TransformationList type="transformation" getTransformationList={getTransformationList} transformationData={transformationData} transformationTableKey={transformationTableKey} />
				</TabPane>
				<TabPane tab="Feature Union" key="2">
					<TransformationList type="futureUnion" getTransformationList={getTransformationList} transformationData={transformationData} transformationTableKey={transformationTableKey} />
				</TabPane>
			</Tabs>
		</div>
	);
};

export default Transformation;
