/**
 * @author Dinesh Kumar <dinesh.kumar@mareana.com>
 * @Mareana - CPV Product
 * @version  1
 * @Last Modified - 4 April, 2022
 * @Last Changed By - Dinesh
 */

import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import "./styles.scss";
import { Input, Select } from "antd";
import { moleculeName } from "../../../../../duck/actions/viewCreationAction";
import { getMoleculeList } from "../../../../../services/viewCreationPublishing";
import {
	hideLoader,
	showLoader,
	showNotification
} from "../../../../../duck/actions/commonActions";

function ParameterLookup(props) {
	const { Search } = Input;
	const { Option } = Select;
	const dispatch = useDispatch();
	const {
		moleculeList,
		setMoleculeList,
		moleculeId,
		setMoleculeId,
		materialsList,
		setMaterialsList,
		setParentBatches,
		setViewSummaryBatch,
	} = props;

	const [searchValue, setSearchValue] = useState("");


	const tempMaterialList = useRef();

	const onSelectMoleculeHandler = async () => {
		let req = {};
		try {
			dispatch(showLoader());
			const moleculeRes = await getMoleculeList(req);

			if (moleculeRes.Status === 200) {
				setMoleculeList(moleculeRes.Data);
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
	};

	useEffect(() => {

		tempMaterialList.current = JSON.parse(JSON.stringify(materialsList));
	}, [materialsList]);

	useEffect(() => {
		onSelectMoleculeHandler();
	}, []);

	useEffect(() => {
		if (moleculeId) {
			onChangeMoleculeHandler(moleculeId);
			dispatch(moleculeName(moleculeId));
		}
	}, [moleculeId]);

	const onChangeMoleculeHandler = async (value) => {
		setMoleculeId(value);
		let _req = { molecule_name: value };
		try {
			dispatch(showLoader());

			const paramTreeRes = await getMoleculeList(_req);

			if (paramTreeRes.statuscode === 200) {
				dispatch(hideLoader());
				setMaterialsList(paramTreeRes.data.hierarchy);
				setParentBatches(paramTreeRes.data.mol_batches);
				if (paramTreeRes.data.mol_batches.length > 0) {
					setViewSummaryBatch(paramTreeRes.data.mol_batches);
				}
			} else if (paramTreeRes.statuscode === 401 && paramTreeRes.statuscode === 400) {
				dispatch(showNotification("error", "Filter -", paramTreeRes.Message));
				dispatch(hideLoader());
			} else if (paramTreeRes.statuscode === 404) {
				dispatch(showNotification("error", "Filter - No Data found",));
				dispatch(hideLoader());
			}
			dispatch(hideLoader());
		} catch (error) {
			dispatch(hideLoader());
			dispatch(showNotification("error", error));
		}
	};


	const onSearchChange = (e) => {
		if (e.target.value === "") {
			setMaterialsList(tempMaterialList.current);
		}
		setSearchValue(e.target.value);
	};

	const searchTable = () => {
		const newArr = materialsList.filter((ele) =>
			ele.children.some((element) =>
				element.product_description.toLowerCase().includes(searchValue)
			)
		);

		if (newArr.length) {
			setMaterialsList(newArr);
		}
	};

	return (
		<div className="parameterLookup-FormBlock">
			<div className="param-select">
				<p>Molecule</p>
				<Select
					placeholder="Select"
					style={{ width: "100%" }}
					onChange={onChangeMoleculeHandler}
					defaultValue={moleculeId}
					value={moleculeId}
				>
					{moleculeList.map((item, i) => {
						return (
							<Option value={item.ds_name} key={item.ds_name}>
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
					onChange={onSearchChange}
					onSearch={searchTable}
				/>
			</div>
		</div>
	);
}

export default ParameterLookup;
