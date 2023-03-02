/**
 * @author Dinesh
 * @Mareana - CPV Product
 * @version  1
 * @Last Modified - 09 Aug, 2022
 * @Last Changed By - Dinesh
 */

import { Select } from 'antd';
import debounce from "lodash/debounce";
import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import BreadCrumbWrapper from "../../../../components/BreadCrumbWrapper";
import { hideLoader, showLoader, showNotification } from '../../../../duck/actions/commonActions';
import { getCrossBatch } from '../../../../services/analyticsService';
import { getGeanealogyFilter } from '../../../../services/genealogyService';
import "./style.scss";

const CrossBatchComparison = () => {
	const [random, setRandom] = useState(0);
	const [showIframe, setShowIframe] = useState(false);
	const [endPoint, setEndPoint] = useState("");
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

	const DASHBOARD_URL = 'https://cpvdev.mareana.com';
	const GRAFANA_URL = 'https://mdh-dashboard.mareana.com/d/_ALohtn4k/cpv_grafana?orgId=1&amp;refresh=5s'
	useEffect(() => {
		getGenealogyFilterData();
	}, []);

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
			else if (filterRes.data?.statuscode === 400) {
				dispatch(showNotification('error', filterRes.data.message));
			}
		} catch (err) {/* istanbul ignore next */
			dispatch(showNotification('error', err));
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

		setIsEmptyPlant(false);
		setIsEmptyProduct(false);
		setIsEmptyBatch(false);
		getGenealogyFilterData();
		getProductType();
	};

	const crossBatch = async () => {
		try {
			dispatch(showLoader())
			const prod = selectParam['productCode']
			const prodSplit = prod.split("-")
			const batch = selectParam['batchNum']

			const _req = {
				Product: prodSplit[0],
				Batch: [batch]
			}


			const getRes = await getCrossBatch(_req)
			dispatch(hideLoader());

			if (getRes !== "") {
				setEndPoint(getRes);
			}
			setShowIframe(true);
			setRandom(random + 1)

		} catch {
			dispatch(hideLoader());
			dispatch(showNotification('error', error));
		}
	}

	const handleFilter = () => {
		crossBatch()
	}

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

	return (
		<div className="custom-wrapper">
			<BreadCrumbWrapper />
			<div className='custom-content-layout'>
				{/* <div className='filter-layout'>

					 <div className='filter-drop'>
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
					 </div>
					 <div className="filter-btn">
						 <Button
							 className="custom-primary-btn "
							 type="primary"
							 onClick={() => {
								 handleFilter();
							 }}
						 >
							 Apply
						 </Button>
						 <Button
							 className="custom-secondary-btn"
							 type="primary"
							 onClick={() => {
								 handleClear();
							 }}
						 >
							 Clear
						 </Button>
					 </div>
				 </div> */}
				<div className="custom-table-card" style={{ margin: "10px 0" }}>
					{/* {showIframe && endPoint !== "" ? ( */}
					<iframe
						//src={DASHBOARD_URL + endPoint}
						src={GRAFANA_URL}
						width="100%"
						height="900"
						key={random}
						frameBorder="0"
					></iframe>
					{/* ) : (
						 ""
					  )} */}
				</div>
			</div>
		</div >
	)
}

export default CrossBatchComparison;