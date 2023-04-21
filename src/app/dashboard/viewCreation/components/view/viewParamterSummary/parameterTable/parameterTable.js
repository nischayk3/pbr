import { DeleteOutlined, RightCircleOutlined } from "@ant-design/icons";
import { Button, Checkbox, Input, Modal, Radio, Select, Table, Tag } from "antd";
import React, { memo, useState } from 'react';

const ParameterTable = memo(function ParameterTable() {
	const Option = Select;
	const { Search } = Input;

	const [tableData, setTableData] = useState([
		{
			"aggregation": "Mean",
			"parameter": "ARSENIC",
			"primary": 0,
			"coverage": "66%(2/3)",
			"path": "/115477001-Bi Directional Vernay Valve/DIM_1",
			"data": ">"
		}
	]);
	const [totalMolBatch, setTotalMolBatch] = useState([]);
	const [isMolBatchUpdate, setIsMolBatchUpdate] = useState([]);
	const [filterMolTable, setFilterMolTable] = useState(null);
	const [loading, setLoading] = useState(false);
	const [molBatchColumn, setMolBatchColumn] = useState([
		{
			title: (
				<div className="treenode-block-batch">
					<div className="tree-block-param-batch">
						{/* <Tag color="geekblue">
							ARSENIC
						</Tag> */}
					</div>
				</div>
			),
			dataIndex: 'ARSENIC',
			key: 'ARSENIC',
			width: 80,
			render: (value, record, rowIndex) => {
				if (rowDisable) {
					if (value) {
						return (
							<Checkbox
								// disabled={isParamSelected}
								id="batch-id"
								className="custom-check"
								onChange={(e) => onChangeBatchPopup(e, record, ele)}
								checked={value}
							/>
						);
					} else if (value === "") {

						return (
							<Checkbox
								// disabled={isParamSelected}
								id="batch-id"
								className="custom-check"
								onChange={(e) => onChangeBatchPopup(e, record, ele)}
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
		}
	]);
	const [isBatchTableVisible, setIsBatchTableVisible] = useState(false);
	const [rowDisable, setRowDisable] = useState(true);


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
			dataIndex: 'parameter',
			key: 'parameter',
			render: (text) => {
				return (
					<Tag color="geekblue">
						{text}
					</Tag>
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
		},
		{
			title: 'Path',
			dataIndex: 'path',
			key: 'path',

		},
		{
			title: 'Data',
			dataIndex: 'data',
			key: 'data',
			width: 100,
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
		setIsBatchTableVisible(true);
	}

	const handleTableCancel = () => {
		setIsBatchTableVisible(false);
	}

	const TableSearch = value => {
		const tableDataSearch = [...isMolBatchUpdate];
		const searchTable = tableDataSearch.filter(o =>
			Object.keys(o).some(k =>
				String(o[k]).toLowerCase().includes(value.toLowerCase())
			)
		);
		setFilterMolTable(searchTable)
	};

	return (
		<>
			<div className="param-table">
				<div className="param-column">
					<span onClick={(e) => isModalBatch(e)}>
						<RightCircleOutlined className="right-circle" />
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
						dataSource={filterMolTable === null ? isMolBatchUpdate : filterMolTable}
						size="small"
						scroll={{ y: 450 }}
						rowClassName={(index) =>
							index % 2 === 0 ? "table-row-light" : "table-row-dark"

						}
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
		</>
	);
});


export default ParameterTable;