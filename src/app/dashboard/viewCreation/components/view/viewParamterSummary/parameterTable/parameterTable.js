import { CheckOutlined, CloseOutlined, DeleteOutlined, RightCircleOutlined } from "@ant-design/icons";
import { Button, Checkbox, Input, Modal, Radio, Select, Table, Tag, Tooltip } from "antd";
import axios from "axios";
import React, { memo, useEffect, useState } from 'react';
import { BMS_APP_PYTHON_SERVICE } from "../../../../../../../constants/apiBaseUrl";
import { generateColumns } from "../../../../../../../utils/TableColumns";

const ParameterTable = memo(function ParameterTable({ viewDataJson, setViewDataJson, selectParameter, setSelectParameter, cardTitle, setCardTitle, selectedRow, setSelectedRow }) {
	const Option = Select;
	const { Search } = Input;

	const [tableData, setTableData] = useState([]);
	const [totalMolBatch, setTotalMolBatch] = useState();
	const [filterMolTable, setFilterMolTable] = useState(null);
	const [loading, setLoading] = useState(false);
	const [loadingRaw, setLoadingRaw] = useState(false);
	const [molBatchColumn, setMolBatchColumn] = useState([]);
	const [isBatchTableVisible, setIsBatchTableVisible] = useState(false);
	const [rowDisable, setRowDisable] = useState(true);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [rawDataTable, setRawDataTable] = useState([]);
	const [rawDataTableColumn, setRawDataTableColumn] = useState([]);
	const [scrollX, setScrollX] = useState(1200);

	useEffect(() => {
		const jsonData = { ...viewDataJson };
		jsonData && jsonData?.data.map((ele) => {
			return setTableData(ele?.parameters)
		})
	}, [viewDataJson])

	useEffect(() => {
		window.addEventListener('resize', handleResize);
		handleResize();
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const handleResize = () => {
		// calculate the new scroll width based on the width of the container
		const newScrollX = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) - 200;
		setScrollX(newScrollX);
	};


	const columns = [
		{
			title: "",
			dataIndex: "delete",
			key: "delete",
			width: 40,
			render: (value, record) => <DeleteOutlined className="delete-param" />
		},
		{
			title: 'Parameter',
			dataIndex: 'title',
			key: 'title',
			render: (text) => {
				return (
					<Tooltip title={text}>
						<Tag color="geekblue" className="paramtitle--overflow">
							{text}
						</Tag>
					</Tooltip>
				)
			}
		},
		{
			title: 'Primary',
			dataIndex: 'primary',
			key: 'primary',
			render: (text, record, index) => {
				return (
					<Radio
						id="param-radio"
					></Radio>
				);
			}
		},
		{
			title: 'Aggregation',
			dataIndex: 'aggregation',
			key: 'aggregation',
			render: (text, record, index) => {
				return (
					<Select
						style={{ width: "100px" }}
						placeholder="Aggregation"
						{...(text && { defaultValue: text })}
					>
						<Option key="1" value="Min">
							Min
						</Option>
						<Option key="2" value="Mean">
							Mean
						</Option>
						<Option key="3" value="Max">
							Max
						</Option>
						<Option key="4" value="First">
							First
						</Option>
						<Option key="5" value="Last">
							Last
						</Option>
					</Select>
				);
			}
		},
		{
			title: 'Coverage',
			dataIndex: 'coverage',
			key: 'coverage',
			render: (text) => {
				return <a>View coverage</a>
			}
		},

		{
			title: 'Raw Data',
			dataIndex: 'data',
			key: 'data',
			width: 100,
			render: (text, record) => {
				return <a onClick={(e) => showRawData(e, record)}>View raw data</a>
			}
		},
		{
			title: 'Path',
			dataIndex: 'path',
			key: 'path',
			width: 250,
			render: (text) => {
				return (
					<Tooltip title={text}>
						<p className="path--overflow">{text}</p>
					</Tooltip>
				)
			}
		},
	];

	const handleChange = (text, record, value, index) => {
		const tableRecord = [...tableData]
		const tableJson = [...finalJson?.children]
		const jsonObj = {
			ds_name: finalJson?.ds_name,
			process_step: finalJson?.process_step,
			uuid: finalJson?.uuid,
		}
		const finalProcessStep = updateData(tableJson, record?.uuid, 'process-step', value)
		const newProcessStep = updateData(tableRecord, record?.uuid, 'process-step', value)

		const objMerge = {
			ds_name: jsonObj?.ds_name,
			process_step: jsonObj?.process_step,
			uuid: jsonObj?.uuid,
			children: [...finalProcessStep]
		}

		setTableData(newProcessStep)
		setFinalJson(objMerge)
	}

	const updateData = (data, uuid, key, value) => {
		return data.map((item) => {
			if (item.uuid === uuid) {
				return { ...item, [key]: value };
			} else if (item?.children?.length > 0) {
				return { ...item, children: updateData(item.children, uuid, key, value) };
			}
			return item;
		});
	};

	const isModalBatch = () => {
		const _req = {
			page: 1,
			per_page: 25,
			is_page: false,
			key: '75833b02-1cec-47b1-b435-6df113555587'
		}

		const _recordData = {
			data: tableData,
		}

		moleculeBatchData(_recordData, _req);
		setIsBatchTableVisible(true);
	}

	const handleTableCancel = () => {
		setIsBatchTableVisible(false);
	}

	const TableSearch = value => {
		const tableDataSearch = [...totalMolBatch];
		const searchTable = tableDataSearch.filter(o =>
			Object.keys(o).some(k =>
				String(o[k]).toLowerCase().includes(value.toLowerCase())
			)
		);
		setFilterMolTable(searchTable)
	};

	const rowSelection = {
		// selectedRowKeys,
		onChange: (selectedRowKeys, selectedRows) => {
			setSelectedRow(selectedRows);
			setSelectParameter(true);
			setCardTitle("Done")
		},
		getCheckboxProps: () => ({
			disabled: !selectParameter,
		}),

	}

	const showRawData = (e, _record) => {
		const _req = {
			page: 1,
			per_page: 25,
			is_page: false,
			key: '75833b02-1cec-47b1-b435-6df113555587'
		}
		rawData(_record, _req);
		setIsModalOpen(true);
	}

	const cancelModal = () => {
		setIsModalOpen(false);
	}

	const rawData = async (_reqMolecule, _params) => {
		let login_response = JSON.parse(localStorage.getItem("login_details"));
		const headers = {
			'Content-Type': 'application/json',
			"x-access-token": login_response.token ? login_response.token : "",
			"resource-name": "VIEW",
		};

		try {
			const apiRes = await axios.post(BMS_APP_PYTHON_SERVICE + "/view-raw-data", _reqMolecule, { params: _params, headers: headers });
			if (apiRes.status === 200) {

				const data = apiRes?.data?.data
				const rawColumn = generateColumns(data)

				setRawDataTableColumn(rawColumn);
				setRawDataTable(data);
				setLoadingRaw(false);
			} else if (apiRes.status === 400 || apiRes.status === 404) {
				setLoadingRaw(false);
				dispatch(showNotification("error", apiRes.message));
			}
		} catch (error) {
			setLoadingRaw(false);
		}
	};


	const moleculeBatchData = async (_reqMolecule, _params) => {
		let login_response = JSON.parse(localStorage.getItem("login_details"));
		const headers = {
			'Content-Type': 'application/json',
			"x-access-token": login_response.token ? login_response.token : "",
			"resource-name": "VIEW",
		};

		try {
			const apiRes = await axios.post(BMS_APP_PYTHON_SERVICE + "/view-molecule-parameter-table", _reqMolecule, { params: _params, headers: headers });
			if (apiRes.status === 200) {

				const data = apiRes?.data?.data
				const rawColumn = generateBatchColumns(data)

				setMolBatchColumn(rawColumn);
				setTotalMolBatch(data);
				setLoadingRaw(false);
			} else if (apiRes.status === 400 || apiRes.status === 404) {
				setLoadingRaw(false);
				dispatch(showNotification("error", apiRes.message));
			}
		} catch (error) {
			setLoadingRaw(false);
		}
	};


	const generateBatchColumns = (responseData) => {
		const columns = [{
			title: 'BATCH',
			dataIndex: 'batch_num',
			key: 'batch_num',
			width: 80,
		}
		];
		const firstRow = responseData[0];
		for (const key in firstRow) {
			if (Object.hasOwnProperty.call(firstRow, key)) {
				if (key !== "batch_num") {
					columns.push({
						title: (
							<Tooltip title={key.toUpperCase()}>
								<Tag color="geekblue" className="paramtitle--overflow">
									{key.toUpperCase()}
								</Tag>
							</Tooltip>
						),
						dataIndex: key,
						key: `${key + 2}`,
						width: 150,
						render: (value, record, rowIndex) => {
							console.log("value, record, rowIndex", value, record, rowIndex);
							console.log("selectParameter", !selectParameter);
							if (selectParameter) {
								if (value) {
									return (
										<Checkbox
											//disabled={isParamSelected}
											className="custom-check"
											onChange={(e) => onChangeBatch(e, record, key)}
											checked={value}
										/>
									);
								} else if (value === "") {
									return (
										<Checkbox
											//disabled={isParamSelected}
											className="custom-check"
											onChange={(e) => onChangeBatch(e, record, key)}
											checked={value === "" ? false : true}
										/>
									);
								} else {
									return (
										<span className="batchClosed">
											<CloseOutlined />
										</span>
									);
								}
							} else {
								if (value) {
									return (
										<span className="batchChecked">
											<CheckOutlined />
										</span>
									);
								} else {
									return (
										<span className="batchClosed">
											<CloseOutlined />
										</span>
									);
								}
							}
						}
					})
				}
			}
		}
		return columns;
	};

	const onChangeBatch = (e, record, key) => {
		console.log("e, record, rowIndex, key", record, key);
		const molTableData = [...totalMolBatch]
		const excludeJson = { ...viewDataJson }
		console.log("molTableData", molTableData, totalMolBatch);

		molTableData.forEach((ele) => {
			if (ele.batch_num === record.batch_num) {
				ele[key] = e.target.checked == false ? "" : e.target.checked;
			}
		})
		console.log("molTableData", molTableData, totalMolBatch);


		excludeJson?.data?.forEach((ele) => {
			ele.parameters.forEach((e) => {
				if (e.title === key) {
					if (e.batch_exclude.indexOf(record.batch_num) === -1) {
						e.batch_exclude.push(record.batch_num);
					}
				}
			})
		})
		console.log("excludeJson", excludeJson);
		setViewDataJson(excludeJson)
		setTotalMolBatch(totalMolBatch);
	}
	console.log("total mol batch", totalMolBatch);
	return (
		<>
			<div className="param-table">
				<div className="param-column">
					<span onClick={() => isModalBatch()}>
						<Tooltip title="Molecule batch">
							<RightCircleOutlined className="right-circle" />
						</Tooltip>
					</span>
				</div>
				<Table
					rowClassName={(record, index) =>
						index % 2 === 0 ? "table-row-light" : "table-row-dark"
					}
					columns={columns}
					dataSource={tableData}
					pagination={false}
					rowKey={(record) => record.uuid}
					loading={loading}
					rowSelection={{
						type: "checkbox",
						...rowSelection
					}}
				/>
			</div>

			<Modal
				title={(
					<Search
						placeholder='Search'
						allowClear
						onSearch={TableSearch}
						id='molecule_table'
					/>
				)}
				width={700}
				visible={isBatchTableVisible}
				onCancel={handleTableCancel}
				footer={null}
				className="batch-modal"
			>
				<div className="batch-table-block">
					<Table
						columns={molBatchColumn}
						dataSource={totalMolBatch}
						size="small"
						scroll={{ y: 450 }}
						rowClassName={(index) =>
							index % 2 === 0 ? "table-row-light" : "table-row-dark"

						}
						rowKey={(record) => record.batch_num}
					/>
					<div className="batch-table-footer">
						{rowDisable ? (<Button
							onClick={handleTableCancel}
							type="text"
							className="custom-primary-btn "
						>
							Apply
						</Button>) : (<Button
							onClick={handleTableCancel}
							type="text"
							className="custom-primary-btn "
						>
							Back
						</Button>)}
					</div>
				</div>
			</Modal>

			<Modal
				visible={isModalOpen}
				width={1200}
				title="Raw data"
				footer={null}
				onCancel={cancelModal}
			>
				<Table
					rowClassName={(record, index) =>
						index % 2 === 0 ? "table-row-light" : "table-row-dark"
					}
					columns={rawDataTableColumn}
					dataSource={rawDataTable}
					pagination={false}
					rowKey={(record) => record.uuid}
					loading={loadingRaw}
					scroll={{ x: scrollX, y: 500 }}
				/>
			</Modal>
		</>
	);
});


export default ParameterTable;