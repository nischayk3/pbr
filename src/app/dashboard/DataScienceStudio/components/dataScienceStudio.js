/**
 * @author Dinesh
 * @Mareana - CPV Product
 * @version  1
 * @Last Modified - 03 Oct, 2022
 * @Last Changed By - Dinesh
 */

import React from 'react';
import BreadCrumbWrapper from "../../../../components/BreadCrumbWrapper";
import TargetVariable from './targetVariable/TargetVariable';
// import Landing from "../components/landing/Landing";


const DataScienceStudio = () => {
	return (
		<div className="custom-wrapper">
			<BreadCrumbWrapper />
			<div className="custom-content-layout">
				{/* <Landing /> */}
				<TargetVariable />
			</div>
		</div>
	)
}

export default DataScienceStudio