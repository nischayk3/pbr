/**
 * @author Dinesh Kumar <dinesh.kumar@mareana.com>
 * @Mareana - CPV Product
 * @version  1
 * @Last Modified - 4 April, 2022
 * @Last Changed By - Dinesh
 */

import React, { useState, useEffect } from "react";
import { Empty } from 'antd';
import './ProcessHierarchy.scss'

const ProcessHierarchy = (props) => {
	const { moleculeList } = props;
	const treeMap = moleculeList && moleculeList.hierarchy;

	const toggler = document.getElementsByClassName("caret");
	let i;
	for (i = 0; i < toggler.length; i++) {
		toggler[i].addEventListener("click", function () {
			this.parentElement.querySelector(".nested").classList.toggle("active");
			this.classList.toggle("caret-down");
		});
	}

	//onClick node 
	const onClickProcessStep = (value1, value2, field) => {
		console.log("onClickNode", value1, value2, field)
		if (field === 'process_step') {
			props.callbackProcessClick(value1, value2, field)
		}
	}

	//onClick node 
	const onClickProductDes = (value1, value2, value3, field) => {
		console.log("onClickNode", value1, value2, field)
		if (field === 'product_desc') {
			props.callbackProductClick(value1, value2, value3, field)
		}
	}

	return (
		<div className="custom-treenode">
			{/* {treeMap && treeMap.length > 0 ? (
				<div>
					{treeMap.map((item, index) => {
						return (
							<ul id="process-treenode">
								<li>
									<span
										className="caret"
										onClick={e => onClickProcessStep(item.ds_name, item.process_step_int_id, 'process_step')}>
										{item.process_step}
									</span>
									<ul className="nested">
										<li>
											<span
												className="caret"
												onClick={e => onClickProductDes(item.ds_name, item.process_step_int_id, item.product_num, 'product_desc')}>
												{item && item.product_desc}
											</span>
											<ul className="nested">
												<li>
													<span>{item.parameter_name} {item.coverage}</span>
												</li>
											</ul>
										</li>
									</ul>
								</li>
							</ul>
						)
					})}
				</div>
			) : (
				<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
			)} */}
		</div>

	);
}

export default ProcessHierarchy;