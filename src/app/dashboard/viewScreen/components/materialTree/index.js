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
	getBatchData,
	sendSelectedParamData,
} from "../../../../../duck/actions/viewAction";
import "./style.scss";
import { hideLoader, showLoader, showNotification } from "../../../../../duck/actions/commonActions";
import { getParameterBatches } from "../../../../../services/viewCreationPublishing";

const { TreeNode } = Tree;
let setKey = [];
let selectedData = [];

const MaterialTree = ({ moleculeList, callbackProcessClick, highlightFilterValue, fromWorkflowScreen }) => {

	const { hierarchy } = moleculeList;

	const dispatch = useDispatch();

	const [selectedKeys, setSelectedKeys] = useState([]);
	const [treeMap, setTreeMap] = useState([]);
	const [count, setCount] = useState("");
	const selectedTableData = useSelector(
		(state) => state.viewCreationReducer.selectedParamData
	);

	useEffect(() => {
		setTreeMap(hierarchy)
	}, [hierarchy])

	const onSelect = (selectedKe, info) => {
		callbackProcessClick(info.node.dataRef);
		setSelectedKeys(selectedKe);
	};



	const handleClickParam = async (keys, param, record) => {
		const finalData = [];
		const existing = selectedData.find((item) => item.key === keys);
		try {
			const paramObj = {
				"resource-name": "VIEW",
				molecule_name: record.ds_name,
				process_id: record.process_step_int_id,
				product_num: record.product_num,
				parameter_name: record.parameter_name,
			};
			dispatch(showLoader());
			const getMolbatchData = await getParameterBatches(paramObj);

			if (existing === undefined) {
				const batchData = { ...getMolbatchData.Data }
				dispatch(getBatchData(batchData))
				let rowData = {};

				setKey.push(keys);
				let molBatch = { ...getMolbatchData.Data.batches };
				dispatch(hideLoader());
				selectedData.push(record);
				setCount(count + 1);

				const indexDuplicate = selectedData.findIndex(
					(x) => x.parameter_name == param
				);
				if (indexDuplicate != -1) {
					rowData = Object.assign(molBatch);
					rowData.sourceType = "material";
					rowData.parameter_name = record.parameter_name;
					rowData.coverage = record.coverage;
					rowData.key =
						record.process_step_int_id + "_" + record.parameter_name;
					rowData.primary = 0;
					rowData.aggregation = "";
					rowData.material_id = record.product_num;

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

					dispatch(sendSelectedParamData(finalData));
					//dispatch(batchCoverage(getMolbatchData));
				} else {
					dispatch(showNotification("error", "Function already exists"));
				}
			} else {
				dispatch(showNotification("error", "Parameter already exists"));
			}
		} catch (err) {
			dispatch(showNotification("error", "Adding parameter failed"));
		}
	};

	return (
		<div className="custom-treenode">
			{treeMap &&
				treeMap.map((item, ele1) => {
					return (
						<Tree onSelect={onSelect} >
							<TreeNode
								title={item.process_step}
								key={"frstEle-" + ele1}

								dataRef={item}
							>
								{item &&
									item.children &&
									item.children.map((a, ele2) => {
										return (
											<TreeNode
												title={a.product_desc}
												dataRef={a}

												key={"secondEle-" + ele2}
											>
												{a &&
													a.children &&
													a.children.map((b, ele3) => {
														return (
															<TreeNode

																key={"thirdEle-" + ele3}
																title={
																	<div className="treenode-block">
																		<div className="tree-block-param">
																			<Tag color={b.parameter_name === highlightFilterValue ? ' ' : "geekblue"}>
																				{b.parameter_name}
																			</Tag>
																			<p className="treenode-coverage">
																				{b.coverage}
																			</p>
																		</div>
																		<span
																			onClick={(e) => {
																				!fromWorkflowScreen ?
																					handleClickParam(
																						"thirdEle-" + ele3,
																						b.parameter_name,
																						b
																					) : ''
																			}
																			}
																		>
																			{!selectedKeys ? (
																				<CheckOutlined />
																			) : (
																				<PlusOutlined disabled={fromWorkflowScreen} />
																			)}
																		</span>
																	</div>
																}
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
