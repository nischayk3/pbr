import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import "./styles.scss";
//antd imports
import { PlusOutlined } from "@ant-design/icons";
import { Avatar, Card, Col, Divider, Input, Row, Table } from "antd";
//svg
import Banner from "../../../../../assets/images/AnalysisBanner.svg";
//redux
import { useDispatch } from "react-redux";
import {
	hideLoader, showLoader, showNotification
} from "../../../../../duck/actions/commonActions";
//services
import { getPipelineList } from "../../../../../services/analyticsService";
//components
import NewPipeline from "./newPipeline";
//antd unpacking components
const { Search } = Input;

//main component
const LandingPage = () => {
	//state for recently created charts
	const [pipelineList, setPipelineList] = useState([]);
	const [allPipelineList, setAllPipelineList] = useState([]);
	const [viewSearch, setViewSearch] = useState(false);
	const [newPipeline, setNewPipeline] = useState(false);
	const searchViewData = useRef([]);
	const ref = useRef(null);

	const dispatch = useDispatch();
	const match = useRouteMatch();
	const history = useHistory();
	let date = new Date();
	date = date.toDateString().substring(4, 15);
	function generateRandomColor() {
		const letters = "0123456789ABCDEF";
		let color = "#";
		for (let i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	}
	const columns = [
		{
			title: "Pipeline ID",
			dataIndex: "pipeline_disp_id",
			key: "pipeline_disp_id",
		},
		{
			title: "Pipeline Name",
			dataIndex: "pipeline_name",
			key: "pipeline_name",
		},
		{
			title: "Creator",
			dataIndex: "created_by",
			key: "created_by",
			render: (text, record) => {
				return (
					<span>
						<Avatar
							style={{
								color: "#FFFFFF",
								backgroundColor: generateRandomColor(),
							}}
						>
							{record.created_by.substring(0, 1)}
						</Avatar>{" "}
						&nbsp; &nbsp;
						{record.created_by}
					</span>
				);
			},
		},
		{
			title: "Status",
			dataIndex: "pipeline_status",
			key: "pipeline_status",
		},
	];

	const getPipelineListdata = async () => {
		try {
			dispatch(showLoader());
			const apiResponse = await getPipelineList();
			const pipeData = await apiResponse?.data;
			setPipelineList(pipeData.slice(0, 8));
			searchViewData.current = pipeData;
			setAllPipelineList(pipeData);
			dispatch(hideLoader());
		} catch (error) {
			dispatch(hideLoader());
			dispatch(showNotification("error", "Unable to fetch pipelines"));
		}
	};

	const onClickAdd = () => {
		setNewPipeline(!newPipeline);
	};
	//function to handle search
	const searchTable = (value) => {
		const filterData = searchViewData.current.filter((o) =>
			Object.keys(o).some((k) =>
				String(o[k]).toLowerCase().includes(value.toLowerCase())
			)
		);
		setAllPipelineList(filterData);
	};
	//on change of search
	const onSearchChange = (e) => {
		if (e.target.value === "") {
			setAllPipelineList(searchViewData.current);
		}
	};
	// on focus of input field showing table results.
	const onFocus = () => {
		setViewSearch(true);
	};

	//function for closing view table result on click of outside.
	const closeTableView = (e) => {
		if (ref.current && !ref.current.contains(e.target)) {
			setViewSearch(false);
			setAllPipelineList(searchViewData.current);
		}
	};
	useEffect(() => {
		document.addEventListener("mousedown", closeTableView);
		return () => {
			document.removeEventListener("mousedown", closeTableView);
		};
	}, []);

	useEffect(() => {
		getPipelineListdata();
	}, []);

	return (
		<div>
			<Row>
				<Col span={24} className="banner">
					<Card bordered={false}>
						<div className="card-body-div">
							<div className="text-descp">
								<h2>Howdy {sessionStorage.getItem("username")},</h2>
								<p>Let's get to build some pipelines today!</p>
							</div>
							<img src={Banner} alt="banner" />
							<h6>{date}</h6>
						</div>
					</Card>
				</Col>
			</Row>
			<Row className="landing-content">
				<Col span={24}>
					<Card bordered={false}>
						<Row>
							<Col span={6} />
							<Col span={12} className="p36 table-data" ref={ref}>
								<Search
									placeholder="Search by pipeline name or ID"
									allowClear
									enterButton="Search"
									size="large"
									onFocus={onFocus}
									onChange={onSearchChange}
									onSearch={searchTable}
								/>
								{viewSearch && (
									<Table
										columns={columns}
										dataSource={allPipelineList}
										pagination={false}
										scroll={{ y: 150 }}
										bordered={false}
										rowKey={(record) => record.pipeline_disp_id}
										onRow={(record) => ({
											onClick: () => {
												history.push(`${match.url}/${record.pipeline_disp_id}`);
											},
										})}
									/>
								)}
							</Col>
							<Col span={6} />
						</Row>
						<Row>
							<Col span={6} />
							<Col span={12} className="p36">
								<div className="create-new" onClick={onClickAdd}>
									<PlusOutlined />
									<p>Create new pipeline</p>
								</div>
							</Col>
							<Col span={6} />
						</Row>
						{pipelineList && pipelineList.length !== 0 && (
							<Row className="recent-charts">
								<Col span={6} />
								<Col span={12} className="p36">
									<Row gutter={16} className="title">
										<Col span={8}>
											<h3>Recently created pipelines</h3>
										</Col>
										<Col span={16} className="title-legends">
											<dl>
												<dt className="grey"></dt>
												<dd>Draft</dd>
												<dt className="yellow"></dt>
												<dd>Awaiting Approval</dd>
												<dt className="green"></dt>
												<dd>Approved</dd>
												<dt className="red"></dt>
												<dd>Reject</dd>
											</dl>
										</Col>
									</Row>
									<Divider />
									<Row gutter={24}>
										{pipelineList &&
											pipelineList.map((ele) => {
												return (
													<Link
														key={ele.pipeline_disp_id}
														to={`${match.url}/${ele.pipeline_disp_id}`}
													>
														<Col span={6} style={{ marginTop: "10px" }}>
															<div className="chart-tiles">
																<div
																	className="legend"
																	style={{
																		background:
																			ele.pipeline_status === "DRFT"
																				? "#363636"
																				: ele.pipeline_status === "AWAP"
																					? "#F6BB61"
																					: ele.pipeline_status === "REJECT"
																						? "#D64045"
																						: "#A4F588",
																		color:
																			ele.pipeline_status === "DRFT" ||
																				ele.pipeline_status === "REJECT"
																				? "#FFFFFF"
																				: "#000000",
																	}}
																>
																	<p>{ele.pipeline_status}</p>
																</div>
																<div className="chart-info">
																	<p className="cid">{ele.pipeline_disp_id}</p>
																	<p className="chartName">
																		{ele.pipeline_name}
																	</p>
																</div>
															</div>
														</Col>
													</Link>
												);
											})}
									</Row>
								</Col>
								<Col span={6} />
							</Row>
						)}
					</Card>
				</Col>
			</Row>
			{newPipeline && (
				<NewPipeline newPipeline={newPipeline} onCancel={onClickAdd} />
			)}
		</div>
	);
};

export default LandingPage;
