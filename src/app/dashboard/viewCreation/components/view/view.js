/**
 * @author Dinesh
 * @Mareana - CPV Product
 * @version  2
 * @Last Modified - 11 April, 2023
 * @Last Changed By - Dinesh
 */
import { Empty } from 'antd';
import Sider from "antd/lib/layout/Sider";
import React, { useState } from "react";
import panelRightImg from '../../../../../assets/images/panel-rightIcon.svg';
import BreadCrumbWrapper from "../../../../../components/BreadCrumbWrapper";
import viewjson from "../view.json";
import ProcessHierarchy from "./processHierarchy/processHiearachy";
import Variable from "./variables/variable";
import "./view.scss";
import ViewParamterSummary from "./viewParamterSummary/viewParameterSummary";

const View = () => {
	const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false);
	const [rightPanelCollapsed, setRightPanelCollapsed] = useState(true);
	const [viewDataJson, setViewDataJson] = useState(viewjson);


	const toggleLeftCollapsed = () => {
		setLeftPanelCollapsed(!leftPanelCollapsed);
		setRightPanelCollapsed(!rightPanelCollapsed);
	};

	const toggleRightCollapsed = () => {
		setRightPanelCollapsed(!rightPanelCollapsed);
		setLeftPanelCollapsed(!leftPanelCollapsed);
	};



	return (
		<div className="custom-wrapper">
			<BreadCrumbWrapper />
			<div className="custom-content-layout">
				<div className="view__landing--layout">
					<Sider
						className="parameter__left--wrapper"
						trigger={null}
						collapsible
						collapsedWidth="8"
						width="450"
						collapsed={leftPanelCollapsed}>
						<span
							className='trigger__right'
							onClick={toggleLeftCollapsed}
						>
							<img src={panelRightImg} className='panel__left--img' />
						</span>
						<ProcessHierarchy viewDataJson={viewDataJson} setViewDataJson={setViewDataJson} />
					</Sider>
					{viewDataJson && viewDataJson?.data.map((ele) => {
						return ele.parameters?.length > 0 ? (<>
							<ViewParamterSummary
								viewDataJson={viewDataJson}
								setViewDataJson={setViewDataJson}
								leftPanelCollapsed={leftPanelCollapsed}
								setLeftPanelCollapsed={setLeftPanelCollapsed}
								rightPanelCollapsed={rightPanelCollapsed}
								setRightPanelCollapsed={setRightPanelCollapsed}
							/>
							<Sider
								className="parameter__right--wrapper"
								trigger={null}
								collapsible
								collapsedWidth="8"
								width="350"
								collapsed={rightPanelCollapsed}>
								<span
									className='trigger__left'
									onClick={toggleRightCollapsed}
								>
									<img src={panelRightImg} className='panel__right--img' />
								</span>
								<Variable viewDataJson={viewDataJson} setViewDataJson={setViewDataJson} />
							</Sider> </>) : (<div className='side__panel--empty'>
								<Empty description="Select an objective to view its details here" />
							</div>)
					})}
				</div>
			</div>
		</div>
	)
}

export default View;