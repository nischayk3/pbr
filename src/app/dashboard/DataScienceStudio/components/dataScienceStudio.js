/**
 * @author Dinesh
 * @Mareana - CPV Product
 * @version  1
 * @Last Modified - 03 Oct, 2022
 * @Last Changed By - Dinesh
 */

import React from 'react';
import { useSelector } from "react-redux";
import BreadCrumbWrapper from "../../../../components/BreadCrumbWrapper";
import Landing from "../components/landing/Landing";
import TargetVariable from './targetVariable/TargetVariable';
const DataScienceStudio = () => {
	const isTargetVar = useSelector((state) => state.viewCreationReducer.isTargetVar)

	console.log("isTargetVar", isTargetVar);
	return (
		<div className="custom-wrapper">
			<BreadCrumbWrapper />
			<div className="custom-content-layout">
				{isTargetVar ? (
					<TargetVariable />
				) : (<Landing />)}
			</div>
		</div>
	)
}

export default DataScienceStudio