/**
 * @author Dinesh Kumar <dinesh.kumar@mareana.com>
 * @Mareana - CPV Product
 * @version 1
 * @Last Modified - 14 March, 2022
 * @Last Changed By - Dinesh Kumar
 */

import { Button, Select } from 'antd';
import debounce from "lodash/debounce";
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import SelectSearchField from '../../../../../components/SelectSearchField/SelectSearchField';
import Toggle from '../../../../../components/Toggle';
import { showNotification } from '../../../../../duck/actions/commonActions.js';
import {
	getGeanealogyFilter,
	getGenealogyProductType
} from '../../../../../services/genealogyService.js';
import './style.scss';

function Filter(props) {
	const [disabled, setDisabled] = useState(true);
	const [isCheck, setisCheck] = useState(true);
	const [isEmptyPlant, setIsEmptyPlant] = useState(false);
	const [isEmptyProduct, setIsEmptyProduct] = useState(false);
	const [isEmptyBatch, setIsEmptyBatch] = useState(false);
	const [selectParam, setselectParam] = useState({
		plant: '',
		productCode: '',
		batchNum: '',
		productType: ''
	});
	const [paramList, setParamList] = useState({
		plantList: [],
		produtList: [],
		batchList: [],
		productTypeList: []
	});

	const dispatch = useDispatch();

	useEffect(() => {
		getGenealogyFilterData();
		getProductType();
	}, []);



	const handleChangeToggle = e => {
		setisCheck(typeof isCheck === 'boolean' ? !isCheck : e.target.value);
	};

	const onChangeParam = (value, field) => {
		if (value != null) {
			if (field === 'plant') {
				getGenealogyFilterData(
					value,
					selectParam['productCode'],
					selectParam['batchNum'],
					'',
					'',
					''
				);
				setselectParam(prevState => {
					return { ...prevState, plant: value };
				});
				setIsEmptyPlant(false);
			} else if (field === 'batch_num') {
				getGenealogyFilterData(
					selectParam['plant'],
					selectParam['productCode'],
					value,
					'',
					'',
					''
				);
				setselectParam(prevState => {
					return { ...prevState, batchNum: value };
				});
				setIsEmptyBatch(false);
			} else if (field === 'product_code') {
				getGenealogyFilterData(
					selectParam['plant'],
					value,
					selectParam['batchNum'],
					'',
					'',
					''
				);
				setselectParam(prevState => {
					return { ...prevState, productCode: value };
				});
				setIsEmptyProduct(false);
			} else if (field === 'product_type') {
				setselectParam(prevState => {
					return { ...prevState, productType: value };
				});

			}
			setDisabled(false);
		}
	};

	const clearSearch = (e, field) => {
		/* istanbul ignore next */
		if (field === 'plant') {
			setselectParam(prevState => {
				return { ...prevState, plant: '' };
			});
			getGenealogyFilterData(
				'',
				selectParam['productCode'],
				selectParam['batchNum'],
				'',
				'',
				''
			);
		}/* istanbul ignore next */
		else if (field === 'product') {
			setselectParam(prevState => {
				return { ...prevState, productCode: '' };
			});
			getGenealogyFilterData(
				selectParam['plant'],
				'',
				selectParam['batchNum'],
				'',
				'',
				''
			);
		}
		/* istanbul ignore next */
		else if (field === 'batch') {
			setselectParam(prevState => {
				return { ...prevState, batchNum: '' };
			});
			getGenealogyFilterData(
				selectParam['plant'],
				selectParam['productCode'],
				'',
				'',
				'',
				''
			);
		} else if (field === 'product_type') {
			setselectParam(prevState => {
				return { ...prevState, productType: '' };
			});
		}
	};

	const onSearchParam = debounce((type, field) => {
		if (type != null) {


			if (field === 'plant') {
				getGenealogyFilterData(
					selectParam['plant'],
					selectParam['productCode'],
					selectParam['batchNum'],
					type,
					'',
					''
				);
				setIsEmptyPlant(false);
			} else if (field === 'product_code') {
				getGenealogyFilterData(
					selectParam['plant'],
					selectParam['productCode'],
					selectParam['batchNum'],
					'',
					type,
					''
				);

				setIsEmptyProduct(false);
			} else if (field === 'batch_num') {
				getGenealogyFilterData(
					selectParam['plant'],
					selectParam['productCode'],
					selectParam['batchNum'],
					'',
					'',
					type
				);

				setIsEmptyBatch(false);
			}
		}
	}, 500);

	const getGenealogyFilterData = async (
		selectedPlantValue,
		selectedProductValue,
		selectedBatchValue,
		plantText,
		matText,
		batchText
	) => {
		let reqFilter = {
			batch_no: selectedBatchValue ? selectedBatchValue : '',
			material: selectedProductValue ? selectedProductValue : '',
			plant_no: selectedPlantValue ? selectedPlantValue : '',
			batchText: batchText ? batchText : '',
			plantText: plantText ? plantText : '',
			matText: matText ? matText : ''
		};

		try {
			const filterRes = await getGeanealogyFilter(reqFilter);
			if (filterRes?.statuscode === 200) {
				setParamList(prevState => {
					return {
						...prevState,
						plantList: filterRes && filterRes.plant_no,
						batchList: filterRes && filterRes.batch_no,
						produtList: filterRes && filterRes.material
					};
				});
			}
			/* istanbul ignore next */
			else if (filterRes?.data?.statuscode != 200) {
				dispatch(showNotification('error', filterRes?.data?.message));
			} else {
				dispatch(showNotification('error', "Unable to fetch data"));
			}
		} catch (err) {/* istanbul ignore next */
			dispatch(showNotification('error', err));
		}
	};

	const getProductType = async () => {
		try {
			const getProductTypeRes = await getGenealogyProductType();
			if (getProductTypeRes.statuscode == 200) {
				let productList = [];
				getProductTypeRes.Data.map(product => {
					productList.push(product.prod_type_cd);
				});
				setParamList(prevState => {
					return {
						...prevState,
						productTypeList: productList
					};
				});
			}
		} catch (error) {
			dispatch(showNotification('error', error));
		}
	};

	const OnSearchTree = () => {
		const param = []
		selectParam['productType'] && selectParam['productType'].forEach(element => {
			const splitElement = element?.split(/[ -]+/)
			param.push(splitElement[0])
		});

		let paramDetail = {
			plant: selectParam['plant'],
			product: selectParam['productCode'],
			batch: selectParam['batchNum'],
			productType:
				param &&
				param.map(d => `'${d}'`).join(','),
			treeType: isCheck ? 'Backward' : 'Forward'
		};

		if (paramDetail.plant === '') {
			setIsEmptyPlant(true);
			setIsEmptyProduct(false);
			setIsEmptyBatch(false);

		} else if (paramDetail.product === '') {
			setIsEmptyProduct(true);
			setIsEmptyPlant(false);
			setIsEmptyBatch(false);

		} else if (paramDetail.batch === '') {
			setIsEmptyBatch(true);
			setIsEmptyPlant(false);
			setIsEmptyProduct(false);
		} else {
			props.parameterDetails(paramDetail);
			setIsEmptyPlant(false);
			setIsEmptyProduct(false);
			setIsEmptyBatch(false);
		}
	};

	const handleClear = () => {
		setselectParam(prevState => {
			return {
				...prevState,
				plant: '',
				productCode: '',
				batchNum: '',
				productType: ''
			};
		});
		setDisabled(true);
		setIsEmptyPlant(false);
		setIsEmptyProduct(false);
		setIsEmptyBatch(false);
		getGenealogyFilterData();
		getProductType();
	};

	const optionsPlant = paramList['plantList'].map((item, index) => (
		<Select.Option key={index} value={item}>
			{item}
		</Select.Option>
	));
	const optionsBatch = paramList['batchList'].map((item, index) => (
		<Select.Option key={index} value={item}>
			{item}
		</Select.Option>
	));
	const optionsProduct = paramList['produtList'].map((item, index) => (
		<Select.Option key={index} value={item}>
			{item}
		</Select.Option>
	));
	const optionsProductType = paramList['productTypeList'].map((item, index) => (
		<Select.Option key={index} value={item}>
			{item}
		</Select.Option>
	));

	return (
		<div className='param-filter-wrap'>
			<div className='param-filter'>
				<SelectSearchField
					showSearch
					label='Plant *'
					placeholder='Select'
					onChangeSelect={value => onChangeParam(value, 'plant')}
					onSearchSelect={type => onSearchParam(type, 'plant')}
					options={optionsPlant}
					handleClearSearch={e => clearSearch(e, 'plant')}
					error={isEmptyPlant ? 'Please select plant' : null}
					selectedValue={selectParam['plant']}
				/>
				<SelectSearchField
					showSearch
					label='Product *'
					placeholder='Select'
					onChangeSelect={value => onChangeParam(value, 'product_code')}
					onSearchSelect={type => onSearchParam(type, 'product_code')}
					options={optionsProduct}
					handleClearSearch={e => clearSearch(e, 'product')}
					error={isEmptyProduct ? 'Please select product' : null}
					selectedValue={selectParam['productCode']}
				/>
				<SelectSearchField
					showSearch
					label='Batch *'
					placeholder='Select'
					onChangeSelect={value => onChangeParam(value, 'batch_num')}
					onSearchSelect={type => onSearchParam(type, 'batch_num')}
					handleClearSearch={e => clearSearch(e, 'batch')}
					error={isEmptyBatch ? 'Please select batch' : null}
					options={optionsBatch}
					selectedValue={selectParam['batchNum']}
				/>
				<SelectSearchField
					showSearch
					mode='multiple'
					label='Product Type '
					placeholder='Select'
					onChangeSelect={value => onChangeParam(value, 'product_type')}
					onSearchSelect={type => onSearchParam(type, 'product_type')}
					handleClearSearch={e => clearSearch(e, 'product_type')}
					//error={isEmptyProductType ? 'Please select product type' : null}
					options={optionsProductType}
					selectedValue={
						selectParam['productType'] !== '' ? selectParam['productType'] : []
					}
				/>
				<Toggle
					name='isChecked'
					checked={isCheck}
					inline={true}
					labels={['Backward', 'Forward']}
					handleChange={handleChangeToggle}
				/>
			</div>
			<div className='param-filter-btn'>
				<Button
					type='primary'
					id="genealogy-search"
					className='custom-secondary-btn'
					onClick={OnSearchTree}
					disabled={disabled}>
					Search
				</Button>
				<Button
					type='link'
					id="clear-search"
					className='custom-secondary-btn-link'
					onClick={handleClear}>
					Clear
				</Button>
			</div>
		</div>
	);
}

export default Filter;
