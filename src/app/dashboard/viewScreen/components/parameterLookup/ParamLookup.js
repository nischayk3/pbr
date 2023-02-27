/**
 * @author Dinesh Kumar <dinesh.kumar@mareana.com>
 * @Mareana - CPV Product
 * @version  1
 * @Last Modified - 11 June, 2022
 * @Last Changed By - Dinesh
 */
import { Select } from "antd";
import debounce from "lodash/debounce";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import SelectSearchField from "../../../../../components/SelectSearchField/SelectSearchField";
import {
	hideLoader,
	showLoader,
	showNotification
} from "../../../../../duck/actions/commonActions";
import { filterMolequles, getMoleculeList } from "../../../../../services/viewCreationPublishing";
import "./styles.scss";

const ParamLookup = ({ callbackMoleculeId, callbackFilter, moleculeId, setMoleculeId, isEditView, fromWorkflowScreen }) => {
	const dispatch = useDispatch();
	const location = useLocation();
	const { Option } = Select;
	const parameters = queryString.parse(location.search);

	// const [moleculeId, setMoleculeId] = useState("");
	const [moleculeList, setMoleculeList] = useState([]);
	const [filterMol, setFilterMol] = useState([]);
	const [filterValue, setFilterValue] = useState('');

	//moleculelist api call
	useEffect(() => {
		if (isEditView) {
			setMoleculeId(moleculeId);
		} else {
			const reqMol = {
				'data': {},
				'parameters': {}
			}
			loadMolecule(reqMol)
		}

	}, [isEditView])

	const onChangeMolecule = (e) => {
		setMoleculeId(e)
		callbackMoleculeId(e)
	}

	const clearSearch = (e) => {
		setFilterValue('')
	}

	//Moleculelist api call
	const loadMolecule = async (_reqMolecule) => {
		try {
			const _resourceName = parameters?.fromScreen == "Workflow" ? 'WORKITEMS' : 'VIEW';
			dispatch(showLoader());
			const moleculeRes = await getMoleculeList(_reqMolecule, _resourceName);
			/* istanbul ignore else  */
			if (moleculeRes.Status === 200) {
				setMoleculeList(moleculeRes.Data.hierarchy);
				dispatch(hideLoader());
				/* istanbul ignore else  */
			} else if (moleculeRes.Status === 401 && moleculeRes.Status === 400) {
				dispatch(hideLoader());
				dispatch(showNotification("error", "No Data Found"));
			} else {
				dispatch(hideLoader());
				dispatch(showNotification("error", moleculeRes.Message));
			}
			/* istanbul ignore next */
		} catch (error) {
			dispatch(hideLoader());
			dispatch(showNotification("error", error));
		}
	}

	//Moleculel filter api call
	const searchMolequles = async (_reqFilterMolecule) => {
		try {
			dispatch(showLoader());
			const filterMolRes = await filterMolequles(_reqFilterMolecule);
			/* istanbul ignore else  */
			if (filterMolRes.Status === 200) {
				if (filterMolRes.Data.length > 0) {
					setFilterMol(filterMolRes.Data)
					dispatch(hideLoader());
				} else {
					dispatch(hideLoader());
					dispatch(showNotification("error", "No Data Found"));
				}
				/* istanbul ignore else  */
			} else if (filterMolRes.Status === 401 && filterMolRes.Status === 400) {
				dispatch(hideLoader());
				dispatch(showNotification("error", "No Data Found"));
			} else {
				dispatch(hideLoader());
				dispatch(showNotification("error", filterMolRes.Message));
			}
			/* istanbul ignore next */
		} catch (error) {
			/* istanbul ignore next */
			dispatch(hideLoader());
			/* istanbul ignore next */
			dispatch(showNotification("error", error));
		}
	}


	const onChangeParam = (value) => {
		setFilterValue(value)
		callbackFilter(value)
	}

	const onSearchParam = debounce((type) => {
		if (type != "" && type != null) {
			if (moleculeId !== "") {
				const filterPayload = {
					molecule_name: moleculeId,
					search_text: type
				}
				searchMolequles(filterPayload)
			}
		}
	}, 1000)

	const optionsMolecule = filterMol.map((item, index) => (
		<Select.Option key={index} value={item.process_step_intid + '|' + item.product_num + '|' + item.parameter_name + '|' + item.ds_name}>
			{item.process_step_intid + '_' + item.product_num + '_' + item.parameter_name}
		</Select.Option >
	));

	return (
		<div className="parameterLookup-FormBlock">
			<div className="param-select">
				<p>Molecule</p>
				<Select
					id="select-molecule"
					placeholder="Select"
					style={{ width: "100%" }}
					onChange={onChangeMolecule}
					value={moleculeId}
					disabled={fromWorkflowScreen}
				>
					{moleculeList.map((item, i) => {
						return (
							<Option value={item.ds_name} key={i}>
								{item.ds_name}
							</Option>
						);
					})}
				</Select>
			</div>
			<div className="param-select">
				<p>Filters</p>

				<SelectSearchField
					id="filter-molecule"
					showSearch
					placeholder='Search Molecule'
					onChangeSelect={e => onChangeParam(e)}
					onSearchSelect={type => onSearchParam(type)}
					handleClearSearch={e => clearSearch(e)}
					options={optionsMolecule}
					selectedValue={filterValue}
				/>
			</div>
		</div>
	);
}

export default ParamLookup;