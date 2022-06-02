/**
 * @author Dinesh Kumar <dinesh.kumar@mareana.com>
 * @Mareana - CPV Product
 * @version 1
 * @Last Modified - 15 March, 2022
 * @Last Changed By - Dinesh Kumar
 */
import { Button, Collapse, Table } from "antd";
import React, { useEffect, useState } from "react";

function GenealogyDataTable(props) {
	const [batchData, setbatchData] = useState({});
	const [limsBatchData, setLimsBatchData] = useState([]);
	const [pbrDetails, setPbrDetails] = useState([]);
	const [proInput, setProInput] = useState([]);
	const [proOutput, setProOutput] = useState([]);
	const [purchaseData, setPurchaseData] = useState([]);

	const { Panel } = Collapse;

	const pbrColumns = [
		{ title: "Site", dataIndex: "site_code", key: "1", width: 100 },
		{ title: "Product", dataIndex: "product_num", key: "2", width: 100 },
		{ title: "Batch", dataIndex: "batch_num", key: "3", width: 100 },
		{ title: "Parameter", dataIndex: "parameter_name", key: "4", width: 100 },
		{ title: "Param Value", dataIndex: "parameter_value", key: "5", width: 100 },
		{ title: "Data Source", dataIndex: "data_source", key: "6", width: 100 },
		{ title: "System Code", dataIndex: "system_code", key: "7", width: 100 },
		{ title: "UOM ", dataIndex: "uom_code", key: "8", width: 100 },
	]
	const limsColumns = [
		{ title: "Batch", dataIndex: "batch_num", key: "1", width: 100 },
		{ title: "Plant", dataIndex: "site_code", key: "2", width: 100 },
		{ title: "Product", dataIndex: "product_num", key: "3", width: 100 },
		{
			title: "Parameter Name",
			dataIndex: "parameter_name",
			key: "4",
			width: 100
		},
		{
			title: "Parameter Value",
			dataIndex: "parameter_value",
			key: "5",
			width: 100
		},
		{ title: "Data Source", dataIndex: "data_source", key: "6", width: 100 },
		{ title: "System Code", dataIndex: "system_code", key: "7", width: 100 }
	];
	const processColumns = [
		{ title: "Process Order", dataIndex: "po_no", key: "1", width: 80 },
		{ title: "Plant", dataIndex: "plant", key: "2", width: 60 },
		{ title: "Product", dataIndex: "mat_no", key: "3", width: 60 },
		{ title: "Batch", dataIndex: "batch_no", key: "4", width: 60 },
		{ title: "Product Desc", dataIndex: "mat_desc", key: "5", width: 100 },
		{ title: "Product Type", dataIndex: "mat_type", key: "6", width: 80 },
		{ title: "Node Id", dataIndex: "node_id", key: "7", width: 100 },
		{ title: "Unit", dataIndex: "unit", key: "8", width: 70 },
		{ title: "Qty", dataIndex: "qty", key: "9", width: 70 }
	];

	const batchEquColumn = [
		{ title: "Process Order", dataIndex: "po_no", key: "1", width: 80 },
		{
			title: "Referenced Element",
			dataIndex: "referenced",
			key: "2",
			width: 80,
			render: (text) => {
				return (
					<a
						href="https://mdh-dashboard.mareana.com/d/trqNakk7z/live-sensor-monitor?orgId=1&from=1515646800000&to=1516770000000"
						target="_blank"
						rel="noreferrer"
					>
						{text}
					</a>
				);
			}
		},
		{ title: "Start Time", dataIndex: "start_time", key: "3", width: 80 },
		{ title: "End Time", dataIndex: "end_time", key: "4", width: 80 }
	];



	//	https://mdh-dashboard.mareana.com/d/trqNakk7z/live-sensor-monitor?orgId=1&from=1515646800000&to=1516770000000

	const batchEquData = [
		{
			po_no: "102250832",
			referenced: "CELL_CULTURECC_PRODSTR271",
			start_time: "3/3/20 23:35",
			end_time: "3/19/20 12:11"
		},
		{
			po_no: "102250832",
			referenced: "CENTRIFUGECENTRIFUGE_PCCE40110",
			start_time: "3/19/20 12:05",
			end_time: "3/19/20 12:06"
		}
	];

	useEffect(() => {
		console.log("props.pbrBatchData12", props.pbrBatchData, props)
		if (props && props.batchInfo) {
			setbatchData(props.batchInfo);
		}
		if (props && props.limsBatchInfo && props.limsBatchInfo.length > 0) {
			setLimsBatchData(props.limsBatchInfo);
		}
		if (props && props.processInput && props.processInput.length > 0) {
			setProInput(props.processInput);
		}
		if (props && props.processOutput && props.processOutput.length > 0) {
			setProOutput(props.processOutput);
		}
		if (props && props.purchaseInfo) {
			setPurchaseData(props.purchaseInfo);
		}
		if (props && props.pbrBatchData) {
			console.log("props.pbrBatchData13", props.pbrBatchData, props)
			setPbrDetails(props.pbrBatchData)
		}
	}, [
		props.processInput,
		props.processOutput,
		props.batchInfo,
		props.limsBatchInfo,
		props.purchaseInfo,
		props.pbrBatchData
	]);

	const callback = (key) => {
		props.setCollapseKey(key);
	};

	return (
		<Collapse
			bordered={false}
			defaultActiveKey={["1"]}
			className={props.className}
			activeKey={props.collapseKey}
			onChange={callback}
		>
			{props.type === "Material" ? (
				<Panel
					header={
						<div className="panel-header">
							<p>Batch details</p>
							<Button
								type="primary"
								className="custom-primary-btn"
								size="small"
							>
								Download
							</Button>
						</div>
					}
					key="1"
				>
					<div className="batch-list">
						<ul>
							<li>
								<p>
									<span>Batch</span> {batchData.batch}
								</p>
							</li>
							<li>
								<p>
									<span>Product</span> {batchData.product}
								</p>
							</li>
							<li>
								<p>
									<span>Description</span> {batchData.product_desc}
								</p>
							</li>
							<li>
								<p>
									<span>Node Id</span> {batchData.node_id}
								</p>
							</li>
						</ul>
					</div>
				</Panel>
			) : (
				<></>
			)}
			{props.type === "Material" ? (
				<Panel
					header={
						<div className="panel-header">
							<p>LIMS details</p>
							<Button
								type="primary"
								className="custom-primary-btn"
								size="small"
							>
								Download
							</Button>
						</div>
					}
					key="2"
				>
					<Table
						rowClassName={(record, index) =>
							index % 2 === 0 ? "table-row-light" : "table-row-dark"
						}
						size="small"
						columns={limsColumns}
						dataSource={limsBatchData}
						scroll={{ x: 1600, y: 350 }}
						pagination={false}
					/>
				</Panel>
			) : (
				<></>
			)}
			{props.type === "Process Order" ? (
				<Panel
					header={
						<div className="panel-header">
							<p>Into process order</p>
							<Button
								type="primary"
								className="custom-primary-btn"
								size="small"
							>
								Download
							</Button>
						</div>
					}
					key="3"
				>
					<Table
						rowClassName={(record, index) =>
							index % 2 === 0 ? "table-row-light" : "table-row-dark"
						}
						size="small"
						columns={processColumns}
						dataSource={proInput}
						scroll={{ x: 1200, y: 350 }}
						pagination={false}
					/>
				</Panel>
			) : (
				<></>
			)}

			{props.type === "Process Order" ? (
				<Panel
					header={
						<div className="panel-header">
							<p>From process order</p>
							<Button
								type="primary"
								className="custom-primary-btn"
								size="small"
							>
								Download
							</Button>
						</div>
					}
					key="4"
				>
					<Table
						rowClassName={(record, index) =>
							index % 2 === 0 ? "table-row-light" : "table-row-dark"
						}
						size="small"
						columns={processColumns}
						dataSource={proOutput}
						scroll={{ x: 1200, y: 350 }}
						pagination={false}
					/>
				</Panel>
			) : (
				<></>
			)}

			{props.type === "Process Order" ? (
				<Panel
					header={
						<div className="panel-header">
							<p>Batch Equipment</p>
							<Button
								type="primary"
								className="custom-primary-btn"
								size="small"
							>
								Download
							</Button>
						</div>
					}
					key="7"
				>
					<Table
						rowClassName={(record, index) =>
							index % 2 === 0 ? "table-row-light" : "table-row-dark"
						}
						size="small"
						columns={batchEquColumn}
						dataSource={batchEquData}
						scroll={{ x: 1200, y: 350 }}
						pagination={false}
					/>
				</Panel>
			) : (
				<></>
			)}

			{props.type === "Purchase Order" ? (
				<Panel
					header={
						<div className="panel-header">
							<p>Purchase information</p>
							<Button
								type="primary"
								className="custom-primary-btn"
								size="small"
							>
								Download
							</Button>
						</div>
					}
					key="5"
				>
					<div className="batch-list">
						<ul>
							<li>
								<p>
									<span>Purchase Order</span> {purchaseData.purchase_id}
								</p>
							</li>
							<li>
								<p>
									<span>Vendor No</span> {purchaseData.vendor_no}
								</p>
							</li>
							<li>
								<p>
									<span>Plant</span> {purchaseData.plant}
								</p>
							</li>
							<li>
								<p>
									<span>Node Id</span> {purchaseData.node_id}
								</p>
							</li>
						</ul>
					</div>
				</Panel>
			) : (
				<></>
			)}

			{props.type === "Material" ? (
				<Panel
					header={
						<div className="panel-header">
							<p>PBR details</p>
							<Button
								type="primary"
								className="custom-primary-btn"
								size="small"
							>
								Download
							</Button>
						</div>
					}
					key="6"
				>
					<Table
						rowClassName={(record, index) =>
							index % 2 === 0 ? "table-row-light" : "table-row-dark"
						}
						size="small"
						columns={pbrColumns}
						dataSource={pbrDetails}
						scroll={{ x: 1600, y: 350 }}
						pagination={false}
					/>
				</Panel>
			) : (
				<></>
			)}
		</Collapse>
	);
}

export default GenealogyDataTable;
