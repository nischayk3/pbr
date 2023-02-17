/**
 * @author Dinesh Kumar <dinesh.kumar@mareana.com>
 * @Mareana - CPV Product
 * @version 1
 * @Last Modified - 15 March, 2022
 * @Last Changed By - Dinesh Kumar
 */
import { SearchOutlined } from "@ant-design/icons";
import { Button, Collapse, Input, Space, Table } from "antd";
import React, { useEffect, useState } from "react";
import Highlighter from "react-highlight-words";
import { useHistory } from "react-router-dom";
import navigate from "../../../../../assets/navigate.png";
import { PRODUCT_FOR } from "../../../../../constants/apiBaseUrl";
/* istanbul ignore next */
function GenealogyDataTable(props) {
	const [batchData, setbatchData] = useState({});
	const [limsBatchData, setLimsBatchData] = useState([]);
	const [pbrDetails, setPbrDetails] = useState([]);
	const [proInput, setProInput] = useState([]);
	const [proOutput, setProOutput] = useState([]);
	const [subPro, setSubPro] = useState([]);
	const [purchaseData, setPurchaseData] = useState([]);
	const [batchEqupData, setBatchEqupData] = useState([]);
	const [searchedColumn, setSearchedColumn] = useState("");
	const [searchText, setSearchText] = useState("");

	const { Panel } = Collapse;

	let history = useHistory();
	/* istanbul ignore next */
	function getColumnSearchProps(dataIndex) {
		return {
			filterDropdown: ({
				setSelectedKeys,
				selectedKeys,
				confirm,
				clearFilters,
			}) => (
				<div style={{ padding: 8 }}>
					<Input
						placeholder={`Search ${dataIndex}`}
						value={selectedKeys[0]}
						onChange={(e) =>
							setSelectedKeys(e.target.value ? [e.target.value] : [])
						}
						onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
						style={{
							marginBottom: 8,
							display: "block",
						}}
					/>
					<Space>
						<Button
							type="primary"
							onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
							icon={<SearchOutlined />}
							size="small"
							style={{ width: 90 }}
						>
							Search
						</Button>
						<Button
							onClick={() => clearFilters && handleReset(clearFilters)}
							size="small"
							style={{ width: 90 }}
						>
							Reset
						</Button>
						<Button
							type="link"
							size="small"
							onClick={() => {
								confirm({ closeDropdown: false });
								setSearchText(selectedKeys[0]);
								setSearchedColumn(dataIndex);
							}}
						>
							Filter
						</Button>
					</Space>
				</div>
			),

			filterIcon: (filtered) => (
				<SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
			),
			onFilter: (value, record) =>
				record[dataIndex]
					? record[dataIndex]
						.toString()
						.toLowerCase()
						.includes(value.toLowerCase())
					: "",
			onFilterDropdownVisibleChange: (visible) => {
				if (visible) {
					// setTimeout(() => this.searchInput.select());
				}
			},
			render: (text) =>
				searchedColumn === dataIndex ? (
					<Highlighter
						highlightStyle={{
							backgroundColor: "#ffc069",
							padding: 0,
						}}
						searchWords={[searchText]}
						autoEscape
						textToHighlight={text?.toString()}
					/>
				) : (
					text
				),
		};
	}

	/* istanbul ignore next */
	function handleSearch(selectedKeys, confirm, dataIndex) {
		confirm();
		setSearchText(selectedKeys[0]);
		setSearchedColumn(dataIndex);
	}

	/* istanbul ignore next */
	function handleReset(clearFilters) {
		clearFilters();
		setSearchText("");
	}
	console.log("PRODUCT_FOR === 'MI'", PRODUCT_FOR === 'MI', PRODUCT_FOR == 'MI', PRODUCT_FOR);

	if (PRODUCT_FOR === 'MI' || PRODUCT_FOR === 'BMS') {
		console.log("mibms true");
	} else {
		console.log("merck true");
	}
	// const pbrColumns = [
	// 	{ title: "Site", dataIndex: "site_code", key: "1", width: 100, ...getColumnSearchProps('site_code') },
	// 	{ title: "Product", dataIndex: "product_num", key: "2", width: 100, ...getColumnSearchProps('product_num') },
	// 	{ title: "Batch", dataIndex: "batch_num", key: "3", width: 100, ...getColumnSearchProps('batch_num') },
	// 	{ title: "Parameter", dataIndex: "parameter_name", key: "4", width: 100, ...getColumnSearchProps('parameter_name') },
	// 	{ title: "Param Value", dataIndex: "parameter_value", key: "5", width: 100, ...getColumnSearchProps('parameter_value') },
	// 	{ title: "Data Source", dataIndex: "data_source", key: "6", width: 100, ...getColumnSearchProps('data_source') },
	// 	{ title: "System Code", dataIndex: "system_code", key: "7", width: 100, ...getColumnSearchProps('system_code') },
	// 	{ title: "UOM ", dataIndex: "uom_code", key: "8", width: 100, ...getColumnSearchProps('uom_code') },
	// ]
	const limsColumns = [
		{
			title: "Batch",
			dataIndex: "batch_num",
			key: "1",
			width: 100,
			...getColumnSearchProps("batch_num"),
		},
		{
			title: "Plant",
			dataIndex: "site_code",
			key: "2",
			width: 100,
			...getColumnSearchProps("site_code"),
		},
		{
			title: "Product",
			dataIndex: "product_num",
			key: "3",
			width: 100,
			...getColumnSearchProps("product_num"),
		},
		{
			title: "Parameter Name",
			dataIndex: "parameter_name",
			key: "4",
			width: 100,
			...getColumnSearchProps("parameter_name"),
		},
		{
			title: "Parameter Value",
			dataIndex: "parameter_value",
			key: "5",
			width: 100,
			...getColumnSearchProps("parameter_value"),
		},
		{
			title: "Data Source",
			dataIndex: "data_source",
			key: "6",
			width: 100,
			...getColumnSearchProps("data_source"),
		},
		{
			title: "System Code",
			dataIndex: "system_code",
			key: "7",
			width: 100,
			...getColumnSearchProps("system_code"),
		},
	];

	const processColumns = [
		{
			title: "Process Order",
			dataIndex: "po_no",
			key: "1",
			width: 80,
			...getColumnSearchProps("po_no"),
		},
		{
			title: "Plant",
			dataIndex: "plant",
			key: "2",
			width: 60,
			...getColumnSearchProps("plant"),
		},
		{
			title: "Product",
			dataIndex: "mat_no",
			key: "3",
			width: 60,
			...getColumnSearchProps("mat_no"),
		},
		{
			title: "Batch",
			dataIndex: "batch_no",
			key: "4",
			width: 60,
			...getColumnSearchProps("batch_no"),
		},
		{
			title: "Product Desc",
			dataIndex: "mat_desc",
			key: "5",
			width: 100,
			...getColumnSearchProps("mat_desc"),
		},
		{
			title: "Product Type",
			dataIndex: "mat_type",
			key: "6",
			width: 80,
			...getColumnSearchProps("mat_type"),
		},
		{
			title: "Node Id",
			dataIndex: "node_id",
			key: "7",
			width: 100,
			...getColumnSearchProps("node_id"),
		},
		{
			title: "Unit",
			dataIndex: "unit",
			key: "8",
			width: 70,
			...getColumnSearchProps("unit"),
		},
		{
			title: "Qty",
			dataIndex: "qty",
			key: "9",
			width: 70,
			...getColumnSearchProps("qty"),
		},
	];

	const subProcessColumn = [
		{
			title: "Process Order",
			dataIndex: "process_order_name",
			key: "1",
			width: 80,
			...getColumnSearchProps("process_order_name"),
		},
		{
			title: "Process Stage",
			dataIndex: "process_stage",
			key: "2",
			width: 60,
			...getColumnSearchProps("process_stage"),
		},
		{
			title: "Product",
			dataIndex: "product_number",
			key: "3",
			width: 60,
			...getColumnSearchProps("product_number"),
		},
		{
			title: "Batch",
			dataIndex: "batch_number",
			key: "4",
			width: 60,
			...getColumnSearchProps("batch_number"),
		},
		{
			title: "Equipment Desc",
			dataIndex: "equipment_description",
			key: "5",
			width: 100,
			...getColumnSearchProps("equipment_description"),
		},
		{
			title: "File Name",
			dataIndex: "file_name",
			key: "6",
			width: 80,
			...getColumnSearchProps("file_name"),
		},
		{
			title: "Manufacturer",
			dataIndex: "manufacturer",
			key: "7",
			width: 100,
			...getColumnSearchProps("manufacturer"),
		},
		{
			title: "Model",
			dataIndex: "model",
			key: "8",
			width: 70,
			...getColumnSearchProps("model"),
		},
		{
			title: "Tag",
			dataIndex: "tag",
			key: "9",
			width: 70,
			...getColumnSearchProps("tag"),
		},
	];

	const toTimestamp = (strDate) => {
		var datum = Date.parse(strDate);
		return datum;
	};

	const batchEquColumn = [
		{
			title: "Batch",
			dataIndex: "batch_no",
			key: "1",
			width: 80,
			...getColumnSearchProps("batch_no"),
		},
		{
			title: "Process Order",
			dataIndex: "process_order",
			key: "2",
			width: 80,
			...getColumnSearchProps("process_order"),
		},
		{
			title: "Equipment Id",
			dataIndex: "equipment_id",
			key: "3",
			width: 80,
			...getColumnSearchProps("equipment_id"),
			render: (text, record) => (
				<a
					href={
						record.url1 +
						toTimestamp(record.start_date) +
						record.url2 +
						toTimestamp(record.end_date) +
						record.url3 +
						record.equipment_id +
						record.url4
					}
					target="_blank"
					rel="noreferrer"
				>
					{text}
				</a>
			),
			// ...getColumnSearchProps('equipment_id')
		},
		{
			title: "Start Time",
			dataIndex: "start_date",
			key: "4",
			width: 80,
			...getColumnSearchProps("start_date"),
		},
		{
			title: "End Time",
			dataIndex: "end_date",
			key: "5",
			width: 80,
			...getColumnSearchProps("end_date"),
		},
	];

	useEffect(() => {
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
		if (props && props.subProcess && props.subProcess.length > 0) {
			setSubPro(props.subProcess);
		}
		if (props && props.purchaseInfo) {
			setPurchaseData(props.purchaseInfo);
		}
		if (props && props.pbrBatchData) {
			setPbrDetails(props.pbrBatchData);
		}
		if (props && props.batchEquData) {
			setBatchEqupData(props.batchEquData);
		}
	}, [
		props.processInput,
		props.processOutput,
		props.subProcess,
		props.batchInfo,
		props.limsBatchInfo,
		props.purchaseInfo,
		props.pbrBatchData,
		props.batchEquData,
	]);

	/* istanbul ignore next */
	const callback = (key) => {
		props.setCollapseKey(key);
	};

	const handleNavigation = (item) => {
		history.push(
			`/dashboard/pbr_update?id=${item?.tran_pbr_id}&temp_disp_id=${item?.template_id}&version=${item?.template_version}&param_name=${item?.parameter_name}`
		);
	};
	const handleTableNavigation = (item) => {
		history.push(
			`/dashboard/pbr_table_reviewer?id=${item?.tran_pbr_id}&temp_disp_id=${item?.template_id}&version=${item?.template_version}&param_name=${item?.table_name}`
		);
	};
	const handleNavigateElogbook = (item) => {
		history.push(
			`/dashboard/elog_book_data_entry/data_entry_forms?molecule=${item.molecule}&template_disp_id=${item.template_disp_id}&version=${item.version}&site=${item.site}&recording_id=${item.recording_id}`
		);
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
							{PRODUCT_FOR === 'MI' || PRODUCT_FOR === 'BMS' && (<Button
								type="primary"
								className="custom-primary-btn"
								size="small"
							>
								Download
							</Button>)}
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

			{PRODUCT_FOR === 'MI' || PRODUCT_FOR === 'BMS' ? (
				<>
					{props.type === "Material" ? (
						<Panel
							header={
								<div className="panel-header">
									<p>LIMS details</p>
									{PRODUCT_FOR === 'MI' || PRODUCT_FOR === 'BMS' && (<Button
										type="primary"
										className="custom-primary-btn"
										size="small"
									>
										Download
									</Button>)}
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
					) : <></>}
				</>
			)
				: <></>
			}

			{props.type === "Process Order" ? (
				<Panel
					header={
						<div className="panel-header">
							<p>Into process order</p>
							{PRODUCT_FOR === 'MI' || PRODUCT_FOR === 'BMS' && (<Button
								type="primary"
								className="custom-primary-btn"
								size="small"
							>
								Download
							</Button>)}
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
							{PRODUCT_FOR === 'MI' || PRODUCT_FOR === 'BMS' && (<Button
								type="primary"
								className="custom-primary-btn"
								size="small"
							>
								Download
							</Button>)}
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
							<p>Sub process order</p>
							{PRODUCT_FOR === 'MI' || PRODUCT_FOR === 'BMS' && (<Button
								type="primary"
								className="custom-primary-btn"
								size="small"
							>
								Download
							</Button>)}
						</div>
					}
					key="9"
				>
					<Table
						rowClassName={(record, index) =>
							index % 2 === 0 ? "table-row-light" : "table-row-dark"
						}
						size="small"
						columns={subProcessColumn}
						dataSource={subPro}
						scroll={{ x: 1200, y: 350 }}
						pagination={false}
					/>
				</Panel>
			) : (
				<></>
			)}

			{PRODUCT_FOR === 'MI' || PRODUCT_FOR === 'BMS' ? (
				<>
					{props.type === "Process Order" ? (
						<Panel
							header={
								<div className="panel-header">
									<p>Batch Equipment</p>
									{PRODUCT_FOR === 'MI' || PRODUCT_FOR === 'BMS' && (<Button
										type="primary"
										className="custom-primary-btn"
										size="small"
									>
										Download
									</Button>)}
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
								dataSource={batchEqupData}
								scroll={{ x: 1200, y: 350 }}
								pagination={false}
							/>
						</Panel>
					) : <></>}
				</>
			)
				: <></>
			}

			{props.type === "Purchase Order" ? (
				<Panel
					header={
						<div className="panel-header">
							<p>Purchase information</p>
							{PRODUCT_FOR === 'MI' || PRODUCT_FOR === 'BMS' && (<Button
								type="primary"
								className="custom-primary-btn"
								size="small"
							>
								Download
							</Button>)}
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
							{PRODUCT_FOR === 'MI' || PRODUCT_FOR === 'BMS' && (<Button
								type="primary"
								className="custom-primary-btn"
								size="small"
							>
								Download
							</Button>)}
						</div>
					}
					key="6"
				>

					<Collapse className={props.className} bordered={false} accordion>
						<Panel
							header={
								<div className="panel-header">
									<p>Parameters</p>
								</div>
							}
							key="1"
						>
							<div style={{ height: 220, overflowY: "scroll" }}>
								{pbrDetails?.Parameter?.map((item) => (
									<div
										className="pbrData"
										style={{
											display: "flex",
											justifyContent: "space-between",
											font: "Roboto",
											fontSize: 14,
											fontWeight: 400,
										}}
									>
										<p>
											{item.parameter_name.toUpperCase()} | {item.tran_pbr_id}
										</p>
										{
											/* <ManOutlined style={{marginRight:20}}/> */
											<img
												src={navigate}
												style={{
													width: "19px",
													height: "20px",
													marginRight: 15,
													cursor: "pointer",
												}}
												onClick={() => handleNavigation(item)}
											/>
										}
									</div>
								))}
							</div>
						</Panel>
						<Panel
							header={
								<div className="panel-header">
									<p>Tables</p>
								</div>
							}
							key="2"
						>
							<div style={{ height: 220, overflowY: "scroll" }}>
								{pbrDetails?.Table?.map((item) => (
									<div
										style={{
											display: "flex",
											justifyContent: "space-between",
											font: "Roboto",
											fontSize: 14,
											fontWeight: 400,
										}}
									>
										<p>
											{item.table_name.toUpperCase()} | {item.tran_pbr_id}
										</p>
										{/* <ManOutlined /> */}
										<img
											src={navigate}
											style={{
												width: "19px",
												height: "20px",
												marginRight: 15,
												cursor: "pointer",
											}}
											onClick={() => handleTableNavigation(item)}
										/>
									</div>
								))}
							</div>
						</Panel>
					</Collapse>
				</Panel>
			) : (
				<></>
			)}

			{PRODUCT_FOR === 'MI' || PRODUCT_FOR === 'BMS' ? (
				<>
					{props.type === "Material" ? (
						<Panel
							header={
								<div className="panel-header">
									<p>Batch Equipment</p>
									{PRODUCT_FOR === 'MI' || PRODUCT_FOR === 'BMS' && (<Button
										type="primary"
										className="custom-primary-btn"
										size="small"
									>
										Download
									</Button>)}
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
								dataSource={batchEqupData}
								scroll={{ x: 1200, y: 350 }}
								pagination={false}
							/>
						</Panel>
					) : <></>}
				</>
			)
				: <></>
			}

			{props.type === "Material" ? (
				<Panel
					header={
						<div className="panel-header">
							<p>e-Log Book Forms</p>
						</div>
					}
					key="8"
				>
					<div className="batch-list">
						{props?.elogBookData?.length ? (
							props?.elogBookData?.map((ele) => {
								return (
									<ul>
										<li>
											<p>
												<span>{ele?.record_name}</span> &nbsp;&nbsp; <a onClick={() => handleNavigateElogbook(ele)}>
													View Record
												</a>
											</p>
										</li>
									</ul>

								);
							})
						) : (
							<>
								<p>There are no elogbook forms associated with this material</p>
							</>
						)}
					</div>

				</Panel>
			) : (
				<></>
			)}
		</Collapse>
	);
}

export default GenealogyDataTable;
