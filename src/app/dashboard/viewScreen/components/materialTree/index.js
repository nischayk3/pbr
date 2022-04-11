/**
 * @author Dinesh Kumar <dinesh.kumar@mareana.com>
 * @Mareana - CPV Product
 * @version  1
 * @Last Modified - 4 April, 2022
 * @Last Changed By - Dinesh
 */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Tree, message } from 'antd';
import { PlusOutlined, CheckOutlined } from '@ant-design/icons';
import {
	batchCoverage,
	sendSelectedParamData,
} from '../../../../../duck/actions/viewAction';

const { TreeNode } = Tree;
let setKey = [];
let selectedData = [];
let finalData = [];
const MaterialTree = props => {
	const [selectedKey, setSelectedKey] = useState('');
	const [count, setCount] = useState('');

	const dispatch = useDispatch();
	const { materialsList, parentBatches } = props;

	const onSelect = (keys, info) => {
		// setSelectedKey(keys[0]);
		// setKey.push(keys[0]);
		// let tree = [...materialsList];
		// let selectTree = tree.forEach(a => {
		// 	let obj = {};
		// 	a.children.forEach(b => {
		// 		b.children.forEach(c => {
		// 			if (c.key === keys[0]) {
		// 				selectedData.push(c);
		// 			}
		// 		});
		// 	});
		// });
		// const indexDuplicate = selectedData.findIndex(
		// 	x => x.parameter_name == record.param
		// );
		// if (indexDuplicate === -1) {
		// 	rowData = Object.assign(batchData);
		// 	rowData.sourceType = 'material';
		// 	rowData.mat_no = record.mat_no;
		// 	rowData.id = batchData.id;
		// 	rowData.param = record.param;
		// 	rowData.primary = '';
		// 	rowData.aggregation = '';
		// 	//rowData.parameters = [rowData];
		// 	getNewData(rowData);
		// 	let data = [...viewSummaryTable];
		// 	data.push(rowData);
		// 	setNewBatchData(newBatchData);
		// 	setViewSummaryTable([...data]);
		// 	dispatch(sendViewParamData(data));
		// 	setFunctionEditorViewState(true);
		// 	console.log('dataaa', data);
		// 	console.log('viewSummaryTable', viewSummaryTable);
		// 	console.log('rowData', rowData);
		// } else {
		// 	message.error('Function already exists');
		// }
	};
	const handleClickParam = (e, keys, param, record) => {
		let rowData = {};
		let batchData = {};
		let newBatchData = {};
		setSelectedKey(keys);
		setKey.push(keys);
		let tree = [...materialsList];
		let molBatch = [...parentBatches];

		tree.forEach(a => {
			a.children.forEach(b => {
				b.children.forEach(c => {
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
		batchData['id'] = count;
		console.log('coverage', molBatch, newBatchData);
		setCount(count + 1);
		const indexDuplicate = selectedData.findIndex(
			x => x.parameter_name == param
		);

		if (indexDuplicate != -1) {
			rowData = Object.assign(batchData);
			rowData.sourceType = 'material';
			// rowData.mat_no = record.mat_no;
			rowData.id = batchData.id;
			rowData.parameter_name = record.parameter_name;
			rowData.coverage = record.coverage;
			rowData.key = record.key;
			rowData.primary = '';
			rowData.aggregation = '';
			//rowData.mol_batch = molBatch;
			//rowData.parameters = [rowData];
			// getNewData(rowData);
			let data = { ...rowData };
			finalData.push(data);

			// setNewBatchData(newBatchData);
			// setViewSummaryTable([...data]);
			// dispatch(sendViewParamData(data));
			// setFunctionEditorViewState(true);

			dispatch(batchCoverage(newBatchData));
			dispatch(sendSelectedParamData(finalData));
		} else {
			message.error('Function already exists');
		}
	};
	const treeMap = materialsList;

	return (
		<>
			{treeMap &&
				treeMap.map(item => {
					return (
						<Tree onSelect={onSelect}>
							<TreeNode title={item.process_step} key={item.key}>
								{item.children.map(a => {
									return (
										<TreeNode title={a.product_description} key={a.key}>
											{a.children.map(b => {
												return (
													<TreeNode
														title={
															<div className='treenode-block'>
																<div className='tree-block-param'>
																	<p className='treenode-param'>
																		{b.parameter_name}
																	</p>
																	<p className='treenode-coverage'>
																		{b.coverage}
																	</p>
																</div>
																<span
																	onClick={e =>
																		handleClickParam(
																			e,
																			b.key,
																			b.parameter_name,
																			b
																		)
																	}>
																	{selectedKey === b.key ? (
																		<CheckOutlined />
																	) : (
																		<PlusOutlined />
																	)}
																</span>
															</div>
														}
														key={b.key}
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
		</>
	);
};

export default MaterialTree;
