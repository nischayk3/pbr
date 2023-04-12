/**
 * @author Dinesh
 * @Mareana - CPV Product
 * @version  2
 * @Last Modified - 11 April, 2023
 * @Last Changed By - Dinesh
 */
import React from "react";
import BreadCrumbWrapper from "../../../../../components/BreadCrumbWrapper";
import ProcessHierarchy from "./processHierarchy/processHiearachy";
import "./view.scss";

const View = () => {

	return (
		<div className="custom-wrapper">
			<BreadCrumbWrapper />
			<div className="custom-content-layout">
				<div className="view__landing--layout">
					<ProcessHierarchy />
					<></>
				</div>

			</div>
		</div>
	)
}

export default View;