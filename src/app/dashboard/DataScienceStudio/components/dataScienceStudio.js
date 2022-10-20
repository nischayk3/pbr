/**
 * @author Dinesh
 * @Mareana - CPV Product
 * @version  1
 * @Last Modified - 03 Oct, 2022
 * @Last Changed By - Dinesh
 */

import React, { useEffect } from 'react';
import { useSelector } from "react-redux";
import BreadCrumbWrapper from "../../../../components/BreadCrumbWrapper";
import Landing from "../components/landing/Landing";
const DataScienceStudio = () => {
	const isTargetVar = useSelector((state) => state.viewCreationReducer.isTargetVar)
	console.log("isTargetVar", isTargetVar);

	useEffect(() => {

	}, [])

	return (
		<div className="custom-wrapper">
			<BreadCrumbWrapper />
			<div className="custom-content-layout">
				<Landing />
			</div>
		</div>
	)
}

export default DataScienceStudio