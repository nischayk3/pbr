/**
 * @author Dinesh
 * @Mareana - CPV Product
 * @version  2
 * @Last Modified - 11 April, 2023
 * @Last Changed By - Dinesh
 */
import { CaretRightOutlined, FullscreenExitOutlined, FullscreenOutlined } from "@ant-design/icons";
import SortableTree from '@nosferatu500/react-sortable-tree';
import '@nosferatu500/react-sortable-tree/style.css';
import { Card, Divider, Empty, Select, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import FileExplorerTheme from 'react-sortable-tree-theme-file-explorer';
import InputField from "../../../../../../components/InputField/InputField";
import { hideLoader, showLoader, showNotification } from "../../../../../../duck/actions/commonActions";
import { getMoleculeList, viewhieararchyTree } from "../../../../../../services/viewCreationPublishing";
import "./processHierarchy.scss";
const ProcessHierarchy = () => {
	const dispatch = useDispatch();

	const [moleculeId, setMoleculeId] = useState("");
	const [currentNode, setCurrentNode] = useState({});
	const [moleculeList, setMoleculeList] = useState([]);
	const [treeData, setTreeData] = useState([]);
	const [expandHierarchy, setExpandHierarchy] = useState(true);
	const [loading, setLoading] = useState(false);
	const [searchString, setSearchString] = useState("");
	const [searchFocusIndex, setSearchFocusIndex] = useState(0);

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
		console.log("eeeeeee", e);
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
			dispatch(showLoader());
			const apiRes = await viewhieararchyTree(_req);
			if (apiRes.status === 200) {
				const data = apiRes?.data?.process_steps
				setTreeData([data])
				dispatch(hideLoader());
			} else if (apiRes.status === 400 || apiRes.status === 404) {
				dispatch(hideLoader());
				dispatch(showNotification("error", "No Data Found"));
			}
		} catch (error) {
			dispatch(hideLoader());
		}
	}


	return (
		<div>
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
					<Tooltip title="Expand panel">
						<FullscreenOutlined onClick={handleExpand} />
					</Tooltip> :
					<Tooltip title="Collapse panel">
						<FullscreenExitOutlined onClick={handleExpandExit} />
					</Tooltip>
				}
			>
				{treeData.length === 0 ? (<Empty description="Nothing to see here!" imageStyle={{
					height: 60,
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
														{/* {node && node?.n_mat_desc ? (
															<div className="sortable-tree__tree--node">
																<Tooltip title={node?.title.toUpperCase()}>
																	<Tag color="geekblue">
																		{node?.title.toUpperCase()}
																	</Tag>
																</Tooltip>
																<PlusOutlined />
															</div>) : (
															<p className='sortable-tree__tree--input--disabled'>{node?.title.toUpperCase()}</p>
														)} */}
														{node && node?.n_mat_desc ? (
															<div className="sortable-tree__tree--node">
																<Tooltip title={node?.title.toUpperCase()}>
																	<div className="sortable-tree__tree--materialnode">
																		<CaretRightOutlined />
																		<p className='sortable-tree__tree--materialtitle'>{node?.title.toUpperCase()}</p>
																	</div>
																</Tooltip>
															</div>) : (
															<p className='sortable-tree__tree--input--disabled'>{node?.title.toUpperCase()}</p>
														)}
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