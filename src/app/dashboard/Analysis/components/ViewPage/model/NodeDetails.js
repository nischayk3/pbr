/**
 * @author Mihir Bagga <mihir.bagga@mareana.com>
 * @Mareana - CPV Product
 * @version 2
 * @Last Modified - 31 March, 2023
 * @Last Changed By - @Mihir
 */

import { Button, Col, Radio, Row, Skeleton, Dropdown } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	hideLoader,
	showLoader
} from "../../../../../../duck/actions/commonActions";
import { getViewNodeDetails, analysePipeline } from "../../../../../../services/analyticsService";
import "./model.scss";


const NodeDetails = (props) => {
	const {
		addEstimator,
		selectedTargetValue,
		setSelectedTargetVariable,
		nodeInformation,
		editFinalJson,
		getNodes,
		setNodeMapping,
		catMapping
	} = props;
	const dispatch = useDispatch();
	const [nodeData, setNodeData] = useState({});
	const [dataStatus, setDataStatus] = useState(true);
	const [outlinerValue, setOutlinerValue] = useState('')
	const [isCat, setIsCat] = useState(false)
	const [outlierMapping, setOutlierMapping] = useState({ variable_list: [], option_list: [] })
	const [catMap, setCatMapping] = useState({ variable_list: [] })
	const selectedViewData = useSelector(
		(State) => State.analyticsReducer.viewData
	);

	const makeOutlierCategorical = async (e) => {
		setOutlinerValue('')
		const req = {
			view_disp_id: selectedViewData?.view_id,
			pipeline_disp_id: selectedViewData?.pipeline_id,
			version: selectedViewData?.view_version,
			parameter_name: nodeInformation.Node,
			site: selectedViewData?.data_filter?.site,
			date_range: selectedViewData?.data_filter?.date_range,
			outlier_option: e && e?.target?.value ? e.target.value : "",
			make_categorical: e === true ? true : false,
			unapproved: selectedViewData?.data_filter?.unapproved_data === 1 ? true : false,
		};

		let apiResponse = await analysePipeline(req)
		if (apiResponse.status == 200) {
			setDataStatus(false);
			dispatch(hideLoader());
			if (e && e?.target?.value) {
				let outlier_obj = { ...outlierMapping }
				outlier_obj.variable_list.push(nodeInformation.Node)
				outlier_obj.option_list.push(e && e?.target?.value ? e.target.value : "")
				setNodeMapping(outlier_obj)
			}
			if (e === true) {
				let cat_obj = { ...catMap }
				cat_obj.variable_list.push(nodeInformation.Node)
				catMapping(cat_obj)
			}
			if (apiResponse?.data?.Boxplot) {
				apiResponse.data.Boxplot.layout.height = "100px";
				apiResponse.data.Boxplot.layout.width = "100px";
			}
			if (apiResponse?.data?.Histogram) {
				apiResponse.data.Histogram.layout.height = "100px";
				apiResponse.data.Histogram.layout.width = "100px";
			}
			setNodeData(apiResponse);
		}
		else {
			dispatch(hideLoader());
			setDataStatus(false);
		}
	}

	const getNodeDetails = async (e) => {
		setOutlinerValue('')
		const req = {
			view_disp_id: selectedViewData?.view_id,
			version: selectedViewData?.viewVersion,
			parameter_name: nodeInformation.Node,
			unapproved: selectedViewData?.data_filter?.unapproved_data === 1 ? true : false,
			make_categorical: e === true ? true : false,
			outlier_option: e && e?.target?.value ? e.target.value : ""
		};


		dispatch(showLoader());
		const apiResponse = await getViewNodeDetails(req);
		/* istanbul ignore next */
		if (apiResponse?.Status === 200) {

			setDataStatus(false);
			dispatch(hideLoader());
			if (apiResponse?.data?.Boxplot) {
				apiResponse.data.Boxplot.layout.height = "100px";
				apiResponse.data.Boxplot.layout.width = "100px";
			}
			if (apiResponse?.data?.Histogram) {
				apiResponse.data.Histogram.layout.height = "100px";
				apiResponse.data.Histogram.layout.width = "100px";
			}
			if (apiResponse?.data?.transformations) {
				setOutlinerValue(apiResponse?.data?.transformations?.outlier)
			}
			if (apiResponse?.data?.transformations) {
				if (apiResponse?.data?.transformations?.categorical == "True") {
					setIsCat(true)
				}
				else {
					setIsCat(false)
				}
			}
			setIsCat
			setNodeData(apiResponse);
			/* istanbul ignore next */
		} else {
			dispatch(hideLoader());
			setDataStatus(false);
		}
	};
	useEffect(() => {
		/* istanbul ignore next */
		if (nodeInformation) {
			getNodeDetails();
			setDataStatus(true);
		}
	}, [nodeInformation]);


	const items = [
		{
			key: '1',
			label: (
				<Radio value="Treat" onChange={makeOutlierCategorical} checked={outlinerValue == 'Treat'} >
					Treat
				</Radio>
			),
		},
		{
			key: '2',
			label: (
				<Radio value="Clip" onChange={makeOutlierCategorical} checked={outlinerValue == 'Clip'} >
					Clip
				</Radio>
			),
		},
		{
			key: '3',
			label: (
				<Radio value="Drop" onChange={makeOutlierCategorical} checked={outlinerValue == 'Drop'} >
					Drop
				</Radio>
			),
		},

	];


	return (
		<div className="node-container">
			{!dataStatus ? (
				<>
					<div className="node-details-container">
						<Row gutter={16}>
							{/* <Col span={24}> */}
							<Button className="custom-primary-btn">
								<Radio
									checked={nodeInformation.Node === selectedTargetValue}
									onChange={() => {
										getNodes(nodeInformation.Node)
										setSelectedTargetVariable(nodeInformation.Node)
									}
									}
								/>
								Make target Variable
							</Button>
							<Button
								className="custom-primary-btn"
								onClick={() => addEstimator("transform")}
							>
								Add transformation
							</Button>
							<Button className="custom-primary-btn" onClick={() => makeOutlierCategorical(true)}>Make categorical</Button>
							{/* <DeleteOutlined className="delete-b" /> &nbsp; */}
							{/* <span>Remove connectors</span> */}
							<Dropdown menu={{
								items,
							}} trigger={['click']}
								disabled={nodeInformation?.Variable_Category !== 'numerical'}
							>
								<Button className="custom-primary-btn">Outlier Treatment</Button>
							</Dropdown>

							{/* </Col> */}
						</Row>
					</div>
					<Row gutter={24} className="details-box">
						<Col span={8}>
							<Row>
								<Col span={10}>
									<span>N</span>
								</Col>
								<Col span={10}>
									<span>{nodeData?.data?.Stat?.N || "-"}</span>
								</Col>
							</Row>
						</Col>
						<Col span={8}>
							<Row>
								<Col span={10}>
									<span>Min</span>
								</Col>
								<Col span={10}>
									<span>{nodeData?.data?.Stat?.Min || "-"}</span>
								</Col>
							</Row>
						</Col>
						<Col span={8}>
							<Row>
								<Col span={10}>
									<span>Variance</span>
								</Col>
								<Col span={10}>
									<span>{nodeData?.data?.Stat?.Var || "-"}</span>
								</Col>
							</Row>
						</Col>
					</Row>
					<Row gutter={24} className="details-box">
						<Col span={8}>
							<Row>
								<Col span={10}>
									<span>Missing</span>
								</Col>
								<Col span={10}>
									<span>{nodeData?.data?.Stat?.Missing || "-"}</span>
								</Col>
							</Row>
						</Col>
						<Col span={8}>
							<Row>
								<Col span={10}>
									<span>Q1</span>
								</Col>
								<Col span={10}>
									<span>{nodeData?.data?.Stat?.Q1 || "-"}</span>
								</Col>
							</Row>
						</Col>
						<Col span={8}>
							<Row>
								<Col span={10}>
									<span>Kurtosis</span>
								</Col>
								<Col span={10}>
									<span>{nodeData?.data?.Stat?.Kurtosis || "-"}</span>
								</Col>
							</Row>
						</Col>
					</Row>
					<Row gutter={24} className="details-box">
						<Col span={8}>
							<Row>
								<Col span={10}>
									<span>Unique</span>
								</Col>
								<Col span={10}>
									<span>{nodeData?.data?.Stat?.Unique || "-"}</span>
								</Col>
							</Row>
						</Col>
						<Col span={8}>
							<Row>
								<Col span={10}>
									<span>Median</span>
								</Col>
								<Col span={10}>
									<span>{nodeData?.data?.Stat?.Median || "-"}</span>
								</Col>
							</Row>
						</Col>
						<Col span={8}>
							<Row>
								<Col span={10}>
									<span>Skewness</span>
								</Col>
								<Col span={10}>
									<span>{nodeData?.data?.Stat?.Skewness || "-"}</span>
								</Col>
							</Row>
						</Col>
					</Row>
					<Row gutter={24} className="details-box">
						<Col span={8}>
							<Row>
								<Col span={10}>
									<span>Mean</span>
								</Col>
								<Col span={10}>
									<span>{nodeData?.data?.Stat?.Mean || "-"}</span>
								</Col>
							</Row>
						</Col>
						<Col span={8}>
							<Row>
								<Col span={10}>
									<span>Q3</span>
								</Col>
								<Col span={10}>
									<span>{nodeData?.data?.Stat?.Q3 || "-"}</span>
								</Col>
							</Row>
						</Col>
					</Row>
					<Row gutter={24} className="details-box">
						<Col span={8}>
							<Row>
								<Col span={10}>
									<span>Standard dev</span>
								</Col>
								<Col span={10}>
									<span>{nodeData?.data?.Stat?.Std || "-"}</span>
								</Col>
							</Row>
						</Col>
						<Col span={8}>
							<Row>
								<Col span={10}>
									<span>Max</span>
								</Col>
								<Col span={10}>
									<span>{nodeData?.data?.Stat?.Max || "-"}</span>
								</Col>
							</Row>
						</Col>
					</Row>{" "}
				</>
			) : (
				<Skeleton active />
			)}
			{/* <Row gutter={24}>
        {nodeData?.data?.Histogram.data && (
          <Col span={12} style={{ width: "100px", height: "100px" }}>
            <ScatterPlot
              data={nodeData?.data?.Histogram.data}
              layout={nodeData?.data?.Histogram.layout}
            />
          </Col>
        )}
        {nodeData?.data?.Boxplot.data && (
          <Col span={12}>
            <ScatterPlot
              data={nodeData?.data?.Boxplot.data}
              layout={nodeData?.data?.Boxplot.layout}
            />
          </Col>
        )}
      </Row> */}
		</div>
	);
};

export default NodeDetails;
