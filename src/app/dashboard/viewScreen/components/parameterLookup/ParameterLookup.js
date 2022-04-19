/**
 * @author Dinesh Kumar <dinesh.kumar@mareana.com>
 * @Mareana - CPV Product
 * @version  1
 * @Last Modified - 4 April, 2022
 * @Last Changed By - Dinesh
 */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './styles.scss';
import { Form, Select } from 'antd';
import { materialsParameterTree } from '../../../../../duck/actions/fileUploadAction';
import { moleculeName } from '../../../../../duck/actions/viewCreationAction';
import { getMoleculeList } from '../../../../../services/viewCreationPublishing';
import {
	hideLoader,
	showLoader,
	showNotification,
} from '../../../../../duck/actions/commonActions';

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
		form,
		params,
	} = props;

	const dispatch = useDispatch();
	const logindetails = useSelector(state => state.loginReducer.loginDetails);

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
			}
			if (moleculeRes.Status === 401) {
				dispatch(hideLoader());
				dispatch(showNotification('error', moleculeRes.Message));
			}
			if (moleculeRes.Status === 400) {
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
		form.setFieldsValue({
			molecule: moleculeId,
		});
		dispatch(moleculeName(moleculeId));
	}, [moleculeId]);

	const onChangeMoleculeHandler = async value => {
		setMoleculeId(value);
		//	let req = { moleculeId: value, detailedCoverage: true };
		let _req = { molecule_name: value };
		let res = JSON.parse(localStorage.getItem('login_details'));
		try {
			dispatch(showLoader());
			//	const paramTreeRes = await materialsParameterTree(_req);
			const paramTreeRes = await getMoleculeList(_req, {
				'content-type': 'application/json',
				'x-access-token': res.token ? res.token : '',
				'resource-name': 'VIEW',
			});

			if (paramTreeRes.statuscode === 200) {
				setMaterialsList(paramTreeRes.data.hierarchy);
				setParentBatches(paramTreeRes.data.mol_batches);
				dispatch(hideLoader());
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

	return (
		<div className='parameterLookup-FormBlock'>
			<Form.Item label='Molecule' name='molecule'>
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
			</Form.Item>
			<Form.Item label='Filters' name='filters'>
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
					{materialsList.map((item, index) => {
						return (
							<Option value={item.product} key={index}>
								{item.product}
							</Option>
						);
					})}
				</Select>
			</Form.Item>
		</div>
	);
}

export default ParameterLookup;
