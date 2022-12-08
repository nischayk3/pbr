/**
 * @author Dinesh
 * @Mareana - CPV Product
 * @version  1
 * @Last Modified - 08 Nov, 2022
 * @Last Changed By - Dinesh
 * @Last Modified - 15-11-2022
 * @Last Changed By - Siddesh
 */

import React from 'react';
import BreadCrumbWrapper from "../../../../components/BreadCrumbWrapper";
import DataEntryForm from "./dataEntryForm/dataEntryForm";
const ElogBook = () => {
	return (
		<div className="custom-wrapper">
			<BreadCrumbWrapper />
			<div className="custom-content-layout">
				{/* <Landing /> */}
				<DataEntryForm />

			</div>
		</div>
	)
}

export default ElogBook;