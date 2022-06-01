/**
 * @author Dinesh Kumar <dinesh.kumar@mareana.com>
 * @Mareana - CPV Product
 * @version  1
 * @Last Modified - 4 April, 2022
 * @Last Changed By - Dinesh
 */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tag, Tree } from "antd";
import { CheckOutlined, PlusOutlined } from "@ant-design/icons";
import {
	batchCoverage,
	sendSelectedParamData
} from "../../../../../duck/actions/viewAction";
import "./style.scss";
import { showNotification } from "../../../../../duck/actions/commonActions";

const { TreeNode } = Tree;
let setKey = [];
let selectedData = [];
let finalData = [];
const MaterialTree = (props) => {
	const dispatch = useDispatch();
	const { materialsList, parentBatches } = props;

	const [selectedKeys, setSelectedKeys] = useState([]);
	const [checkedKeys, setCheckedKeys] = useState([]);
	const [count, setCount] = useState("");

	const selectedTableData = useSelector(
		(state) => state.viewCreationReducer.selectedParamData
	);

	const onSelect = (keys) => {
		setSelectedKeys(keys);
	};
	const onCheck = (oncheckkey) => {
		setCheckedKeys(oncheckkey);
	};
	const handleClickParam = (e, keys, param, record) => {
		const existing = selectedData.find((item) => item.key === keys);
		if (existing === undefined) {
			let rowData = {};
			let batchData = {};
			let newBatchData = {};
			setKey.push(keys);

			let tree = [...materialsList];
			let molBatch = [...parentBatches];

			tree.forEach((a) => {
				a.children.forEach((b) => {
					b.children.forEach((c) => {
						if (c.key === keys) {
							selectedData.push(c);
						}
					});
				});
			});
			molBatch.map((el, index) => {
				if (record.batches.includes(el.batch)) {
					batchData[el.batch] = true;
					newBatchData[el.batch] = true;
				} else {
					batchData[el.batch] = false;
					newBatchData[el.batch] = false;
				}
			});
			batchData["id"] = count;

			setCount(count + 1);
			const indexDuplicate = selectedData.findIndex(
				(x) => x.parameter_name == param
			);

			if (indexDuplicate != -1) {
				rowData = Object.assign(batchData);
				rowData.sourceType = "material";
				rowData.parameter_name = record.parameter_name;
				rowData.coverage = record.coverage;
				rowData.key = record.key;
				rowData.primary = 0;
				rowData.aggregation = "";

				let data = { ...rowData };
				if (selectedTableData && selectedTableData.length !== 0) {
					selectedTableData.forEach((ele) => {
						const tempObj = finalData.find((item) => item.key === ele.key);
						if (tempObj === undefined) {
							finalData.push(ele);
						}
					});
				}
				finalData.push(data);
				dispatch(batchCoverage(newBatchData));
				dispatch(sendSelectedParamData(finalData));
			} else {
				dispatch(showNotification("error", "Function already exists"));
			}
		} else {
			dispatch(showNotification("error", "Parameter already exists"));
		}
	};
	const treeMap = materialsList;

	useEffect(() => {
		finalData = [];
		selectedData = [];
	});

	return (
		<div className="custom-treenode">
			{treeMap &&
				treeMap.map((item, index) => {
					return (
						<Tree
							onSelect={onSelect}
							onCheck={onCheck}
							checkedKeys={checkedKeys}
							selectedKeys={selectedKeys}
						>
							<TreeNode title={item.process_step} key={item.key + index}>
								{item.children.map((a) => {
									return (
										<TreeNode title={a.product_description} key={a.key + index}>
											{a.children.map((b) => {
												return (
													<TreeNode
														title={
															<div className="treenode-block">
																<div className="tree-block-param">
																	<Tag color="geekblue">{b.parameter_name}</Tag>
																	<p className="treenode-coverage">
																		{b.coverage}
																	</p>
																</div>
																<span
																	onClick={(e) =>
																		handleClickParam(
																			e,
																			b.key,
																			b.parameter_name,
																			b
																		)
																	}
																>
																	{!selectedKeys ? (
																		<CheckOutlined />
																	) : (
																		<PlusOutlined />
																	)}
																</span>
															</div>
														}
														key={b.key + index}
														className="tree-index"
													/>
												);
											})}
										</TreeNode>
									);
								})}
							</TreeNode>
						</Tree>
					);
				})}
		</div>
	);
};

export default MaterialTree;
