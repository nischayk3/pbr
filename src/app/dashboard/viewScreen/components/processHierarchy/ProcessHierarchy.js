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
	const treeMap = moleculeList;

	const toggler = document.getElementsByClassName("caret");
	let i;
	for (i = 0; i < toggler.length; i++) {
		toggler[i].addEventListener("click", function () {
			this.parentElement.querySelector(".nested").classList.toggle("active");
			this.classList.toggle("caret-down");
		});
	}

	return (
		<div className="custom-treenode">
			{treeMap && treeMap.length > 0 ? (
				<div>
					{treeMap && treeMap.map((item, index) => {
						return (
							<ul id="process-treenode">
								<li><span class="caret">{item.process_step}</span>
									<ul class="nested">
										<li>Water</li>
										<li>Coffee</li>
										<li><span class="caret">Tea</span>
											<ul class="nested">
												<li>Black Tea</li>
												<li>White Tea</li>
												<li><span class="caret">Green Tea</span>
													<ul class="nested">
														<li>Sencha</li>
														<li>Gyokuro</li>
														<li>Matcha</li>
														<li>Pi Lo Chun</li>
													</ul>
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
			)}
		</div>

	);
}

export default ProcessHierarchy;