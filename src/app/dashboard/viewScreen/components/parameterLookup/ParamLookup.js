/**
 * @author Dinesh Kumar <dinesh.kumar@mareana.com>
 * @Mareana - CPV Product
 * @version  1
 * @Last Modified - 11 June, 2022
 * @Last Changed By - Dinesh
 */
import React, { useState, useEffect } from "react";
import "./styles.scss";
import { Input, Select } from "antd";
import { filterMolequles, getMoleculeList } from "../../../../../services/viewCreationPublishing";
import { useDispatch } from "react-redux";
import {
	hideLoader,
	showLoader,
	showNotification
} from "../../../../../duck/actions/commonActions";
import SelectSearchField from "../../../../../components/SelectSearchField/SelectSearchField";
import debounce from "lodash/debounce";

const ParamLookup = (props) => {
	const { Search } = Input;
	const { Option } = Select;

	const dispatch = useDispatch();

	const [moleculeId, setMoleculeId] = useState("");
	const [moleculeList, setMoleculeList] = useState([]);
	const [filterMol, setFilterMol] = useState([]);
	const [filterValue, setFilterValue] = useState('');


	//moleculelist api call
	useEffect(() => {
		if (props.isEditView) {
			setMoleculeId(props.moleculeId);
		} else {
			const reqMol = {
				'data': {},
				'parameters': {}
			}
			loadMolecule(reqMol)
		}

	}, [props.isEditView])

	const onChangeMolecule = (e) => {
		setMoleculeId(e)
		props.callbackMoleculeId(e)
	}

	const clearSearch = (e) => {
		setFilterValue('')
	}

	//Moleculelist api call
	const loadMolecule = async (_reqMolecule) => {
		try {
			dispatch(showLoader());
			const moleculeRes = await getMoleculeList(_reqMolecule);

			if (moleculeRes.Status === 200) {
				setMoleculeList(moleculeRes.Data.hierarchy);
				dispatch(hideLoader());
			} else if (moleculeRes.Status === 401 && moleculeRes.Status === 400) {
				dispatch(hideLoader());
				dispatch(showNotification("error", "No Data Found"));
			} else {
				dispatch(hideLoader());
				dispatch(showNotification("error", moleculeRes.Message));
			}
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
			if (filterMolRes.Status === 200) {

				setFilterMol(filterMolRes.Data)
				dispatch(hideLoader());
			} else if (filterMolRes.Status === 401 && filterMolRes.Status === 400) {
				dispatch(hideLoader());
				dispatch(showNotification("error", "No Data Found"));
			} else {
				dispatch(hideLoader());
				dispatch(showNotification("error", filterMolRes.Message));
			}
		} catch (error) {
			dispatch(hideLoader());
			dispatch(showNotification("error", error));
		}
	}


	const onChangeParam = (value) => {
		setFilterValue(value)
		props.callbackFilter(value)
	}

	const onSearchParam = debounce((type) => {
		if (type !== null) {
			if (moleculeId !== "") {
				const filterPayload = {
					molecule_name: moleculeId,
					search_text: type
				}
				searchMolequles(filterPayload)
			}
		}
	}, 500)

	const optionsMolecule = filterMol.map((item, index) => (
		<Select.Option key={index} value={item.process_step_intid + '_' + item.product_num + '_' + item.parameter_name + '_' + item.ds_name}>
			{item.process_step_intid + '_' + item.product_num + '_' + item.parameter_name}
		</Select.Option >
	));

	return (
		<div className="parameterLookup-FormBlock">
			<div className="param-select">
				<p>Molecule</p>
				<Select
					placeholder="Select"
					style={{ width: "100%" }}
					onChange={onChangeMolecule}
					value={moleculeId}
					disabled={props.fromWorkflowScreen}
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