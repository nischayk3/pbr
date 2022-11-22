/**
 * @author Dinesh
 * @Mareana - CPV Product
 * @version  1
 * @Last Modified - 08 Nov, 2022
 * @Last Changed By - Dinesh
 * @Last Modified - 15-11-2022
 * @Last Changed By - Siddesh
 */

import { Card } from "antd";
import React from 'react';
import BreadCrumbWrapper from "../../../../components/BreadCrumbWrapper";
import ElogTemplate from './elogTemplate/elogTemplate';
const ElogBook = () => {
	return (
		<div className="custom-wrapper">
			<BreadCrumbWrapper />
			<div className="custom-content-layout">
				{/* <Landing /> */}
				<Card
					title="BU-Batch 1108-RC Blend"
					bordered={false}
				>
					<ElogTemplate />
				</Card>

			</div>
		</div>
	)
}

export default ElogBook;