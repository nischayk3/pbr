/**
 * @author Dinesh
 * @Mareana - CPV Product
 * @version  2
 * @Last Modified - 11 April, 2023
 * @Last Changed By - Dinesh
 */
import { CaretRightOutlined, FullscreenExitOutlined, FullscreenOutlined, PlusOutlined } from "@ant-design/icons";
import SortableTree from '@nosferatu500/react-sortable-tree';
import '@nosferatu500/react-sortable-tree/style.css';
import { Card, Divider, Empty, Select, Tag, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';
import InputField from "../../../../../../components/InputField/InputField";
import { hideLoader, showLoader, showNotification } from "../../../../../../duck/actions/commonActions";
import { getMoleculeList, viewHierarchySource, viewhieararchyTree } from "../../../../../../services/viewCreationPublishing";
import "./processHierarchy.scss";

const ProcessHierarchy = ({ viewDataJson, setViewDataJson }) => {
	const dispatch = useDispatch();

	const [moleculeId, setMoleculeId] = useState("");
	const [currentNode, setCurrentNode] = useState({});
	const [moleculeList, setMoleculeList] = useState([]);
	const [treeData, setTreeData] = useState([]);
	const [expandHierarchy, setExpandHierarchy] = useState(true);
	const [loading, setLoading] = useState(false);
	const [searchString, setSearchString] = useState("");
	const [searchFocusIndex, setSearchFocusIndex] = useState(0);
	const [expandedData, setExpandedData] = useState([]);

	useEffect(() => {
		const reqMol = {
			'data': {},
			'parameters': {}
		}
		loadMolecule(reqMol)
	}, [])

	const updateTreeData = (treeData) => {
		setTreeData(treeData);
	}

	const selectThis = (node, path) => {
		setCurrentNode({ currentNode: node, path: path });
	}

	const onChangeMolecule = (e) => {
		if (e !== undefined) {
			viewHiearchy(e)
			setMoleculeId(e)
		} else {
			setMoleculeId("");
			setTreeData([]);
			setSearchString("");
		}
	}

	const handleExpand = () => {
		setExpandHierarchy(false)
	}

	const handleExpandExit = () => {
		setExpandHierarchy(true)
	}

	//Moleculelist api call
	const loadMolecule = async (_reqMolecule) => {
		try {
			const _resourceName = 'VIEW';
			dispatch(showLoader());
			const moleculeRes = await getMoleculeList(_reqMolecule, _resourceName);
			if (moleculeRes.Status === 200) {
				setMoleculeList(moleculeRes.Data.hierarchy);
				dispatch(hideLoader());
			} else if (moleculeRes.Status === 400 || moleculeRes.Status === 404) {
				dispatch(hideLoader());
				dispatch(showNotification("error", "No Data Found"));
			}
		} catch (error) {
			dispatch(hideLoader());
			dispatch(showNotification("error", error));
		}
	}

	//View Hieararchy api call
	const viewHiearchy = async (_reqMolecule) => {
		const _req = {
			ds_name: _reqMolecule
		}
		try {
			setLoading(true);
			const apiRes = await viewhieararchyTree(_req);
			if (apiRes.status === 200) {
				const data = apiRes?.data?.process_steps
				setTreeData([data])
				setLoading(false);
			} else if (apiRes.status === 400 || apiRes.status === 404) {
				setLoading(false);
				dispatch(showNotification("error", "No Data Found"));
			}
		} catch (error) {
			setLoading(false);
		}
	}

	//view Hieararchy soure tree api call
	const viewHieararchySrcTree = async (_reqparam) => {
		const _req = {
			ds_name: moleculeId,
			expanded: expandedData,
			to_expand: _reqparam
		}

		try {
			// setLoading(true);
			const apiRes = await viewHierarchySource(_req);
			if (apiRes.status === 200) {
				const data = apiRes?.data?.process_steps
				const expanded = apiRes?.expanded
				setTreeData([data])
				setExpandedData(expanded)
				// setLoading(false);
			} else if (apiRes.status === 400 || apiRes.status === 404) {
				// setLoading(false);
				dispatch(showNotification("error", apiRes?.message));
			}
		} catch (error) {
			dispatch(showNotification("error", "Oops! Something went wrong. Please try again."));
		}
	}

	const expandNode = (e, node) => {
		viewHieararchySrcTree(node)

	}

	const parameterNode = (e, node) => {

		// const paramJson = { ...viewJson }
		const nodeParam = { ...viewDataJson }

		const obj = {
			batch_exclude: [],
			aggregation: "",
			priority: 0,
			coverage: "",
			dataset_name: node?.dataset_name,
			n_mat_no: node?.n_mat_no,
			n_plant: node?.n_mat_no,
			path: node?.path,
			rec_disp_id: node?.rec_disp_id,
			title: node?.title,
			type: node?.type,
			uuid: node?.uuid
		}

		const updateParam = nodeParam && nodeParam?.data.map((ele) => {
			return ele.parameters = [...ele.parameters, obj]
		});

		setViewDataJson(nodeParam)
	}

	return (
		<div className="card__block--wrapper">
			{expandHierarchy && (
				<Card title='Parameter Lookup' className='custom__card'>
					<div className='parameter__wraper'>
						<div className="parameter__wraper--select">
							<p>Molecule</p>
							<Select
								placeholder='Search Molecule'
								id="molecule"
								value={moleculeId}
								onChange={e => onChangeMolecule(e)}
								style={{ width: "100%", margin: "0px" }}
								allowClear
								showSearch
							>
								{moleculeList &&
									moleculeList.map((item) => (
										<Select.Option key={item.ds_name} value={item.ds_name} >
											{item.ds_name}
										</Select.Option>
									))}
							</Select>

						</div>
					</div>
				</Card>
			)}

			<Card
				title='Process hierarchy'
				className='custom__card'
				extra={expandHierarchy ?
					<Tooltip title="Expand panel" mouseLeaveDelay={0}>
						<FullscreenOutlined onClick={handleExpand} />
					</Tooltip> :
					<Tooltip title="Collapse panel" mouseLeaveDelay={0}>
						<FullscreenExitOutlined onClick={handleExpandExit} />
					</Tooltip>
				}
				loading={loading}
			>
				{treeData?.length === 0 ? (<Empty className="empty--layout" description="Nothing to see here!" imageStyle={{
					height: 120,
				}} image={Empty.PRESENTED_IMAGE_SIMPLE} />)
					: (
						<>
							<div className="parameter__wraper--select">
								<p>Filters</p>
								<InputField
									// label="Model name"
									placeholder="Search here"
									value={searchString}
									onChangeInput={(e) => {
										const search = e.target.value;
										setSearchString(search?.toUpperCase());
									}}
								/>
							</div>
							<Divider />
							<div className={expandHierarchy ? "hiearchy-tree__wrapper expand--panel" : "hiearchy-tree__wrapper collapse--panel"}>

								<div className="sortable-tree__tree">
									<SortableTree
										searchQuery={searchString}
										searchFocusOffset={searchFocusIndex}
										canDrag={false}
										theme={FileExplorerTheme}
										treeData={treeData}
										onChange={treeData => {
											setTreeData(treeData);
											updateTreeData(treeData)
										}}
										generateNodeProps={({ node, path }) => ({
											title: (
												<>
													<form onClick={(e) => { e.preventDefault(); e.stopPropagation(); selectThis(node, path); }}>
														{node && node?.type === "material" ? (
															<div className="sortable-tree__tree--node">
																<Tooltip title={node?.title.toUpperCase()} mouseLeaveDelay={0}>
																	<div className="sortable-tree__tree--materialnode" onClick={(e) => expandNode(e, node)}>
																		{node?.children ? null : <CaretRightOutlined />}
																		<p className='sortable-tree__tree--materialtitle'>{node?.title.toUpperCase()}</p>
																	</div>
																</Tooltip>
															</div>) : node?.type === "source-folder" ? (
																<p className='sortable-tree__tree--input--disabled'>{node?.title.toUpperCase()}</p>
															) :
															node?.type === "parameters" ? (
																<div className="sortable-tree__tree--parameternode ">
																	<Tooltip title={node?.title.toUpperCase()}>
																		<Tag color="geekblue" className="sortable-tree__tree--paramtitle">
																			{node?.title.toUpperCase()}
																		</Tag>
																	</Tooltip>
																	<PlusOutlined style={{ fontSize: '14px' }} onClick={(e) => parameterNode(e, node)} />
																</div>
															) : (
																<p className='sortable-tree__tree--input--disabled'>{node?.title.toUpperCase()}</p>
															)
														}

													</form>
												</>
											)
										})}
									/>
								</div>
							</div>
						</>
					)}
			</Card>

			{
				expandHierarchy && (
					<Card title='Files' className='custom__card'></Card>
				)
			}
		</div >
	)
}

export default ProcessHierarchy;