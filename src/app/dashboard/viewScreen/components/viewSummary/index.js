import { Card, Empty, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	CheckOutlined,
	CloseOutlined,
	DeleteOutlined
} from "@ant-design/icons";
import LabelTag from "../../../../../components/LabelTag";
import "./styles.scss";
import { setViewFunctionName } from "../../../../../duck/actions/viewAction";
import { showNotification } from "../../../../../duck/actions/commonActions";

const ViewSummaryData = ({ viewDisplayId, viewStatus, viewVersion, viewJson, fromWorkflowScreen }) => {

	const dispatch = useDispatch();
	let columns = [];
	const summaryTableData = useSelector(
		(state) => state.viewCreationReducer.summaryTableData
	);
	const functionName = useSelector(
		(state) => state.viewCreationReducer.functionName
	);
	const totalBatch = useSelector((state) => state.viewCreationReducer.totalMolBatches);
	const totalFileBatch = useSelector((state) => state.viewCreationReducer.totalFileBatches);

	const isLoadView = useSelector((state) => state.viewCreationReducer.isLoad);
	const [tableColumn, setTableColumn] = useState(columns);
	const [funTableData, setFunTableData] = useState([]);
	const [totalMolBatch, setTotalMolBatch] = useState([]);

	useEffect(() => {
		if (totalBatch.length > 0 || totalFileBatch.length > 0) {
			setTotalMolBatch([...totalBatch, ...totalFileBatch]);
		}
	}, [totalBatch, totalFileBatch])

	useEffect(() => {
		if (functionName !== "") {
			//	let fun_table = [...funTableData]
			let fun_table = [...summaryTableData]
			console.log("summaryTableData", summaryTableData);
			setFunTableData(fun_table);
		}
	}, [summaryTableData]);
	useEffect(() => {
		if (funTableData.length > 0) {
			const objKey =
				funTableData !== undefined && funTableData.length > 0
					? Object.keys(funTableData[0])
					: [];

			const uniqueArr = (value, index, self) => {
				return self.indexOf(value) === index;
			};

			const summaryColumn = objKey.filter(uniqueArr);

			summaryColumn.map((item, i) => {
				if (item === "batch" || item === "batch_year") {
					return (
						columns.push({
							title: item.toUpperCase().replace("_", " "),
							dataIndex: item,
							key: `${item}-${i}`,
							width: 100
						})
					)
				} else {
					return (
						columns.push({
							title: (
								<div className="summary-column">
									<p>{item.toUpperCase().replace("_", " ")}</p>
									{fromWorkflowScreen ?
										<span >
											<DeleteOutlined className="delete" />
										</span> :
										<span onClick={() => handleRemoveColumn(item)}>
											<DeleteOutlined className="delete" />
										</span>
									}
								</div>
							),
							dataIndex: item,
							key: `${item}-${i}`,

							onHeaderCell: (record) => {
								return {
									onClick: (ev) => {
										dispatch(setViewFunctionName(record.dataIndex));
										dispatch(
											showNotification(
												"success",
												`${record.dataIndex} function selected`
											)
										);
									}
								};
							},
							render: (value) =>
								value ? (
									<span className="batchChecked">
										<CheckOutlined />
									</span>
								) : (
									<span className="batchClosed">
										<CloseOutlined />
									</span>
								),
							width: 130
						})
					)
				}
			});

			const tableColumns = [...columns];
			setTableColumn(tableColumns);


		}
	}, [funTableData]);

	useEffect(() => {
		if (isLoadView) {

			let fun = [];
			let funData = [];

			const loadViewJson = [...viewJson];

			let functions_name =
				loadViewJson[0] && loadViewJson[0].functions
					? loadViewJson[0].functions
					: 0;

			if (functions_name) {
				functions_name = Object.values(functions_name);
				functions_name.map((element) => {
					return fun.push(element.name);
				});
			}


			if (totalMolBatch.length > 0) {
				const loadTableData =
					totalMolBatch !== undefined && totalMolBatch.length > 0
						? totalMolBatch
						: {};

				loadTableData.forEach((element) => {
					let funObj = {};
					for (let i = 0; i < fun.length; i++) {
						funObj[fun[i]] = true;
					}
					funData.push(funObj);
				});

				const mergeArr = loadTableData.map((item, i) =>
					Object.assign({}, item, funData[i])
				);

				const funKey =
					mergeArr !== undefined && mergeArr.length > 0
						? Object.keys(mergeArr[0])
						: [];
				const uniqueArr = (value, index, self) => {
					return self.indexOf(value) === index;
				};
				const funColumn = funKey.filter(uniqueArr);

				funColumn.map((item, i) => {
					return (
						columns.push({
							title: item.toUpperCase().replace("_", " "),
							dataIndex: item,
							key: `${item}-${i}`
						})
					)
				});

				setTableColumn(columns);
				setFunTableData(mergeArr);
			}
		}
	}, [isLoadView, totalMolBatch]);

	const handleRemoveColumn = (item) => {
		let newColumns = [];
		const tableColumns = tableColumn.filter((ele) => {
			return ele.dataIndex !== item;
		});

		const column = columns.filter((ele) => {
			return ele.dataIndex !== item;
		});

		columns = column;
		newColumns = tableColumns;

		setTableColumn(newColumns);
	};

	return (
		<Card title="View Summary">
			<div className="view-summary_lable" style={{ paddingTop: "20px" }}>
				<LabelTag lableName="View ID" lableValue={viewDisplayId} />
				<LabelTag lableName="Status" lableValue={viewStatus} />
				<LabelTag lableName="Version" lableValue={viewVersion} />
			</div>

			<div className="summary-table_block">
				<Table
					rowClassName={(index) =>
						index % 2 === 0 ? "table-row-light" : "table-row-dark"
					}
					locale={{
						emptyText: (
							<Empty
								image={Empty.PRESENTED_IMAGE_SIMPLE}
								description={
									<span>You will see the created fucntions here</span>
								}
							/>
						)
					}}
					columns={tableColumn}
					dataSource={funTableData}
					size="small"
					scroll={{ y: 250 }}
					pagination={false}
				/>
			</div>
		</Card>
	);
};

export const MemoizedViewSummaryData = React.memo(ViewSummaryData);
