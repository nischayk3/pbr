/**
 * @author Dinesh Kumar <dinesh.kumar@mareana.com>
 * @Mareana - CPV Product
 * @version  1
 * @Last Modified - 4 April, 2022
 * @Last Changed By - Dinesh
 */

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './styles.scss';
import { Select } from 'antd';
import { moleculeName } from '../../../../../duck/actions/viewCreationAction';

import { getMoleculeList } from '../../../../../services/viewCreationPublishing';
import {
	hideLoader,
	showLoader,
	showNotification,
} from '../../../../../duck/actions/commonActions';

const dataList = [];
function ParameterLookup(props) {
	const {
		moleculeList,
		setMoleculeList,
		moleculeId,
		setMoleculeId,
		materialsList,
		setMaterialsList,
		setFilterdData,
		setParentBatches,
		viewSummaryBatch,
		setViewSummaryBatch,
		params,
	} = props;

	const [expandKey, setExpandKey] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [autoExpandParent, setAutoExpandParent] = useState();
	const [filterList, setFilterList] = useState([]);

	const dispatch = useDispatch();

	const onSelectMoleculeHandler = async () => {
		let req = { user_id: 'demo' };
		let res = JSON.parse(localStorage.getItem('login_details'));

		try {
			dispatch(showLoader());
			const moleculeRes = await getMoleculeList(req, {
				'content-type': 'application/json',
				'x-access-token': res.token ? res.token : '',
				'resource-name': 'VIEW',
			});

			if (moleculeRes.statuscode === 200) {
				setMoleculeList(moleculeRes.data);
				dispatch(hideLoader());
			} else if (moleculeRes.Status === 401) {
				dispatch(hideLoader());
				dispatch(showNotification('error', moleculeRes.Message));
			} else if (moleculeRes.Status === 400) {
				dispatch(hideLoader());
				dispatch(showNotification('error', moleculeRes.Message));
			} else {
				dispatch(hideLoader());
				dispatch(showNotification('error', moleculeRes.Message));
			}
		} catch (error) {
			dispatch(hideLoader());
			dispatch(showNotification('error', error));
		}
	};

	useEffect(() => {
		onSelectMoleculeHandler();
	}, []);

	useEffect(() => {
		if (moleculeId) {
			onChangeMoleculeHandler(moleculeId);
			dispatch(moleculeName(moleculeId));
		}
	}, [moleculeId]);

	const onChangeMoleculeHandler = async value => {
		setMoleculeId(value);

		let _req = { molecule_name: value };
		let res = JSON.parse(localStorage.getItem('login_details'));
		try {
			dispatch(showLoader());

			const paramTreeRes = await getMoleculeList(_req, {
				'content-type': 'application/json',
				'x-access-token': res.token ? res.token : '',
				'resource-name': 'VIEW',
			});

			if (paramTreeRes.statuscode === 200) {
				setMaterialsList(paramTreeRes.data.hierarchy);
				setParentBatches(paramTreeRes.data.mol_batches);
				if (paramTreeRes.data.mol_batches.length > 0) {
					setViewSummaryBatch(paramTreeRes.data.mol_batches);
				}
			} else if (paramTreeRes.statuscode === 401) {
				dispatch(showNotification('error', 'Filter -', paramTreeRes.Message));
				dispatch(hideLoader());
			} else if (paramTreeRes.statuscode === 400) {
				dispatch(showNotification('error', 'Filter -', paramTreeRes.Message));
				dispatch(hideLoader());
			} else if (paramTreeRes.statuscode === 404) {
				dispatch(showNotification('error', 'Filter -', paramTreeRes.Message));
				dispatch(hideLoader());
			}
			dispatch(hideLoader());
		} catch (error) {
			dispatch(hideLoader());
			dispatch(showNotification('error', error));
		}
	};

	function onChange(value) {
		if (!value) {
			setFilterdData(null);
		} else {
			const filterdDataArr = materialsList.filter(o =>
				Object.keys(o).some(k =>
					String(o[k]).toLowerCase().includes(value.toLowerCase())
				)
			);
			setFilterdData(filterdDataArr);
		}
	}

	// const generateList = data => {
	// 	data.forEach((item, i) => {
	// 		const node = item;
	// 		console.log('node', node);
	// 		const { key } = node;
	// 		console.log('keyyyyy', key);

	// 		if (typeof node.product_description !== 'undefined') {
	// 			dataList.push({
	// 				key,
	// 				title: node.parameter_name,
	// 			});
	// 		} else if (typeof node.parameter_name !== 'undefined') {
	// 			dataList.push({
	// 				key,
	// 				title: node.parameter_name,
	// 			});
	// 		}

	// 		if (node.children) {
	// 			generateList(node.children);
	// 		}
	// 	});

	// 	// for (let i = 0; i < data.length; i++) {
	// 	// 	const node = data[i];
	// 	// 	console.log('node', data, data[i]);
	// 	// 	const { key } = node.key;
	// 	// 	console.log('key', key);
	// 	// 	dataList.push({
	// 	// 		key,
	// 	// 		title:
	// 	// 			typeof node.parameter_name !== 'undefined' ? node.parameter_name : '',
	// 	// 	});

	// 	// 	if (node.children) {
	// 	// 		generateList(node.children);
	// 	// 	}
	// 	// }
	// };
	// generateList(materialsList);
	// if (dataList.length > 0) {
	// 	console.log(
	// 		'dataList.length  === materialsList.length',
	// 		dataList.length,
	// 		materialsList.length
	// 	);
	// 	setFilterList(dataList);
	// }

	// const onChangeFilter = e => {
	// 	const { value } = e.target;
	// 	const expandedKey = dataList
	// 		.map(item => {
	// 			if (item.title.indexOf(value) > -1) {
	// 				return getParentKey(item.key, materialsList);
	// 			}
	// 			return null;
	// 		})
	// 		.filter((item, i, self) => item && self.indexOf(item) === i);

	// 	//	setExpandedKeys(expandedKey);
	// 	setSearchValue(value);
	// 	setAutoExpandParent(true);
	// };
	const getParentKey = (key, tree) => {
		let parentKey;
		for (let i = 0; i < tree.length; i++) {
			const node = tree[i];
			if (node.children) {
				if (node.children.some(item => item.key === key)) {
					parentKey = node.key;
				} else if (getParentKey(key, node.children)) {
					parentKey = getParentKey(key, node.children);
				}
			}
		}
		return parentKey;
	};

	return (
		<div className='parameterLookup-FormBlock'>
			<div className='param-select'>
				<p>Molecule</p>
				<Select
					placeholder='Select'
					onChange={onChangeMoleculeHandler}
					defaultValue={moleculeId}
					value={moleculeId}
					disabled={params}>
					{moleculeList.map((item, i) => {
						return (
							<Option value={item.ds_name} key={item.ds_name}>
								{item.ds_name}
							</Option>
						);
					})}
				</Select>
			</div>
			<div className='param-select'>
				<p>Filters</p>
				<Select
					showSearch
					optionFilterProp='children'
					onChange={onChange}
					filterOption={(input, option) =>
						option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
					}
					placeholder='Select'
					allowClear={true}
					disabled={params}>
					{filterList.map((item, index) => {
						return (
							<Option value={item.title} key={index}>
								{item.title}
							</Option>
						);
					})}
				</Select>
				{/* <Search
					style={{ marginBottom: 8 }}
					placeholder='Search'
					onChange={onChangeFilter}
				/> */}
			</div>
		</div>
	);
}

export default ParameterLookup;
