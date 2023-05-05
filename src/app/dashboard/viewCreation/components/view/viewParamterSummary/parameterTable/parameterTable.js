/**
 * @author Dinesh
 * @Mareana - CPV Product
 * @version  2
 * @Last Modified - 20 April, 2023
 * @Last Changed By - Dinesh
 */


import { DeleteOutlined, RightCircleOutlined } from "@ant-design/icons";
import { Modal, Radio, Select, Table, Tag, Tooltip } from "antd";
import axios from "axios";
import React, { memo, useEffect, useState } from 'react';
import { BMS_APP_PYTHON_SERVICE } from "../../../../../../../constants/apiBaseUrl";
import { generateColumns } from "../../../../../../../utils/TableColumns";
import MoleculeBatch from "./moleculeBatch";

const ParameterTable = memo(function ParameterTable({ viewDataJson, setViewDataJson, selectParameter, setSelectParameter, cardTitle, setCardTitle, selectedRowData, setSelectedRowData, counter, setCounter }) {
	const Option = Select;
	const [tableData, setTableData] = useState([]);
	const [filterMolTable, setFilterMolTable] = useState(null);
	const [loading, setLoading] = useState(false);
	const [loadingRaw, setLoadingRaw] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [rawDataTable, setRawDataTable] = useState([]);
	const [rawDataTableColumn, setRawDataTableColumn] = useState([]);
	const [scrollX, setScrollX] = useState(1200);
	const [isModalBatch, setIsModalBatch] = useState(false);
	const [totalMolBatch, setTotalMolBatch] = useState([]);
	const [selectedRowKey, setSelectedRowKey] = useState('');
	const [selectedRowKeys, setSelectedRowKeys] = useState([]);


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
						value={record.uuid}
						checked={selectedRowKey === record.uuid}
						onChange={() => handlePrioritySelection(record, index)}
					/>
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
						onChange={(e, value) => {
							handleAggregationChange(record, value);
						}}
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
					</Select >
				);
			}
		},
		{
			title: 'Coverage',
			dataIndex: 'coverage',
			key: 'coverage',
			render: (text) => {
				return <a>Display coverage</a>
			}
		},

		{
			title: 'Raw Data',
			dataIndex: 'data',
			key: 'data',
			render: (text, record) => {
				return <a onClick={(e) => showRawData(e, record)}>Display raw data</a>
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


	const handleResize = () => {
		// calculate the new scroll width based on the width of the container
		const newScrollX = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) - 200;
		setScrollX(newScrollX);
	};

	const handleAggregationChange = (record, value) => {
		setSelectedRowKey(record.uuid);
		const aggData = [...selectedRowData];

		const selectedAggData = aggData.find(row => row.uuid === record.uuid);
		if (!selectedAggData) {
			return aggData;
		}
		// Update selected row priority to 1
		const updatedAggData = aggData.map(row => {
			if (row.uuid === record.uuid) {
				return { ...row, aggregation: value?.value != undefined ? value?.value : value };
			}
			return row;
		});
		setSelectedRowData(updatedAggData)
	};

	const handlePrioritySelection = (record, index) => {
		setSelectedRowKey(record.uuid);
		const newData = [...selectedRowData];
		const priorityData = reorderData(record.uuid, newData);
		setSelectedRowData(priorityData);
	};


	function reorderData(selectedKey, data) {
		// Find the selected row
		const selectedRow = data.find(row => row.uuid === selectedKey);
		if (!selectedRow) {
			return data; // Return original data if selected key is not found
		}

		// Update selected row priority to 1
		const updatedData = data.map(row => {
			if (row.uuid === selectedKey) {
				return { ...row, priority: 1 };
			}
			return row;
		});

		// Sort updated data by priority, excluding the selected row
		const otherRows = updatedData.filter(row => row.uuid !== selectedKey);
		const sortedRows = otherRows.sort((a, b) => a.priority - b.priority);

		// Update priorities of the other rows based on their sorted order
		let currentPriority = 2;
		sortedRows.forEach(row => {
			updatedData.find(r => r.uuid === row.uuid).priority = currentPriority;
			currentPriority++;
		});

		return updatedData;
	}

	const rowSelection = {
		selectedRowKeys,
		onChange: (selectedRowKeys, selectedRows,) => {
			const selectedJson = JSON.parse(JSON.stringify(selectedRows));;
			const updateData = selectedJson.map((ele, i) => {
				return {
					...ele,
					priority: ++i
				}
			})
			setCounter(counter + 1)
			setSelectedRowData(updateData);
			setSelectedRowKeys(selectedRowKeys);
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

	const isBatchModalVisible = () => {
		setIsModalBatch(true)
	}

	return (
		<>
			<div className="param-table">
				<div className="param-column">
					<span onClick={() => isBatchModalVisible()}>
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

			<MoleculeBatch
				tableData={tableData}
				isModalBatch={isModalBatch}
				setIsModalBatch={setIsModalBatch}
				viewDataJson={viewDataJson}
				setViewDataJson={setViewDataJson}
				selectParameter={selectParameter}
				totalMolBatch={totalMolBatch}
				setTotalMolBatch={setTotalMolBatch}
			/>

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
