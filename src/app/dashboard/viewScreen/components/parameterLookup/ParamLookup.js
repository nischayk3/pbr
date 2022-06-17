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
import { getMoleculeList } from "../../../../../services/viewCreationPublishing";
import { useDispatch } from "react-redux";
import {
	hideLoader,
	showLoader,
	showNotification
} from "../../../../../duck/actions/commonActions";

const ParamLookup = (props) => {

	const { Search } = Input;
	const { Option } = Select;

	const dispatch = useDispatch();

	const [moleculeId, setMoleculeId] = useState("");
	const [moleculeList, setMoleculeList] = useState([]);

	//moleculelist api call
	useEffect(() => {
		const reqMol = {
			'data': {},
			'parameters': {}
		}
		loadMolecule(reqMol)
	}, [])

	const onChangeMolecule = (e) => {
		setMoleculeId(e)
		props.callbackMoleculeId(e)
	}

	//Moleculelist api call
	const loadMolecule = async (_reqMolecule) => {
		try {
			dispatch(showLoader());
			const moleculeRes = await getMoleculeList(_reqMolecule);
			console.log("moleculeResmoleculeRes", moleculeRes);
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
	return (
		<div className="parameterLookup-FormBlock">
			<div className="param-select">
				<p>Molecule</p>
				<Select
					placeholder="Select"
					style={{ width: "100%" }}
					onChange={onChangeMolecule}
					value={moleculeId}
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

				<Search
					placeholder="Search"
				// onChange={onSearchChange}
				// onSearch={searchTable}
				/>
			</div>
		</div>
	);
}

export default ParamLookup;