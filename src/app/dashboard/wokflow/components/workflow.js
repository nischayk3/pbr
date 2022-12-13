/**
 * @author Binkita Tiwari <binkita.tiwari@mareana.com>
 * @Mareana - CPV Product
 * @version  1
 * @Last Modified - 31 March, 2022
 * @Last Changed By - binkita
 */
import { DownloadOutlined } from "@ant-design/icons";
import { Button, Card, Empty, Table, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import illustrations from "../../../../assets/images/Banner illustration.svg";
import BreadCrumbWrapper from "../../../../components/BreadCrumbWrapper";
import DashCard from "../../../../components/CardComponent/customCard";
import Signature from "../../../../components/ElectronicSignature/signature";
import ScreenHeader from "../../../../components/ScreenHeader/screenHeader";
import {
	hideLoader,
	showLoader,
	showNotification
} from "../../../../duck/actions/commonActions";
import {
	approveParamData, getCountData,
	getTableData,
	getUnapprovedData
} from "../../../../services/workFlowServices";
import "./styles.scss";
import WorkflowTable from "./workflowTable/workflowTable";

const { TabPane } = Tabs;
const Workflow = () => {
	const [itemCount, setItemCount] = useState();
	const [cardTitle, setCardTitle] = useState("");
	const [isPublish, setIsPublish] = useState(false);
	const [tilesData, setTilesData] = useState([]);
	const [activeDiv, setActiveDiv] = useState("");
	const [applicationType, setApplicationType] = useState("");
	const [activeTab, setActiveTab] = useState("1");
	const [columns, setColumns] = useState([]);
	const [dataSource, setDataSource] = useState([]);
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);
	const [approveReject, setApproveReject] = useState("");
	const [isApprove, setIsApprove] = useState(true);

	const dispatch = useDispatch();

	useEffect(() => {
		getTilesData();
	}, []);

	useEffect(() => {
		if (cardTitle != "" && cardTitle !== "Param Data Approval") {
			cardTableData();
		}
	}, [cardTitle, activeTab]);

	useEffect(() => {
		if (cardTitle === "Param Data Approval") {
			getUnApprovedParamData();
		}
	}, [cardTitle, activeTab]);

	const cardTableData = async () => {
		let req;
		if (itemCount != 0) {
			if (activeTab === "1") {
				req = `/${applicationType}/awaiting_approval`;
			} else {
				req = `/${applicationType}/recently_approved`;
			}
			try {
				dispatch(showLoader());
				const tableResponse = await getTableData(req);
				/* istanbul ignore next */
				dispatch(hideLoader());
				/* istanbul ignore next */
				if (tableResponse["status-code"] === 200) {
					/* istanbul ignore next */
					setColumns(tableResponse.Data.config);
					/* istanbul ignore next */
					setDataSource(tableResponse.Data.data);

				} else if (tableResponse["status-code"] === 404) {
					setColumns(tableResponse.Data.config);
					setDataSource(tableResponse.Data.data);
					dispatch(showNotification("error", tableResponse.Message));
				} else if (tableResponse["status-code"] === 400) {
					setColumns([]);
					setDataSource([]);
					dispatch(showNotification("error", tableResponse.Message));
				} else {
					setColumns([]);
					setDataSource([]);
					dispatch(showNotification("error", tableResponse.Message));
				}
			} catch (error) {
				/* istanbul ignore next */
				dispatch(hideLoader());
				/* istanbul ignore next */
				dispatch(showNotification("error", error.Message));
			}
		}
	};

	const getTilesData = async () => {
		let req = {};
		try {
			dispatch(showLoader());
			const tilesResponse = await getCountData(req);
			setTilesData(tilesResponse["Data"]);
			dispatch(hideLoader());
		} catch (error) {
			/* istanbul ignore next */
			dispatch(hideLoader());
			/* istanbul ignore next */
			dispatch(showNotification("error", error.message));
		}
	};

	const getUnApprovedParamData = async () => {
		let _reqData = {
			limit: 10,
		};

		const dataColumns = [
			{
				title: "Product",
				key: "product_num",
				dataIndex: "product_num",
			},
			{
				title: "Batch",
				key: "batch_num",
				dataIndex: "batch_num",
			},
			{
				title: "Parameter Name",
				key: "parameter_name",
				dataIndex: "parameter_name",
			},
			{
				title: "Parameter Value",
				key: "parameter_value",
				dataIndex: "parameter_value",
			},

			{
				title: "Site",
				key: "site_code",
				dataIndex: "site_code",
			},
			{
				title: "UOM",
				key: "uom_code",
				dataIndex: "uom_code",
			},
			{
				title: "Created By",
				key: "created_by",
				dataIndex: "created_by",
			},
			{
				title: "Date",
				key: "recorded_date",
				dataIndex: "recorded_date",
			},
		];

		try {
			dispatch(showLoader());
			const dataRes = await getUnapprovedData(_reqData);
			if (dataRes.statuscode === 200) {
				setDataSource(dataRes.Data);
				setColumns(dataColumns);
			} else {
				dispatch(hideLoader());
				dispatch(showNotification("error", "No data found"));
			}
			dispatch(hideLoader());
		} catch (error) {
			/* istanbul ignore next */
			dispatch(hideLoader());
			/* istanbul ignore next */
			dispatch(showNotification("error", "No data found"));
		}
	};

	const approveData = async (_reqParam) => {
		try {
			dispatch(showLoader());
			const approveRes = await approveParamData(_reqParam);
			if (approveRes.Status === 200) {
				dispatch(showNotification("success", approveRes.Message));
				getUnApprovedParamData();
				setIsApprove(true);
			} else {
				dispatch(hideLoader());
				dispatch(showNotification("error", "No data found"));
			}
			dispatch(hideLoader());
		} catch (error) {
			/* istanbul ignore next */
			dispatch(hideLoader());
			/* istanbul ignore next */
			dispatch(showNotification("error", "No data found"));
		}
	};

	const tilesClicked = (item, index) => {
		setItemCount(item.item_count);
		//setIndexCount(index);
		setCardTitle(item.text);
		setActiveDiv(item.text);
		setApplicationType(item.application_type);
	};

	const changeTab = (activeKey) => {
		setActiveTab(activeKey);
	};

	const handleClose = () => {
		setTimeout(() => {
			console.log('timeout')
			getTilesData()

		}, 2000)
		setIsPublish(false);
	};

	const eSignId = (esign) => {
		let _approveReq = {
			esign_id: esign.toString(),
			prod_param_id: selectedRowKeys,
		};

		approveData(_approveReq);
	};

	return (
		<div className="custom-wrapper">
			<BreadCrumbWrapper />

			<div className="custom-content-layout">
				<ScreenHeader
					bannerbg={{
						background: "linear-gradient(180deg, #FFFFFF 0%, #B9D6FF 100%)",
					}}
					title={`Hello ${localStorage.getItem("username")}, welcome back!`}
					description="Today's is a great day to approve some records! Let's take look."
					source={illustrations}
					sourceClass="geanealogy-image"
				/>

				<div className="workflow_items">
					{
						<div className="approve-wrapper">
							{tilesData &&
								tilesData.map((item, index) => {
									return (
										<div
											onClick={() => tilesClicked(item, index)}
											style={{ cursor: "pointer" }}
										>
											<DashCard
												id={index}
												count={item.item_count}
												desc={item.text}
												active={activeDiv}
											/>
										</div>
									);
								})}
						</div>
					}
					{itemCount > 0 ? (
						<div className="approval-table-block workflow-right-block">
							<Card
								className="table-cards "
								title={
									<div className="table-head">
										{cardTitle}
										<DownloadOutlined
											style={{
												color: "#093185",
												marginLeft: "25px",
												fontSize: "20px",
											}}
										/>
									</div>
								}
							>
								{cardTitle === "Param Data Approval" ? (
									<>
										<div style={{ margin: "12px 0px 12px 0px" }}>
											<Button
												className="custom-secondary-btn"
												disabled={isApprove}
												onClick={() => {
													setIsPublish(true);
													setApproveReject("A");
												}}
											>
												Approve
											</Button>
											<Button
												className="custom-primary-btn"
												style={{ marginLeft: "16px" }}
												disabled={isApprove}
												onClick={() => {
													setIsPublish(true);
													setApproveReject("R");
												}}
											>
												Reject
											</Button>
										</div>

										<Table
											rowSelection={{
												selectedRowKeys,
												onChange: (selectedRowKeys, selectedRows) => {
													if (selectedRowKeys.length == 0) {
														setIsApprove(true);
														setSelectedRowKeys(selectedRowKeys);
													} else {
														setIsApprove(false);
														setSelectedRowKeys(selectedRowKeys);
													}
												},
											}}
											className="approval-table"
											columns={columns}
											dataSource={dataSource}
											rowKey="prod_param_id"
											style={{
												border: "1px solid #ececec",
												borderRadius: "2px",
											}}
											pagination={false}
											scroll={{ x: 500, y: 280 }}
										/>
									</>
								) : (
									<Tabs
										className="workflow-tabs"
										activeKey={activeTab}
										onChange={changeTab}
									>
										<TabPane tab="Awaiting Approval" key="1">
											<WorkflowTable
												columns={columns}
												dataSource={dataSource}
												activeTab={activeTab}
											/>
										</TabPane>
										<TabPane tab="Recently Approved" key="2">
											<WorkflowTable
												columns={columns}
												dataSource={dataSource}
												activeTab={activeTab}
											/>
										</TabPane>
									</Tabs>
								)}
							</Card>
						</div>
					) : (
						<Empty
							className="empty-workflow workflow-right-block"
							description={<span>Please select one to view its approvals</span>}
						/>
					)}
				</div>
			</div>
			<Signature
				isPublish={isPublish}
				status={approveReject}
				handleClose={handleClose}
				eSignId={eSignId}
				screenName="Workflow"
				appType="WORKITEMS"
			/>
		</div>
	);
};

export default Workflow;
