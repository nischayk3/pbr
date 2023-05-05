/**
 * @author Dinesh
 * @Mareana - CPV Product
 * @version  2
 * @Last Modified - 20 April, 2023
 * @Last Changed By - Dinesh
 */

import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { Button, Checkbox, Input, Modal, Table, Tag, Tooltip } from "antd";
import axios from "axios";
import React, { memo, useEffect, useState } from 'react';
import { BMS_APP_PYTHON_SERVICE } from "../../../../../../../constants/apiBaseUrl";

const MoleculeBatch = memo(function MoleculeBatch({ totalMolBatch, setTotalMolBatch, tableData, viewDataJson, setViewDataJson, selectParameter, isModalBatch, setIsModalBatch }) {
	const [isBatchTableVisible, setIsBatchTableVisible] = useState(false);
	const [molBatchColumn, setMolBatchColumn] = useState([]);
	const [rowDisable, setRowDisable] = useState(true);

	const { Search } = Input;

	useEffect(() => {
		if (isModalBatch) {
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
	}, [isModalBatch])

	const TableSearch = value => {
		const tableDataSearch = [...totalMolBatch];
		const searchTable = tableDataSearch.filter(o =>
			Object.keys(o).some(k =>
				String(o[k]).toLowerCase().includes(value.toLowerCase())
			)
		);
		setFilterMolTable(searchTable)
	};

	const handleTableCancel = () => {
		setIsBatchTableVisible(false);
		setIsModalBatch(false)
	}

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
						render: (value, record) => {
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
			} else if (apiRes.status === 400 || apiRes.status === 404) {
				dispatch(showNotification("error", apiRes.message));
			}
		} catch (error) {

		}
	};
	const onChangeBatch = (e, record, key) => {
		const molTableData = JSON.parse(JSON.stringify(totalMolBatch))
		const excludeJson = { ...viewDataJson }

		molTableData.forEach((ele) => {
			if (ele.batch_num === record.batch_num) {
				ele[key] = !e.target.checked ? "" : e.target.checked;
			}
		})

		excludeJson?.data?.forEach((ele) => {
			ele.parameters.forEach((e) => {
				if (e.title === key) {
					if (e.batch_exclude.indexOf(record.batch_num) === -1) {
						e.batch_exclude.push(record.batch_num);
					}
				}
			})
		})

		setViewDataJson(excludeJson)
		setTimeout(() => {
			setTotalMolBatch(molTableData)
		}, 1000);
	}

	return (
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
	)

})

export default MoleculeBatch;
